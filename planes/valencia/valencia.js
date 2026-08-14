// ============================================================
// Valencia en 4 días · datos e interacción
// Puerto a plano de app/page.tsx (React) entregado por Óscar.
// Misma información, sin framework.
// ============================================================
(function(){
  var PACE_LABEL = { slow:"Disfrutar sin correr", balanced:"Quiero verlo bien", full:"No me importa caminar mucho" };
  var PACE_SMALL = { slow:"3–4 km/día", balanced:"6–9 km/día · recomendado", full:"10–15 km/día" };

  var DAYS = {
    slow:[
      {tag:"DÍA 01 · CENTRO",title:"Valencia antes del futuro",km:"4 km",stops:["Plaza de la Virgen","Catedral","Lonja de la Seda","Mercado Central"],text:"El centro esencial sin convertirlo en una carrera de torres y plazas.",eat:"El Forcat · La Riuà"},
      {tag:"DÍA 02 · TURIA",title:"Un río sin agua",km:"4 km",stops:["Jardín del Turia","Gulliver","Ciudad de las Artes exterior","Ruzafa"],text:"Utiliza bus o bicicleta y decide si el Oceanogràfic merece medio día.",eat:"Esmorzaret · cena en Ruzafa"},
      {tag:"DÍA 03 · PINEDO",title:"El paisaje que explica la paella",km:"3 km",stops:["Playa de Pinedo","Restaurante Mediterráneo","El Saler","Barca por la Albufera"],text:"Comida reservada y paseo en barca al atardecer. Este día no se negocia.",eat:"Restaurante Mediterráneo"},
      {tag:"DÍA 04 · MAR",title:"El barrio que mira al Mediterráneo",km:"4 km",stops:["Mercado del Cabanyal","Calles marineras","Marina","Playa del Cabanyal"],text:"Barrio, paseo y mar sin necesidad de llegar hasta Patacona.",eat:"Cabanyal · horchata final"}
    ],
    balanced:[
      {tag:"DÍA 01 · CIUTAT VELLA",title:"Dos mil años a pie",km:"7 km",stops:["Torres de Serranos","Plaza de la Virgen","Catedral","Marqués de Dos Aguas","Lonja","Mercado Central","El Carmen","Torres de Quart"],text:"La Valencia histórica completa, terminando donde el barrio empieza a cenar.",eat:"El Forcat · La Riuà"},
      {tag:"DÍA 02 · TURIA Y RUZAFA",title:"La ciudad construida en un río",km:"7–9 km",stops:["Esmorzaret","Jardín del Turia","Gulliver","Ciudad de las Artes","Ruzafa","Mercado de Colón"],text:"Nuestra recomendación: bicicleta por el cauce y tarde sin prisas en Ruzafa.",eat:"Trinquet de Pelayo · Ruzafa"},
      {tag:"DÍA 03 · PINEDO Y ALBUFERA",title:"Del Mediterráneo al arrozal",km:"5–7 km",stops:["Playa de Pinedo","Paella en Mediterráneo","Devesa de El Saler","Miradores","Paseo en barca","Atardecer"],text:"Primero la playa local, después el arroz y finalmente el paisaje que lo hizo posible.",eat:"Restaurante Mediterráneo · 963 247 145"},
      {tag:"DÍA 04 · CABANYAL",title:"La Valencia que vive junto al mar",km:"8 km",stops:["Mercado del Cabanyal","Arquitectura popular","Marina","Cabanyal","Malvarrosa","Patacona","Horchata en Alboraya"],text:"El último día no repite una postal: conecta barrio, playa y huerta.",eat:"Casa Carmela o producto del Cabanyal"}
    ],
    full:[
      {tag:"DÍA 01 · CENTRO",title:"De Serranos a Ruzafa",km:"12 km",stops:["Serranos","Centro completo","El Carmen","Torres de Quart","Turia","Estación del Norte","Ruzafa"],text:"Todo el eje histórico y regreso caminando por la ciudad contemporánea.",eat:"La Riuà · Ruzafa"},
      {tag:"DÍA 02 · CAUCE COMPLETO",title:"De Cabecera al futuro",km:"15 km",stops:["Parque de Cabecera","Bioparc exterior","Turia completo","Gulliver","Ciudad de las Artes","Oceanogràfic o Marina"],text:"Ideal en bicicleta. A pie exige calor moderado y buenas piernas.",eat:"Esmorzaret · Camins al Grau"},
      {tag:"DÍA 03 · NATURALEZA",title:"Pinedo, Devesa y Albufera",km:"10+ km",stops:["Pinedo","Restaurante Mediterráneo","L'Arbre del Gos","Devesa","El Saler","Arrozales","Barca al atardecer"],text:"La versión larga recorre el corredor natural entre playa, pinar, arrozal y lago.",eat:"Restaurante Mediterráneo"},
      {tag:"DÍA 04 · LITORAL",title:"Del puerto a la huerta",km:"13 km",stops:["Cabanyal","Marina","Malvarrosa","Patacona","Port Saplaya opcional","Alboraya"],text:"Todo el litoral urbano y final con horchata cerca de donde nace la chufa.",eat:"Cabanyal · Alboraya"}
    ]
  };

  var STAYS = [
    {who:"2 PERSONAS", name:"Parker The Urban Flats", zone:"Centro", text:"Lofts de 50 m², cocina y regreso caminando. Una base cómoda para una pareja.", url:"https://parkerurbanflats.com/en/"},
    {who:"3–4 PERSONAS", name:"Living Valencia", zone:"Ciutat Vella", text:"Apartamentos profesionales junto a Mercado Central, Lonja y Catedral.", url:"https://www.livingvalencia.com/es"},
    {who:"5–6 PERSONAS", name:"Valenciaflats Ciudad de las Ciencias", zone:"Quatre Carreres", text:"Dos dormitorios, cocina, recepción 24 h y capacidad real para seis.", url:"https://www.valenciaflats.com/"},
    {who:"GRUPO", name:"Valenciaflats · varios apartamentos", zone:"Centro o Ciencias", text:"Gestión centralizada para alojar al grupo cerca, sin depender de anuncios particulares.", url:"https://www.valenciaflats.com/"}
  ];

  var FOOD = [
    {tag:"IMPRESCINDIBLE · DÍA 3", name:"Restaurante Mediterráneo", price:"Reserva semanas antes", text:"Chiringuito de Pinedo con enorme afluencia local los fines de semana. Paella valenciana al mediodía. Confirma el arroz al reservar.", phone:"963 247 145", url:"https://mediterraneorestaurante.es/es/ubicacio/", q:"Restaurante Mediterráneo Pinedo Valencia"},
    {tag:"CENTRO", name:"El Forcat", price:"25–40 €", text:"Arroces y cocina valenciana tradicional en Ciutat Vella.", q:"El Forcat Valencia"},
    {tag:"CENTRO · ALTERNATIVA", name:"La Riuà", price:"20–35 €", text:"Recetario valenciano y una buena dirección para buscar arroz al horno.", q:"La Riua Valencia"},
    {tag:"ESMORZARET", name:"Trinquet de Pelayo", price:"10–20 €", text:"Cacaus, aceitunas, bocadillo, bebida y cremaet. No lo llames brunch.", q:"Pelayo Gastro Trinquet Valencia"},
    {tag:"MALVARROSA", name:"Casa Carmela", price:"30–50 €", text:"Paella a leña junto al mar. Si ya comiste paella en Pinedo, pide otra experiencia local.", q:"Casa Carmela Valencia"},
    {tag:"FINAL", name:"Horchata en Alboraya", price:"5–12 €", text:"Horchata y fartons cerca del paisaje de la chufa, no como trámite en el centro.", q:"horchateria Alboraya Valencia"}
  ];

  var PREP = ["Alojamiento reservado","Mediterráneo reservado por teléfono","Paella confirmada al reservar","Paseo en barca Albufera","Oceanogràfic decidido","Bicicleta o transporte decidido","Bañador y protección solar","Esmorzaret colocado en la ruta"];

  var OCEAN_TEXT = {
    false: "Si prefieres barrios y naturaleza, mira el conjunto arquitectónico por fuera y guarda esas horas para Pinedo, Cabanyal o la Albufera.",
    true: "Viajas con niños o te interesa especialmente la vida marina: reserva y dale varias horas. Gulliver encaja el mismo día."
  };

  var pace = "balanced";
  var day = 0;
  var trav = 1;
  var kids = false;
  var checked = [];

  function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  function mapUrl(q){ return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q); }
  function telHref(phone){ return "tel:+34" + phone.replace(/\s+/g,""); }

  function renderPaceTabs(){
    var keys = ["slow","balanced","full"];
    document.getElementById("paceTabs").innerHTML = keys.map(function(p, i){
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

  function renderOcean(){
    document.getElementById("oceanText").textContent = OCEAN_TEXT[kids];
    document.getElementById("oceanSwitch").innerHTML =
      '<button type="button" class="'+(!kids?"active":"")+'" data-kids="0">Prefiero barrios y naturaleza</button>'
      + '<button type="button" class="'+(kids?"active":"")+'" data-kids="1">Viajo con niños / quiero entrar</button>';
  }

  function renderDayTabs(){
    document.getElementById("dayTabs").innerHTML = DAYS[pace].map(function(_, i){
      return '<button type="button" class="'+(day===i?"active":"")+'" data-day="'+i+'">DÍA 0'+(i+1)+'</button>';
    }).join("");
    document.getElementById("routeLabel").textContent = "05 · ITINERARIO · " + PACE_LABEL[pace];
  }
  function renderDayDetail(){
    var d = DAYS[pace][day];
    var stopsHtml = d.stops.map(function(s, i){
      return '<li><span>'+String(i+1).padStart(2,"0")+'</span><strong>'+esc(s)+'</strong>'
        + '<a href="'+mapUrl(s+" Valencia")+'" target="_blank" rel="noopener noreferrer">MAPA ↗</a></li>';
    }).join("");
    document.getElementById("dayDetail").innerHTML =
      '<div><span>'+esc(d.tag)+'</span><h3>'+esc(d.title)+'</h3><b>'+esc(d.km)+' APROX.</b><p>'+esc(d.text)+'</p><em>COMER · '+esc(d.eat)+'</em></div>'
      + '<ol>'+stopsHtml+'</ol>';
  }

  function renderFoodGrid(){
    document.getElementById("foodGrid").innerHTML = FOOD.map(function(f){
      var phoneHtml = f.phone ? '<a href="'+telHref(f.phone)+'">TEL. '+esc(f.phone)+'</a>' : "";
      var webHtml = f.url ? '<a href="'+esc(f.url)+'" target="_blank" rel="noopener noreferrer">WEB ↗</a>' : "";
      return '<article><span>'+esc(f.tag)+'</span><h3>'+esc(f.name)+'</h3><b>'+esc(f.price)+'</b><p>'+esc(f.text)+'</p>'
        + phoneHtml
        + '<div>'+webHtml+'<a href="'+mapUrl(f.q)+'" target="_blank" rel="noopener noreferrer">MAPS ↗</a></div></article>';
    }).join("");
  }

  function saveChecked(){ try { localStorage.setItem("valencia-prep", JSON.stringify(checked)); } catch(e){} }
  function loadChecked(){
    try { var saved = localStorage.getItem("valencia-prep"); if (saved) checked = JSON.parse(saved) || []; } catch(e){}
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
    if (paceBtn){ pace = paceBtn.getAttribute("data-pace"); day = 0; renderPaceTabs(); renderDayTabs(); renderDayDetail(); return; }
    var travBtn = e.target.closest("[data-trav]");
    if (travBtn){ trav = parseInt(travBtn.getAttribute("data-trav"),10); renderTravTabs(); renderStayDetail(); return; }
    var dayBtn = e.target.closest("[data-day]");
    if (dayBtn){ day = parseInt(dayBtn.getAttribute("data-day"),10); renderDayTabs(); renderDayDetail(); return; }
    var kidsBtn = e.target.closest("[data-kids]");
    if (kidsBtn){ kids = kidsBtn.getAttribute("data-kids") === "1"; renderOcean(); return; }
  });
  document.addEventListener("change", function(e){
    if (e.target.matches('#checklistWrap input[type="checkbox"]')){ toggleTask(parseInt(e.target.getAttribute("data-idx"),10)); }
  });

  loadChecked();
  renderPaceTabs();
  renderTravTabs();
  renderStayDetail();
  renderOcean();
  renderDayTabs();
  renderDayDetail();
  renderFoodGrid();
  renderChecklist();
})();
