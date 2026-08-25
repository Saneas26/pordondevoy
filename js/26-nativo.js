// POR DÓNDE VOY · js/26-nativo.js · Ajustes SOLO para la app nativa (Capacitor / Android).
// En la web (pordondevoy-saneas.vercel.app) no hace nada: sale en la primera línea.
(function(){
  const C = window.Capacitor;
  if (!(C && C.isNativePlatform && C.isNativePlatform())) return;

  // 1) Todo enlace externo (grupo Saneas, WhatsApp, y cualquier target="_blank" u origen
  //    distinto del de la app) se abre FUERA de la app. En la WebView de Capacitor, asignar
  //    location.href a un host distinto del de la app dispara un Intent ACTION_VIEW
  //    (navegador / app del sistema) y la WebView no navega fuera de sí misma.
  //    window.open(url,'_blank') no es fiable en la WebView, así que se redirige igual.
  const _open = window.open;
  window.open = function(url, target, feats){
    if (url && /^(https?:|mailto:|tel:|whatsapp:)/i.test(String(url))) { location.href = String(url); return null; }
    return _open.apply(window, arguments);
  };
  document.addEventListener('click', function(ev){
    const a = ev.target && ev.target.closest ? ev.target.closest('a[href]') : null;
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (!/^(https?:|mailto:|tel:|whatsapp:)/i.test(href)) return;
    let externo = true;
    try { externo = a.target === '_blank' || new URL(href, location.href).origin !== location.origin; } catch(e){}
    if (externo) { ev.preventDefault(); location.href = href; }
  }, true);

  // 2) Botón "atrás" de Android: el sitio es multipágina (vuelo, guías, herramientas) y usa
  //    el historial normal del navegador, así que se aplica el patrón estándar de Capacitor:
  //    si la WebView puede retroceder, retrocede; si no (ya en la primera página), minimiza
  //    la app en vez de matarla.
  try {
    const App = (C.registerPlugin && C.registerPlugin('App')) || (C.Plugins && C.Plugins.App);
    if (App && App.addListener) {
      App.addListener('backButton', function(ev){
        if (ev && ev.canGoBack) { window.history.back(); }
        else if (App.minimizeApp) { App.minimizeApp(); }
      });
    }
  } catch(e){ console.warn('nativo: backButton', e); }
})();
