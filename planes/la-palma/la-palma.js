// ============================================================
// La Palma en 4 días · datos e interacción
// Puerto a plano de app/page.tsx (React) entregado por Óscar.
// Misma información, sin framework.
// ============================================================
(function(){
  var ROUTES = {
    poco: { name:"Caminar poco", claim:"Verla sin grandes esfuerzos",
      days:[
        { id:"verde", short:"DÍA 1", title:"La isla verde", zone:"Santa Cruz · Los Tilos · nordeste", route:"Santa Cruz → Los Tilos → San Andrés",
          stops:[
            {time:"09:00", title:"Santa Cruz de La Palma", text:"Balcones, Plaza de España, mercado y una capital que se recorre andando sin esfuerzo.", map:"https://maps.google.com/?q=Santa+Cruz+de+La+Palma"},
            {time:"12:00", title:"Los Tilos", text:"Centro de visitantes y recorrido corto sujeto al estado oficial de los accesos.", map:"https://maps.google.com/?q=Los+Tilos+La+Palma"},
            {time:"16:00", title:"San Andrés y Sauces", text:"Casco, plataneras y Charco Azul si el mar está tranquilo.", map:"https://maps.google.com/?q=Charco+Azul+La+Palma"}
          ]},
        { id:"cielo", short:"DÍA 2", title:"Por encima de la Caldera", zone:"Roque de los Muchachos · Garafía", route:"Oeste → Roque → Garafía → El Time",
          stops:[
            {time:"08:30", title:"Roque de los Muchachos", text:"Miradores principales y centro de visitantes. Arriba puede hacer frío aunque abajo sea verano.", map:"https://maps.google.com/?q=Roque+de+los+Muchachos"},
            {time:"14:00", title:"Garafía", text:"Almuerzo y pueblos del norte sin sumar una caminata larga."},
            {time:"18:00", title:"Mirador de El Time", text:"La vista que explica el valle, las coladas y la nueva costa.", map:"https://maps.google.com/?q=Mirador+de+El+Time"}
          ]},
        { id:"caldera", short:"DÍA 3", title:"El corazón de la isla", zone:"La Cumbrecita · Los Llanos · Tazacorte", route:"El Paso → Cumbrecita → Los Llanos → Tazacorte",
          stops:[
            {time:"09:00", title:"La Cumbrecita", text:"Aparcamiento reservado y sendero corto de miradores.", map:"https://maps.google.com/?q=Mirador+de+La+Cumbrecita", tag:"RESERVA"},
            {time:"13:30", title:"Los Llanos", text:"Casco, almuerzo y vida real en la base más práctica."},
            {time:"17:00", title:"Puerto de Tazacorte", text:"Baño, paseo y puesta de sol en el oeste.", map:"https://maps.google.com/?q=Puerto+de+Tazacorte"}
          ]},
        { id:"fuego", short:"DÍA 4", title:"La isla más reciente", zone:"Tajogaite · Fuencaliente · salinas", route:"El Paso → Tajogaite → San Antonio → Faro",
          stops:[
            {time:"09:30", title:"Tajogaite desde sus miradores", text:"Comprende la erupción sin entrar por caminos no autorizados."},
            {time:"13:00", title:"Volcán de San Antonio", text:"Centro y paseo accesible por el borde.", map:"https://maps.google.com/?q=Volcan+San+Antonio+La+Palma"},
            {time:"17:30", title:"Salinas y faro", text:"Negro, blanco y océano. El cierre natural del viaje.", map:"https://maps.google.com/?q=Salinas+de+Fuencaliente"}
          ]}
      ]},
    medio: { name:"Caminar y disfrutar", claim:"Mi recomendación para la mayoría",
      days:[
        { id:"verde", short:"DÍA 1", title:"Dentro de la laurisilva", zone:"Santa Cruz · Cubo de La Galga", route:"Santa Cruz → Puntallana → nordeste",
          stops:[
            {time:"08:30", title:"Santa Cruz", text:"Una hora de casco antes de entrar en el bosque."},
            {time:"11:00", title:"Cubo de La Galga", text:"Ruta moderada entre helechos y laurisilva. Revisa accesos antes de salir.", map:"https://maps.google.com/?q=Cubo+de+La+Galga", tag:"2–4 H"},
            {time:"16:30", title:"Piscinas naturales", text:"Charco Azul o La Fajana según oleaje."}
          ]},
        { id:"cielo", short:"DÍA 2", title:"Caminar sobre las nubes", zone:"Roque · tramo de crestería · noroeste", route:"Roque → crestería corta → Las Tricias",
          stops:[
            {time:"08:00", title:"Roque de los Muchachos", text:"Llega antes de las nubes y del tráfico."},
            {time:"10:30", title:"Tramo de crestería", text:"Recorrido de ida y vuelta adaptado al tiempo y a la energía.", tag:"2–3 H"},
            {time:"15:30", title:"Las Tricias y dragos", text:"Segundo paseo entre paisaje rural y cuevas, solo si quedan piernas.", map:"https://maps.google.com/?q=Las+Tricias+La+Palma"}
          ]},
        { id:"caldera", short:"DÍA 3", title:"Entrar sin atravesarla", zone:"Cumbrecita · senderos · Tazacorte", route:"El Paso → Cumbrecita → miradores → costa",
          stops:[
            {time:"08:30", title:"La Cumbrecita", text:"Reserva el coche y comienza temprano.", tag:"RESERVA"},
            {time:"09:00", title:"Senderos de miradores", text:"Dos o tres horas para entrar en el paisaje sin hacer la ruta completa.", tag:"2–4 H"},
            {time:"16:30", title:"Tazacorte", text:"Comida tardía, baño y recuperación."}
          ]},
        { id:"fuego", short:"DÍA 4", title:"Caminar la erupción", zone:"Tajogaite · volcanes · Fuencaliente", route:"Tajogaite → San Antonio → Teneguía → salinas",
          stops:[
            {time:"09:00", title:"Ruta guiada a Tajogaite", text:"Solo con empresa autorizada. No es un parque temático: caminas sobre una herida reciente.", tag:"GUIADA"},
            {time:"14:30", title:"Fuencaliente", text:"Almuerzo y descanso."},
            {time:"16:30", title:"Tramo volcánico", text:"San Antonio, Teneguía y descenso adaptado antes del faro.", tag:"2–3 H"}
          ]}
      ]},
    mucho: { name:"No me importa caminar mucho", claim:"La isla como se merece: a pie",
      days:[
        { id:"verde", short:"DÍA 1", title:"Agua y bosque antiguo", zone:"Marcos y Cordero · Los Tilos", route:"Acceso coordinado → túneles → bosque",
          stops:[
            {time:"07:00", title:"Acceso confirmado", text:"Solo si sendero, taxis y condiciones oficiales permiten la ruta."},
            {time:"08:30", title:"Marcos y Cordero", text:"Túneles, agua, desnivel y descenso largo. Linterna, impermeable y calzado real.", tag:"6–7 H"},
            {time:"18:00", title:"Recuperación", text:"No se añade otra excursión para rellenar el día."}
          ]},
        { id:"cielo", short:"DÍA 2", title:"La Crestería", zone:"Roque de los Muchachos · cumbre", route:"Transporte al Roque → crestería → recogida",
          stops:[
            {time:"06:30", title:"Transporte coordinado", text:"Ruta lineal: resuelve cómo vuelves antes de empezar."},
            {time:"08:00", title:"Crestería", text:"Altitud, piedra, sol y vistas constantes sobre la Caldera.", tag:"5–8 H"},
            {time:"17:00", title:"Cena temprana", text:"Hoy no hace falta perseguir el atardecer."}
          ]},
        { id:"caldera", short:"DÍA 3", title:"Atravesar la Caldera", zone:"Los Brecitos · Taburiente · Angustias", route:"Taxi a Los Brecitos → Caldera → barranco",
          stops:[
            {time:"07:00", title:"Taxi a Los Brecitos", text:"Confirma acceso y transporte con antelación."},
            {time:"08:30", title:"PR LP 13", text:"Descenso completo por el interior y Barranco de las Angustias.", tag:"≈ 6 H"},
            {time:"17:00", title:"Tazacorte", text:"Baño si quedan fuerzas. Nada más."}
          ]},
        { id:"fuego", short:"DÍA 4", title:"Ruta de los Volcanes", zone:"Refugio del Pilar · Fuencaliente", route:"Transporte → Pilar → volcanes → Los Canarios",
          stops:[
            {time:"06:30", title:"Salida organizada", text:"Ruta lineal y larga: transporte, agua y previsión meteorológica cerrados."},
            {time:"08:00", title:"GR 131", text:"Unos 24 km sobre pinar, ceniza, cráteres y costa.", tag:"8–9 H"},
            {time:"18:00", title:"Fuencaliente", text:"Fin de ruta. Las salinas quedarán para otra visita."}
          ]}
      ]}
  };

  var LEVEL_DESC = {
    poco: "Caminatas de 20 a 60 minutos, miradores y senderos sencillos.",
    medio: "Rutas de dos a cuatro horas y tiempo para seguir de vacaciones.",
    mucho: "Cinco a nueve horas, desnivel, transporte y equipamiento real."
  };
  var LEVEL_RESULT = {
    poco: "Conocerás lo esencial sin jornadas físicas.",
    medio: "Esta es mi recomendación para la mayoría.",
    mucho: "Solo si ya haces senderismo habitualmente."
  };

  var STAYS = {
    dos:[
      {name:"Casa Sophie", meta:"2 viajeros · Los Llanos", rating:"4,98 · 62 reseñas", text:"Mi elección para dos: casa canaria, piscina privada y la base correcta para el oeste.", url:"https://www.airbnb.es/rooms/37847875"},
      {name:"Casa Mañana", meta:"2 viajeros · Puntallana", rating:"4,98 · 182 reseñas", text:"La alternativa si priorizas Santa Cruz, Los Tilos y el nordeste.", url:"https://www.airbnb.es/rooms/39248837"}
    ],
    cuatro:[
      {name:"El océano a tus pies", meta:"Hasta 4 · 2 dormitorios", rating:"4,97 · 73 reseñas", text:"Casa completa, jardín y tranquilidad. Muy valorada, aunque menos práctica para el oeste.", url:"https://www.airbnb.es/rooms/11962946"},
      {name:"Casa El Polear", meta:"Hasta 4 · Puntagorda", rating:"5,0 · 2 reseñas", text:"Piscina, jacuzzi y atardecer. Prometedora, pero todavía poco contrastada.", url:"https://www.airbnb.es/rooms/1607813858808603055"}
    ],
    seis:[
      {name:"Casa El Pósito", meta:"Hasta 6 · Villa de Mazo", rating:"4,88 · 33 reseñas", text:"Tradicional, piscina y buena calidad. La eliges por la casa, no por reducir kilómetros.", url:"https://www.airbnb.es/rooms/17912863"},
      {name:"Tu rincón en el paraíso", meta:"Hasta 6 · 3 dormitorios", rating:"4,86 · 57 reseñas", text:"Familias, aparcamiento y nordeste. Excelente si el verde es la prioridad.", url:"https://www.airbnb.es/rooms/5269628"}
    ],
    grupo:[
      {name:"Villa Javier", meta:"Hasta 8 · El Paso", rating:"5,0 · 9 reseñas", text:"Mi elección para grupo por ubicación: Caldera, Cumbre Vieja y Valle de Aridane.", url:"https://www.airbnb.es/rooms/29485881"},
      {name:"Stella Atlántico", meta:"Hasta 10 · Argual", rating:"Superanfitrión", text:"Piscina y vistas a la Caldera. La alternativa grande mejor situada.", url:"https://www.airbnb.es/rooms/42575190"},
      {name:"Finca Don Miguel", meta:"Hasta 10 · El Paso", rating:"Anuncio sin reseñas", text:"La más completa, no la más contrastada. Piscina, jacuzzi y sauna.", url:"https://www.airbnb.es/rooms/1091025568556717243"}
    ]
  };
  var GROUP_LABELS = {dos:"Somos 2", cuatro:"Somos 3 o 4", seis:"Somos 5 o 6", grupo:"Más de 6"};

  var CHECKLIST = ["CICAR reservado","Nivel de caminata realista","La Cumbrecita reservada","Estado oficial de senderos","Transportes de rutas lineales","Agua, frontal y cortavientos","Alojamiento revisado con fechas","Seguro y cobertura de montaña"];

  var level = "medio";
  var group = "dos";
  var day = "verde";
  var checked = CHECKLIST.map(function(){ return false; });

  function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }

  function renderWalkGrid(){
    var levels = ["poco","medio","mucho"];
    document.getElementById("walkGrid").innerHTML = levels.map(function(x, i){
      return '<button type="button" class="'+(level===x?"active":"")+'" data-level="'+x+'">'
        + '<span>0'+(i+1)+'</span><small>'+esc(ROUTES[x].name)+'</small><h3>'+esc(ROUTES[x].claim)+'</h3>'
        + '<p>'+esc(LEVEL_DESC[x])+'</p>'
        + '<b>'+(level===x?"CAMINO ELEGIDO":"ELEGIR")+'</b>'
        + '</button>';
    }).join("");
  }
  function renderLevelResult(){
    document.getElementById("levelName").textContent = ROUTES[level].name;
    document.getElementById("levelDesc").textContent = LEVEL_RESULT[level];
  }

  function renderGroupTabs(){
    document.getElementById("groupTabs").innerHTML = Object.keys(GROUP_LABELS).map(function(k){
      return '<button type="button" aria-pressed="'+(group===k)+'" data-group="'+k+'">'+esc(GROUP_LABELS[k])+'</button>';
    }).join("");
  }
  function renderStayGrid(){
    document.getElementById("stayGrid").innerHTML = STAYS[group].map(function(s, i){
      return '<article class="'+(i===0?"chosen":"")+'">'
        + '<span>'+(i===0?"MI ELECCIÓN":"ALTERNATIVA")+'</span>'
        + '<h3>'+esc(s.name)+'</h3><b>'+esc(s.meta)+'</b><strong>'+esc(s.rating)+'</strong><p>'+esc(s.text)+'</p>'
        + '<a href="'+esc(s.url)+'" target="_blank" rel="noreferrer">Ver disponibilidad y contactar ↗</a>'
        + '</article>';
    }).join("");
  }

  function renderDayTabs(){
    document.getElementById("dayTabs").innerHTML = ROUTES[level].days.map(function(d){
      return '<button type="button" role="tab" aria-selected="'+(day===d.id)+'" data-day="'+d.id+'"><b>'+esc(d.short)+'</b><span>'+esc(d.title)+'</span></button>';
    }).join("");
  }
  function dayById(id){
    var days = ROUTES[level].days;
    for (var i=0;i<days.length;i++) if (days[i].id===id) return days[i];
    return days[0];
  }
  function renderDayPanel(){
    var d = dayById(day);
    var stopsHtml = d.stops.map(function(s, i){
      var right = s.map
        ? '<a href="'+esc(s.map)+'" target="_blank" rel="noreferrer" aria-label="Abrir '+esc(s.title)+'">↗</a>'
        : '<i></i>';
      return '<div class="stop">'
        + '<span>'+String(i+1).padStart(2,"0")+'</span>'
        + '<time>'+esc(s.time)+'</time>'
        + '<div><h4>'+esc(s.title)+'</h4><p>'+esc(s.text)+'</p>'+(s.tag ? '<b>'+esc(s.tag)+'</b>' : '')+'</div>'
        + right
        + '</div>';
    }).join("");
    document.getElementById("dayPanel").innerHTML =
      '<div class="day-intro">'
      + '<span>'+esc(d.short)+'</span><small>'+esc(d.zone)+'</small><h3>'+esc(d.title)+'</h3>'
      + '<p>'+esc(d.route)+'</p><b>'+esc(ROUTES[level].claim)+'</b>'
      + '</div>'
      + '<div class="timeline">'+stopsHtml+'</div>';
  }
  function updateBtnCambiarNivel(){
    document.getElementById("btnCambiarNivel").textContent = "CAMBIAR NIVEL · " + ROUTES[level].name.toUpperCase() + " ↑";
  }

  function saveChecked(){ try { localStorage.setItem("lp-checks", JSON.stringify(checked)); } catch(e){} }
  function loadChecked(){
    try {
      var saved = localStorage.getItem("lp-checks");
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
    var levelBtn = e.target.closest("[data-level]");
    if (levelBtn){
      level = levelBtn.getAttribute("data-level");
      day = "verde";
      renderWalkGrid(); renderLevelResult(); renderDayTabs(); renderDayPanel(); updateBtnCambiarNivel();
      return;
    }
    var groupBtn = e.target.closest("[data-group]");
    if (groupBtn){ group = groupBtn.getAttribute("data-group"); renderGroupTabs(); renderStayGrid(); return; }
    var dayBtn = e.target.closest("[data-day]");
    if (dayBtn){ day = dayBtn.getAttribute("data-day"); renderDayTabs(); renderDayPanel(); return; }
    if (e.target.closest("#btnCambiarNivel")){ document.getElementById("caminar").scrollIntoView(); return; }
    var label = e.target.closest("#checklistWrap label");
    if (label){ e.preventDefault(); toggleTask(parseInt(label.getAttribute("data-idx"),10)); return; }
  });

  window.addEventListener("scroll", updateScrollProgress, {passive:true});

  loadChecked();
  renderWalkGrid();
  renderLevelResult();
  renderGroupTabs();
  renderStayGrid();
  renderDayTabs();
  renderDayPanel();
  updateBtnCambiarNivel();
  renderChecklist();
  updateScrollProgress();
})();
