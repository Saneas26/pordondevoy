// ============================================================
// Gran Canaria en 5 días · datos e interacción
// Puerto a plano de app/page.tsx (React) entregado por Óscar.
// Misma información, sin framework.
// ============================================================
(function(){
  var DAYS = [
    { id:"sur", short:"D1", label:"Día 1", number:"01", title:"El sur donde siempre parece verano", subtitle:"Dunas · playas · Puerto de Mogán", route:"Maspalomas → El Pajar → Patalavaca → Anfi → Puerto de Mogán",
      shortPlan:[
        {time:"Antes de salir el sol", title:"Amanecer en las Dunas", text:"Llega 20–30 minutos antes. Desierto, mar y horizonte en uno de los mayores espectáculos de la isla.", map:"https://maps.app.goo.gl/MNn6SgGF7TuthV3G9", tag:"MI IMPRESCINDIBLE"},
        {time:"09:00", title:"Desayuno y mochila", text:"Regresa al alojamiento, desayuna y prepara bañador, toalla, cholas, agua y protector solar."},
        {time:"11:00", title:"Playa del Inglés", text:"Extensa, turística y con todos los servicios. Báñate, camina o no hagas absolutamente nada.", map:"https://maps.google.com/?q=Playa+del+Ingles+Gran+Canaria"},
        {time:"17:30", title:"Faro y Meloneras", text:"Paseo cuando baje el calor. Zona cuidada, cómoda y más cara: aquí se paga la ubicación.", map:"https://maps.google.com/?q=Faro+de+Maspalomas"}
      ],
      longPlan:[
        {time:"Antes de salir el sol", title:"Amanecer en las Dunas", text:"No lo cambies por una visita al mediodía. La luz, el silencio y la temperatura lo convierten en otra experiencia.", map:"https://maps.app.goo.gl/MNn6SgGF7TuthV3G9", tag:"MI IMPRESCINDIBLE"},
        {time:"10:30", title:"Primer baño en Playa del Inglés", text:"Un paseo y un baño. No hace falta instalarse tres horas: todavía queda mucha costa.", map:"https://maps.google.com/?q=Playa+del+Ingles+Gran+Canaria"},
        {time:"12:30", title:"Comer en El Boya", text:"Popular, económico y marinero. No esperes manteles blancos: se viene a comer pescado, calamares y pulpo.", map:"https://maps.google.com/?q=Bar+El+Boya+El+Pajar+Gran+Canaria", tag:"COMER LOCAL"},
        {time:"15:30", title:"Patalavaca vs. Anfi", text:"Primero la playa cotidiana; después la postal perfecta. No elijas cuál es mejor: entiende qué experiencia buscas.", map:"https://maps.google.com/?q=Playa+de+Patalavaca"},
        {time:"18:30", title:"Puerto de Mogán", text:"Pasea por el muelle y espera a que cambie la luz. Llegar, hacer una foto y marcharte no sirve.", map:"https://maps.google.com/?q=Puerto+de+Mogan", tag:"ATARDECER"}
      ],
      verdict:"Yo haría el plan largo: Dunas, El Boya, un baño y Puerto de Mogán. Después volvería a Maspalomas a cenar." },
    { id:"cumbre", short:"D2", label:"Día 2", number:"02", title:"El corazón volcánico", subtitle:"Barrancos · pueblos · cumbre", route:"Maspalomas → Fataga → Tejeda → Roque Nublo → Pico de las Nieves",
      shortPlan:[
        {time:"08:30", title:"Salida con el depósito lleno", text:"En montaña no encontrarás una gasolinera o un baño cada diez minutos. Lleva sudadera aunque salgas con calor."},
        {time:"09:00", title:"Degollada de las Yeguas", text:"La primera vista del gran barranco y el momento en que el sur turístico desaparece.", map:"https://maps.google.com/?q=Mirador+Degollada+de+las+Yeguas"},
        {time:"09:45", title:"Fataga y Tunte", text:"Pueblos pequeños. Aparca, camina, toma un café y continúa; el atractivo también es la carretera.", map:"https://maps.google.com/?q=Fataga+Gran+Canaria"},
        {time:"12:30", title:"Tejeda", text:"Almuerzo, almendras, queso y vistas al Roque Bentayga. En fin de semana, reserva.", map:"https://maps.google.com/?q=Tejeda+Gran+Canaria"},
        {time:"16:00", title:"Pico de las Nieves", text:"Con cielo despejado, una de las grandes vistas de Canarias. Con nubes, no verás nada. La montaña decide.", map:"https://maps.google.com/?q=Pico+de+las+Nieves", tag:"MI IMPRESCINDIBLE"}
      ],
      longPlan:[
        {time:"07:30", title:"Salida desde Maspalomas", text:"Agua, sudadera, calzado cerrado, QR descargado y teléfono cargado. Hoy las cholas se quedan en el coche."},
        {time:"08:00", title:"Degollada y Fataga", text:"Dos paradas breves antes de organizar el acceso a la cumbre.", map:"https://maps.google.com/?q=Fataga+Gran+Canaria"},
        {time:"10:30", title:"Roque Nublo", text:"Reserva previa obligatoria en el acceso regulado. No conduzcas hasta el sendero esperando aparcar allí.", map:"https://www.grancanariasenderos.com/", tag:"RESERVA"},
        {time:"13:30", title:"Comer en Tejeda", text:"Reserva antes. Llegar con hambre y descubrir que todo está completo no mejora el paisaje.", map:"https://maps.google.com/?q=Restaurantes+Tejeda+Gran+Canaria"},
        {time:"16:30", title:"Pico de las Nieves", text:"El segundo gran espectáculo de la isla. Consulta las cámaras, pero acepta que la vista nunca está garantizada.", map:"https://maps.google.com/?q=Pico+de+las+Nieves"}
      ],
      verdict:"Reservaría el Roque Nublo y haría el plan largo. Es el día que mejor explica por qué esta isla es un pequeño continente." },
    { id:"capital", short:"D3", label:"Día 3", number:"03", title:"Historia, ciudad y océano", subtitle:"Vegueta · Triana · Las Canteras", route:"Maspalomas → Vegueta → Triana → Las Canteras → El Confital",
      shortPlan:[
        {time:"10:00", title:"Aparca una vez en Vegueta", text:"Buscar una plaza gratis calle por calle es una forma excelente de empezar el día de mal humor."},
        {time:"10:15", title:"Santa Ana y Casa de Colón", text:"El origen de la ciudad y su relación con los viajes atlánticos. El edificio y sus patios ya justifican acercarse.", map:"https://maps.google.com/?q=Casa+de+Colon+Las+Palmas"},
        {time:"13:00", title:"Triana y almuerzo", text:"Arquitectura, comercio y vida real. No elijas un menú solo porque está frente a la Catedral.", map:"https://maps.google.com/?q=Calle+Triana+Las+Palmas"},
        {time:"16:00", title:"Las Canteras", text:"Baño en la zona protegida por La Barra y paseo hasta La Cícer.", map:"https://maps.google.com/?q=Playa+de+Las+Canteras"}
      ],
      longPlan:[
        {time:"09:30", title:"Mercado y Vegueta", text:"Empieza donde la ciudad todavía compra, trabaja y desayuna. Vegueta no es un decorado.", map:"https://maps.google.com/?q=Mercado+de+Vegueta"},
        {time:"10:30", title:"Santa Ana, Catedral y Casa de Colón", text:"Historia sin convertir la mañana en una carrera entre placas y museos.", map:"https://maps.google.com/?q=Plaza+de+Santa+Ana+Las+Palmas"},
        {time:"12:30", title:"Triana", text:"Cruza caminando, toma un café y mira hacia arriba: parte de la visita está en las fachadas.", map:"https://maps.google.com/?q=Calle+Triana+Las+Palmas"},
        {time:"15:45", title:"Las Canteras y La Cícer", text:"La playa cambia con la zona y la marea. La Cícer tiene oleaje y surf: observa las banderas.", map:"https://maps.google.com/?q=La+Cicer+Las+Palmas"},
        {time:"18:30", title:"El Confital", text:"Costa, roca y Atlántico. Sin hamacas ni decorado. Precisamente por eso merece la pena.", map:"https://maps.google.com/?q=El+Confital", tag:"FINAL DEL DÍA"}
      ],
      verdict:"Vegueta, un buen almuerzo, baño en Las Canteras y final en El Confital. Las Palmas merece un día completo." },
    { id:"norte", short:"D4", label:"Día 4", number:"04", title:"El norte que el sur no te cuenta", subtitle:"Arucas · Gáldar · Agaete", route:"Maspalomas → Arucas → Gáldar → Valle de Agaete → Puerto de las Nieves",
      shortPlan:[
        {time:"09:00", title:"Rumbo a Arucas", text:"Hoy puede hacer más fresco y estar cubierto. Lleva sudadera y deja de mirar el cielo de Maspalomas."},
        {time:"10:00", title:"Arucas", text:"Casco histórico, piedra y la iglesia de San Juan Bautista. Pasea sin intentar convertirlo en media jornada.", map:"https://maps.google.com/?q=Arucas+Gran+Canaria"},
        {time:"13:00", title:"Puerto de las Nieves", text:"Almuerzo frente al mar y paseo por un pueblo que conserva otra escala.", map:"https://maps.google.com/?q=Puerto+de+las+Nieves"},
        {time:"16:00", title:"Las Salinas", text:"Piscinas naturales solo si el mar permite el baño. Las cangrejeras están en la mochila por algo.", map:"https://maps.google.com/?q=Las+Salinas+de+Agaete"}
      ],
      longPlan:[
        {time:"08:30", title:"Arucas", text:"Café, paseo y casco histórico antes de que avance el día.", map:"https://maps.google.com/?q=Arucas+Gran+Canaria"},
        {time:"11:30", title:"Gáldar y Cueva Pintada", text:"Reserva entrada. Aquí la historia anterior a la conquista deja de ser una nota al pie.", map:"https://maps.google.com/?q=Museo+y+Parque+Arqueologico+Cueva+Pintada", tag:"RESERVA"},
        {time:"14:00", title:"Agaete", text:"Pescado, puerto y sobremesa. Pregunta peso y precio total antes de pedir una pieza completa.", map:"https://maps.google.com/?q=Puerto+de+las+Nieves"},
        {time:"16:30", title:"Valle y piscinas naturales", text:"Un paseo por el valle y baño en Las Salinas si el océano está tranquilo.", map:"https://maps.google.com/?q=Valle+de+Agaete"},
        {time:"18:30", title:"Atardecer atlántico", text:"No corras de vuelta. Espera a que baje la luz y después regresa con calma."}
      ],
      verdict:"Haría Arucas, Cueva Pintada y Agaete. El norte no se parece al sur y precisamente por eso hay que verlo." },
    { id:"este", short:"D5", label:"Día 5", number:"05", title:"La isla que no sale primero en Google", subtitle:"Tufia · Tobas de Colores · Agüimes", route:"Maspalomas → Tufia → Barranco de las Vacas → Agüimes → Guayadeque",
      shortPlan:[
        {time:"09:30", title:"Tufia", text:"Pequeña, singular y vivida. Respeta a los residentes y no conviertas el acceso en un problema por aparcar cerca.", map:"https://maps.google.com/?q=Tufia+Gran+Canaria", tag:"NO TE LA PIERDAS"},
        {time:"11:30", title:"Barranco de las Vacas", text:"La parada fotogénica que has visto en redes. En una hora puedes aparcar, bajar, ver las Tobas de Colores y regresar.", map:"https://maps.google.com/?q=Camino+para+bajar+a+las+Tobas+de+Colores", tag:"VÍDEO DE ACCESO"},
        {time:"13:00", title:"Agüimes y El Guachinche", text:"Casco histórico y comida económica. Pide el lagarto: es cerdo a la brasa y con un plato pueden comer tres.", map:"https://maps.google.com/?q=Restaurante+El+Guachinche+Agüimes", tag:"COMER LOCAL"}
      ],
      longPlan:[
        {time:"09:00", title:"Tufia", text:"Ven por su personalidad y su relación con el mar, no buscando una playa de hotel.", map:"https://maps.google.com/?q=Tufia+Gran+Canaria", tag:"NO TE LA PIERDAS"},
        {time:"10:45", title:"Barranco de las Vacas", text:"No busques solo el nombre del barranco: necesitas el acceso a las Tobas de Colores. La visita real ocupa aproximadamente una hora.", map:"https://maps.google.com/?q=Camino+para+bajar+a+las+Tobas+de+Colores", tag:"VÍDEO DE ACCESO"},
        {time:"12:30", title:"Agüimes", text:"Paseo por el casco antes de sentarte a comer.", map:"https://maps.google.com/?q=Agüimes+Gran+Canaria"},
        {time:"14:00", title:"El Guachinche", text:"Económico, buen servicio e indumentaria canaria. Pide el lagarto: cerdo a la brasa, abundante y riquísimo.", map:"https://maps.google.com/?q=Restaurante+El+Guachinche+Agüimes", tag:"UN PLATO PARA TRES"},
        {time:"16:30", title:"Guayadeque", text:"Barranco y casas-cueva para quien todavía quiera continuar. Ya vienes comido: aquí la visita es el paisaje.", map:"https://maps.google.com/?q=Barranco+de+Guayadeque"},
        {time:"18:00", title:"Último baño en el sur", text:"Regresa a Maspalomas. Terminar cada ruta en la playa es parte del plan, no tiempo perdido."}
      ],
      verdict:"Tufia es obligatoria. Después elegiría Agüimes y Guayadeque para cerrar con la Gran Canaria que muchos visitantes nunca llegan a ver." }
  ];

  var CHECKLIST = ["Vuelo comprado por precio final, no por logotipo","Coche reservado con condiciones completas","Roque Nublo reservado y QR descargado","Cueva Pintada y mesas clave comprobadas","Mochila: toalla, bañador, cholas y cangrejeras","Sudadera, calzado cerrado, agua y protector solar"];

  var active = "sur";
  var pace = "short";
  var checked = CHECKLIST.map(function(){ return false; });

  function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  function dayById(id){ for (var i=0;i<DAYS.length;i++) if (DAYS[i].id===id) return DAYS[i]; return DAYS[0]; }

  function renderDayTabs(){
    document.getElementById("dayTabs").innerHTML = DAYS.map(function(d){
      return '<button type="button" role="tab" aria-selected="'+(d.id===active)+'" data-day="'+d.id+'"><span>'+esc(d.short)+'</span><b>'+esc(d.title)+'</b></button>';
    }).join("");
  }
  function updateTabsSelected(){
    document.querySelectorAll('#dayTabs [data-day]').forEach(function(b){
      b.setAttribute("aria-selected", String(b.getAttribute("data-day")===active));
    });
  }
  function updatePaceSelected(){
    document.querySelectorAll('#paceTabs [data-pace]').forEach(function(b){
      b.setAttribute("aria-pressed", String(b.getAttribute("data-pace")===pace));
    });
  }

  function renderDayPanel(){
    var d = dayById(active);
    var stops = pace === "short" ? d.shortPlan : d.longPlan;
    var stopsHtml = stops.map(function(s, i){
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
      + '<span>'+esc(d.number)+'</span><p>'+esc(d.label)+'</p><h3>'+esc(d.title)+'</h3><small>'+esc(d.subtitle)+'</small>'
      + '<div>'+esc(d.route)+'</div>'
      + '<b>'+(pace==="short" ? "Menos visitas. Más tiempo." : "Desde primera hora hasta el final.")+'</b>'
      + '</div>'
      + '<div class="timeline">'+stopsHtml+'<blockquote><span>MI ELECCIÓN</span>'+esc(d.verdict)+'</blockquote></div>';

    var video = document.getElementById("accessVideo");
    video.style.display = (active === "este") ? "" : "none";
  }

  function saveChecked(){ try { localStorage.setItem("gc-checklist", JSON.stringify(checked)); } catch(e){} }
  function loadChecked(){
    try {
      var saved = localStorage.getItem("gc-checklist");
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
    ring.style.setProperty("--value", (pct*3.6)+"deg");
    ring.querySelector("span").innerHTML = pct + "%<small>preparado</small>";
  }
  function toggleTask(i){ checked[i] = !checked[i]; saveChecked(); renderChecklist(); }

  function updateScrollProgress(){
    var available = document.documentElement.scrollHeight - window.innerHeight;
    var pct = available > 0 ? (window.scrollY / available) * 100 : 0;
    document.getElementById("progressBar").style.width = pct + "%";
  }

  document.addEventListener("click", function(e){
    var dayBtn = e.target.closest("[data-day]");
    if (dayBtn){ active = dayBtn.getAttribute("data-day"); renderDayPanel(); updateTabsSelected(); return; }
    var paceBtn = e.target.closest("[data-pace]");
    if (paceBtn){ pace = paceBtn.getAttribute("data-pace"); renderDayPanel(); updatePaceSelected(); return; }
    var label = e.target.closest("#checklistWrap label");
    if (label){ e.preventDefault(); toggleTask(parseInt(label.getAttribute("data-idx"),10)); return; }
  });

  window.addEventListener("scroll", updateScrollProgress, {passive:true});

  loadChecked();
  renderDayTabs();
  renderDayPanel();
  renderChecklist();
  updateScrollProgress();
})();
