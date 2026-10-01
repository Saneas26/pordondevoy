# iOS · Por dónde voy

App nativa de iPhone/iPad generada con **Capacitor 8** (Swift Package Manager, sin CocoaPods),
mismo patrón que `Saneas26/saneas-app`, pero más simple: sin Firebase, sin push, sin HealthKit,
sin plugins nativos propios — usa el `CAPBridgeViewController` de Capacitor directamente.

## Qué carga la app

Igual que Android: **todo empaquetado en el binario** (`webDir: www`), incluido `sw.js` para el
audio offline de noticias/podcast. No hay `server.url`: la app NO carga la web en vivo, funciona
sin conexión desde el primer arranque (ese es el punto de la app — modo avión).

## Compilar en local (sin Xcode, solo para regenerar ficheros)

```bash
npm install
npm run cap:sync:ios     # build:www + npx cap sync ios
npm run ios:iconos       # regenera AppIcon/Splash desde icon-original-2000.png
```

Para compilar y firmar de verdad hace falta Xcode (macOS) — eso lo hace el workflow en la nube.

## CI: `.github/workflows/ios.yml`

- `runs-on: macos-15`, elige el Xcode más nuevo instalado en el runner (Apple exige **Xcode 26+**
  para subir builds a App Store Connect, lección aprendida con Saneas el 07/09/2026).
- Siempre hace un **archive sin firmar** primero (valida que el proyecto compila) → artefacto
  `pordondevoy-ios-unsigned` (App.app comprimido).
- Si existen los 4 secretos de Apple, firma **en la nube** al archivar/exportar (sin `.p12` ni
  perfil a mano) y sube el `.ipa` a TestFlight con `altool`.

## Cuenta de Apple Developer: LA MISMA que Saneas

Un Apple Developer Program permite varias apps. **No hace falta pagar ni crear cuenta nueva.**
Team ID ya activo: `JM9AC23FVW`.

Pasos de Óscar (una sola vez, en developer.apple.com y App Store Connect, con su Apple ID de
iCloud — Claude no puede entrar, solo ver en modo lectura si usa Chrome):

1. **developer.apple.com → Identifiers → +** : nuevo App ID `es.saneas.pordondevoy` ("Por dónde
   voy"). Sin capacidades especiales (ni HealthKit ni Push) — esta app no las necesita.
2. **App Store Connect → My Apps → +** : nueva app, Bundle ID `es.saneas.pordondevoy`, SKU
   `pordondevoy-ios`, nombre "Por dónde voy".
3. **API key**: si todavía existe la de Saneas (`ZM5P8PW5A6`, rol Admin) se puede reutilizar tal
   cual — un API key con rol Admin vale para todas las apps del equipo. Si no, crear una nueva en
   App Store Connect → Users and Access → Integrations → App Store Connect API (rol **Admin**,
   imprescindible para que `xcodebuild` cree el certificado de distribución gestionado).
4. **4 secretos en GitHub** (repo `Saneas26/pordondevoy` → Settings → Secrets and variables →
   Actions), pegados por Óscar (Claude no maneja claves de Apple):
   - `APPLE_TEAM_ID` = `JM9AC23FVW` (el mismo de Saneas)
   - `APP_STORE_CONNECT_API_KEY_ID`
   - `APP_STORE_CONNECT_ISSUER_ID`
   - `APP_STORE_CONNECT_API_KEY_P8_BASE64` → `base64 -i AuthKey_X.p8 | tr -d '\n' | pbcopy`

Con esos 4 secretos puestos, cada push a `main` que toque `ios/js/css/img/index.html/sw.js`
compila, firma y sube solo a TestFlight — igual que Saneas.

## Después de TestFlight

- Óscar se añade como tester interno (TestFlight → Pruebas internas → su Apple ID) y prueba en su
  iPhone: vuelo en modo avión de verdad (sin wifi/datos), GPS, noticias/podcast offline, enlaces
  externos (Grupo Saneas) abriendo Safari, orientación.
- Ficha de App Store: capturas iPhone (6,7" y 6,5"), icono 1024 sin alfa (ya generado en
  `ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png`), descripción/categoría
  (Viajes), App Privacy coherente con la Data Safety de Android (solo ubicación precisa, opcional,
  tratamiento efímero — nunca se guarda ni se envía a ningún servidor), política de privacidad
  `https://pordondevoy-saneas.vercel.app/privacidad.html`. Sin cuentas: no hace falta URL de
  eliminación de cuenta ni usuario demo para el revisor.
- DSA (comerciante/no comerciante): esta app no vende nada ni cobra nada dentro — declarar "no
  comerciante" en Negocio → Cumplimiento de App Store Connect (a diferencia de Saneas, que sí es
  comerciante por la cuota de asesoría).

## Icono y splash

`scripts/iconos_ios.py` genera `AppIcon-512@2x.png` (1024×1024) y `Splash.imageset` (2732×2732)
desde `icon-original-2000.png`. El original trae un corner-radius grande (~27 % del lado) y un
margen blanco opaco (sin alfa real) alrededor del icono: el script recorta y aplica una máscara de
esquinas redondeadas supersampleada (4×) para que no aparezca un marco blanco al componer sobre el
navy `#041e3f` — mismo fallo que hubo que corregir en los gráficos de la ficha de Google Play.
