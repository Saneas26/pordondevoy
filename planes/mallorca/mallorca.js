// ============================================================
// Mallorca en 6 días · Dos mundos · datos e interacción
// Puerto a plano de app/page.tsx (React) entregado por Óscar.
// Misma información, sin framework.
// ============================================================
(function(){
  var WORLD_LABEL = { local:"Mallorca auténtica", social:"Mallorca social" };
  var WORLD_SMALL = { local:"Pueblos, cellers, calas temprano y noches tranquilas.", social:"Palma, terrazas, puertos, beach clubs y fiesta." };
  var WORLD_EYEBROW = { local:"AUTÉNTICO", social:"SOCIAL" };

  var PACE_LABEL = { slow:"Poco y bien", balanced:"Quiero conocerla", full:"No me importa conducir" };
  var PACE_SMALL = { slow:"1 zona · pocas curvas", balanced:"Recomendado · isla completa", full:"Carretera, amaneceres y más paradas" };
  var PACE_KEYS = ["slow","balanced","full"];

  var ROUTES = {
    local: [
      { tag:"DÍA 01 · PALMA", title:"Primero, entender la isla", drive:["0 km","12 km","25 km"],
        stops:[["Mercat de l'Olivar","La Seu","Sa Calatrava","Celler Sa Premsa"],["Mercat de l'Olivar","La Seu","Banys Àrabs","Sa Calatrava","Santa Catalina","Celler Sa Premsa"],["Castell de Bellver","Santa Catalina","La Seu","Banys Àrabs","Sa Calatrava","Passeig del Born","Celler Sa Premsa"]],
        note:"Palma no es una sala de espera para coger el coche. Mercado por la mañana, piedra y patios después, y cocina mallorquina para cerrar.", eat:"Celler Sa Premsa · segunda opción: Bar Can Frau" },
      { tag:"DÍA 02 · TRAMUNTANA", title:"Piedra, curvas y mar", drive:["78 km","115 km","150 km"],
        stops:[["Valldemossa","Mirador de sa Foradada","Sóller"],["Valldemossa","Deià","Mirador de sa Foradada","Sóller","Port de Sóller"],["Banyalbufar","Valldemossa","Deià","Sóller","Fornalutx","Port de Sóller"]],
        note:"No metas siete pueblos para tacharlos. Las carreteras son lentas, hay ciclistas y el paisaje merece parar. Aparca fuera de los cascos.", eat:"Ca N'Antuna en Fornalutx · segunda opción: Es Canyís" },
      { tag:"DÍA 03 · NORTE", title:"Pollença y el límite de Formentor", drive:["82 km","125 km","155 km"],
        stops:[["Pollença","Port de Pollença","Mirador Es Colomer"],["Pollença","Calvari","Port de Pollença","Mirador Es Colomer","Alcúdia"],["Pollença","Calvari","Formentor según regulación","Alcúdia","Platja de Muro"]],
        note:"Formentor no se improvisa en verano: el acceso se regula y puede cerrarse al completar aforo. Consulta la DGT y usa bus cuando corresponda.", eat:"Celler Ca'n Costa en Alcúdia · segunda opción: Los Patos", formentor:true },
      { tag:"DÍA 04 · PLA DE MALLORCA", title:"La Mallorca que sigue viviendo", drive:["55 km","92 km","125 km"],
        stops:[["Sineu","Petra","Celler Can Amer"],["Sineu","Petra","Artà","Celler Can Amer"],["Mercado de Sineu","Petra","Artà","Capdepera","Cala Mesquida"]],
        note:"El centro no tiene una foto viral cada dos minutos. Precisamente por eso conserva conversación, mercados, cellers y precios menos absurdos.", eat:"Celler Can Amer · segunda opción: Es Cruce" },
      { tag:"DÍA 05 · SURESTE", title:"La cala se gana temprano", drive:["72 km","108 km","135 km"],
        stops:[["Parc Natural de Mondragó","Cala Figuera","Santanyí"],["S'Amarador temprano","Cala Mondragó","Cala Figuera","Santanyí"],["Caló des Moro al amanecer","S'Almunia","Cala Figuera","S'Amarador","Santanyí"]],
        note:"A las 11:30 una cala famosa ya puede estar perdida. Llega antes de las 8:30 o cambia la obsesión por una playa con espacio.", eat:"Es Bergant en Cala Figuera · segunda opción: Sa Farinera" },
      { tag:"DÍA 06 · TU MALLORCA", title:"Repetir bien es viajar mejor", drive:["35 km","75 km","120 km"],
        stops:[["Es Trenc temprano","Ses Salines","Última sobremesa"],["Cala Torta","Artà","Atardecer en Palma"],["Sa Calobra temprano","Torrent de Pareis","Lluc","Última noche en Palma"]],
        note:"El sexto día no existe para rellenar. Elige el paisaje que más te haya llamado y deja una tarde sin cronómetro.", eat:"Cassai en Ses Salines · segunda opción: Can Manolo" }
    ],
    social: [
      { tag:"DÍA 01 · PALMA", title:"Ciudad, mercado y primera copa", drive:["0 km","12 km","20 km"],
        stops:[["La Seu","Passeig del Born","Santa Catalina"],["Mercat de l'Olivar","La Seu","Santa Catalina","Paseo Marítimo"],["Bellver","Santa Catalina","La Seu","La Lonja","Paseo Marítimo"]],
        note:"Empieza con Palma y termina donde haya ambiente. Cena pronto si quieres una mesa buena; la copa viene después.", eat:"Santa Catalina · segunda opción: La Lonja" },
      { tag:"DÍA 02 · CALVIÀ", title:"Mar bonito, tarde larga", drive:["32 km","55 km","85 km"],
        stops:[["Illetes","Puerto Portals","Palma"],["Illetes","Portals Vells","Puerto Portals","Palma"],["Sant Elm","Port d'Andratx","Camp de Mar","Puerto Portals"]],
        note:"Puerto Portals y Port d'Andratx son para ver, cenar o tomar algo. Si buscas precio local, no es aquí.", eat:"Port d'Andratx · segunda opción: Santa Catalina" },
      { tag:"DÍA 03 · NORTE", title:"La foto que sí merece el viaje", drive:["90 km","130 km","155 km"],
        stops:[["Alcúdia","Platja de Muro","Puesta de sol"],["Pollença","Es Colomer","Alcúdia","Platja de Muro"],["Pollença","Formentor según regulación","Alcúdia","Platja de Muro"]],
        note:"Formentor es espectacular, pero no te da derecho a ignorar la regulación ni a bloquear una carretera por una foto. Consulta la DGT y usa bus cuando corresponda.", eat:"Alcúdia · segunda opción: Port de Pollença", formentor:true },
      { tag:"DÍA 04 · BEACH DAY", title:"Comodidad, música y reserva", drive:["30 km","65 km","100 km"],
        stops:[["Cala Major","Beach club reservado","Paseo Marítimo"],["Illetes","Puerto Portals","Atardecer","Palma"],["Camp de Mar","Port d'Andratx","Puerto Portals","Palma"]],
        note:"Si quieres cama balinesa y servicio, resérvalo y asume el precio. No lo disfraces de experiencia local.", eat:"Mesa reservada frente al mar · plan B en Palma" },
      { tag:"DÍA 05 · SURESTE", title:"Cala viral, decisión adulta", drive:["75 km","110 km","140 km"],
        stops:[["S'Amarador","Cala Figuera","Santanyí"],["Mondragó","Cala Figuera","Santanyí","Palma"],["Caló des Moro al amanecer","S'Almunia","Cala Figuera","Santanyí","Palma"]],
        note:"Quieres la foto: ve al amanecer. Quieres bañarte: elige espacio. Intentar ambas cosas al mediodía suele salir mal.", eat:"Cala Figuera · segunda opción: Santanyí" },
      { tag:"DÍA 06 · NOCHE", title:"Elige tu final", drive:["0 km","45 km","75 km"],
        stops:[["Brunch en Palma","Compras","Terraza"],["Es Trenc temprano","Ses Salines","Santa Catalina"],["Valldemossa","Deià","Palma","Paseo Marítimo","Última copa"]],
        note:"Magaluf si quieres fiesta internacional sin complejos. Palma si prefieres cena, terraza y una noche que no se coma el día siguiente.", eat:"Palma · reserva cena antes de salir" }
    ]
  };

  var STAYS = [
    { who:"2 PERSONAS", name:"Palma", label:"EQUILIBRIO", text:"La mejor combinación de restaurantes, noche y salidas por carretera. Busca casco antiguo, Santa Catalina o zona Blanquerna.", url:"https://www.booking.com/searchresults.es.html?ss=Palma+de+Mallorca" },
    { who:"3–4 PERSONAS", name:"Pollença", label:"NUESTRA ELECCIÓN", text:"Casa o apartamento con calma, norte y Tramuntana a mano. No confundas Pollença pueblo con Port de Pollença.", url:"https://www.booking.com/searchresults.es.html?ss=Pollen%C3%A7a+Mallorca" },
    { who:"5–6 PERSONAS", name:"Santanyí", label:"CALAS", text:"Buena base para familias que priorizan el sureste. Comprueba aire acondicionado, aparcamiento y licencia turística.", url:"https://www.booking.com/searchresults.es.html?ss=Santany%C3%AD+Mallorca" },
    { who:"GRUPO", name:"Inca · Sineu", label:"PRECIO Y LOGÍSTICA", text:"Más metros, menos postureo y carreteras razonables hacia casi toda la isla. Para salir de noche, no es la elección.", url:"https://www.booking.com/searchresults.es.html?ss=Sineu+Mallorca" }
  ];

  var FOOD = [
    { tag:"PALMA · LOCAL", name:"Celler Sa Premsa", price:"20–35 €", text:"Desde 1958. Sopas mallorquinas, tumbet, frito y cocina sin disfraz. Reserva o llega pronto.", phone:"971 72 35 29", url:"https://www.cellersapremsa.com/", q:"Celler Sa Premsa Palma" },
    { tag:"PALMA · MERCADO", name:"Bar Can Frau", price:"12–25 €", text:"El variat mallorquín dentro de Santa Catalina. Desayuno o almuerzo corto, no cena romántica.", q:"Bar Can Frau Palma" },
    { tag:"INCA · CELLER", name:"Celler Can Amer", price:"25–40 €", text:"Una referencia para la cocina mallorquina y parada perfecta durante el día interior.", phone:"971 50 10 69", q:"Celler Can Amer Inca" },
    { tag:"VILAFRANCA · SIN POSTUREO", name:"Es Cruce", price:"12–25 €", text:"Grande, rápido, popular y económico. No vengas por intimidad: ven por cocina mallorquina y hambre.", phone:"971 56 00 73", q:"Restaurant Es Cruce Vilafranca" },
    { tag:"FORNALUTX · TRAMUNTANA", name:"Ca N'Antuna", price:"25–40 €", text:"Terraza y cocina mallorquina en uno de los pueblos más bonitos. Reserva antes de encajar la ruta.", phone:"971 63 82 98", q:"Ca N'Antuna Fornalutx" },
    { tag:"ALCÚDIA · SEGUNDA OPCIÓN", name:"Celler Ca'n Costa", price:"25–40 €", text:"Cocina tradicional dentro de Alcúdia. Tiene mucho más sentido que comer al azar en primera línea.", phone:"971 54 53 94", q:"Celler Ca'n Costa Alcudia" },
    { tag:"CALA FIGUERA · MAR", name:"Es Bergant", price:"30–45 €", text:"Pescado y producto del mar. Pregunta precio y peso del pescado antes de pedirlo.", phone:"971 64 50 12", q:"Es Bergant Cala Figuera" },
    { tag:"SES SALINES · BONITO", name:"Cassai", price:"30–45 €", text:"Para una comida más estética sin perder la ruta del sur. Reserva en temporada.", phone:"971 64 91 18", url:"https://cassai.es/", q:"Cassai Ses Salines" }
  ];

  var PREP = ["Vuelo y horarios reales comparados","Alojamiento según el mundo elegido","Coche con cobertura revisada","Regulación de Formentor comprobada","Mesas importantes reservadas","Toalla y calzado de roca","Agua, gorra y escarpines","Plan B para la cala viral"];

  var SEASON_TEXT = {
    calm: "Mayo, junio, septiembre y octubre: mejor equilibrio entre baño, luz y espacio. Aun así, las calas famosas siguen necesitando madrugar.",
    peak: "Julio y agosto: sal antes de las 8:00, reserva comida y no encadenes tres calas virales. El aparcamiento manda más que tu itinerario."
  };

  var COVER_TEXT = {
    on: "Es la comparación honesta: cobertura, combustible, depósito, segundo conductor y traslado. Cero discusiones al devolver.",
    off: "Puede ser más barata, pero comprueba franquicia, bloqueo en tarjeta y exclusiones. Una raya puede comerse todo el ahorro."
  };

  var FORMENTOR_NOTE = "Formentor sujeto a regulación estacional. Comprueba el estado del acceso en la DGT y valora el autobús.";
  var FORMENTOR_URL = "https://www.dgt.es/conoce-el-estado-del-trafico/rutas-de-interes/trafico-acceso-faro-de-formentor/index.html";

  var world = "local";
  var pace = "balanced";
  var day = 0;
  var trav = 1;
  var season = "calm";
  var cover = true;
  var checked = [];

  function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  function mapUrl(q){ return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q); }
  function paceIndex(){ return pace === "slow" ? 0 : (pace === "balanced" ? 1 : 2); }

  function setWorldAttr(){
    var root = document.getElementById("mllRoot");
    if (world === "social") root.setAttribute("data-world","social"); else root.removeAttribute("data-world");
  }

  function renderWorldButtons(){
    document.getElementById("worldButtons").innerHTML = ["local","social"].map(function(w, i){
      return '<button type="button" class="'+(world===w?"active":"")+'" data-world-btn="'+w+'" aria-pressed="'+(world===w?"true":"false")+'">'
        + '<span>0'+(i+1)+'</span><strong>'+esc(WORLD_LABEL[w])+'</strong>'
        + '<small>'+esc(WORLD_SMALL[w])+'</small>'
        + '</button>';
    }).join("");
  }

  function renderPaceTabs(){
    document.getElementById("paceTabs").innerHTML = PACE_KEYS.map(function(p, i){
      var rec = p === "balanced" ? '<span class="recommended">RECOMENDADO</span>' : "";
      return '<button type="button" class="'+(pace===p?"active":"")+'" data-pace="'+p+'">'
        + '<span>0'+(i+1)+rec+'</span>'+esc(PACE_LABEL[p])
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
      '<span>'+esc(s.label)+'</span><h3>'+esc(s.name)+'</h3><p>'+esc(s.text)+'</p>'
      + '<a href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer">Buscar alojamiento ↗</a>';
  }

  function renderCoverCard(){
    document.getElementById("coverCard").innerHTML =
      '<b>03</b><h3>'+(cover?"Cobertura completa":"Tarifa básica")+'</h3>'
      + '<p>'+(cover?esc(COVER_TEXT.on):esc(COVER_TEXT.off))+'</p>'
      + '<button type="button" class="routeChoice" data-cover-toggle="1">Comparar '+(cover?"básica":"completa")+'</button>';
  }

  function renderSeason(){
    document.getElementById("seasonText").textContent = SEASON_TEXT[season];
    document.getElementById("seasonSwitch").innerHTML =
      '<button type="button" class="'+(season==="calm"?"active":"")+'" data-season="calm">Temporada sensata</button>'
      + '<button type="button" class="'+(season==="peak"?"active":"")+'" data-season="peak">Julio · agosto</button>';
  }

  function renderDayTabs(){
    document.getElementById("dayTabs").innerHTML = ROUTES[world].map(function(_, i){
      return '<button type="button" class="'+(day===i?"active":"")+'" data-day="'+i+'">DÍA '+String(i+1).padStart(2,"0")+'</button>';
    }).join("");
  }
  function renderDayDetail(){
    var d = ROUTES[world][day];
    var pi = paceIndex();
    var stopsHtml = d.stops[pi].map(function(s, i){
      return '<li><span>'+String(i+1).padStart(2,"0")+'</span><strong>'+esc(s)+'</strong>'
        + '<a href="'+esc(mapUrl(s+" Mallorca"))+'" target="_blank" rel="noopener noreferrer">MAPA ↗</a></li>';
    }).join("");
    var formentorHtml = d.formentor
      ? '<span class="formentorNote">'+esc(FORMENTOR_NOTE)+' <a href="'+esc(FORMENTOR_URL)+'" target="_blank" rel="noopener noreferrer">Ver DGT ↗</a></span>'
      : "";
    document.getElementById("dayDetail").innerHTML =
      '<div><span>'+esc(d.tag)+'</span><h3>'+esc(d.title)+'</h3><b>'+esc(d.drive[pi])+' DE COCHE APROX.</b><p>'+esc(d.note)+'</p><em>COMER · '+esc(d.eat)+'</em>'+formentorHtml+'</div>'
      + '<ol>'+stopsHtml+'</ol>';
    document.getElementById("ruteEyebrow").textContent = "05 · ITINERARIO " + WORLD_EYEBROW[world];
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

  function saveChecked(){ try { localStorage.setItem("mallorca-prep", JSON.stringify(checked)); } catch(e){} }
  function loadChecked(){
    try { var saved = localStorage.getItem("mallorca-prep"); if (saved) checked = JSON.parse(saved) || []; } catch(e){}
  }
  function saveWorld(){ try { localStorage.setItem("mallorca-world", world); } catch(e){} }
  function loadWorld(){
    try { var saved = localStorage.getItem("mallorca-world"); if (saved === "local" || saved === "social") world = saved; } catch(e){}
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
    var worldBtn = e.target.closest("[data-world-btn]");
    if (worldBtn){ world = worldBtn.getAttribute("data-world-btn"); day = 0; setWorldAttr(); saveWorld(); renderWorldButtons(); renderDayTabs(); renderDayDetail(); return; }
    var paceBtn = e.target.closest("[data-pace]");
    if (paceBtn){ pace = paceBtn.getAttribute("data-pace"); renderPaceTabs(); renderDayDetail(); return; }
    var travBtn = e.target.closest("[data-trav]");
    if (travBtn){ trav = parseInt(travBtn.getAttribute("data-trav"),10); renderTravTabs(); renderStayDetail(); return; }
    var coverBtn = e.target.closest("[data-cover-toggle]");
    if (coverBtn){ cover = !cover; renderCoverCard(); return; }
    var seasonBtn = e.target.closest("[data-season]");
    if (seasonBtn){ season = seasonBtn.getAttribute("data-season"); renderSeason(); return; }
    var dayBtn = e.target.closest("[data-day]");
    if (dayBtn){ day = parseInt(dayBtn.getAttribute("data-day"),10); renderDayTabs(); renderDayDetail(); return; }
  });
  document.addEventListener("change", function(e){
    if (e.target.matches('#checklistWrap input[type="checkbox"]')){ toggleTask(parseInt(e.target.getAttribute("data-idx"),10)); }
  });

  loadWorld();
  loadChecked();
  setWorldAttr();
  renderWorldButtons();
  renderTravTabs();
  renderStayDetail();
  renderCoverCard();
  renderSeason();
  renderPaceTabs();
  renderDayTabs();
  renderDayDetail();
  renderFoodGrid();
  renderChecklist();
})();
