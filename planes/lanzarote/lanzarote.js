// ============================================================
// Lanzarote en 4 días · datos e interacción
// Puerto a plano de app/planes/lanzarote/page.tsx (React) entregado
// por Óscar. Misma información, sin framework: se generan los
// paneles con template strings y se alternan con estilos.
// ============================================================
(function(){
  var DAYS = [
    {
      id:"viernes", short:"VIE", label:"Viernes", title:"La llegada lenta", mood:"Capital · costa · pescado",
      distance:"≈ 75 km", route:"Puerto → Arrecife → El Golfo → Arrecife",
      stops:[
        {time:"12:00", title:"Llegada, casa y compra rápida", text:"Dejad el equipaje y preparad agua, chaqueta fina y calzado cerrado."},
        {time:"13:30", title:"Charco de San Ginés", text:"Almuerzo junto al agua y paseo por el Puente de las Bolas y el Castillo de San Gabriel.", type:"food", map:"https://maps.google.com/?q=Charco+de+San+Gines+Arrecife"},
        {time:"15:30–18:00", title:"Trabajo sin interrupciones", text:"Mientras, la familia puede disfrutar de Playa del Reducto o Marina Lanzarote.", type:"work"},
        {time:"18:15", title:"El Golfo y Charco de los Clicos", text:"Mirador, paseo por el pueblo y puesta de sol. No bajéis a la laguna.", map:"https://maps.google.com/?q=Charco+de+los+Clicos"},
        {time:"20:15", title:"Cena frente al Atlántico", text:"Pescado del día en una terraza de El Golfo. Reserva recomendada.", type:"food"}
      ]
    },
    {
      id:"sabado", short:"SÁB", label:"Sábado", title:"El corazón de fuego", mood:"Volcanes · lava · vino",
      distance:"≈ 105 km", route:"Arrecife → Timanfaya → costa suroeste → La Geria",
      stops:[
        {time:"08:15", title:"Rumbo a Timanfaya", text:"Salir pronto evita la mayor espera. Llevad la entrada preparada."},
        {time:"09:00–11:15", title:"Montañas del Fuego", text:"Demostraciones geotérmicas y Ruta de los Volcanes en guagua. El imprescindible número uno.", map:"https://maps.google.com/?q=Montañas+del+Fuego+Timanfaya"},
        {time:"11:40", title:"Los Hervideros y Janubio", text:"Dos paradas cortas de costa volcánica. Prudencia si hay fuerte oleaje.", map:"https://maps.google.com/?q=Los+Hervideros+Lanzarote"},
        {time:"13:15", title:"Almuerzo en Yaiza", text:"Un descanso tranquilo en uno de los pueblos más cuidados de la isla.", type:"food"},
        {time:"15:15–17:15", title:"La Geria", text:"Paisaje vitícola y una sola bodega con visita reservada. Quien conduzca, no degusta.", map:"https://maps.google.com/?q=La+Geria+Lanzarote"},
        {time:"18:15–20:15", title:"Trabajo en Arrecife", text:"Segundo bloque protegido. Cena libre después.", type:"work"}
      ]
    },
    {
      id:"domingo", short:"DOM", label:"Domingo", title:"Viaje al gran norte", mood:"Cuevas · arte · horizonte",
      distance:"≈ 115 km", route:"Arrecife → Cueva → Jameos → Mirador → Haría → Famara",
      stops:[
        {time:"09:00", title:"Cueva de los Verdes", text:"Primera visita disponible. Recorrido guiado con suelo irregular y escalones.", map:"https://maps.google.com/?q=Cueva+de+los+Verdes"},
        {time:"10:45", title:"Jameos del Agua", text:"Tubo volcánico, lago de los jameítos y la intervención más emocionante de Manrique.", map:"https://maps.google.com/?q=Jameos+del+Agua"},
        {time:"12:30", title:"Mirador del Río", text:"La gran panorámica sobre La Graciosa y el Archipiélago Chinijo.", map:"https://maps.google.com/?q=Mirador+del+Rio+Lanzarote"},
        {time:"14:00", title:"Almuerzo en Arrieta", text:"Pescado local frente al mar; después, paseo breve por Haría antes de continuar hacia Teguise.", type:"food", map:"https://maps.google.com/?q=Restaurante+El+Amanecer+Arrieta+Lanzarote"},
        {time:"16:15", title:"Teguise", text:"Casco histórico. Para ver el mercadillo dominical, venid por la mañana y moved la Cueva al último turno.", map:"https://maps.google.com/?q=Villa+de+Teguise"},
        {time:"18:15", title:"Atardecer en Famara", text:"Paseo bajo el Risco. Baño solamente con mar seguro: suele haber corrientes.", map:"https://maps.google.com/?q=Caleta+de+Famara"}
      ]
    },
    {
      id:"lunes", short:"LUN", label:"Lunes", title:"La isla de Manrique", mood:"Arquitectura · calma · regreso",
      distance:"≈ 25 km", route:"Arrecife → Tahíche → puerto",
      stops:[
        {time:"08:00–10:30", title:"Trabajo y equipaje", text:"Último bloque protegido. Dejad el coche listo y confirmad la hora de embarque.", type:"work"},
        {time:"11:00–12:45", title:"Fundación César Manrique", text:"Su casa sobre cinco burbujas volcánicas: la mejor forma de entender Lanzarote.", map:"https://maps.google.com/?q=Fundacion+Cesar+Manrique"},
        {time:"13:00", title:"Almuerzo sin prisas", text:"Comida cerca de Arrecife, repostaje y margen generoso antes del barco.", type:"food"},
        {time:"Según billete", title:"Puerto de Arrecife", text:"Presentaos con la antelación indicada por la naviera al viajar con vehículo.", map:"https://maps.google.com/?q=Puerto+de+Arrecife"}
      ]
    }
  ];

  var DINING = {
    viernes: [
      { type:"Comida", time:"13:30",
        primary:{ name:"Tasca La Raspa", place:"Charco de San Ginés · Arrecife", price:"20–30 €", note:"La llegada fácil: cocina canaria junto al paseo que ya forma parte de la ruta.", order:"Croquetas, pulpo y pescado del día para compartir.", phone:"+34928808405", map:"https://maps.google.com/?q=Tasca+La+Raspa+Arrecife" },
        backup:{ name:"Lilium", place:"Marina Lanzarote · Arrecife", price:"35–40 €", note:"La alternativa gastronómica sin alejarse de casa. Solo carta, no menú degustación.", order:"Dos entrantes, un principal por persona y postre compartido.", phone:"+34928524978", map:"https://maps.google.com/?q=Restaurante+Lilium+Arrecife" } },
      { type:"Cena", time:"19:45",
        primary:{ name:"Restaurante Bogavante", place:"El Golfo", price:"25–40 €", note:"Cena marinera después del Charco de los Clicos y la puesta de sol.", order:"Gofio escaldado, pulpo y pescado local. Evitar el bogavante para respetar el presupuesto.", phone:"+34928173505", map:"https://maps.google.com/?q=Restaurante+Bogavante+El+Golfo+Lanzarote" },
        backup:{ name:"Casa Torano", place:"El Golfo", price:"25–40 €", note:"A pocos metros, con pescado fresco y terraza frente al mar.", order:"Preguntar peso y precio total del pescado antes de pedir.", phone:"+34928173058", map:"https://maps.google.com/?q=Casa+Torano+El+Golfo+Lanzarote" } }
    ],
    sabado: [
      { type:"Comida", time:"13:30",
        primary:{ name:"La Bodega de Santiago", place:"Yaiza", price:"30–40 €", note:"Exactamente entre la costa volcánica y La Geria, sin desvíos inútiles.", order:"Queso local, pescado o carne y un postre para compartir.", phone:"+34928836204", map:"https://maps.google.com/?q=La+Bodega+de+Santiago+Yaiza" },
        backup:{ name:"La Casona de Yaiza", place:"Yaiza", price:"30–40 €", note:"A cinco minutos, producto local y cocina canaria contemporánea.", order:"Pedir a la carta y evitar vinos de precio alto.", phone:"+34646891949", map:"https://maps.google.com/?q=La+Casona+de+Yaiza+Restaurante" } },
      { type:"Cena", time:"20:30",
        primary:{ name:"Lilium", place:"Marina Lanzarote · Arrecife", price:"35–40 €", note:"La mejor cena gastronómica dentro del límite, después del bloque de trabajo.", order:"Carta: entrantes y postre compartidos. No pedir el menú de degustación.", phone:"+34928524978", map:"https://maps.google.com/?q=Restaurante+Lilium+Marina+Lanzarote" },
        backup:{ name:"Naia", place:"Charco de San Ginés · Arrecife", price:"25–40 €", note:"Cocina canaria actual y ambiente agradable, sin volver a coger carretera.", order:"Tapas y platos para compartir mantienen bien el presupuesto.", phone:"+34928805797", map:"https://maps.google.com/?q=Restaurante+Naia+Arrecife" } }
    ],
    domingo: [
      { type:"Comida", time:"14:00",
        primary:{ name:"El Amanecer", place:"Arrieta", price:"25–40 €", note:"El mejor desvío del norte: está al bajar del Mirador del Río y antes de Teguise.", order:"Pescado local del día, papas arrugadas y ensalada.", phone:"+34928179213", map:"https://maps.google.com/?q=Restaurante+El+Amanecer+Arrieta+Lanzarote" },
        backup:{ name:"La Nasa", place:"Arrieta", price:"25–40 €", note:"En el mismo paseo marítimo; buena solución si El Amanecer está completo.", order:"Pescado o arroz sencillo; evitar mariscadas y arroces especiales.", phone:"+34928848149", map:"https://maps.google.com/?q=Restaurante+La+Nasa+Arrieta+Lanzarote" } },
      { type:"Cena temprana", time:"19:30",
        primary:{ name:"El Risco", place:"Caleta de Famara", price:"35–40 €", note:"Bib Gourmand Michelin y cierre natural del día junto al Risco de Famara.", order:"Sugerencia de pescado o arroz sencillo y entrantes compartidos.", phone:"+34928528550", map:"https://maps.google.com/?q=Restaurante+El+Risco+Famara" },
        backup:{ name:"Dunas de Famara", place:"Caleta de Famara", price:"25–40 €", note:"En el mismo entorno, útil como alternativa inmediata sin alterar la ruta.", order:"Pescado y platos canarios; confirmar precio antes de pedir piezas enteras.", phone:"+34928178477", map:"https://maps.google.com/?q=Restaurante+Dunas+de+Famara" } }
    ],
    lunes: [
      { type:"Comida", time:"13:00",
        primary:{ name:"Teleclub de Tahíche", place:"Tahíche", price:"15–25 €", note:"A minutos de la Fundación Manrique y en dirección al puerto.", order:"Queso frito, ensaladilla con pulpo, carne de cabra o plato del día.", phone:"+34606737799", map:"https://maps.google.com/?q=Teleclub+de+Tahiche" },
        backup:{ name:"Los Aljibes de Tahíche", place:"Tahíche", price:"25–40 €", note:"Muy cerca, comida casera y carnes al horno en un espacio singular.", order:"Plato principal y entrante compartido para salir con tiempo hacia el barco.", phone:"+34610454294", map:"https://maps.google.com/?q=Los+Aljibes+de+Tahiche" } }
    ]
  };

  var TASKS = [
    "Entradas con hora para Timanfaya y Cueva de los Verdes",
    "Comprobar si compensa el bono de centros turísticos",
    "Reservar bodega y las dos comidas clave",
    "Confirmar ferry y hora de embarque con vehículo",
    "Revisar viento y oleaje antes de Famara y Los Hervideros",
    "Preparar portátil, cargadores y datos móviles"
  ];

  var active = "viernes";
  var foodDay = "viernes";
  var checked = TASKS.map(function(){ return false; });

  function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  function dayById(id){ for (var i=0;i<DAYS.length;i++) if (DAYS[i].id===id) return DAYS[i]; return DAYS[0]; }

  // ---- pestañas (se pintan una vez, luego solo se marca aria-selected) ----
  function renderDemoDaysTabs(){
    var el = document.getElementById("heroDemoDays");
    el.innerHTML = DAYS.map(function(d){
      return '<button type="button" role="tab" aria-selected="'+(d.id===active)+'" data-day="'+d.id+'">'+esc(d.short)+'</button>';
    }).join("");
  }
  function renderDayTabs(){
    var el = document.getElementById("dayTabs");
    el.innerHTML = DAYS.map(function(d,i){
      return '<button type="button" role="tab" aria-selected="'+(d.id===active)+'" data-day="'+d.id+'"><b>'+esc(d.short)+'</b><span>0'+(i+1)+'</span></button>';
    }).join("");
  }
  function renderFoodTabs(){
    var el = document.getElementById("foodTabs");
    el.innerHTML = DAYS.map(function(d){
      return '<button type="button" role="tab" aria-selected="'+(d.id===foodDay)+'" data-foodday="'+d.id+'">'+esc(d.label)+'</button>';
    }).join("");
  }

  function updateTabsSelected(){
    document.querySelectorAll('#heroDemoDays [data-day], #dayTabs [data-day]').forEach(function(b){
      b.setAttribute("aria-selected", String(b.getAttribute("data-day")===active));
    });
  }
  function updateFoodTabsSelected(){
    document.querySelectorAll('#foodTabs [data-foodday]').forEach(function(b){
      b.setAttribute("aria-selected", String(b.getAttribute("data-foodday")===foodDay));
    });
  }

  // ---- escena de la cabecera (resumen del día activo) ----
  function renderHeroDemo(){
    var d = dayById(active);
    document.getElementById("heroDemoScene").innerHTML =
      '<span>'+esc(d.label)+'</span><h2>'+esc(d.title)+'</h2><p>'+esc(d.mood)+'</p>';
    document.getElementById("heroDemoRoute").innerHTML = d.stops.slice(0,3).map(function(s,i){
      return '<div><b>0'+(i+1)+'</b><time>'+esc(s.time)+'</time><span>'+esc(s.title)+'</span></div>';
    }).join("");
  }

  // ---- panel del día (resumen + línea de tiempo completa) ----
  function renderDayPanel(){
    var d = dayById(active);
    var stopsHtml = d.stops.map(function(s, i){
      var cls = "stop " + (s.type || "visit");
      var right = s.map
        ? '<a href="'+esc(s.map)+'" target="_blank" rel="noreferrer" aria-label="Abrir '+esc(s.title)+' en Google Maps">↗</a>'
        : '<span class="stop-type">'+(s.type==="work" ? "TRABAJO" : "MESA")+'</span>';
      return '<div class="'+cls+'">'
        + '<div class="stop-index">'+String(i+1).padStart(2,"0")+'</div>'
        + '<time>'+esc(s.time)+'</time>'
        + '<div class="stop-copy"><h4>'+esc(s.title)+'</h4><p>'+esc(s.text)+'</p></div>'
        + right
        + '</div>';
    }).join("");
    document.getElementById("dayPanel").innerHTML =
      '<div class="day-summary">'
      + '<p>'+esc(d.label)+'</p><h3>'+esc(d.title)+'</h3><span>'+esc(d.mood)+'</span>'
      + '<div class="route-line"><i></i>'+esc(d.route)+'</div>'
      + '<strong>'+esc(d.distance)+'</strong>'
      + '</div>'
      + '<div class="timeline">'+stopsHtml+'</div>';
  }

  // ---- restaurantes del día ----
  function restaurantBlock(r, featured){
    return '<div class="restaurant'+(featured?" featured":"")+'">'
      + (featured ? '<span class="choice-tag">MI ELECCIÓN</span>' : '')
      + '<div class="restaurant-title"><div><h3>'+esc(r.name)+'</h3><p>'+esc(r.place)+'</p></div><strong>'+esc(r.price)+'</strong></div>'
      + '<p class="restaurant-note">'+esc(r.note)+'</p>'
      + '<p class="order"><span>PEDIR</span>'+esc(r.order)+'</p>'
      + '<div class="restaurant-actions">'
      + '<a href="'+esc(r.map)+'" target="_blank" rel="noreferrer">Abrir Maps <span>↗</span></a>'
      + '<a href="tel:'+esc(r.phone)+'">Llamar <span>☎</span></a>'
      + '</div></div>';
  }
  function renderMealGrid(){
    var meals = DINING[foodDay] || [];
    var html = meals.map(function(m){
      return '<article class="meal-card">'
        + '<div class="meal-label"><span>'+esc(m.type)+'</span><time>'+esc(m.time)+'</time></div>'
        + restaurantBlock(m.primary, true)
        + '<details><summary><span>Plan B</span> '+esc(m.backup.name)+'<b>+</b></summary>'+restaurantBlock(m.backup,false)+'</details>'
        + '</article>';
    }).join("");
    if (foodDay === "lunes"){
      html += '<aside class="ferry-note"><span>Sin cena en la isla</span><p>Después de comer se continúa directamente hacia el puerto para regresar a Gran Canaria.</p></aside>';
    }
    document.getElementById("mealGrid").innerHTML = html;
  }

  // ---- checklist con localStorage ----
  function saveChecked(){
    try { localStorage.setItem("lanzarote-checklist", JSON.stringify(checked)); } catch(e){}
  }
  function loadChecked(){
    try {
      var saved = localStorage.getItem("lanzarote-checklist");
      if (saved){
        var parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === TASKS.length) checked = parsed;
      }
    } catch(e){}
  }
  function renderChecklist(){
    document.getElementById("checklistWrap").innerHTML = TASKS.map(function(t, i){
      return '<label class="'+(checked[i]?"done":"")+'" data-idx="'+i+'">'
        + '<input type="checkbox" '+(checked[i]?"checked":"")+'>'
        + '<span class="custom-check">'+(checked[i]?"✓":"")+'</span>'
        + '<b>'+String(i+1).padStart(2,"0")+'</b><p>'+esc(t)+'</p>'
        + '</label>';
    }).join("");
    var done = checked.filter(Boolean).length;
    var pct = Math.round((done / TASKS.length) * 100);
    var ring = document.getElementById("progressRing");
    ring.style.setProperty("--progress", (pct*3.6)+"deg");
    ring.querySelector("span").innerHTML = pct + "%<small>listo</small>";
  }
  function toggleTask(i){
    checked[i] = !checked[i];
    saveChecked();
    renderChecklist();
  }

  // ---- barra de progreso de lectura ----
  function updateScrollProgress(){
    var available = document.documentElement.scrollHeight - window.innerHeight;
    var pct = available > 0 ? (window.scrollY / available) * 100 : 0;
    document.getElementById("progressBar").style.width = pct + "%";
  }

  // ---- listeners (delegados: los paneles se repintan) ----
  document.addEventListener("click", function(e){
    var dayBtn = e.target.closest("[data-day]");
    if (dayBtn){ active = dayBtn.getAttribute("data-day"); renderHeroDemo(); renderDayPanel(); updateTabsSelected(); return; }
    var foodBtn = e.target.closest("[data-foodday]");
    if (foodBtn){ foodDay = foodBtn.getAttribute("data-foodday"); renderMealGrid(); updateFoodTabsSelected(); return; }
    var label = e.target.closest("#checklistWrap label");
    if (label){ e.preventDefault(); toggleTask(parseInt(label.getAttribute("data-idx"),10)); return; }
  });

  window.addEventListener("scroll", updateScrollProgress, {passive:true});

  loadChecked();
  renderDemoDaysTabs();
  renderDayTabs();
  renderFoodTabs();
  renderHeroDemo();
  renderDayPanel();
  renderMealGrid();
  renderChecklist();
  updateScrollProgress();
})();
