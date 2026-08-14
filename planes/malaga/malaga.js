// ============================================================
// Málaga en 5 días · datos e interacción
// Puerto a plano de app/page.tsx (React) entregado por Óscar.
// Misma información, sin framework.
// ============================================================
(function(){
  var PACE_KEYS = ["slow","balanced","full"];
  var PACE_LABEL = { slow:"Poco y bien", balanced:"Quiero verla bien", full:"No me importa caminar" };
  var PACE_SMALL = { slow:"2–4 km/día", balanced:"6–8 km/día · recomendado", full:"10–13 km/día" };

  var DAYS = [
    { tag:"DÍA 01 · CAPITAL", title:"Málaga antes del tópico",
      km:["4 km","7 km","11 km"],
      stops:[
        ["Alcazaba","Teatro Romano","Centro histórico","Muelle Uno"],
        ["Gibralfaro","Alcazaba","Teatro Romano","Catedral","Larios","Muelle Uno"],
        ["Gibralfaro","Alcazaba","Museo de Málaga","Catedral","Soho","Muelle Uno"]
      ],
      note:"Empieza arriba y baja hacia el mar. Así conoces la ciudad sin pagar cada cuesta dos veces.",
      eat:"Atarazanas · taberna del centro" },
    { tag:"DÍA 02 · BARRIOS", title:"La Málaga que vive aquí",
      km:["4 km","8 km","13 km"],
      stops:[
        ["Mercado de Atarazanas","Soho","Baños del Carmen","Pedregalejo"],
        ["Atarazanas","Soho","Huelin","Baños del Carmen","Pedregalejo","El Palo"],
        ["Huelin","Atarazanas","Soho","Puerto","Baños del Carmen","Pedregalejo","El Palo"]
      ],
      note:"El día termina frente a una barca con brasas. Espetos, boquerones y ninguna necesidad de mantel blanco.",
      eat:"Espetos en El Palo o Pedregalejo" },
    { tag:"DÍA 03 · AXARQUÍA", title:"Del interior blanco al Mediterráneo",
      km:["4 km","7 km","10 km"],
      stops:[
        ["Balcón de Europa","Frigiliana al atardecer"],
        ["Cueva de Nerja","Balcón de Europa","Frigiliana al atardecer"],
        ["Cueva de Nerja","Maro","Nerja","Frigiliana al atardecer"]
      ],
      note:"Frigiliana a última hora: menos calor, menos autobuses y mucha mejor luz. No la malgastes al mediodía en agosto.",
      eat:"La Puntilla, Nerja · cena en Frigiliana" },
    { tag:"DÍA 04 · NATURALEZA", title:"El desfiladero",
      km:["3 km","8 km","11 km"],
      stops:[
        ["Embalses del Guadalhorce","Ardales"],
        ["Caminito del Rey","Ardales"],
        ["Caminito del Rey","Embalses","Antequera"]
      ],
      note:"La entrada manda sobre el horario. Menores de 8 años: ruta alternativa por embalses y Antequera.",
      eat:"Venta o cocina de Ardales" },
    { tag:"DÍA 05 · ELIGE", title:"Tu última Málaga",
      km:["2 km","6 km","10 km"],
      stops:[
        ["Playa de El Palo","Comida larga"],
        ["Torcal de Antequera","Centro de Antequera"],
        ["Torcal de Antequera","Antequera monumental","Cena en Málaga"]
      ],
      note:"Mar si necesitas descanso. Torcal si aún quieres naturaleza. Ciudad si dejaste museos o compras pendientes.",
      eat:"Campero · plato de los Montes · chiringuito" }
  ];

  var KIDS_NOTE = "Ruta familiar: Embalses del Guadalhorce, Ardales y Antequera, sin acceso al Caminito.";
  var KIDS_STOPS = ["Embalses del Guadalhorce","Ardales","Antequera"];

  var STAYS = [
    { who:"2 PERSONAS", name:"Malaga Center Flat Cathedral", zone:"Centro", text:"Ubicación extraordinaria junto a la Catedral. Todo a pie; acepta más ambiente y precio.", url:"https://www.booking.com/hotel/es/apartamentos-experience.es.html" },
    { who:"3–4 PERSONAS", name:"Tandem Soho Suites", zone:"Soho", text:"El equilibrio: centro, puerto y tren cerca sin dormir en la calle más turística.", url:"https://www.booking.com/searchresults.es.html?ss=Tandem+Soho+Suites+Malaga" },
    { who:"5–6 PERSONAS", name:"Malaga Center Flat Cathedral", zone:"Centro", text:"Apartamentos de dos dormitorios con capacidad real para seis. Compara distribución exacta.", url:"https://www.booking.com/hotel/es/apartamentos-experience.es.html" },
    { who:"GRUPO", name:"Varios apartamentos juntos", zone:"Soho / Huelin", text:"Mejor dos unidades próximas que una casa enorme lejos de todo. Prioriza una misma gestión.", url:"https://www.booking.com/searchresults.es.html?ss=Apartamentos+Soho+Malaga" }
  ];

  var FOOD = [
    { tag:"DÍA 2 · EXPERIENCIA", name:"El Tintero", price:"20–35 €", text:"Pescado frente al mar servido con su particular subasta. Divertido, popular y muy malagueño.", q:"El Tintero Málaga" },
    { tag:"DÍA 2 · ALTERNATIVA", name:"El Caleño", price:"20–35 €", text:"Espetos y pescado en Pedregalejo. Reserva y confirma que las obras del paseo no alteren el servicio.", q:"El Caleño Pedregalejo" },
    { tag:"DÍA 3 · NERJA", name:"Bar La Puntilla", price:"20–35 €", text:"Pescado y marisco fresco sin pagar por sentarte en el Balcón de Europa.", url:"https://www.lapuntillanerja.es/contacto/", q:"Bar La Puntilla Nerja" },
    { tag:"MONTES", name:"Venta El Túnel", price:"15–25 €", text:"Plato de los Montes, croquetas y cocina de venta. Ven con hambre; esto no es una tapa decorativa.", q:"Venta El Túnel Málaga" },
    { tag:"MUY LOCAL", name:"Un campero en El Palo", price:"8–15 €", text:"El bocadillo caliente que Málaga hizo suyo. Para una cena informal después de la playa.", q:"campero El Palo Málaga" },
    { tag:"CENTRO", name:"Atarazanas", price:"10–25 €", text:"Ve por la mañana: el mercado abre de lunes a sábado de 8:00 a 15:00 y los domingos no abre.", url:"https://www.malaga.eu/la-ciudad/instalaciones-y-espacios/detalle-de-la-instalacion/?id=160", q:"Mercado de Atarazanas Málaga" }
  ];

  var PREP = ["Alojamiento reservado","Caminito comprado en web oficial","Cueva de Nerja reservada","Coche solo para excursiones","Restaurantes principales reservados","Calzado cerrado para Caminito","Protección solar y agua","Frigiliana colocada al atardecer"];

  var pace = "balanced";
  var day = 0;
  var trav = 1;
  var kids = false;
  var checked = [];

  function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  function mapUrl(q){ return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q); }
  function paceIndex(){ return PACE_KEYS.indexOf(pace); }

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
      + '<a target="_blank" rel="noopener noreferrer" href="'+esc(s.url)+'">Consultar alojamiento ↗</a>';
  }

  function renderKidsSwitch(){
    document.getElementById("kidsSwitch").innerHTML =
      '<button type="button" class="'+(!kids?"active":"")+'" data-kids="0">Quiero hacer el Caminito</button>'
      + '<button type="button" class="'+(kids?"active":"")+'" data-kids="1">Viajo con menores de 8 años o prefiero alternativa</button>';
    document.getElementById("decisionText").textContent = kids
      ? "Si hay menores de 8 años o alguien no quiere altura, el día no se pierde: embalses del Guadalhorce, Ardales y Antequera."
      : "El Caminito es la opción principal. Reserva primero la entrada oficial y construye el día alrededor de esa hora.";
  }

  function renderDayTabs(){
    document.getElementById("dayTabs").innerHTML = DAYS.map(function(_, i){
      return '<button type="button" class="'+(day===i?"active":"")+'" data-day="'+i+'">DÍA 0'+(i+1)+'</button>';
    }).join("");
  }
  function renderDayDetail(){
    var d = DAYS[day];
    var pi = paceIndex();
    var isKidsDay4 = kids && day === 3;
    var note = isKidsDay4 ? KIDS_NOTE : d.note;
    var stops = isKidsDay4 ? KIDS_STOPS : d.stops[pi];
    var stopsHtml = stops.map(function(s, i){
      return '<li><span>'+String(i+1).padStart(2,"0")+'</span><strong>'+esc(s)+'</strong>'
        + '<a href="'+mapUrl(s+" Málaga")+'" target="_blank" rel="noopener noreferrer">MAPA ↗</a></li>';
    }).join("");
    document.getElementById("dayDetail").innerHTML =
      '<div><span>'+esc(d.tag)+'</span><h3>'+esc(d.title)+'</h3><b>'+esc(d.km[pi])+' APROX.</b><p>'+esc(note)+'</p><em>COMER · '+esc(d.eat)+'</em></div>'
      + '<ol>'+stopsHtml+'</ol>';
  }

  function renderFood(){
    document.getElementById("foodGrid").innerHTML = FOOD.map(function(f){
      return '<article><span>'+esc(f.tag)+'</span><h3>'+esc(f.name)+'</h3><b>'+esc(f.price)+'</b><p>'+esc(f.text)+'</p>'
        + '<div>' + (f.url ? '<a href="'+esc(f.url)+'" target="_blank" rel="noopener noreferrer">WEB ↗</a>' : '')
        + '<a href="'+mapUrl(f.q)+'" target="_blank" rel="noopener noreferrer">MAPS ↗</a></div></article>';
    }).join("");
  }

  function saveChecked(){ try { localStorage.setItem("malaga-prep", JSON.stringify(checked)); } catch(e){} }
  function loadChecked(){
    try { var saved = localStorage.getItem("malaga-prep"); if (saved) checked = JSON.parse(saved) || []; } catch(e){}
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
    var dayBtn = e.target.closest("[data-day]");
    if (dayBtn){ day = parseInt(dayBtn.getAttribute("data-day"),10); renderDayTabs(); renderDayDetail(); return; }
    var kidsBtn = e.target.closest("[data-kids]");
    if (kidsBtn){ kids = kidsBtn.getAttribute("data-kids") === "1"; renderKidsSwitch(); renderDayDetail(); return; }
  });
  document.addEventListener("change", function(e){
    if (e.target.matches('#checklistWrap input[type="checkbox"]')){ toggleTask(parseInt(e.target.getAttribute("data-idx"),10)); }
  });

  loadChecked();
  renderPaceTabs();
  renderTravTabs();
  renderStayDetail();
  renderKidsSwitch();
  renderDayTabs();
  renderDayDetail();
  renderFood();
  renderChecklist();
})();
