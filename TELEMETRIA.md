# Telemetría del Grupo Saneas

Recuento anónimo, para todas las apps del grupo, de:

- **Cuánta gente tiene cada app instalada** (acceso directo creado) y cuánta entra por navegador.
- **Cuántos dispositivos están activos cada día** (abren la app ese día).
- **De qué país** es cada dispositivo.
- Cuántos iPhone y cuántos Android.

No se guarda ningún dato personal: solo un identificador aleatorio que vive en
cada móvil, la plataforma y el país (que deduce Vercel de la conexión, sin
guardar la IP).

Todas las apps mandan su aviso al mismo sitio:
`https://pordondevoy-saneas.vercel.app/api/ping`

---

## Puesta en marcha (una sola vez)

### 1. Crear las tablas en Supabase

En el proyecto de Supabase del grupo (el mismo de app.saneas.es), abre
**SQL Editor** y ejecuta el contenido de [`supabase/telemetria.sql`](supabase/telemetria.sql).

### 2. Variables de entorno en Vercel

En el proyecto **pordondevoy** de Vercel → *Settings → Environment Variables*,
añade estas tres y redespliega:

| Variable | Valor |
|---|---|
| `SUPABASE_URL` | `https://uisrxztowgdpkxeuznfh.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | La clave **service_role** (Supabase → Settings → API keys). ⚠️ Nunca la pongas en el código de una app. |
| `STATS_KEY` | Una clave larga que inventes tú, para consultar el resumen. |

### 3. Consultar el recuento

Abre en el navegador (o desde el panel):

```
https://pordondevoy-saneas.vercel.app/api/stats?clave=TU_STATS_KEY
```

Devuelve por cada app: dispositivos totales, instaladas vs navegador,
iPhone/Android, activos de hoy, activos por día (últimos 30 días) y países.
También puedes ver las tablas directamente en Supabase → Table Editor.

---

## Conectar las demás apps del grupo

Por Dónde Voy ya lo lleva incorporado. Para **saneas (app.saneas.es), activala,
laora y acumula**, pega este fragmento en el arranque de cada una cambiando
solo `APP_SLUG` (valores válidos: `saneas`, `activala`, `laora`, `acumula`):

```js
/* Telemetría anónima del Grupo Saneas — un aviso al día por dispositivo */
(function(){
  var APP_SLUG = "saneas";                                  // ← cambiar por la app
  var URL_PING = "https://pordondevoy-saneas.vercel.app/api/ping";
  var instalada = (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches)
    || navigator.standalone === true;
  var id = localStorage.getItem("gs-dispositivo");
  if (!id){
    id = (crypto.randomUUID && crypto.randomUUID()) ||
      "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c){
        var r = Math.random()*16|0; return (c === "x" ? r : (r&3|8)).toString(16);
      });
    localStorage.setItem("gs-dispositivo", id);
  }
  var marca = new Date().toISOString().slice(0,10) + (instalada ? "·i" : "·n");
  if (localStorage.getItem("gs-ping") === marca) return;
  fetch(URL_PING, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      app: APP_SLUG,
      dispositivo: id,
      plataforma: /iphone|ipad|ipod/i.test(navigator.userAgent) ? "iPhone"
        : /android/i.test(navigator.userAgent) ? "Android" : "Otro",
      instalada: instalada
    })
  }).then(function(r){ if (r.ok) localStorage.setItem("gs-ping", marca); }).catch(function(){});
})();
```

---

## Un matiz sobre los datos

Las apps del grupo funcionan también sin conexión, así que el aviso solo sale
cuando el usuario abre la app **con datos o wifi**. El recuento de instalaciones
y países es muy fiable; los "activos por día" cuentan los días en que cada
dispositivo abrió la app con conexión.
