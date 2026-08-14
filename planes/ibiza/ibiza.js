// ============================================================
// Ibiza en 5 días · Dos amaneceres · datos e interacción
// Puerto a plano de app/page.tsx (React) entregado por Óscar.
// Misma información, sin framework.
// ============================================================
(function(){
  var WORLD_LABEL = { quiet:"Ibiza sin ruido", night:"Ibiza con noche" };
  var WORLD_SMALL = { quiet:"Pueblos, calas, Dalt Vila, cocina payesa y noches tranquilas.", night:"Playa, siesta estratégica, puesta de sol y una sesión elegida con cabeza." };
  var WORLD_EYEBROW = { quiet:"SIN RUIDO", night:"CON NOCHE" };

  var PACE_LABEL = { slow:"Poco y bien", balanced:"Isla y una gran noche", full:"No pienso parar" };
  var PACE_SMALL = { slow:"Una zona · pocas curvas", balanced:"Recomendado · isla completa", full:"Más calas, kilómetros y noche" };
  var PACE_KEYS = ["slow","balanced","full"];

  var ROUTES = {
    quiet: [
      { tag:"DÍA 01 · EIVISSA", title:"La ciudad antes del ruido", km:["4 km","7 km","11 km"],
        stops:[["Dalt Vila","Catedral","La Marina","Ca n'Alfredo"],["Puig des Molins","Dalt Vila","Sa Penya","La Marina","Vara de Rey","Ca n'Alfredo"],["Figueretes","Puig des Molins","Dalt Vila","Baluartes","Sa Penya","La Marina","Vara de Rey"]],
        note:"Dalt Vila a primera hora o al final de la tarde. Al mediodía, en agosto, la piedra devuelve todo el calor.", eat:"Ca n'Alfredo · plan B: Bar San Juan" },
      { tag:"DÍA 02 · SUR", title:"Sal, piedra y Es Vedrà", km:["48 km","72 km","92 km"],
        stops:[["Sa Caleta","Cala d'Hort","Es Vedrà desde mirador seguro"],["Sa Caleta","Ses Salines","Sant Josep","Cala d'Hort","Es Boldadó"],["Sa Caleta temprano","Es Cavallet","Ses Salines","Sant Josep","Cala d'Hort","Es Boldadó","Atardecer oeste"]],
        note:"Es Vedrà no justifica invadir fincas, arcenes ni bordes peligrosos. La vista buena también puede ser responsable.", eat:"Es Boldadó · reserva y pregunta por el pescado" },
      { tag:"DÍA 03 · NORTE", title:"La Ibiza que sigue viviendo", km:["58 km","83 km","105 km"],
        stops:[["Santa Gertrudis","Sant Joan","Portinatx"],["Santa Gertrudis","Sant Llorenç","Sant Joan","Cala Xarraca","S'Illot des Renclí"],["Santa Gertrudis","Sant Miquel","Sant Joan","Cala Xarraca","S'Illot des Renclí","Portinatx"]],
        note:"El norte sirve para bajar el volumen: iglesias blancas, carreteras estrechas, baño y una comida larga.", eat:"Can Pilot · plan B: Bar Costa" },
      { tag:"DÍA 04 · LEVANTE", title:"Sant Carles termina en el mar", km:["54 km","78 km","98 km"],
        stops:[["Sant Carles","Bar Anita","Es Pou des Lleó"],["Sant Carles","Bar Anita","Cala Mastella","Es Pou des Lleó","Santa Eulària"],["Mercadillo según calendario","Sant Carles","Cala Mastella","Es Pou des Lleó","Cala de Sant Vicent","Santa Eulària"]],
        note:"Es Pou des Lleó sigue siendo más respirable que las postales occidentales. Cala Mastella solo se convierte en comida si tienes mesa confirmada.", eat:"Bullit de peix con reserva · plan B: Can Gat" },
      { tag:"DÍA 05 · OESTE RURAL", title:"El último atardecer", km:["46 km","73 km","96 km"],
        stops:[["Santa Agnès","Sant Mateu","Atardecer oeste"],["Santa Agnès","Sant Mateu","Cala Gració","Atardecer en Cap Negret"],["Santa Agnès","Sant Mateu","Punta Galera","Cala Gració","Puesta de sol","Cena tranquila"]],
        note:"No necesitas una multitud aplaudiendo al sol. En el oeste todavía quedan finales sencillos si te alejas del punto más obvio.", eat:"Comida payesa interior · cena en Santa Gertrudis" }
    ],
    night: [
      { tag:"DÍA 01 · EIVISSA", title:"Muralla, puerto y primera noche", km:["4 km","7 km","9 km"],
        stops:[["Dalt Vila","La Marina","Cena","Primera copa"],["Puig des Molins","Dalt Vila","La Marina","Puerto","Cena","Pacha según cartel"],["Dalt Vila","Baluartes","La Marina","Puerto","Cena","Club elegido por sesión"]],
        note:"No sacrifiques Dalt Vila por llegar antes a una cabina. La primera noche puede ser grande; el primer día no tiene por qué desaparecer.", eat:"Ca n'Alfredo · después, La Marina" },
      { tag:"DÍA 02 · SUR", title:"Playa, siesta y sesión", km:["28 km","48 km","65 km"],
        stops:[["Ses Salines","Siesta","Cena","Playa d'en Bossa"],["Sa Caleta","Ses Salines","Siesta","Cena","Ushuaïa o Hï según cartel"],["Sa Caleta temprano","Es Cavallet","Ses Salines","Beach club reservado","Siesta","Sesión de tarde y club"]],
        note:"La siesta forma parte del itinerario. Intentar playa, atardecer, cena y discoteca sin parar convierte el tercer día en una baja médica.", eat:"Comida frente al mar · cena ligera antes del club" },
      { tag:"DÍA 03 · NORTE", title:"Recuperar la isla", km:["45 km","72 km","92 km"],
        stops:[["Santa Gertrudis","Bar Costa","Santa Eulària"],["Santa Gertrudis","Sant Joan","Cala Xarraca","Santa Eulària"],["Santa Gertrudis","Sant Joan","Portinatx","Cala de Sant Vicent","Santa Eulària"]],
        note:"Después de una noche grande, conducción corta y baño fácil. Si no estás descansado, no conduzcas: cambia el norte por paseo y playa cercana.", eat:"Can Pilot o Bar Costa" },
      { tag:"DÍA 04 · OESTE", title:"La puesta de sol social", km:["48 km","68 km","88 km"],
        stops:[["Cala Gració","Sant Antoni","Puesta de sol"],["Cala Bassa temprano","Cala Gració","Sant Antoni","Sunset strip"],["Platges de Comte temprano","Cala Bassa","Punta Galera","Sant Antoni","Puesta de sol","Discobus"]],
        note:"Sant Antoni puede ser una cala preciosa, una puesta de sol o una noche de turismo alcohólico. Tú decides hasta qué calle quieres entrar.", eat:"Cena reservada antes del atardecer" },
      { tag:"DÍA 05 · ES VEDRÀ", title:"El amanecer que faltaba", km:["42 km","66 km","85 km"],
        stops:[["Cala d'Hort","Es Vedrà","Comida larga"],["Sant Josep","Cala d'Hort","Es Boldadó","Dalt Vila al volver"],["Sa Caleta","Sant Josep","Cala d'Hort","Es Boldadó","Última copa en Eivissa"]],
        note:"Cierra con paisaje, no con resaca. Ibiza también sabe despedirse en silencio.", eat:"Es Boldadó · plan B en Sant Josep" }
    ]
  };

  var STAYS = [
    { who:"2 PERSONAS", name:"Eivissa · Figueretes", label:"CIUDAD Y NOCHE", text:"Dalt Vila, restaurantes y transporte nocturno a mano. Mejor sin coche dentro y con parking confirmado.", url:"https://www.booking.com/searchresults.es.html?ss=Figueretes+Ibiza" },
    { who:"3–4 PERSONAS", name:"Santa Eulària", label:"NUESTRA ELECCIÓN", text:"La base más equilibrada: familiar, gastronómica, tranquila y bien situada para conocer el norte.", url:"https://www.booking.com/searchresults.es.html?ss=Santa+Eulalia+del+Rio+Ibiza" },
    { who:"5–6 PERSONAS", name:"Santa Gertrudis", label:"CASA Y CENTRO", text:"Entorno rural, restaurantes y posición central. Necesitas coche y una casa con licencia turística real.", url:"https://www.booking.com/searchresults.es.html?ss=Santa+Gertrudis+Ibiza" },
    { who:"GRUPO DE FIESTA", name:"Playa d'en Bossa", label:"LOGÍSTICA NOCTURNA", text:"Hï, Ushuaïa y playa cerca. Si buscas silencio o Ibiza tradicional, no es aquí.", url:"https://www.booking.com/searchresults.es.html?ss=Playa+d%27en+Bossa+Ibiza" }
  ];

  var FOOD = [
    { tag:"EIVISSA · TRADICIÓN", name:"Ca n'Alfredo", price:"30–50 €", text:"Cocina ibicenca en Vara de Rey. Sofrit pagès, pescado y arroces. Reserva.", phone:"971 31 12 74", url:"https://www.canalfredo.com/", q:"Ca n'Alfredo Ibiza" },
    { tag:"SANT RAFEL · BRASA", name:"Can Pilot", price:"25–45 €", text:"Carne a la brasa y ambiente directo. Una institución local, no una cena de diseño.", q:"Can Pilot Sant Rafel Ibiza" },
    { tag:"SANTA GERTRUDIS", name:"Bar Costa", price:"10–25 €", text:"Bocadillos, jamón y mesas sin ceremonia. Perfecto para una parada; no para fingir lujo rural.", q:"Bar Costa Santa Gertrudis Ibiza" },
    { tag:"CALA D'HORT · VISTAS", name:"Es Boldadó", price:"45–75 €", text:"Pescado, arroz y Es Vedrà de fondo. La vista se paga; pregunta pieza, peso y precio.", phone:"626 494 537", url:"https://esboldadoibiza.com/", q:"Es Boldado Ibiza" },
    { tag:"CALA SANT VICENT", name:"Can Gat", price:"35–60 €", text:"Pescado local, arroces y producto del mar en el norte. Reserva en temporada.", phone:"971 32 01 23", q:"Can Gat Cala Sant Vicent Ibiza" },
    { tag:"SANT CARLES · HISTORIA", name:"Bar Anita", price:"10–25 €", text:"Una parada ligada a la Ibiza artística. Bocadillo, tapa y hierbas; sin sobreactuarla.", q:"Bar Anita Sant Carles Ibiza" },
    { tag:"CALA MASTELLA", name:"El Bigotes", price:"Consultar", text:"Bullit de peix junto al agua. Solo entra en el plan con mesa y apertura confirmadas.", q:"El Bigotes Cala Mastella Ibiza" },
    { tag:"EIVISSA · MAR", name:"Sa Nansa", price:"40–70 €", text:"Pescado, arroz y cocina marinera. Opción de calidad, no económica.", phone:"971 31 87 50", q:"Sa Nansa Ibiza" }
  ];

  var PREP = ["Alojamiento según el mundo elegido","Moto Luis o alternativa reservada","Cobertura y exclusiones leídas","Conductor nocturno descartado","Discobus o taxi planificado","Restaurantes importantes reservados","Cartel de la noche comprobado","Plan B de cala preparado"];

  var SEASON_HEAD = { peak:"Discobus.", off:"Taxi." };
  var SEASON_TEXT = {
    peak: "En temporada, el Discobus conecta las principales zonas y clubes. Comprueba línea y último regreso esa misma noche: Ibiza cambia horarios cada verano.",
    off: "Fuera de la temporada del Discobus, planifica taxi o conductor sobrio antes de salir. No improvises el regreso a las cuatro de la mañana."
  };
  var DISCOBUS_URL = "https://discobusibiza.com/";

  var COVER_TEXT = {
    on: "Más tranquilidad, pero ninguna cobertura habitual cubre llaves perdidas, daños por agua, negligencia, combustible incorrecto, caminos no aptos o uso indebido. Verifica exclusiones exactas antes de decidir. El coche no viaja a Formentera salvo autorización expresa.",
    off: "Precio de salida más bajo, pero compara franquicia, depósito o bloqueo en tarjeta, combustible y segundo conductor: el ahorro puede desaparecer en la letra pequeña."
  };

  var world = "quiet";
  var pace = "balanced";
  var day = 0;
  var trav = 1;
  var summer = true;
  var cover = true;
  var checked = [];

  function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  function mapUrl(q){ return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q); }
  function paceIndex(){ return pace === "slow" ? 0 : (pace === "balanced" ? 1 : 2); }

  function setWorldAttr(){
    document.getElementById("ibzRoot").setAttribute("data-world", world);
  }

  function renderWorldButtons(){
    document.getElementById("worldButtons").innerHTML = ["quiet","night"].map(function(w, i){
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
      '<b>03</b><h3>'+(cover?"All in One":"Tarifa con franquicia")+'</h3>'
      + '<p>'+(cover?esc(COVER_TEXT.on):esc(COVER_TEXT.off))+'</p>'
      + '<button type="button" class="routeChoice" data-cover-toggle="1">Ver '+(cover?"tarifa con franquicia":"All in One")+'</button>';
  }

  function renderSeason(){
    var key = summer ? "peak" : "off";
    document.getElementById("seasonHead").innerHTML = esc(SEASON_HEAD[key]) + "<br><i>Y cero volante.</i>";
    document.getElementById("seasonText").textContent = SEASON_TEXT[key];
    document.getElementById("seasonSwitch").innerHTML =
      '<button type="button" class="'+(summer?"active":"")+'" data-season="peak">Junio–septiembre</button>'
      + '<button type="button" class="'+(!summer?"active":"")+'" data-season="off">Fuera de temporada</button>'
      + '<a href="'+esc(DISCOBUS_URL)+'" target="_blank" rel="noopener noreferrer">Consultar Discobus ↗</a>';
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
        + '<a href="'+esc(mapUrl(s+" Ibiza"))+'" target="_blank" rel="noopener noreferrer">MAPA ↗</a></li>';
    }).join("");
    document.getElementById("dayDetail").innerHTML =
      '<div><span>'+esc(d.tag)+'</span><h3>'+esc(d.title)+'</h3><b>'+esc(d.km[pi])+' APROX.</b><p>'+esc(d.note)+'</p><em>COMER · '+esc(d.eat)+'</em></div>'
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

  function saveChecked(){ try { localStorage.setItem("ibiza-prep", JSON.stringify(checked)); } catch(e){} }
  function loadChecked(){
    try { var saved = localStorage.getItem("ibiza-prep"); if (saved) checked = JSON.parse(saved) || []; } catch(e){}
  }
  function saveWorld(){ try { localStorage.setItem("ibiza-world", world); } catch(e){} }
  function loadWorld(){
    try { var saved = localStorage.getItem("ibiza-world"); if (saved === "quiet" || saved === "night") world = saved; } catch(e){}
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
    if (seasonBtn){ summer = seasonBtn.getAttribute("data-season") === "peak"; renderSeason(); return; }
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
