// ============================================================
// Tenerife en 7 días · datos e interacción
// Puerto a plano de app/page.tsx (React) entregado por Óscar.
// Misma información, sin framework.
// ============================================================
(function(){
  var DAYS = [
    { id:"sur", short:"SUR", number:"01", title:"El aterrizaje", sub:"Costa Adeje · La Caleta", route:"Aeropuerto → alojamiento → playa → La Caleta",
      stops:[
        {time:"12:00", title:"Llegada y coche", text:"Recoge el coche, compra agua y deja las maletas. Hoy no se cruza la isla."},
        {time:"15:30", title:"Playa del Duque", text:"Primer baño cómodo y paseo sin exigencias.", map:"https://maps.google.com/?q=Playa+del+Duque+Tenerife"},
        {time:"18:30", title:"La Caleta", text:"Paseo, atardecer y pescado junto al mar.", map:"https://maps.google.com/?q=La+Caleta+Adeje"},
        {time:"21:30", title:"Primera copa", text:"Solo si apetece. Mañana el Teide exige salir temprano.", long:true}
      ]},
    { id:"teide", short:"TEIDE", number:"02", title:"Por encima de las nubes", sub:"Cañadas · lava · Vilaflor", route:"Sur → Vilaflor → Cañadas → Chío → costa",
      stops:[
        {time:"08:00", title:"Subida por Vilaflor", text:"Una carretera, varios pisos de vegetación y un cambio completo de escala.", map:"https://maps.google.com/?q=Vilaflor+Tenerife"},
        {time:"09:30", title:"Teleférico o senderos", text:"El teleférico depende del viento. El acceso al pico necesita permiso propio.", map:"https://maps.google.com/?q=Teleferico+del+Teide"},
        {time:"12:00", title:"Roques de García", text:"La caminata esencial aunque no subas en teleférico.", map:"https://maps.google.com/?q=Roques+de+Garcia"},
        {time:"14:00", title:"Minas de San José", text:"Paisaje casi mineral. Añádelo solo si haces el plan largo.", map:"https://maps.google.com/?q=Minas+de+San+Jose+Teide", long:true},
        {time:"20:00", title:"Estrellas", text:"Excursión autorizada si quieres dedicar el día completo al cielo.", long:true}
      ]},
    { id:"anaga", short:"ANAGA", number:"03", title:"La isla más antigua", sub:"La Laguna · laurisilva · Benijo", route:"La Laguna → Cruz del Carmen → Taganana → Benijo",
      stops:[
        {time:"08:30", title:"La Laguna", text:"Desayuno y casco histórico antes de que llegue el movimiento.", map:"https://maps.google.com/?q=San+Cristobal+de+La+Laguna"},
        {time:"11:00", title:"Cruz del Carmen", text:"Entra en la laurisilva. Comprueba antes si el sendero elegido exige reserva.", map:"https://maps.google.com/?q=Cruz+del+Carmen"},
        {time:"13:30", title:"Taganana", text:"Pueblo, curvas y almuerzo de pescado. Aquí la carretera forma parte del día.", map:"https://maps.google.com/?q=Taganana"},
        {time:"17:00", title:"Almáciga y Benijo", text:"Costa salvaje. Regresa con luz: no necesitas demostrar nada conduciendo de noche.", map:"https://maps.google.com/?q=Playa+de+Benijo", long:true}
      ]},
    { id:"norte", short:"NORTE", number:"04", title:"La elegancia del norte", sub:"La Orotava · Puerto · Icod", route:"La Orotava → Puerto de la Cruz → Icod",
      stops:[
        {time:"09:00", title:"La Orotava", text:"No la reduzcas a la Casa de los Balcones. Camina el casco y mira hacia el valle.", map:"https://maps.google.com/?q=La+Orotava"},
        {time:"12:30", title:"Puerto de la Cruz", text:"Paseo, almuerzo y baño si el mar lo permite.", map:"https://maps.google.com/?q=Puerto+de+la+Cruz"},
        {time:"16:00", title:"Lago Martiánez", text:"Una intervención de Manrique que todavía funciona como lugar de ocio.", map:"https://maps.google.com/?q=Lago+Martianez", long:true},
        {time:"18:00", title:"Icod de los Vinos", text:"Drago, casco histórico y cena en las medianías.", map:"https://maps.google.com/?q=Icod+de+los+Vinos", long:true}
      ]},
    { id:"teno", short:"TENO", number:"05", title:"La carretera imposible", sub:"Garachico · Teno · Masca", route:"Garachico → Buenavista → Teno → Masca",
      stops:[
        {time:"09:00", title:"Garachico", text:"Pueblo reconstruido frente a la lava y baño en El Caletón si el mar está tranquilo.", map:"https://maps.google.com/?q=Garachico"},
        {time:"12:30", title:"Buenavista", text:"Almuerzo y pausa antes de entrar en las carreteras de montaña.", map:"https://maps.google.com/?q=Buenavista+del+Norte"},
        {time:"15:00", title:"Punta de Teno", text:"Comprueba el sistema de acceso del día. No siempre se entra en coche particular.", map:"https://maps.google.com/?q=Punta+de+Teno", long:true},
        {time:"17:30", title:"Masca", text:"Visita el caserío y Cherfe. El barranco es otra actividad y requiere planificación.", map:"https://maps.google.com/?q=Masca+Tenerife"}
      ]},
    { id:"mar", short:"MAR", number:"06", title:"Los Gigantes desde abajo", sub:"Cetáceos · acantilados · Alcalá", route:"Los Gigantes → Puerto Santiago → Alcalá",
      stops:[
        {time:"09:30", title:"Barco autorizado", text:"Escoge una embarcación pequeña y una salida de dos o tres horas.", map:"https://maps.google.com/?q=Puerto+de+Los+Gigantes"},
        {time:"13:00", title:"Puerto de Santiago", text:"Almuerzo y descanso después del mar.", map:"https://maps.google.com/?q=Puerto+de+Santiago+Tenerife"},
        {time:"16:30", title:"Playa de la Arena", text:"Arena negra, baño y tarde sin programa.", map:"https://maps.google.com/?q=Playa+de+la+Arena+Tenerife"},
        {time:"19:30", title:"Alcalá", text:"Paseo, charcos y atardecer en la costa oeste.", map:"https://maps.google.com/?q=Alcala+Tenerife", long:true}
      ]},
    { id:"flex", short:"FLEX", number:"07", title:"El día que salva el viaje", sub:"Capital · playa · pendiente", route:"El tiempo decide; tú no improvisas",
      stops:[
        {time:"09:30", title:"Santa Cruz", text:"Mercado de África, centro y Auditorio.", map:"https://maps.google.com/?q=Mercado+Nuestra+Senora+de+Africa"},
        {time:"13:30", title:"Las Teresitas", text:"Playa fácil y almuerzo de pescado en San Andrés.", map:"https://maps.google.com/?q=Playa+de+Las+Teresitas"},
        {time:"ALTERNATIVA", title:"El Médano y La Tejita", text:"Si buscas sur, viento, playa y un ambiente menos construido.", map:"https://maps.google.com/?q=El+Medano+Tenerife", long:true},
        {time:"PLAN B", title:"Recupera lo cancelado", text:"Teide, barco o Anaga. Este día existe para que el viaje no dependa de la suerte."}
      ]}
  ];

  var CHECKLIST = ["Confirmar aeropuerto correcto","Reservar CICAR","Elegir una o dos bases","Permisos y teleférico del Teide","Revisar Tenerife ON para senderos","Reservar barco de cetáceos autorizado","Sudadera y cortavientos en el coche","Comprobar cada microclima por separado"];

  var active = "sur";
  var pace = "short";
  var checked = CHECKLIST.map(function(){ return false; });

  function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  function dayById(id){ for (var i=0;i<DAYS.length;i++) if (DAYS[i].id===id) return DAYS[i]; return DAYS[0]; }

  function renderTabs(){
    document.getElementById("tabsWrap").innerHTML = DAYS.map(function(d){
      return '<button type="button" role="tab" aria-selected="'+(d.id===active)+'" data-day="'+d.id+'"><span>'+esc(d.short)+'</span><b>'+esc(d.number)+'</b></button>';
    }).join("");
  }
  function updateTabsSelected(){
    document.querySelectorAll('#tabsWrap [data-day]').forEach(function(b){
      b.setAttribute("aria-selected", String(b.getAttribute("data-day")===active));
    });
  }
  function updatePaceSelected(){
    document.querySelectorAll('#paceTabs [data-pace]').forEach(function(b){
      b.setAttribute("aria-pressed", String(b.getAttribute("data-pace")===pace));
    });
  }

  function renderDayPanel(){
    var d = dayById(active);
    var stops = pace === "long" ? d.stops : d.stops.filter(function(s){ return !s.long; });
    var stopsHtml = stops.map(function(s, i){
      var right = s.map
        ? '<a href="'+esc(s.map)+'" target="_blank" rel="noreferrer" aria-label="Abrir '+esc(s.title)+'">↗</a>'
        : '<i></i>';
      return '<div class="stop">'
        + '<span>'+String(i+1).padStart(2,"0")+'</span>'
        + '<time>'+esc(s.time)+'</time>'
        + '<div><h4>'+esc(s.title)+'</h4><p>'+esc(s.text)+'</p></div>'
        + right
        + '</div>';
    }).join("");
    document.getElementById("dayPanel").innerHTML =
      '<div class="day-intro">'
      + '<span>'+esc(d.number)+'</span><small>'+esc(d.sub)+'</small><h3>'+esc(d.title)+'</h3>'
      + '<p>'+esc(d.route)+'</p>'
      + '<b>'+(pace==="short" ? "Conocer y volver con tiempo." : "Desde primera hora hasta el final.")+'</b>'
      + '</div>'
      + '<div class="timeline">'+stopsHtml+'</div>';
  }

  function saveChecked(){ try { localStorage.setItem("tenerife-checks", JSON.stringify(checked)); } catch(e){} }
  function loadChecked(){
    try {
      var saved = localStorage.getItem("tenerife-checks");
      if (saved){ var parsed = JSON.parse(saved); if (Array.isArray(parsed) && parsed.length === CHECKLIST.length) checked = parsed; }
    } catch(e){}
  }
  function renderChecklist(){
    document.getElementById("checklistWrap").innerHTML = CHECKLIST.map(function(t, i){
      return '<label class="'+(checked[i]?"done":"")+'" data-idx="'+i+'">'
        + '<input type="checkbox" '+(checked[i]?"checked":"")+'>'
        + '<span>'+(checked[i]?"✓":"")+'</span>'
        + '<b>'+String(i+1).padStart(2,"0")+'</b><p>'+esc(t)+'</p>'
        + '</label>';
    }).join("");
    var done = checked.filter(Boolean).length;
    var pct = Math.round((done / CHECKLIST.length) * 100);
    var ring = document.getElementById("progressRing");
    ring.style.setProperty("--p", (pct*3.6)+"deg");
    ring.querySelector("span").innerHTML = pct + "%<small>preparado</small>";
  }
  function toggleTask(i){ checked[i] = !checked[i]; saveChecked(); renderChecklist(); }

  function updateScrollProgress(){
    var available = document.documentElement.scrollHeight - window.innerHeight;
    var pct = available > 0 ? (window.scrollY / available) * 100 : 0;
    document.getElementById("progressBar").style.width = pct + "%";
  }

  document.addEventListener("click", function(e){
    var dayBtn = e.target.closest("[data-day]");
    if (dayBtn){ active = dayBtn.getAttribute("data-day"); renderDayPanel(); updateTabsSelected(); return; }
    var paceBtn = e.target.closest("[data-pace]");
    if (paceBtn){ pace = paceBtn.getAttribute("data-pace"); renderDayPanel(); updatePaceSelected(); return; }
    var label = e.target.closest("#checklistWrap label");
    if (label){ e.preventDefault(); toggleTask(parseInt(label.getAttribute("data-idx"),10)); return; }
  });

  window.addEventListener("scroll", updateScrollProgress, {passive:true});

  loadChecked();
  renderTabs();
  renderDayPanel();
  renderChecklist();
  updateScrollProgress();
})();
