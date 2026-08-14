// ============================================================
// Sevilla en 4 días · datos e interacción
// Puerto a plano de app/page.tsx (React) entregado por Óscar.
// Misma información, sin framework.
// ============================================================
(function(){
  var PACE_LABEL = { slow:"Poco y bien", balanced:"Quiero verla bien", full:"No me importa caminar" };
  var PACE_SMALL = { slow:"3–5 km/día", balanced:"6–8 km/día · recomendado", full:"10–12 km/día" };
  var PACE_KEYS = ["slow","balanced","full"];

  var ROUTES = [
    { tag:"DÍA 01 · MONUMENTAL", title:"La ciudad que levantó imperios", km:["4 km","7 km","10 km"],
      stops:[["Real Alcázar","Santa Cruz","Las Columnas"],["Real Alcázar","Santa Cruz","Catedral y Giralda","Arenal","Las Columnas"],["Alcázar","Santa Cruz","Catedral y Giralda","Archivo de Indias","Arenal","Cena junto a la Giralda"]],
      note:"Alcázar a primera hora. Catedral después y cena económica bajo la Giralda.", eat:"Las Columnas · alternativa Bar Catedral" },
    { tag:"DÍA 02 · TRIANA", title:"Cruzar el puente de verdad", km:["4 km","7 km","10 km"],
      stops:[["Mercado de Triana","Las Golondrinas","Paseo de la O"],["Mercado de Triana","Alfarería","Las Golondrinas","Pureza","Calle Betis","Paseo de la O"],["Castillo de San Jorge","Alfarería","San Jacinto","Las Golondrinas","Pureza","Santa Ana","Betis","Paseo de la O"]],
      note:"Calle Betis arriba; paseo de Nuestra Señora de la O abajo, pegado al río. Atardecer frente a Sevilla.", eat:"Las Golondrinas · punta, caballito y chipirones" },
    { tag:"DÍA 03 · RÍO E INDIAS", title:"Del albero al puerto de América", km:["5 km","8 km","11 km"],
      stops:[["Plaza de España","María Luisa","Torre del Oro","Torre de la Plata"],["Plaza de España","María Luisa","San Telmo","Torre del Oro","Torre de la Plata","Casa de la Moneda","Archivo de Indias"],["Plaza de España","María Luisa","San Telmo","Torre del Oro","Torre de la Plata","Torre llamada del Bronce","Casa de la Moneda","Atarazanas","Archivo de Indias"]],
      note:"Primero defendieron el puerto. Después, ese río convirtió Sevilla en puerta de América.", eat:"Casa Morales · Blanco Cerrillo" },
    { tag:"DÍA 04 · PROFUNDA", title:"Más allá de la postal", km:["4 km","7 km","10 km"],
      stops:[["Macarena","San Lorenzo","Casa Ricardo","Alameda"],["Murallas de la Macarena","San Lorenzo","Gran Poder","Casa Ricardo","Alameda","Setas"],["Macarena","San Luis","San Lorenzo","Casa Ricardo","Alameda","Dueñas","Setas","El Rinconcillo"]],
      note:"Barrios, muralla y tabernas. Puedes cambiar este día por Itálica.", eat:"Casa Ricardo · El Rinconcillo" }
  ];

  var ITALICA_STOPS = ["Bus a Santiponce","Conjunto Arqueológico de Itálica","Anfiteatro","Regreso a Sevilla","Alameda al atardecer"];
  var ITALICA_TITLE = "Itálica, sin rellenar";
  var ITALICA_NOTE = "Arqueología de verdad a pocos kilómetros. Comprueba acceso oficial.";

  var STAYS = [
    { who:"2 PERSONAS", name:"Arenal", zone:"PRIMERA OPCIÓN", text:"Entre Catedral, río y Triana. Todo cerca sin dormir dentro de la zona más saturada.", q:"apartamentos Arenal Sevilla" },
    { who:"3–4 PERSONAS", name:"Alfalfa", zone:"CENTRO Y TAPAS", text:"Muy cómoda. Comprueba ruido y aire acondicionado en la vivienda exacta.", q:"apartamentos Alfalfa Sevilla" },
    { who:"5–6 PERSONAS", name:"Triana", zone:"VOLVER AL BARRIO", text:"Más espacio y una vuelta nocturna cruzando el puente que forma parte del viaje.", q:"apartamentos Triana Sevilla" },
    { who:"GRUPO", name:"Alameda", zone:"VARIAS UNIDADES", text:"Mejor apartamentos próximos bajo una gestión que una casa enorme lejos de todo.", q:"apartamentos Alameda Sevilla" }
  ];

  var FOOD = [
    { tag:"DÍA 1 · GIRALDA", name:"Las Columnas", price:"10–20 €", text:"Pringá, carrillada y tortilla de bacalao. Ambiente, barra y terraza pequeña; no una cena silenciosa.", phone:"954 211 694", q:"Bodega Santa Cruz Las Columnas Sevilla" },
    { tag:"SEGUNDA OPCIÓN", name:"Bar Catedral", price:"20–35 €", text:"Más cómodo para sentarse en Mateos Gago, con vistas directas a la Giralda.", url:"https://www.barcatedral.com/", q:"Bar Catedral Sevilla" },
    { tag:"DÍA 2 · TRIANA", name:"Las Golondrinas", price:"15–30 €", text:"Caballito de jamón, punta de solomillo y chipirones a la plancha.", url:"https://familialasgolondrinas.com/", q:"Las Golondrinas Antillano Campos Sevilla" },
    { tag:"DÍA 3 · TABERNA", name:"Casa Morales", price:"15–30 €", text:"Bodega de 1850. Entra en la zona de las enormes tinajas.", phone:"954 221 242", url:"https://www.casamoralessevilla.es/", q:"Casa Morales Sevilla" },
    { tag:"DÍA 4 · SAN LORENZO", name:"Casa Ricardo", price:"15–30 €", text:"Croquetas de jamón y cocina sevillana en un barrio con personalidad.", phone:"954 389 751", url:"https://casaricardosevilla.com/", q:"Casa Ricardo Sevilla" },
    { tag:"DESDE 1670", name:"El Rinconcillo", price:"20–35 €", text:"Espinacas con garbanzos y cocina tradicional en una institución.", phone:"954 223 183", url:"https://www.elrinconcillo.es/contacto/", q:"El Rinconcillo Sevilla" }
  ];

  var PREP = ["Alojamiento con aire acondicionado","Alcázar reservado","Catedral y Giralda reservadas","AVE y low cost comparados con precio final","Modo calor decidido","Calzado cómodo","Protección solar y agua","Itálica o barrios decidido"];

  var HOT_TEXT = "Primera hora, pausa larga después de comer y regreso a la calle al caer el sol. Plaza de España a las 16:00 queda prohibida por sentido común.";
  var MILD_TEXT = "Puedes enlazar visitas, aunque Alcázar y Plaza de España siguen ganando temprano: menos gente y mejor luz.";

  var pace = "balanced";
  var day = 0;
  var trav = 0;
  var hot = true;
  var italica = false;
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
      + '<a href="'+esc(mapUrl(s.q))+'" target="_blank" rel="noopener noreferrer">Buscar alojamiento ↗</a>';
  }

  function renderDecision(){
    document.getElementById("decisionText").textContent = hot ? HOT_TEXT : MILD_TEXT;
    document.getElementById("heatSwitch").innerHTML =
      '<button type="button" class="'+(hot?"active":"")+'" data-hot="1">Viajo con calor</button>'
      + '<button type="button" class="'+(!hot?"active":"")+'" data-hot="0">Clima suave</button>';
  }

  function renderDayTabs(){
    document.getElementById("dayTabs").innerHTML = ROUTES.map(function(_, i){
      return '<button type="button" class="'+(day===i?"active":"")+'" data-day="'+i+'">DÍA '+String(i+1).padStart(2,"0")+'</button>';
    }).join("");
  }
  function renderDayDetail(){
    var d = ROUTES[day];
    var pi = paceIndex();
    var useItalica = italica && day === 3;
    var title = useItalica ? ITALICA_TITLE : d.title;
    var note = useItalica ? ITALICA_NOTE : d.note;
    var stops = useItalica ? ITALICA_STOPS : d.stops[pi];
    var choiceBtn = day === 3
      ? '<button type="button" class="routeChoice" data-italica-toggle="1">'+(italica?"Prefiero barrios":"Cambiar por Itálica")+'</button>'
      : "";
    var stopsHtml = stops.map(function(s, i){
      return '<li><span>'+String(i+1).padStart(2,"0")+'</span><strong>'+esc(s)+'</strong>'
        + '<a href="'+esc(mapUrl(s+" Sevilla"))+'" target="_blank" rel="noopener noreferrer">MAPA ↗</a></li>';
    }).join("");
    document.getElementById("dayDetail").innerHTML =
      '<div><span>'+esc(d.tag)+'</span><h3>'+esc(title)+'</h3><b>'+esc(d.km[pi])+' APROX.</b><p>'+esc(note)+'</p><em>COMER · '+esc(d.eat)+'</em>'+choiceBtn+'</div>'
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

  function saveChecked(){ try { localStorage.setItem("sevilla-prep", JSON.stringify(checked)); } catch(e){} }
  function loadChecked(){
    try { var saved = localStorage.getItem("sevilla-prep"); if (saved) checked = JSON.parse(saved) || []; } catch(e){}
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
    var hotBtn = e.target.closest("[data-hot]");
    if (hotBtn){ hot = hotBtn.getAttribute("data-hot") === "1"; renderDecision(); return; }
    var dayBtn = e.target.closest("[data-day]");
    if (dayBtn){ day = parseInt(dayBtn.getAttribute("data-day"),10); renderDayTabs(); renderDayDetail(); return; }
    var italicaBtn = e.target.closest("[data-italica-toggle]");
    if (italicaBtn){ italica = !italica; renderDayDetail(); return; }
  });
  document.addEventListener("change", function(e){
    if (e.target.matches('#checklistWrap input[type="checkbox"]')){ toggleTask(parseInt(e.target.getAttribute("data-idx"),10)); }
  });

  loadChecked();
  renderPaceTabs();
  renderTravTabs();
  renderStayDetail();
  renderDecision();
  renderDayTabs();
  renderDayDetail();
  renderFoodGrid();
  renderChecklist();
})();
