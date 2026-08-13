// ============================================================
// Bilbao en 4 días · datos e interacción
// Puerto a plano de app/page.tsx (React) entregado por Óscar.
// Misma información, sin framework.
// ============================================================
(function(){
  var PACE_LABEL = { short:"Caminar poco", balanced:"Quiero verlo bien", full:"No me importa caminar mucho" };
  var PACE_SMALL = { short:"3–4 km/día", balanced:"6–8 km/día · recomendado", full:"10–14 km/día" };

  var ITINERARIES = {
    short: [
      { title:"La ría te lleva al origen", kicker:"DÍA 01 · BILBAO", km:"4 km", note:"Empieza en el Guggenheim y deja que el agua te lleve hasta las Siete Calles.",
        stops:["Guggenheim por fuera","Zubizuri y Ayuntamiento","Arenal","Casco Viejo","Plaza Nueva"] },
      { title:"La ciudad y su Catedral", kicker:"DÍA 02 · BILBAO", km:"3,5 km", note:"Un día compacto con tranvía entre los puntos más alejados.",
        stops:["Gran Vía","Azkuna Zentroa","Doña Casilda","San Mamés exterior","Indautxu"] },
      { title:"La costa imprescindible", kicker:"DÍA 03 · BIZKAIA", km:"3 km", note:"La imagen de Gaztelugatxe sin obligarte a completar toda la subida.",
        stops:["Mirador de Gaztelugatxe","Bakio","Bermeo y puerto viejo"] },
      { title:"Al otro lado de la ría", kicker:"DÍA 04 · GETXO", km:"3 km", note:"Cruza la ría en la barquilla y conoce las dos orillas sin una jornada larga.",
        stops:["Areeta","Puente de Bizkaia","Portugalete","Regreso en metro"] }
    ],
    balanced: [
      { title:"Sigue la ría", kicker:"DÍA 01 · BILBAO", km:"7 km", note:"La ruta que explica Bilbao: acero, arquitectura y siete calles unidas por el agua.",
        stops:["San Mamés","Euskalduna","Guggenheim","Zubizuri","Arenal","Casco Viejo","Mercado de la Ribera"] },
      { title:"Arte, ciudad y fútbol", kicker:"DÍA 02 · BILBAO", km:"6 km", note:"Reserva el museo por la mañana y San Mamés por la tarde.",
        stops:["Guggenheim interior","Doña Casilda","Gran Vía","Azkuna Zentroa","Tour San Mamés"] },
      { title:"Sube. Mira. Entiende la costa", kicker:"DÍA 03 · BIZKAIA", km:"6 km", note:"Nuestro día imprescindible. La fotografía es famosa; el camino es la experiencia.",
        stops:["Bakio","Gaztelugatxe completo","Comida en Bermeo","Puerto y casco antiguo"] },
      { title:"La ría termina en el mar", kicker:"DÍA 04 · GETXO", km:"7 km", note:"Metro hasta Areeta y regreso desde Algorta. No necesitas coche.",
        stops:["Puente de Bizkaia","Las Arenas","Grandes Villas","Puerto Viejo de Algorta"] }
    ],
    full: [
      { title:"Bilbao de punta a punta", kicker:"DÍA 01 · BILBAO", km:"11 km", note:"Completa la ría y termina viendo desde arriba todo lo que has caminado.",
        stops:["San Mamés","Abandoibarra","Guggenheim","Casco Viejo","Mercado de la Ribera","Artxanda al atardecer"] },
      { title:"Dentro de sus iconos", kicker:"DÍA 02 · BILBAO", km:"9 km", note:"Museo, estadio y dos barrios gastronómicos en una jornada intensa.",
        stops:["Guggenheim completo","Ensanche","Azkuna Zentroa","Tour San Mamés","Pintxos en Indautxu"] },
      { title:"De Bakio a la roca", kicker:"DÍA 03 · BIZKAIA", km:"12+ km", note:"Para quien ha venido a caminar y quiere ganarse cada vista.",
        stops:["Senda costera desde Bakio","Gaztelugatxe completo","Bermeo","Extensión a Urdaibai"] },
      { title:"Dos orillas, un mismo carácter", kicker:"DÍA 04 · GETXO", km:"12 km", note:"La jornada costera completa hasta que la ciudad desaparece.",
        stops:["Portugalete","Pasarela del Puente","Las Arenas","Puerto Viejo","Paseo de acantilados"] }
    ]
  };

  var PREP = ["Alojamiento céntrico reservado","Entrada gratuita de Gaztelugatxe","Guggenheim si vas a entrar","Tour de San Mamés","Restaurante de la jornada costera","Chubasquero y calzado con agarre"];

  var pace = "balanced";
  var activeDay = 0;
  var checked = [];

  function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  function mapUrl(q){ return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q); }

  function renderPaceTabs(){
    var keys = ["short","balanced","full"];
    document.getElementById("paceTabs").innerHTML = keys.map(function(p, i){
      return '<button type="button" role="tab" aria-selected="'+(pace===p)+'" class="'+(pace===p?"active":"")+'" data-pace="'+p+'">'
        + '<span>0'+(i+1)+'</span>'+esc(PACE_LABEL[p])
        + '<small>'+esc(PACE_SMALL[p])+'</small>'
        + '</button>';
    }).join("");
    document.getElementById("paceSummary").innerHTML = 'Has elegido <strong>'+esc(PACE_LABEL[pace])+'</strong>. Los cuatro días están reorganizados para ese esfuerzo.';
  }

  function renderDayTabs(){
    document.getElementById("dayTabs").innerHTML = ITINERARIES[pace].map(function(_, i){
      return '<button type="button" class="'+(activeDay===i?"active":"")+'" data-day="'+i+'">DÍA 0'+(i+1)+'</button>';
    }).join("");
    document.getElementById("routeLabel").textContent = "TU RUTA · " + PACE_LABEL[pace].toUpperCase();
  }

  function renderDayDetail(){
    var d = ITINERARIES[pace][activeDay];
    var stopsHtml = d.stops.map(function(s, i){
      return '<li><span>'+String(i+1).padStart(2,"0")+'</span><strong>'+esc(s)+'</strong>'
        + '<a class="map-link" target="_blank" rel="noreferrer" href="'+mapUrl(s+" Bizkaia")+'">Mapa ↗</a></li>';
    }).join("");
    document.getElementById("dayDetail").innerHTML =
      '<div><p>'+esc(d.kicker)+'</p><h3>'+esc(d.title)+'</h3><span class="distance">'+esc(d.km)+' APROX.</span><blockquote>'+esc(d.note)+'</blockquote></div>'
      + '<ol>'+stopsHtml+'</ol>';
  }

  function saveChecked(){ try { localStorage.setItem("bilbao-prep", JSON.stringify(checked)); } catch(e){} }
  function loadChecked(){
    try { var saved = localStorage.getItem("bilbao-prep"); if (saved) checked = JSON.parse(saved) || []; } catch(e){}
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
    if (paceBtn){ pace = paceBtn.getAttribute("data-pace"); activeDay = 0; renderPaceTabs(); renderDayTabs(); renderDayDetail(); return; }
    var dayBtn = e.target.closest("[data-day]");
    if (dayBtn){ activeDay = parseInt(dayBtn.getAttribute("data-day"),10); renderDayTabs(); renderDayDetail(); return; }
  });
  document.addEventListener("change", function(e){
    if (e.target.matches('#checklistWrap input[type="checkbox"]')){ toggleTask(parseInt(e.target.getAttribute("data-idx"),10)); }
  });

  loadChecked();
  renderPaceTabs();
  renderDayTabs();
  renderDayDetail();
  renderChecklist();
})();
