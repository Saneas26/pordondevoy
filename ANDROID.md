# Por dónde voy · app Android (Capacitor)

El sitio (`index.html` + `planes/` + `herramientas/` + `js/`, la misma PWA que sirve Vercel en
pordondevoy-saneas.vercel.app) se empaqueta como app Android nativa con **Capacitor**. Los
ficheros web van **dentro del binario** (no se carga la web remota). La compilación se hace **en
la nube con GitHub Actions**: en el Mac no hace falta Java, el SDK ni Android Studio.

| Dato | Valor |
|---|---|
| Package name (`applicationId`) | `es.saneas.pordondevoy` (no cambiar nunca: Play lo ata a la app) |
| Nombre visible | Por dónde voy |
| Versión inicial | `versionName 1.0.0` · `versionCode 1` (`android/app/build.gradle`) |
| minSdk / target / compile | 24 / 36 / 36 (`android/variables.gradle`) |
| Capacitor | 8.x · Java 21 · Gradle 8.14 · AGP 8.13 |
| Permisos | `INTERNET` + `ACCESS_FINE_LOCATION`/`ACCESS_COARSE_LOCATION` (corrección GPS del vuelo, opcional) · `usesCleartextTraffic=false` · `allowMixedContent=false` |
| Origen de la WebView | `https://localhost` (`androidScheme: https`) → esto hace que `location.hostname === "localhost"` ya sea cierto dentro del binario |

## Diferencia clave con la app de Saneas: el Service Worker SÍ va dentro

En `saneas-app` se excluye `sw.js` del binario porque solo servía para Web Push. Aquí el Service
Worker sirve los mp3 de podcast descargados (caché `pdv-audio`, gestionada directamente por
`index.html` con la Cache API) para que se puedan escuchar sin conexión en modo avión. Por eso
`scripts/build-www.sh` **sí copia `sw.js`** al binario — decisión contraria a Saneas, documentada
aquí para que no se "corrija" sin darse cuenta. Android WebView soporta Service Workers desde la
API 24 (nuestro minSdk), y Capacitor con `androidScheme: https` los registra con normalidad.
**Probar la reproducción offline en el emulador antes de dar el pipeline por bueno**: instalar el
`.apk`, descargar un episodio con conexión, poner el dispositivo en modo avión y comprobar que
suena.

## Qué hay en el repo

- `package.json` — `@capacitor/core`, `@capacitor/android`, `@capacitor/app` (botón atrás) y
  `@capacitor/cli`.
- `capacitor.config.json` — `appId`, `appName`, `webDir: www`, `androidScheme: https`, fondo navy.
- `scripts/build-www.sh` — copia a `www/` index.html, manifest.json, iconos, fuentes, `rutas.js`,
  `sw.js` (ver arriba), y **recursivamente** `js/`, `img/`, `planes/` y `herramientas/` (el sitio es
  multipágina, no una sola pantalla). Excluye `api/` (no existe dentro del binario, ver más abajo),
  `DESIGN.md`/`PRODUCT.md`/`TRASPASO_TIENDAS.md`/`build_rutas.py`/`icon-original-2000.png`. `www/`
  no se versiona.
- `scripts/iconos_android.py` — genera los iconos (legacy + adaptive) y los splash a partir de
  `icon-original-2000.png` (el icono es una ilustración completa —avión, ruta punteada, pin—, no
  una marca aislable como la "S" de Saneas: se usa el icono entero, escalado con margen, sobre
  fondo navy `#041e3f`). `npm run android:iconos`, necesita Pillow.
- `android/` — proyecto Android generado por `npx cap add android` y ajustado. **Sí se versiona**
  (salvo `build/`, `.gradle/`, `local.properties` y los assets que regenera `cap sync`).
- `js/26-nativo.js` — ajustes que SOLO actúan dentro del binario (en la web no hace nada); incluido
  en **todas** las páginas (`index.html`, cada `planes/*/index.html`, `herramientas/*/index.html`).
- `.github/workflows/android.yml` — la compilación en la nube.
- `.vercelignore` — para que nada de esto (ni tampoco `DESIGN.md`/`PRODUCT.md`/`build_rutas.py`,
  que se colaron sin querer) se publique en la web.

## Cómo se comporta la app dentro del binario (diferencias con la web)

- **`/api` absoluto**: `index.html` define `const API`, que apunta a
  `https://pordondevoy-saneas.vercel.app` cuando `location.hostname` es `localhost`/`127.0.0.1`
  **o** cuando `window.Capacitor.isNativePlatform()` es cierto (el segundo caso es en la práctica
  redundante —Capacitor ya sirve desde `https://localhost`— pero se dejó explícito para no
  depender de un comportamiento por defecto de Capacitor sin declararlo). Sin esto, noticias y
  podcast no cargarían dentro de la app.
- **Enlaces externos** (tarjetas del grupo Saneas, WhatsApp, Google Maps y teléfonos de las
  guías): `js/26-nativo.js` los manda a `location.href`; la WebView de Capacitor abre cualquier
  host distinto del de la app con un Intent del sistema (navegador / Maps / teléfono / WhatsApp) y
  **no navega dentro de la app**.
- **Botón atrás de Android**: patrón estándar de Capacitor (el sitio es multipágina, no una SPA
  como Saneas): si la WebView puede retroceder en su historial, retrocede; si no, minimiza la app.
- **Geolocalización**: se usa la API web estándar (`navigator.geolocation`, ya en `index.html`);
  el WebView de Capacitor gestiona el permiso del navegador, y el manifest declara
  `ACCESS_FINE_LOCATION`/`ACCESS_COARSE_LOCATION`. En Data safety se declara "Ubicación precisa ·
  opcional · no se comparte · procesada en el dispositivo".
