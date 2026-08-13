// ============================================================
// Barcelona en 5 días · datos e interacción
// Puerto a plano de app/page.tsx (React) entregado por Óscar.
// Misma información, sin framework.
// ============================================================
(function(){
  var PACE_LABEL = { slow:"Disfrutar sin correr", balanced:"Quiero verlo bien", intense:"No me importa terminar cansado" };
  var PACE_SMALL = { slow:"3–4 km/día", balanced:"6–8 km/día · recomendado", intense:"10–14 km/día" };

  var DAYS = {
    slow:[
      {tag:"DÍA 01 · CIUTAT VELLA",title:"La ciudad antes de Gaudí",km:"4 km",stops:["Catedral y Plaça del Rei","Call y Plaça Sant Jaume","Santa María del Mar","El Born"],text:"Pocas paradas y tiempo para mirar. Las Ramblas se cruzan; no se les entrega el día.",eat:"Can Culleretes · Bar Alegría"},
      {tag:"DÍA 02 · EIXAMPLE",title:"Un icono bien elegido",km:"4 km",stops:["Sagrada Família","Sant Pau exterior","Passeig de Gràcia","Casa Batlló o La Pedrera"],text:"Entra en Sagrada Família y elige una sola casa de Gaudí. No necesitas pagar todos los interiores.",eat:"El Veracruz · Eixample"},
      {tag:"DÍA 03 · GRÀCIA",title:"Plazas donde aún vive gente",km:"4 km",stops:["Park Güell","Plaça Virreina","Mercat de la Llibertat","Carrer Verdi"],text:"Park Güell temprano y una tarde sin objetivos entre plazas, mercado y barrio.",eat:"Cal Boter · La Pubilla"},
      {tag:"DÍA 04 · MAR",title:"Montjuïc sin agotarte",km:"4 km",stops:["Teleférico o bus","Mirador de Montjuïc","Poble-sec","Bogatell y Poblenou"],text:"Utiliza transporte en la montaña y guarda energía para el Mediterráneo.",eat:"Bodega Amposta · Poblenou"},
      {tag:"DÍA 05 · MONTSERRAT",title:"La montaña a tu alcance",km:"2–3 km",stops:["R5 desde Plaça Espanya","Cremallera","Monasterio","Miradores próximos"],text:"La versión cultural y paisajística, sin senderos largos ni prisas.",eat:"Cena catalana al regresar"}
    ],
    balanced:[
      {tag:"DÍA 01 · CIUTAT VELLA",title:"La ciudad antes de Gaudí",km:"7 km",stops:["Catedral y Plaça del Rei","Call y Gótico","Santa María del Mar","El Born","Ciutadella","Arc de Triomf"],text:"La Barcelona medieval enlazada a pie hasta el gran parque de la ciudad.",eat:"Can Culleretes · Bar Alegría"},
      {tag:"DÍA 02 · MODERNISME",title:"Gaudí sin parque temático",km:"7 km",stops:["Sagrada Família","Recinte Sant Pau","Passeig Sant Joan","La Pedrera","Casa Batlló","Rambla Catalunya"],text:"Sagrada Família por dentro. En Passeig de Gràcia, elige otra entrada y contempla el resto.",eat:"El Veracruz · Esquerra Eixample"},
      {tag:"DÍA 03 · GRÀCIA",title:"La ciudad también es barrio",km:"7 km",stops:["Park Güell temprano","Baixada de la Glòria","Virreina y Diamant","Mercat Llibertat","Carrer Verdi","Mirador del Carmel"],text:"Del Gaudí más visitado a las plazas donde Barcelona continúa viviendo.",eat:"Cal Boter · La Pubilla"},
      {tag:"DÍA 04 · MONTJUÏC Y MAR",title:"De la montaña al Mediterráneo",km:"8 km",stops:["Plaça Espanya","Jardines de Montjuïc","Zona Olímpica","Poble-sec","Bogatell","Rambla Poblenou"],text:"No todo el mar es Barceloneta. Terminamos donde la playa convive mejor con el barrio.",eat:"Bodega Amposta · Casa Tapas Cañota"},
      {tag:"DÍA 05 · MONTSERRAT",title:"Salir para entender Cataluña",km:"5–7 km",stops:["R5 y cremallera","Monasterio","Funicular disponible","Ruta corta señalizada","Regreso a Barcelona"],text:"Una jornada de roca, espiritualidad y paisaje que cambia por completo el viaje.",eat:"Cena final de cocina catalana"}
    ],
    intense:[
      {tag:"DÍA 01 · CIUTAT VELLA",title:"Tres barrios en un día",km:"12 km",stops:["Sant Antoni","Raval con ruta directa","Gótico completo","Born","Ciutadella","Arc de Triomf","Barceloneta al atardecer"],text:"La ciudad histórica de oeste a este, sin convertir Las Ramblas en el centro del viaje.",eat:"Cova Fumada · Can Culleretes"},
      {tag:"DÍA 02 · MODERNISME",title:"El Eixample completo",km:"11 km",stops:["Sagrada Família","Sant Pau interior","Passeig Sant Joan","La Pedrera","Casa Batlló","Quadrat d'Or"],text:"Para quien quiere leer la arquitectura caminando toda la cuadrícula de Cerdà.",eat:"El Veracruz · Bar Alegría"},
      {tag:"DÍA 03 · COLINAS",title:"Gràcia desde arriba",km:"12 km",stops:["Park Güell","Gràcia completa","Turó de la Rovira","Bunkers del Carmel","Descenso a Guinardó"],text:"Cuestas, miradores y barrios altos. Lleva agua y evita el centro del día en verano.",eat:"Cal Boter · La Pubilla"},
      {tag:"DÍA 04 · MONTJUÏC Y LITORAL",title:"Barcelona de arriba abajo",km:"14 km",stops:["Montjuïc a pie","Castillo","Poble-sec","Port Vell","Barceloneta","Bogatell","Poblenou"],text:"Una diagonal completa desde la montaña hasta las playas menos saturadas.",eat:"Bodega Amposta · Poblenou"},
      {tag:"DÍA 05 · MONTSERRAT",title:"La montaña se camina",km:"10+ km",stops:["Primer R5 posible","Monasterio","Funicular","Sendero según meteorología","Miradores","Último tren seguro"],text:"Selecciona una ruta oficial acorde a tu nivel y deja margen para regresar.",eat:"Picnic preparado · cena en Barcelona"}
    ]
  };

  var STAYS = [
    {who:"2 PERSONAS", name:"Aramunt · Estudio", zone:"Eixample", text:"Cocina, terraza, recepción 24 h y una base que permite volver andando.", url:"https://www.aramunt-apartments.com/es"},
    {who:"3–4 PERSONAS", name:"Easy Sleep · Gaudí", zone:"Sagrada Família", text:"Apartamento profesional de una habitación, cocina y buena conexión de metro.", url:"https://www.easysleepbarcelona.com/es/"},
    {who:"5–6 PERSONAS", name:"Easy Sleep · 2/3 habitaciones", zone:"Eixample", text:"Hasta seis personas, varios dormitorios y opciones con dos baños.", url:"https://www.easysleepbarcelona.com/es/"},
    {who:"GRUPO", name:"Easy Sleep Born / Habitat", zone:"Born o Eixample", text:"Gestión profesional para 7–8 huéspedes. Mejor que improvisar con un anuncio sin licencia.", url:"https://www.habitatapartments.com/es"}
  ];

  var PREP = ["Alojamiento profesional comprobado","Sagrada Família reservada","Park Güell reservado","Una casa de Gaudí elegida","Montserrat planificado","Restaurantes clave reservados","Billete de transporte decidido","Documentación separada y segura"];

  var pace = "balanced";
  var day = 0;
  var trav = 1;
  var checked = [];

  function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  function mapUrl(q){ return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q); }

  function renderPaceTabs(){
    var keys = ["slow","balanced","intense"];
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
      + '<a target="_blank" rel="noreferrer" href="'+esc(s.url)+'">Consultar alojamiento ↗</a>';
  }

  function renderDayTabs(){
    document.getElementById("dayTabs").innerHTML = DAYS[pace].map(function(_, i){
      return '<button type="button" class="'+(day===i?"active":"")+'" data-day="'+i+'">DÍA '+(i+1)+'</button>';
    }).join("");
    document.getElementById("routeLabel").textContent = "04 · ITINERARIO · " + PACE_LABEL[pace];
  }
  function renderDayDetail(){
    var d = DAYS[pace][day];
    var stopsHtml = d.stops.map(function(s, i){
      return '<li><span>'+String(i+1).padStart(2,"0")+'</span><strong>'+esc(s)+'</strong>'
        + '<a href="'+mapUrl(s+" Barcelona")+'" target="_blank" rel="noreferrer">MAPA ↗</a></li>';
    }).join("");
    document.getElementById("dayDetail").innerHTML =
      '<div><span>'+esc(d.tag)+'</span><h3>'+esc(d.title)+'</h3><b>'+esc(d.km)+' APROX.</b><p>'+esc(d.text)+'</p><em>COMER · '+esc(d.eat)+'</em></div>'
      + '<ol>'+stopsHtml+'</ol>';
  }

  function saveChecked(){ try { localStorage.setItem("bcn-prep", JSON.stringify(checked)); } catch(e){} }
  function loadChecked(){
    try { var saved = localStorage.getItem("bcn-prep"); if (saved) checked = JSON.parse(saved) || []; } catch(e){}
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
  });
  document.addEventListener("change", function(e){
    if (e.target.matches('#checklistWrap input[type="checkbox"]')){ toggleTask(parseInt(e.target.getAttribute("data-idx"),10)); }
  });

  loadChecked();
  renderPaceTabs();
  renderTravTabs();
  renderStayDetail();
  renderDayTabs();
  renderDayDetail();
  renderChecklist();
})();
