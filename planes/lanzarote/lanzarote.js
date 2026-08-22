// ============================================================
// Lanzarote en 4 días · datos e interacción
// Puerto a plano de app/planes/lanzarote/page.tsx (React) entregado
// por Óscar. Misma información, sin framework: se generan los
// paneles con template strings y se alternan con estilos.
// ============================================================
(function(){
  var DAYS = [
    {
      id:"viernes", short:"VIE", label:"Viernes", title:"La llegada lenta", mood:"Barco largo · playa · San Ginés",
      distance:"≈ 10 km", route:"Puerto → Casa → Playa del Reducto → Charco de San Ginés",
      stops:[
        {time:"17:00", title:"Llegada a casa", text:"Entre el barco y el cruce de Fuerteventura, el trayecto puerta a puerta ronda las 7-8 horas. No programéis nada exigente antes de esta hora."},
        {time:"17:30", title:"Baño en Playa del Reducto", text:"Si los horarios acompañan, un baño corto en la playa de Arrecife antes de que caiga el sol.", map:"https://maps.google.com/?q=Playa+del+Reducto+Arrecife"},
        {time:"18:30", title:"Compra de esenciales", text:"Súper cercano para desayunos, comidas o cenas de los próximos días, según lo que necesite cada uno."},
        {time:"20:00", title:"Cena en el Charco de San Ginés", text:"Cualquiera de los restaurantes de la orilla es un acierto: el mejor ambiente de la ciudad, con todo tipo de edades y buenas vistas.", type:"food", map:"https://maps.google.com/?q=Charco+de+San+Gines+Arrecife"}
      ]
    },
    {
      id:"sabado", short:"SÁB", label:"Sábado", title:"El corazón de fuego", mood:"Volcanes · costa · atardecer",
      distance:"≈ 120 km", route:"Arrecife → Timanfaya → El Golfo → Yaiza → Arrecife → Puerto del Carmen",
      stops:[
        {time:"09:00–11:15", title:"Montañas del Fuego", text:"Demostraciones geotérmicas y Ruta de los Volcanes en guagua por el circuito interno del parque. Un café tranquilo en el restaurante, con vistas al cráter, cierra la visita — y da tiempo para las fotos.", map:"https://maps.google.com/?q=Montañas+del+Fuego+Timanfaya"},
        {time:"11:45", title:"El Golfo y Charco de los Clicos", text:"Mirador, paseo por el pueblo y la laguna verde. No bajéis a la laguna.", map:"https://maps.google.com/?q=Charco+de+los+Clicos"},
        {time:"12:45", title:"Salinas de Janubio y Los Hervideros", text:"Dos paradas cortas de costa volcánica, casi seguidas. Prudencia en Los Hervideros si hay fuerte oleaje.", map:"https://maps.google.com/?q=Los+Hervideros+Lanzarote"},
        {time:"14:00", title:"Almuerzo en La Casona (Yaiza)", text:"Muy recomendable, aunque algo caro. Reserva si podéis: cierra bien la mañana volcánica.", type:"food"},
        {time:"16:30", title:"Vuelta a casa, ducha y cambio", text:"Un respiro antes de bajar de nuevo hacia el sur."},
        {time:"19:00", title:"Atardecer en Puerto del Carmen", text:"Paseo por el Puerto Deportivo y la Avenida de las Playas antes de que caiga el sol.", map:"https://maps.google.com/?q=Puerto+del+Carmen+Lanzarote"},
        {time:"20:30", title:"Cena en Puerto del Carmen", text:"Buen ambiente en el paseo, sin necesidad de coger de nuevo el coche.", type:"food"}
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
      id:"lunes", short:"LUN", label:"Lunes", title:"El sur antes del barco", mood:"Playas · calas · regreso",
      distance:"≈ 45 km", route:"Arrecife → Papagayo → Playa Blanca → Puerto de Arrecife",
      stops:[
        {time:"09:30", title:"Equipaje y salida", text:"Coche listo y rumbo al sur: aprovechad que hay que bajar de todas formas."},
        {time:"10:30–13:30", title:"Playas de Papagayo", text:"Calas de arena dorada y agua tranquila, de las mejores de la isla. Acceso por pista de tierra; id con calma.", map:"https://maps.google.com/?q=Playas+de+Papagayo+Lanzarote"},
        {time:"14:00", title:"Playa Blanca", text:"Comida libre en el paseo marítimo — hay oferta de sobra, sin necesidad de reservar.", map:"https://maps.google.com/?q=Playa+Blanca+Lanzarote"},
        {time:"16:00", title:"Tarde de playa urbana", text:"Las playas del paseo, más cómodas para el último baño antes de las maletas."},
        {time:"Según billete", title:"Puerto de Arrecife", text:"Presentaos con la antelación indicada por la naviera al viajar con vehículo.", map:"https://maps.google.com/?q=Puerto+de+Arrecife"}
      ]
    }
  ];

  var DINING = {
    viernes: [
      { type:"Cena", time:"20:00",
        primary:{ name:"Tasca La Raspa", place:"Charco de San Ginés · Arrecife", price:"20–30 €", note:"La llegada fácil tras un día largo de barco: cocina canaria junto al paseo, sin necesidad de buscar más.", order:"Croquetas, pulpo y pescado del día para compartir.", phone:"+34928808405", map:"https://maps.google.com/?q=Tasca+La+Raspa+Arrecife" },
        backup:{ name:"Naia", place:"Charco de San Ginés · Arrecife", price:"25–40 €", note:"A un paso, cocina canaria actual con el mismo ambiente de paseo y agua.", order:"Tapas y platos para compartir mantienen bien el presupuesto.", phone:"+34928805797", map:"https://maps.google.com/?q=Restaurante+Naia+Arrecife" } }
    ],
    sabado: [
      { type:"Comida", time:"14:00",
        primary:{ name:"La Casona de Yaiza", place:"Yaiza", price:"35–45 €", note:"Muy recomendable después de la mañana volcánica, aunque algo cara — merece la pena.", order:"Producto local y cocina canaria contemporánea; pedir a la carta.", phone:"+34646891949", map:"https://maps.google.com/?q=La+Casona+de+Yaiza+Restaurante" },
        backup:{ name:"La Bodega de Santiago", place:"Yaiza", price:"30–40 €", note:"A cinco minutos, entre la costa volcánica y el pueblo, sin desvíos inútiles.", order:"Queso local, pescado o carne y un postre para compartir.", phone:"+34928836204", map:"https://maps.google.com/?q=La+Bodega+de+Santiago+Yaiza" } },
      { type:"Cena", time:"20:30",
        primary:{ name:"El Marinero", place:"Playa Chica · Puerto del Carmen", price:"20–30 €", note:"Ambiente familiar y de barrio, a un paso del paseo y del mar, después del atardecer.", order:"Pescado fresco del día para compartir.", phone:"+34928511364", map:"https://maps.google.com/?q=Restaurante+El+Marinero+Puerto+del+Carmen" },
        backup:{ name:"El Cangrejo Rojo", place:"Puerto Deportivo · Puerto del Carmen", price:"30–45 €", note:"Vistas al puerto y mariscada de las buenas, para una noche algo más especial.", order:"Zamburiñas, pescado del día y paella para compartir.", phone:"+34928512191", map:"https://maps.google.com/?q=El+Cangrejo+Rojo+Puerto+del+Carmen" } }
    ],
    domingo: [
      { type:"Comida", time:"14:00",
        primary:{ name:"El Amanecer", place:"Arrieta", price:"25–40 €", note:"El mejor desvío del norte: está al bajar del Mirador del Río y antes de Teguise.", order:"Pescado local del día, papas arrugadas y ensalada.", phone:"+34928179213", map:"https://maps.google.com/?q=Restaurante+El+Amanecer+Arrieta+Lanzarote" },
        backup:{ name:"La Nasa", place:"Arrieta", price:"25–40 €", note:"En el mismo paseo marítimo; buena solución si El Amanecer está completo.", order:"Pescado o arroz sencillo; evitar mariscadas y arroces especiales.", phone:"+34928848149", map:"https://maps.google.com/?q=Restaurante+La+Nasa+Arrieta+Lanzarote" } },
      { type:"Cena temprana", time:"19:30",
        primary:{ name:"El Risco", place:"Caleta de Famara", price:"35–40 €", note:"Bib Gourmand Michelin y cierre natural del día junto al Risco de Famara.", order:"Sugerencia de pescado o arroz sencillo y entrantes compartidos.", phone:"+34928528550", map:"https://maps.google.com/?q=Restaurante+El+Risco+Famara" },
        backup:{ name:"Dunas de Famara", place:"Caleta de Famara", price:"25–40 €", note:"En el mismo entorno, útil como alternativa inmediata sin alterar la ruta.", order:"Pescado y platos canarios; confirmar precio antes de pedir piezas enteras.", phone:"+34928178477", map:"https://maps.google.com/?q=Restaurante+Dunas+de+Famara" } }
    ],
    lunes: []
  };

  var TASKS = [
    "Entradas con hora para Timanfaya y Cueva de los Verdes",
    "Comprobar si compensa el bono de centros turísticos",
    "Reservar La Casona de Yaiza y la cena en Puerto del Carmen",
    "Con coche: estar en el puerto 45 minutos antes de embarcar",
    "Revisar viento y oleaje antes de Famara y Los Hervideros",
    "Cargadores, datos y entretenimiento — el barco son 7-8 horas puerta a puerta"
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
      html += '<aside class="ferry-note"><span>Sin reserva necesaria</span><p>Comida libre en el paseo de Playa Blanca. Después, rumbo al puerto para regresar a Gran Canaria.</p></aside>';
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
