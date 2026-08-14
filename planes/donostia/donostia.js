// ============================================================
// Donostia y costa guipuzcoana en 5 días · datos e interacción
// Puerto a plano de app/page.tsx (Next.js) entregado por Óscar.
// Misma información, sin framework.
// ============================================================
(function(){
  var PACE_LABEL = { slow:"Poco y bien", balanced:"Quiero verlo bien", full:"Aupa, no me importa andar" };
  var PACE_SMALL = { slow:"3–4 km/día", balanced:"6–8 km/día · recomendado", full:"10–12 km/día" };
  var PACE_KEYS = ["slow","balanced","full"];

  var DAYS = [
    { tag:"DÍA 01 · DONOSTIA", title:"La bahía perfecta", km:["4 km","7 km","11 km"],
      stops:[["La Concha","Ayuntamiento","Parte Vieja","Pintxos"],["Buen Pastor","La Concha","Puerto","Parte Vieja","Monte Urgull","Pintxos"],["Gros","Kursaal","Paseo Nuevo","Urgull","Puerto","La Concha","Parte Vieja"]],
      note:"Primero entiende la bahía. Después entra en la Parte Vieja con hambre, pero sin intentar comer en diez barras.", eat:"Ruta corta de 3–4 pintxos" },
    { tag:"DÍA 02 · ANTIGUO", title:"Donde termina la ciudad", km:["4 km","7 km","12 km"],
      stops:[["Miramar","Ondarreta","Peine del Viento","Funicular de Igueldo"],["La Concha","Miramar","Calle Matía","Ondarreta","Peine del Viento","Monte Igueldo"],["Punta de Monpas","Zurriola","La Concha","Miramar","Ondarreta","Peine del Viento","Igueldo"]],
      note:"La ruta litoral completa desde Monpas hasta el Peine ronda 6 km sin desnivel. Igueldo regala la vista que explica toda Donostia.", eat:"Antiguo · regreso a Gros" },
    { tag:"DÍA 03 · ZARAUTZ → GETARIA", title:"Caminar hasta el mejor final", km:["3 km","7 km","12 km"],
      stops:[["Zarautz","Bus a Getaria","Puerto de Getaria","Casco medieval","Pescado a la parrilla"],["Playa de Zarautz","Paseo costero 4,5 km","Getaria","San Salvador","Puerto","Parrilla y txakoli"],["Zarautz","Paseo costero","Getaria","Ruta de Elkano","Monte San Antón","Puerto","Parrilla","Regreso entre viñedos opcional"]],
      note:"Getaria no es una escala. Es puerto, parrillas encendidas en la calle, Elkano, txakoli y uno de los mejores pueblos del norte.", eat:"Pescado entero a la parrilla en Getaria" },
    { tag:"DÍA 04 · HONDARRIBIA", title:"Muralla, pescadores y baño", km:["4 km","7 km","10 km"],
      stops:[["Casco amurallado","Arma Plaza","La Marina","Pintxos"],["Puerta Santa María","Casco amurallado","Arma Plaza","La Marina","Playa en verano","Pintxos"],["Guadalupe opcional","Murallas","Casco histórico","La Marina","Puerto","Playa","Pintxos"]],
      note:"La playa no es un premio menor. En verano el agua puede resultar bastante más agradable de lo que esperas del Cantábrico.", eat:"Pintxos en La Marina" },
    { tag:"DÍA 05 · DONOSTIA LOCAL", title:"Volver sin repetir", km:["3 km","7 km","11 km"],
      stops:[["Gros","Zurriola","Mercado","Últimos pintxos"],["Gros","Zurriola","Cristina Enea","Centro","Última cena"],["Monte Ulía","Gros","Zurriola","Urumea","Cristina Enea","Centro"]],
      note:"El último día pertenece a Gros, al Urumea y a lo que dejaste pendiente. La Parte Vieja no necesita absorber todo el viaje.", eat:"Gros · mercado · cena reservada" }
  ];

  // Día 3 (índice 2) sin caminar: se llega en bus, Getaria conserva casco, puerto, parrilla y txakoli.
  var GETARIA_BUS_STOPS = ["Playa de Zarautz","Bus a Getaria","Casco medieval","Puerto","Parrilla y txakoli"];

  var STAYS = [
    { who:"2 PERSONAS", name:"Centro romántico", zone:"EQUILIBRIO", text:"La Concha, Parte Vieja, bus y tren cerca. Pensión Garibai es una referencia oficial bien situada.", url:"https://sansebastianturismoa.eus/dormir/pensiones/" },
    { who:"3–4 PERSONAS", name:"Gros", zone:"NUESTRA ELECCIÓN", text:"Zurriola, pintxos y ambiente joven. Pensión Aia aparece en el listado oficial y queda bien comunicada.", url:"https://sansebastianturismoa.eus/dormir/pensiones/" },
    { who:"5–6 PERSONAS", name:"Antiguo", zone:"FAMILIAS", text:"Ondarreta, Matía y más calma. Busca apartamento con transporte próximo y cocina real.", url:"https://www.booking.com/searchresults.es.html?ss=apartamentos+Antiguo+San+Sebastian" },
    { who:"GRUPO", name:"Gros · varias unidades", zone:"MISMA GESTIÓN", text:"Donostia es cara: reserva pronto y compara varias unidades próximas antes que una casa alejada.", url:"https://www.booking.com/searchresults.es.html?ss=apartamentos+Gros+San+Sebastian" }
  ];

  var FOOD = [
    { tag:"GETARIA · GRAN MOMENTO", name:"Elkano", price:"Alto", text:"Una referencia mundial para entender el pescado a la parrilla. Reserva con mucha antelación.", phone:"943 140 024", url:"https://www.restauranteelkano.com/", q:"Restaurante Elkano Getaria" },
    { tag:"GETARIA · ALTERNATIVA", name:"Astillero", price:"Medio", text:"Puerto, pescado y marisco. Alternativa con sentido si Elkano no encaja en presupuesto.", phone:"943 140 412", q:"Astillero Getaria" },
    { tag:"GETARIA · ALTERNATIVA", name:"Iribar", price:"Medio", text:"Cocina marinera dentro del casco. Confirma pescado y precio antes de pedir.", phone:"943 140 406", url:"https://www.iribargetaria.com", q:"Iribar Getaria" },
    { tag:"HONDARRIBIA", name:"Gran Sol", price:"15–35 €", text:"Pintxos en la calle San Pedro. No conviertas la Marina en una única barra.", q:"Gran Sol Hondarribia" },
    { tag:"DONOSTIA", name:"Parte Vieja", price:"20–45 €", text:"Tres o cuatro barras, un pintxo bueno en cada una y movimiento. Sentarse toda la noche mata la experiencia.", q:"pintxos Parte Vieja Donostia" },
    { tag:"GROS", name:"Ruta de Gros", price:"20–40 €", text:"Más respirable y contemporánea. Ideal para la última noche y para salir de la Parte Vieja.", q:"pintxos Gros Donostia" }
  ];

  var PREP = ["Alojamiento reservado pronto","Transporte a Getaria decidido","Paseo Zarautz–Getaria decidido","Parrilla de Getaria reservada","Hondarribia y playa colocadas","Funicular de Igueldo comprobado","Chubasquero ligero","Calzado y bañador"];

  var SUMMER_TEXT = "Activamos baño en Zarautz y Hondarribia. La playa de Hondarribia puede sorprender: con buen tiempo, el agua puede resultar menos fría de lo que dicta el tópico del Cantábrico. No es una promesa de temperatura, es una posibilidad real.";
  var OFFSEASON_TEXT = "La playa sigue en el paisaje, pero el viaje se apoya en paseos, pueblos, parrillas y mar bravo. Lleva una capa ligera impermeable.";

  var CAR_TEXT = "Útil para excursiones en familia y horarios propios. Dentro de Donostia déjalo aparcado: no lo necesitas y solo te complica el día.";
  var TRANSIT_TEXT = "Donostia, Zarautz, Getaria y Hondarribia tienen buena conexión. Te ahorras el aparcamiento y puedes beber txakoli sin preocuparte de la vuelta.";

  var pace = "balanced";
  var day = 0;
  var trav = 1;
  var summer = true;
  var walk = true;
  var car = false;
  var checked = [];

  function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  function mapUrl(q){ return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q); }
  function paceIndex(){ return pace === "slow" ? 0 : (pace === "balanced" ? 1 : 2); }

  function renderPaceTabs(){
    document.getElementById("paceTabs").innerHTML = PACE_KEYS.map(function(p, i){
      return '<button type="button" class="'+(pace===p?"active":"")+'" data-pace="'+p+'">'
        + '<span>0'+(i+1)+'</span>'+esc(PACE_LABEL[p])
        + '<small>'+esc(PACE_SMALL[p])+'</small>'
        + '</button>';
    }).join("");
  }

  function renderTravTabs(){
    document.getElementById("travTabs").innerHTML = STAYS.map(function(s, i){
      return '<button type="button" class="'+(trav===i?"active":"")+'" data-trav="'+i+'">'+esc(s.who)+'</button>';
    }).join("");
  }
  function renderStayDetail(){
    var s = STAYS[trav];
    document.getElementById("stayDetail").innerHTML =
      '<span>'+esc(s.zone)+'</span><h3>'+esc(s.name)+'</h3><p>'+esc(s.text)+'</p>'
      + '<a href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer">Consultar alojamiento ↗</a>';
  }

  function renderMoveCard(){
    document.getElementById("moveCard").innerHTML =
      '<b>01</b><h3>'+(car?"Voy con coche":"Transporte público")+'</h3>'
      + '<p>'+(car?CAR_TEXT:TRANSIT_TEXT)+'</p>'
      + '<button type="button" class="routeChoice" data-car-toggle="1">Cambiar opción</button>';
  }

  function renderSeason(){
    document.getElementById("seasonText").textContent = summer ? SUMMER_TEXT : OFFSEASON_TEXT;
    document.getElementById("seasonSwitch").innerHTML =
      '<button type="button" class="'+(summer?"active":"")+'" data-summer="1">Viajo en verano</button>'
      + '<button type="button" class="'+(!summer?"active":"")+'" data-summer="0">Fuera de verano</button>';
  }

  function renderDayTabs(){
    document.getElementById("dayTabs").innerHTML = DAYS.map(function(_, i){
      return '<button type="button" class="'+(day===i?"active":"")+'" data-day="'+i+'">DÍA '+String(i+1).padStart(2,"0")+'</button>';
    }).join("");
  }
  function renderDayDetail(){
    var d = DAYS[day];
    var pi = paceIndex();
    var stops = d.stops[pi];
    if (day === 2 && !walk) stops = GETARIA_BUS_STOPS;
    if (day === 3 && !summer) stops = stops.filter(function(s){ return s !== "Playa" && s.indexOf("Playa en") === -1; });
    var extra = "";
    if (day === 2){
      extra = '<button type="button" class="routeChoice" data-walk-toggle="1">'+(walk?"Prefiero llegar en bus":"Quiero caminar 4,5 km")+'</button>';
    }
    var stopsHtml = stops.map(function(s, i){
      return '<li><span>'+String(i+1).padStart(2,"0")+'</span><strong>'+esc(s)+'</strong>'
        + '<a href="'+esc(mapUrl(s+" Gipuzkoa"))+'" target="_blank" rel="noopener noreferrer">MAPA ↗</a></li>';
    }).join("");
    document.getElementById("dayDetail").innerHTML =
      '<div><span>'+esc(d.tag)+'</span><h3>'+esc(d.title)+'</h3><b>'+esc(d.km[pi])+' APROX.</b><p>'+esc(d.note)+'</p><em>COMER · '+esc(d.eat)+'</em>'+extra+'</div>'
      + '<ol>'+stopsHtml+'</ol>';
  }

  function renderFoodGrid(){
    document.getElementById("foodGrid").innerHTML = FOOD.map(function(f){
      var tel = f.phone ? '<a href="tel:+34'+f.phone.replace(/\s/g,"")+'">TEL. '+esc(f.phone)+'</a>' : "";
      var web = f.url ? '<a href="'+esc(f.url)+'" target="_blank" rel="noopener noreferrer">WEB ↗</a>' : "";
      return '<article><span>'+esc(f.tag)+'</span><h3>'+esc(f.name)+'</h3><b>'+esc(f.price)+'</b><p>'+esc(f.text)+'</p>'
        + tel
        + '<div>'+web+'<a href="'+esc(mapUrl(f.q))+'" target="_blank" rel="noopener noreferrer">MAPS ↗</a></div></article>';
    }).join("");
  }

  function saveChecked(){ try { localStorage.setItem("donostia-prep", JSON.stringify(checked)); } catch(e){} }
  function loadChecked(){
    try { var saved = localStorage.getItem("donostia-prep"); if (saved) checked = JSON.parse(saved) || []; } catch(e){}
  }
  function renderChecklist(){
    document.getElementById("checklistWrap").innerHTML = PREP.map(function(item, i){
      var on = checked.indexOf(i) !== -1;
      return '<li><label><input type="checkbox" data-idx="'+i+'" '+(on?"checked":"")+'><span>'+esc(item)+'</span></label></li>';
    }).join("");
    var pct = Math.round((checked.length / PREP.length) * 100);
    document.getElementById("progressPct").textContent = pct;
    document.getElementById("progressBar").style.width = pct + "%";
  }
  function toggleTask(i){
    var pos = checked.indexOf(i);
    if (pos === -1) checked.push(i); else checked.splice(pos, 1);
    saveChecked(); renderChecklist();
  }

  document.addEventListener("click", function(e){
    var paceBtn = e.target.closest("[data-pace]");
    if (paceBtn){ pace = paceBtn.getAttribute("data-pace"); renderPaceTabs(); renderDayDetail(); return; }
    var travBtn = e.target.closest("[data-trav]");
    if (travBtn){ trav = parseInt(travBtn.getAttribute("data-trav"),10); renderTravTabs(); renderStayDetail(); return; }
    var carBtn = e.target.closest("[data-car-toggle]");
    if (carBtn){ car = !car; renderMoveCard(); return; }
    var summerBtn = e.target.closest("[data-summer]");
    if (summerBtn){ summer = summerBtn.getAttribute("data-summer") === "1"; renderSeason(); renderDayDetail(); return; }
    var dayBtn = e.target.closest("[data-day]");
    if (dayBtn){ day = parseInt(dayBtn.getAttribute("data-day"),10); renderDayTabs(); renderDayDetail(); return; }
    var walkBtn = e.target.closest("[data-walk-toggle]");
    if (walkBtn){ walk = !walk; renderDayDetail(); return; }
  });
  document.addEventListener("change", function(e){
    if (e.target.matches('#checklistWrap input[type="checkbox"]')){ toggleTask(parseInt(e.target.getAttribute("data-idx"),10)); }
  });

  loadChecked();
  renderPaceTabs();
  renderTravTabs();
  renderStayDetail();
  renderMoveCard();
  renderSeason();
  renderDayTabs();
  renderDayDetail();
  renderFoodGrid();
  renderChecklist();
})();