- **Wake Lock**: se deja tal cual (`navigator.wakeLock`, con try/catch que ya degrada sin error si
  el WebView no lo soporta); si en el futuro falla en la práctica, añadir
  `@capacitor-community/keep-awake` es la vía.

## Compilar (GitHub Actions)

Workflow **"Android (Capacitor)"** (`.github/workflows/android.yml`). Se lanza:

- a mano: GitHub → Actions → "Android (Capacitor)" → **Run workflow** (o
  `gh workflow run android.yml --ref main`);
- solo en `push` a `main` que toque `android/**`, `js/**`, `planes/**`, `herramientas/**`,
  `img/**`, `index.html`, `manifest.json`, `rutas.js`, `sw.js`, los iconos, `package*.json`,
  `capacitor.config.json`, `scripts/build-www.sh` o el propio workflow.

Pasos: checkout → Node 22 → `npm ci` → `npm run build:www` → `npx cap sync android` → Java 21 →
SDK → `./gradlew bundleRelease assembleRelease` → verificación (SHA256, `AndroidManifest.xml`,
`package="es.saneas.pordondevoy"`, `usesCleartextTraffic=false`, firma) → artefactos:

- **`pordondevoy-android-aab`**: `pordondevoy-release.aab` (+ `SHA256SUMS.txt`, `INFO.txt`, el
  manifest volcado). Es lo que se sube a Play.
- **`pordondevoy-android-apk`**: `pordondevoy-release.apk` para instalar directamente en un móvil
  de prueba o en el emulador (para probar el audio offline, ver arriba).

Sin secretos de firma el workflow **compila igual y avisa** ("SIN FIRMA"): el `.aab` sirve para
validar el pipeline, **Google Play no lo acepta**.

## Firma: se reutiliza la clave de subida de Saneas (decisión de Óscar, 25/08/2026)

Un keystore de subida (upload key) vale para varias apps: Play App Signing guarda la clave de
firma definitiva de cada app por separado; nosotros solo firmamos la subida. Por eso **no hace
falta generar un keystore nuevo** — se reutiliza el mismo `saneas-upload.jks` que ya existe en
`~/Documents/Saneas/android-keys/` (guardado fuera del repo, como siempre).

GitHub → repo `Saneas26/pordondevoy` → **Settings → Secrets and variables → Actions → New
repository secret**, los mismos cuatro secretos que en `saneas-app`, con **el mismo contenido**:

| Secreto | Contenido |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | el keystore de Saneas en base64 — **una sola línea, sin saltos** |
| `ANDROID_KEYSTORE_PASSWORD` | la misma contraseña que en Saneas |
| `ANDROID_KEY_ALIAS` | el mismo alias que en Saneas (`saneas-upload`) |
| `ANDROID_KEY_PASSWORD` | la misma contraseña de clave que en Saneas |

Después de crear los cuatro, volver a lanzar el workflow: el log dirá "firmando el release con la
clave de subida" y el `.aab` pasará `jarsigner -verify`.

## Subir a Google Play (directo a Producción)

Cuenta: "Grupo Saneas" (Play Console, ID 6778977736512050870) — exenta de la prueba cerrada de 12
testers por antigüedad. Se va **directo a Producción** (la prueba interna en Saneas fue un rodeo
innecesario: ver `TRASPASO_TIENDAS.md`).

1. Play Console → **Crear aplicación** → "Por dónde voy", aplicación, gratuita, español.
2. Antes de la primera subida: política de privacidad
   (`https://pordondevoy-saneas.vercel.app/privacidad.html`), Data safety, clasificación de
   contenido (IARC), público objetivo, anuncios = no, categoría "Viajes y guías".
3. **Producción → Crear versión** → aceptar Play App Signing → subir `pordondevoy-release.aab` →
   notas de la versión → **Revisar y publicar** → **Enviar aplicación a revisión**.
4. Registrar `es.saneas.pordondevoy` en **"Verificación de desarrolladores de Android"**.

**"Enviado" solo existe cuando se ve en la consola** (las tres pruebas del §0 de
`TRASPASO_TIENDAS.md`, en una captura, en el mismo turno) — no antes.

## Sacar una versión nueva

1. En `android/app/build.gradle`: `versionCode` **+1** (entero, siempre creciente) y
   `versionName` (texto visible, p. ej. `1.0.1`).
2. Commit a `main` (o lanzar el workflow a mano) → bajar el `.aab` → Play Console → Producción →
   Crear versión → subir.
3. Los cambios de la web (`js/`, `planes/`, `herramientas/`, `index.html`) solo llegan a la app
   cuando se compila y se sube una versión nueva; `/api` y todo lo del servidor llegan al instante
   a la vez a la web y a la app (son la misma función de Vercel).

## Probar en local (opcional, requiere Android Studio)

```bash
npm ci && npm run cap:sync && npx cap open android
```

En el Mac de Óscar no hay Java ni SDK: la vía normal es el artefacto del workflow (`.apk` al móvil
por cable/Drive, o al emulador para probar el audio offline).

## Pendiente (fases siguientes)

- iOS: mismo código con `@capacitor/ios` (necesita cuenta de Apple Developer y un Mac con Xcode) —
  ver `TRASPASO_TIENDAS.md` §6.
- Wake Lock nativo si el degradado silencioso da problemas en la práctica.
- Vuelta del pago — no aplica: esta app no cobra nada.
