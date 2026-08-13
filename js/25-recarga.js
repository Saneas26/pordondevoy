// Por dónde voy · js/25-recarga.js · Recarga automática cuando hay versión nueva
// Cada vez que se despliega, el Service Worker instala la versión nueva y toma
// el control (controllerchange). Si el usuario está mirando la pantalla en
// ese momento no le movemos nada; esperamos a que la app quede en segundo
// plano (cambia de app, bloquea el móvil) para recargar sin que lo note.
(function(){
  if (!('serviceWorker' in navigator)) return;
  var CHECK_MIN = 15;
  var pendiente = false;

  function recargarSiOculta(){
    if (pendiente && document.hidden) location.reload();
  }

  navigator.serviceWorker.addEventListener('controllerchange', function(){
    pendiente = true;
    recargarSiOculta();
  });

  document.addEventListener('visibilitychange', function(){
    recargarSiOculta();
    if (!document.hidden){
      navigator.serviceWorker.getRegistration().then(function(reg){ reg && reg.update().catch(function(){}); });
    }
  });

  navigator.serviceWorker.getRegistration().then(function(reg){
    if (!reg) return;
    setInterval(function(){ reg.update().catch(function(){}); }, CHECK_MIN*60*1000);
  });
})();
