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

Todas las apps pasan por `/api/ping` (aunque no estén alojadas en Vercel)
porque es quien añade el país a partir de la conexión.

---

## Un matiz sobre los datos

Las apps del grupo funcionan también sin conexión, así que el aviso solo sale
cuando el usuario abre la app **con datos o wifi**. El recuento de instalaciones
y países es muy fiable; los "activos por día" cuentan los días en que cada
dispositivo abrió la app con conexión.
