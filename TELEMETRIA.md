# Telemetría del Grupo Saneas

Recuento anónimo, para todas las apps del grupo, de:

- **Cuánta gente tiene cada app instalada** (acceso directo creado) y cuánta entra por navegador.
- **Cuántos dispositivos están activos cada día** (abren la app ese día).
- **De qué país** es cada dispositivo.
- Cuántos iPhone y cuántos Android, y cuántos son nuevos esta semana.

No se guarda ningún dato personal: solo un identificador aleatorio que vive en
cada móvil, la plataforma y el país (que deduce Vercel de la conexión, sin
guardar la IP).

**Las cifras solo se ven desde el panel de Óscar** (`app.saneas.es/panel.html`
→ botón **Grupo**). Ninguna app del grupo puede consultarlas: solo pueden
apuntarse.

---

## Puesta en marcha: un solo paso

Abre el **SQL Editor** de Supabase (el proyecto del grupo) y ejecuta
`supabase/telemetria.sql` **del repositorio `saneas-app`** — vive allí porque
usa el guardia `es_admin()`, igual que el resto de funciones del panel.

Y ya está. **No hace falta configurar nada en Vercel**: el aviso entra por la
función `telemetria_ping()`, que solo permite apuntarse (ni leer ni consultar),
así que basta con la clave pública que las apps ya llevan.

### Cómo queda protegido

| | Puede apuntarse | Puede ver las cifras |
|---|---|---|
| Las apps (clave pública) | ✅ | ❌ |
| Un cliente con sesión iniciada | ✅ | ❌ |
| Tu panel en modo admin | ✅ | ✅ |

Las dos tablas tienen RLS sin políticas, así que nadie llega a ellas por la
API: solo se entra por las dos funciones, y la del resumen está protegida con
`es_admin()`.

### Ver los datos

`app.saneas.es/panel.html` → entra con tu contraseña, activa el **modo admin**
y pulsa **Grupo**. Verás el total del grupo y, app por app, los dispositivos,
cuántos la tienen instalada, los activos de hoy, un gráfico de activos por día
de los últimos 30 días y el reparto por país.

---

## Qué está conectado

Las seis propiedades del grupo ya avisan. Cada una manda su aviso a
`/api/ping` (aunque no esté alojada en Vercel), porque es quien añade el país
a partir de la conexión.

| Propiedad | Identificador | Dónde vive el script |
|---|---|---|
| Por dónde voy | `pordondevoy` | dentro de `index.html` |
| APP Saneas · app.saneas.es | `saneas` | `saneas-app` → `js/24-telemetria.js` |
| Web Saneas · saneas.es | `saneas_web` | `saneas` → `assets/telemetria.js` |
| Activala · activala.es | `activala` | `activala` → `js/telemetria.js` |
| laOra · laora.es | `laora` | `laora` → `assets/js/telemetria.js` |
| Acumula · acumula.es | `acumula` | `acumula` → `acumula/web/static/telemetria.js` |

### Añadir una propiedad nueva en el futuro

1. Copia el `telemetria.js` de cualquiera de las webs y cambia el `var APP`.
2. Cárgalo en las páginas: `<script src="/ruta/telemetria.js" defer></script>`.
3. Añade el identificador nuevo a **dos sitios**: la lista de
   `telemetria_ping()` en `supabase/telemetria.sql` (y vuelve a ejecutarlo) y
   la lista `APPS` de `api/ping.js` en este repositorio.
4. Si quieres que salga con su nombre y logo en el panel, añádelo también a
   `GT_APPS` en `panel.html`.

### Nota sobre privacidad

El identificador es aleatorio y vive en el navegador de cada persona: no hay
nombre, ni correo, ni IP, y no se comparte con nadie de fuera. Aun así, en
`activala.es` y `laora.es` la política decía «esta web no usa cookies de
seguimiento ni analítica de terceros»; se ha ampliado esa frase para explicar
que sí se lleva un recuento propio y anónimo de visitas.

---

## Un matiz sobre los datos

Las apps del grupo funcionan también sin conexión, así que el aviso solo sale
cuando el usuario abre la app **con datos o wifi**. El recuento de instalaciones
y países es muy fiable; los "activos por día" cuentan los días en que cada
dispositivo abrió la app con conexión.
