// ============================================================
// Formentera en 4 días · datos e interacción
// Puerto a plano estático de app/page.tsx (React) entregado por Óscar.
// Misma información, sin framework.
// ============================================================
(function(){
  var PACE_LABEL = { slow:"Poco y bien", balanced:"Quiero vivirla", full:"Pedaleo y camino" };
  var PACE_SMALL = { slow:"Una zona y mucha playa", balanced:"Recomendado · isla completa", full:"Rutas verdes y más kilómetros" };
  var PACE_KEYS = ["slow","balanced","full"];

  var ROUTES = [
    { tag:"DÍA 01 · LLEGADA", title:"Bajar del barco. Bajar el ritmo.", km:["12 km","24 km","36 km"],
      stops:[["La Savina","Estany des Peix","Sant Francesc","Migjorn"],["La Savina","Estany des Peix","Sant Francesc","Sant Ferran","Migjorn","Puesta de sol"],["La Savina","Can Marroig","Sant Francesc","Sant Ferran","Migjorn","Ruta verde","Puesta de sol"]],
      note:"No cruces la isla nada más desembarcar. Recoge el vehículo, compra agua, entiende dónde estás y termina con el primer baño cerca del alojamiento.", eat:"Sant Francesc · cena cerca del alojamiento" },
    { tag:"DÍA 02 · ILLETES", title:"Llegar antes que los barcos", km:["9 km","18 km","29 km"],
      stops:[["Ses Illetes temprano","Llevant","La Savina"],["Ses Illetes temprano","Paseo hacia Trucadors","Llevant","Estany Pudent","Es Pujols"],["La Savina en bici","Ses Illetes","Trucadors","Llevant","Estany Pudent","Es Pujols","Sant Ferran"]],
      note:"La bicicleta entra gratis al parque natural. A media mañana llegan excursiones y embarcaciones: aquí el horario vale más que una reserva de tumbona.", eat:"Picnic responsable · cena en Es Pujols" },
    { tag:"DÍA 03 · LA MOLA", title:"Una isla dentro de la isla", km:["28 km","43 km","58 km"],
      stops:[["Es Caló","Mirador de La Mola","Faro de La Mola"],["Es Caló","Ses Platgetes","El Pilar","Faro de La Mola","Mercado si coincide","Migjorn"],["Camí de Sa Pujada","El Pilar","Ruta verde 32","Faro de La Mola","Mercado artesanal","Es Caló","Migjorn"]],
      note:"La Mola es el único desnivel serio de la isla. En bici eléctrica se disfruta; en bicicleta convencional, con calor y viento, conviene saber a qué se viene.", eat:"Can Rafalet · segunda opción en El Pilar" },
    { tag:"DÍA 04 · BARBARIA", title:"Devolver las llaves sin correr", km:["22 km","38 km","52 km"],
      stops:[["Cala Saona","Sant Francesc","La Savina"],["Cala Saona temprano","Cap de Barbaria","Sant Francesc","La Savina"],["Ruta verde a Cap de Barbaria","Cala Saona","Sant Francesc","Última comida","La Savina"]],
      note:"El último día debe tener margen. Devuelve el vehículo antes de tiempo, embarca sin ansiedad y nunca unas el último ferry disponible con un vuelo.", eat:"Última comida en Sant Francesc" }
  ];

  var STAYS = [
    { who:"2 PERSONAS", name:"Sant Francesc", zone:"NUESTRA ELECCIÓN", text:"Pueblo real, servicios, restaurantes y posición central. No estás frente al mar, pero todo tiene sentido desde aquí.", q:"apartamentos Sant Francesc Formentera" },
    { who:"3–4 PERSONAS", name:"Migjorn", zone:"MAR Y DESCANSO", text:"Perfecta para familia o pareja. Comprueba el acceso exacto: la playa se extiende varios kilómetros y las ubicaciones son muy distintas.", q:"apartamentos Playa Migjorn Formentera" },
    { who:"5–6 PERSONAS", name:"Es Pujols", zone:"SERVICIOS", text:"Restaurantes, paseo y algo de ambiente. También es el núcleo más turístico y con menos silencio.", q:"apartamentos Es Pujols Formentera" },
    { who:"LLEGO TARDE", name:"La Savina", zone:"LOGÍSTICA", text:"La mejor llegada y la postal menos emocionante. Tiene sentido para una noche o un ferry temprano, no para toda la estancia.", q:"apartamentos La Savina Formentera" }
  ];

  var FERRIES = [
    { key:"trasmapi", tab:"Trasmapi", label:"PRIMERA ELECCIÓN SIN COCHE", title:"Frecuencia y billete abierto",
      text:"Es la primera opción si viajas sin coche. Buena frecuencia y billete de horario abierto, siempre sujeto a disponibilidad real ese día.", url:"https://www.trasmapi.com/horarios" },
    { key:"lines", tab:"Formentera Lines", label:"SEGUNDA ELECCIÓN", title:"Horario, flexibilidad o precio",
      text:"Compárala cuando su horario, su flexibilidad o su precio te convengan más. El billete abierto da margen; el de horario fijo exige revisar el horario 24 horas antes y llegar con antelación.", url:"https://www.formenteralines.com/horarios/" },
    { key:"balearia", tab:"Baleària", label:"VEHÍCULO O MÁS ESPACIO", title:"Cap de Barbaria, sin promesas",
      text:"Tiene sentido con un vehículo privado ya autorizado, para familias o si prefieres un ferry de mayor capacidad. Puede cubrir el Cap de Barbaria, pero eso no garantiza que opere la salida exacta que elijas.", url:"https://www.balearia.com/es/rutas-horarios/ferry-ibiza-formentera" }
  ];

  var FOOD = [
    { tag:"ES CALÓ · MAR", name:"Can Rafalet", price:"35–60 €", text:"Cocina marinera frente al pequeño puerto. Reserva y pregunta siempre por pieza, peso y precio del pescado.", url:"https://restaurantcanrafalet.com/", q:"Restaurant Can Rafalet Formentera" },
    { tag:"SANT FERRAN · HISTORIA", name:"Fonda Pepe", price:"15–35 €", text:"Institución histórica vinculada a la Formentera bohemia. Confirma apertura y qué parte del negocio sigue operativa.", q:"Fonda Pepe Formentera" },
    { tag:"MIGJORN · PRODUCTO", name:"Es Codol Foradat", price:"45–75 €", text:"Cocina reconocida frente al mar. No es una opción económica: reserva con intención.", q:"Es Codol Foradat Formentera" },
    { tag:"SANT FRANCESC", name:"Can Forn", price:"25–45 €", text:"Ensalada payesa con peix sec, frit de polp o cocina de producto local en el pueblo.", q:"Can Forn Formentera" },
    { tag:"ES PUJOLS · INFORMAL", name:"Macondo", price:"15–30 €", text:"Pizza y cena sencilla e informal, para descansar del pescado y de las cuentas frente al mar.", q:"Macondo Formentera" },
    { tag:"MIGJORN · AMBIENTE PLAYA", name:"Kiosko 62", price:"20–40 €", text:"Atardecer y ambiente relajado de chiringuito. Comprueba concesión, nombre y apertura de la temporada vigente.", q:"Kiosko 62 Formentera" }
  ];

  var PREP = ["Vuelo con margen real al ferry","Billete de ferry elegido y revisado","Traslado aeropuerto–puerto decidido","Vehículo (coche, bici o scooter) reservado en Formentera","Formentera.eco comprobado si llevas coche","Alojamiento con acceso real confirmado","Mesas importantes reservadas","Ferry de vuelta con margen, sin unirlo al vuelo"];

  var pace = "balanced";
  var day = 0;
  var trav = 0;
  var ferry = "trasmapi";
  var checked = [];

  // Recomendador de transporte
  var people = 2, kids = false, bike = true, moto = false, nights = 4, summer = true;

  function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  function mapUrl(q){ return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q); }
  function paceIndex(){ return pace === "slow" ? 0 : (pace === "balanced" ? 1 : 2); }
  function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

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
      + '<a href="'+esc(mapUrl(s.q))+'" target="_blank" rel="noopener noreferrer">Buscar alojamiento ↗</a>';
  }

  function renderFerryTabs(){
    document.getElementById("ferryTabs").innerHTML = FERRIES.map(function(f){
      return '<button type="button" class="'+(ferry===f.key?"active":"")+'" data-ferry="'+f.key+'">'+esc(f.tab)+'</button>';
    }).join("");
  }
  function renderFerryDetail(){
    var f = FERRIES.filter(function(x){ return x.key === ferry; })[0];
    document.getElementById("ferryDetail").innerHTML =
      '<span>'+esc(f.label)+'</span><h3>'+esc(f.title)+'</h3><p>'+esc(f.text)+'</p>'
      + '<a href="'+esc(f.url)+'" target="_blank" rel="noopener noreferrer">Consultar horarios ↗</a>';
  }

  function renderDayTabs(){
    document.getElementById("dayTabs").innerHTML = ROUTES.map(function(_, i){
      return '<button type="button" class="'+(day===i?"active":"")+'" data-day="'+i+'">DÍA '+String(i+1).padStart(2,"0")+'</button>';
    }).join("");
  }
  function renderDayDetail(){
    var d = ROUTES[day];
    var pi = paceIndex();
    var stops = d.stops[pi];
    var stopsHtml = stops.map(function(s, i){
      return '<li><span>'+String(i+1).padStart(2,"0")+'</span><strong>'+esc(s)+'</strong>'
        + '<a href="'+esc(mapUrl(s+" Formentera"))+'" target="_blank" rel="noopener noreferrer">MAPA ↗</a></li>';
    }).join("");
    document.getElementById("dayDetail").innerHTML =
      '<div><span>'+esc(d.tag)+'</span><h3>'+esc(d.title)+'</h3><b>'+esc(d.km[pi])+' APROX.</b><p>'+esc(d.note)+'</p><em>COMER · '+esc(d.eat)+'</em></div>'
      + '<ol>'+stopsHtml+'</ol>';
  }

  function renderFoodGrid(){
    document.getElementById("foodGrid").innerHTML = FOOD.map(function(f){
      var web = f.url ? '<a href="'+esc(f.url)+'" target="_blank" rel="noopener noreferrer">WEB ↗</a>' : "";
      return '<article><span>'+esc(f.tag)+'</span><h3>'+esc(f.name)+'</h3><b>'+esc(f.price)+'</b><p>'+esc(f.text)+'</p>'
        + '<div>'+web+'<a href="'+esc(mapUrl(f.q))+'" target="_blank" rel="noopener noreferrer">MAPS ↗</a></div></article>';
    }).join("");
  }

  // -----------------------------------------------------------
  // Lógica del recomendador de transporte (orden de prioridad)
  // 1. Excursión de un día (0 noches)
  // 2. Viaja con niños
  // 3. Grupo grande (5-6)
  // 4. Quiere pedalear y no hay niños
  // 5. Experiencia real en moto (sin niños, sin querer solo pedalear)
  // 6. Sin experiencia en moto -> nunca scooter
  // 7. Por defecto: transporte público
  // -----------------------------------------------------------
  function recommend(){
    if (nights === 0){
      return {
        tag: "EXCURSIÓN DE UN DÍA",
        title: "Nada de coche: solo ida y vuelta",
        why: "Coge el primer ferry, muévete en bicicleta eléctrica o en scooter (solo si ya tienes experiencia real) y vuelve antes del último servicio del día. Un coche no compensa para una sola jornada en la isla."
      };
    }
    if (kids){
      return {
        tag: "FAMILIA CON NIÑOS",
        title: "Coche pequeño, recogido en La Savina",
        why: bike
          ? "Aunque os apetezca pedalear, con niños gana el coche: toallas, agua, sombra, sillas y equipaje pesan más que las ganas de bici. Resérvalo en Formentera, nunca en Ibiza."
          : "Con niños ganan las toallas, el agua, la sombra, las sillas y el equipaje. Resérvalo en Formentera, nunca en Ibiza."
      };
    }
    if (people >= 5){
      return {
        tag: "GRUPO GRANDE",
        title: "Un coche local o dos vehículos pequeños",
        why: "Compara un coche de grupo con dos vehículos pequeños según equipaje y aparcamiento. Evita las furgonetas grandes: complican accesos y aparcamiento en los núcleos y en las calas."
      };
    }
    if (bike){
      return {
        tag: "PAREJA ACTIVA",
        title: "Bicicleta eléctrica + coche un día",
        why: "Pedalea la mayor parte del viaje: la isla es casi plana y las rutas verdes evitan el aparcamiento. Añade un coche local un solo día para La Mola, el equipaje o los recorridos más largos."
      };
    }
    if (moto){
      return {
        tag: "CON EXPERIENCIA REAL",
        title: "Scooter local, con casco siempre",
        why: "Ya conduces moto, así que adelante: scooter local. Casco obligatorio, calzado cerrado y cuidado con la arena, el viento, las rotondas, el calor y los caminos irregulares."
      };
    }
    return {
      tag: "SIN COCHE NI MOTO",
      title: "Autobús, y taxi si hace falta",
      why: "Formentera no es el lugar para aprender a conducir una moto en chanclas. Organiza el día alrededor de las líneas de Bus Formentera; los taxis existen, pero en agosto conviene pedirlos con margen. Eso sí, el bus no sirve para encadenar calas aisladas, restaurante, faro y atardecer en la misma tarde."
    };
  }

  function renderControls(){
    var el = document.getElementById("transportControls");
    el.innerHTML =
      '<div class="field"><b>VIAJEROS</b><div class="stepper">'
        + '<button type="button" data-people="-1" aria-label="Menos viajeros">−</button>'
        + '<span>'+people+'</span>'
        + '<button type="button" data-people="1" aria-label="Más viajeros">+</button>'
      + '</div></div>'
      + '<div class="field"><b>NOCHES</b><div class="stepper">'
        + '<button type="button" data-nights="-1" aria-label="Menos noches">−</button>'
        + '<span>'+nights+'</span>'
        + '<button type="button" data-nights="1" aria-label="Más noches">+</button>'
      + '</div></div>'
      + '<div class="field"><b>TEMPORADA</b><div class="toggle">'
        + '<button type="button" class="'+(summer?"active":"")+'" data-summer="1">Jun–sep (regulada)</button>'
        + '<button type="button" class="'+(!summer?"active":"")+'" data-summer="0">Fuera de temporada</button>'
      + '</div></div>'
      + '<div class="field"><b>VIAJAS CON NIÑOS</b><div class="toggle">'
        + '<button type="button" class="'+(kids?"active":"")+'" data-kids="1">Sí</button>'
        + '<button type="button" class="'+(!kids?"active":"")+'" data-kids="0">No</button>'
      + '</div></div>'
      + '<div class="field"><b>TE APETECE PEDALEAR</b><div class="toggle">'
        + '<button type="button" class="'+(bike?"active":"")+'" data-bike="1">Sí</button>'
        + '<button type="button" class="'+(!bike?"active":"")+'" data-bike="0">No</button>'
      + '</div></div>'
      + '<div class="field"><b>EXPERIENCIA REAL EN MOTO</b><div class="toggle">'
        + '<button type="button" class="'+(moto?"active":"")+'" data-moto="1">Sí</button>'
        + '<button type="button" class="'+(!moto?"active":"")+'" data-moto="0">No</button>'
      + '</div></div>';
  }

  function renderResult(){
    var r = recommend();
    var seasonText = summer
      ? "Estás en temporada regulada (1 jun–30 sep): cualquier coche, propio o de alquiler, necesita autorización de Formentera.eco antes de circular."
      : "Fuera del periodo regulado desaparecen las restricciones estacionales, pero siguen mandando el contrato del alquiler, el ferry y el sentido común.";
    document.getElementById("transportResult").innerHTML =
      '<div><span>'+esc(r.tag)+'</span><h3>'+esc(r.title)+'</h3></div>'
      + '<p>'+esc(r.why)+'</p>'
      + '<div class="season">'+esc(seasonText)+'</div>';
  }

  function saveChecked(){ try { localStorage.setItem("formentera-prep", JSON.stringify(checked)); } catch(e){} }
  function loadChecked(){
    try { var saved = localStorage.getItem("formentera-prep"); if (saved) checked = JSON.parse(saved) || []; } catch(e){}
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
    var ferryBtn = e.target.closest("[data-ferry]");
    if (ferryBtn){ ferry = ferryBtn.getAttribute("data-ferry"); renderFerryTabs(); renderFerryDetail(); return; }
    var dayBtn = e.target.closest("[data-day]");
    if (dayBtn){ day = parseInt(dayBtn.getAttribute("data-day"),10); renderDayTabs(); renderDayDetail(); return; }

    var peopleBtn = e.target.closest("[data-people]");
    if (peopleBtn){ people = clamp(people + parseInt(peopleBtn.getAttribute("data-people"),10), 1, 6); renderControls(); renderResult(); return; }
    var nightsBtn = e.target.closest("[data-nights]");
    if (nightsBtn){ nights = clamp(nights + parseInt(nightsBtn.getAttribute("data-nights"),10), 0, 10); renderControls(); renderResult(); return; }
    var summerBtn = e.target.closest("[data-summer]");
    if (summerBtn){ summer = summerBtn.getAttribute("data-summer") === "1"; renderControls(); renderResult(); return; }
    var kidsBtn = e.target.closest("[data-kids]");
    if (kidsBtn){ kids = kidsBtn.getAttribute("data-kids") === "1"; renderControls(); renderResult(); return; }
    var bikeBtn = e.target.closest("[data-bike]");
    if (bikeBtn){ bike = bikeBtn.getAttribute("data-bike") === "1"; renderControls(); renderResult(); return; }
    var motoBtn = e.target.closest("[data-moto]");
    if (motoBtn){ moto = motoBtn.getAttribute("data-moto") === "1"; renderControls(); renderResult(); return; }
  });
  document.addEventListener("change", function(e){
    if (e.target.matches('#checklistWrap input[type="checkbox"]')){ toggleTask(parseInt(e.target.getAttribute("data-idx"),10)); }
  });

  loadChecked();
  renderPaceTabs();
  renderTravTabs();
  renderStayDetail();
  renderFerryTabs();
  renderFerryDetail();
  renderControls();
  renderResult();
  renderDayTabs();
  renderDayDetail();
  renderFoodGrid();
  renderChecklist();
})();
