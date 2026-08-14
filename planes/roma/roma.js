// ============================================================
// Roma en 5 días · datos e interacción
// Sitio 100% estático, sin framework.
// ============================================================
(function(){
  var PACE_KEYS = ["short","long"];
  var PACE_LABEL = { short:"Poco y bien", long:"Roma entera" };
  var PACE_SMALL = { short:"Lo esencial de cada día, sin correr.", long:"Todas las paradas, para quien camina mucho." };

  var DAYS = [
    { tag:"DÍA 01 · COLISEO · FORO · PALATINO", title:"Roma antes de Roma",
      quote:"Dos mil años no caben en una visita guiada. Pero hoy empiezas a entenderlos.",
      short:["Coliseo con entrada horaria","Foro Romano","Campidoglio","Via dei Fori Imperiali al atardecer"],
      long:["Coliseo temprano","Arco de Constantino","Palatino","Foro Romano","Campidoglio","Santa Maria in Aracoeli","Terraza del Vittoriano","Via dei Fori Imperiali al atardecer","Cena en Monti"],
      note:"No metas Coliseo, Foro y Palatino en el mismo tramo sin margen: el calor y el pavimento irregular condicionan el tiempo real de la visita.",
      eat:"Carbonara o cacio e pepe en Monti. Evita la primera terraza que veas frente al Coliseo." },
    { tag:"DÍA 02 · TREVI · PANTEÓN · NAVONA", title:"La Roma que aparece sin avisar",
      quote:"Giras una esquina y la ciudad te lanza una fuente, un templo o un Caravaggio.",
      short:["Fontana di Trevi antes de las 08:00","Panteón","Piazza Navona","Campo de' Fiori"],
      long:["Fontana di Trevi antes de las 08:00","Piazza di Spagna","Columna de Marco Aurelio","San Luigi dei Francesi: los Caravaggio","Panteón","Piazza Navona","Campo de' Fiori","Gueto judío e Isola Tiberina"],
      note:"Ir a Trevi antes de las 08:00 no es un capricho: es la única franja del día sin varias filas de gente delante de la fuente.",
      eat:"Armando al Pantheon si consigues reserva. Si no, SantoPalato o Da Cesare al Casaletto tienen igual de sentido." },
    { tag:"DÍA 03 · VATICANO · PRATI · SANT'ANGELO", title:"El día que hay que reservar",
      quote:"Improvisar en el Vaticano no es romanticismo. Es hacer cola y ver menos.",
      short:["Museos Vaticanos","Capilla Sixtina","Basílica de San Pedro","Castel Sant'Angelo por fuera"],
      long:["Museos Vaticanos a primera hora","Capilla Sixtina","Basílica de San Pedro","Cúpula, según piernas, calor y colas","Piazza San Pietro","Prati para comer","Castel Sant'Angelo","Ponte Sant'Angelo al atardecer"],
      note:"No des por hecho un paso garantizado entre los Museos Vaticanos y San Pedro: compruébalo el propio día, según cómo esté organizado el acceso.",
      eat:"Prati se come mejor que la zona pegada a San Pedro. Reserva si quieres algo especial por la noche." },
    { tag:"DÍA 04 · TESTACCIO · TRASTEVERE · GIANICOLO", title:"La Roma que todavía vive aquí",
      quote:"Trastevere es precioso. También puede convertirse en un decorado si eliges cualquier mesa.",
      short:["Santa Maria in Trastevere","Calles secundarias de Trastevere","Gianicolo al atardecer","Cena reservada de antemano"],
      long:["Mercado de Testaccio","Monte Testaccio, por fuera","Aventino","Cerradura de los Caballeros de Malta","Giardino degli Aranci","Isola Tiberina","Santa Maria in Trastevere","Calles secundarias de Trastevere","Gianicolo al atardecer"],
      note:"Trastevere puede ser un decorado turístico si te sientas en cualquier mesa de las calles más transitadas: aléjate un par de calles y la cocina suele mejorar.",
      eat:"Testaccio al mediodía. Da Cesare al Casaletto, SantoPalato o una trattoria contrastada por la noche." },
    { tag:"DÍA 05 · APPIA ANTICA · CATACUMBAS", title:"Salir del museo al aire libre",
      quote:"La Via Appia no es una excursión fuera de Roma. Es caminar por el principio de sus carreteras.",
      short:["Via Appia Antica","Un complejo de catacumbas con visita oficial","Parque de los Acueductos o tarde libre"],
      long:["Porta San Sebastiano","Via Appia Antica","Un complejo de catacumbas con visita oficial","Bicicleta, solo si encaja con el grupo","Parque de los Acueductos","Última cena romana"],
      note:"",
      eat:"Supplì durante el paseo. Última cena sin vistas obligatorias: producto, pasta y una buena mesa." }
  ];

  var STAYS = [
    { type:"hotel", group:["2","4"], badge:"EQUILIBRIO", name:"Hotel Artemide", place:"Via Nazionale · Repubblica", rating:"9,2 · 1.700+ reseñas · ubicación 9,5", why:"Servicio muy sólido, desayuno, metro cercano y centro a pie. La recomendación general para primera visita.", link:"https://www.booking.com/hotel/it/artemide.es.html" },
    { type:"hotel", group:["2","4"], badge:"UBICACIÓN", name:"H10 Palazzo Galla", place:"Piazza Venezia · Foros", rating:"Ubicación 9,8", why:"Para salir caminando cada mañana y volver a una Roma monumental. Comprueba categoría y vistas reales.", link:"https://www.booking.com/hotel/it/h10-palazzo-galla.it.html" },
    { type:"hotel", group:["2"], badge:"SIN MIRAR PRECIO", name:"Portrait Roma", place:"Piazza di Spagna", rating:"9,2 · ubicación 10", why:"Lungarno Collection: espacio, atención personal y azotea. Aquí pagas localización y servicio, no solo la habitación.", link:"https://www.booking.com/hotel/it/portrait-suites.es.html" },
    { type:"home", group:["2"], badge:"PAREJA", name:"Panoramic Penthouse junto al Panteón", place:"Centro Storico", rating:"4,78 · 258 reseñas · ubicación 5,0", why:"Para dos huéspedes, en pleno centro. Sin ascensor: comprueba las escaleras y el techo bajo del baño antes de reservar.", link:"https://www.airbnb.com/rooms/44257120" },
    { type:"home", group:["2","4"], badge:"COLISEO", name:"The Romans", place:"100 m del Coliseo", rating:"4,9 · 583 reseñas · Top 5%", why:"Hasta cuatro huéspedes. Anfitrión en el edificio, aire acondicionado y ubicación caminable de verdad.", link:"https://www.airbnb.com/rooms/8209118" },
    { type:"home", group:["4","6"], badge:"FAMILIA / GRUPO", name:"Trastevere Center", place:"Trastevere", rating:"4,94 · 360 reseñas", why:"Dos dormitorios y dos baños para 4-6 personas. Mucho ambiente en la zona: comprueba el ruido antes de reservar.", link:"https://www.airbnb.com/rooms/30312397" },
    { type:"home", group:["6"], badge:"GRUPO GRANDE", name:"Trastevere 4BR · 4BA", place:"Trastevere", rating:"4,94 · 62 reseñas", why:"Hasta ocho huéspedes, cuatro dormitorios y tres baños y medio. El espacio que evita convivir haciendo turnos.", link:"https://www.airbnb.com/rooms/1385536076220246043" }
  ];

  var BUDGETS = {
    smart:{ label:"€ · Ahorro inteligente", title:"La ciudad ya ofrece el espectáculo",
      text:"Un alojamiento bien conectado no tiene por qué estar pegado a un monumento. El desayuno en un bar italiano, el agua de los nasoni y una gran entrada de pago al día bastan para un viaje completo.",
      items:["Alojamiento bien conectado, no remoto","Desayuno en un bar italiano","Agua de los nasoni, botella reutilizable","Transporte según el uso real","Una gran entrada de pago al día","Iglesias gratuitas con arte extraordinario","Pizza al taglio, mercados y Testaccio"] },
    premium:{ label:"€€€ · Sin mirar tanto el precio", title:"Comprar tiempo, silencio y una gran mesa",
      text:"Un hotel de localización perfecta, un traslado privado cuando de verdad ahorre tiempo y una visita guiada en los puntos donde perderse cuesta más caro que contratar a alguien que ya conoce el sitio.",
      items:["Hotel de localización perfecta","Traslado privado cuando ahorre tiempo","Guía arqueólogo en Foro y Palatino","Visita privada o reducida en el Vaticano","Restaurantes reservados con antelación","Habitación silenciosa y climatizada"] }
  };
  var BUDGET_KEYS = ["smart","premium"];

  var FOOD = [
    { name:"Armando al Pantheon", area:"Panteón", price:"€€€", dish:"Amatriciana, quinto cuarto, cocina romana clásica", truth:"Histórico, familiar y difícil de reservar. Solo reservas online.", link:"https://armandoalpantheon.it/" },
    { name:"SantoPalato", area:"San Giovanni", price:"€€€", dish:"Carbonara, rabo, casquería y trattoria moderna", truth:"Producto radical y tradición sin nostalgia. Merece salir del centro.", link:"https://www.santopalatoroma.it/" },
    { name:"Da Cesare al Casaletto", area:"Monteverde", price:"€€", dish:"Fritos, gricia, amatriciana y cocina de barrio", truth:"Tranvía y mesa de romanos. Reserva; no vayas esperando una postal del centro.", link:"https://maps.google.com/?q=Da+Cesare+al+Casaletto+Roma" },
    { name:"Flavio al Velavevodetto", area:"Testaccio", price:"€€", dish:"Cacio e pepe, carbonara y abbacchio", truth:"Testaccio de verdad, junto al monte hecho con ánforas antiguas.", link:"https://www.ristorantevelavevodetto.it/" },
    { name:"Pizzarium Bonci", area:"Vaticano", price:"€", dish:"Pizza al taglio, vendida por peso", truth:"Muy conocido, sí. Sigue teniendo sentido si entiendes que el precio cambia con el peso.", link:"https://maps.google.com/?q=Pizzarium+Bonci+Roma" },
    { name:"Seu Pizza Illuminati", area:"Portuense", price:"€€", dish:"Pizza romana contemporánea", truth:"No es la pizza turística de mantel a cuadros. Reserva y ve por la calidad.", link:"https://www.seupizza.com/" }
  ];

  var DISHES = ["Carbonara","Cacio e pepe","Amatriciana","Gricia","Supplì","Carciofi (alla romana o alla giudia, según temporada)","Abbacchio","Pizza al taglio (se vende por peso)","Maritozzo","Gelato artesanal"];

  var PREP = ["Alojamiento reservado y bien conectado","Entrada del Coliseo, Foro y Palatino comprada en la web oficial","Entrada de los Museos Vaticanos comprada en la web oficial","Ritmo decidido: poco y bien o Roma entera","Calzado cómodo, ya usado antes del viaje","Ropa que cubra hombros y rodillas para las iglesias","Botella reutilizable para los nasoni","Restaurante de al menos una cena reservado","Presupuesto decidido: ahorro inteligente o sin mirar tanto el precio","Documentación duplicada en la nube y tarjeta de reserva a mano"];

  var pace = "long";
  var day = 0;
  var stayType = "hotel";
  var stayGroup = "2";
  var budget = "smart";
  var checked = [];

  function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }

  function renderPaceTabs(){
    document.getElementById("paceTabs").innerHTML = PACE_KEYS.map(function(p, i){
      return '<button type="button" class="'+(pace===p?"active":"")+'" data-pace="'+p+'">'
        + '<span>0'+(i+1)+'</span>'+esc(PACE_LABEL[p])
        + '<small>'+esc(PACE_SMALL[p])+'</small>'
        + '</button>';
    }).join("");
  }

  function renderTypeTabs(){
    document.getElementById("typeTabs").innerHTML =
      '<button type="button" class="'+(stayType==="hotel"?"active":"")+'" data-type="hotel">Booking · Hotel</button>'
      + '<button type="button" class="'+(stayType==="home"?"active":"")+'" data-type="home">Airbnb · Casa completa</button>';
  }
  function renderGroupTabs(){
    document.getElementById("groupTabs").innerHTML = ["2","4","6"].map(function(g){
      return '<button type="button" class="'+(stayGroup===g?"active":"")+'" data-group="'+g+'">'+g+(g==="6"?"+":"")+' viajeros</button>';
    }).join("");
  }
  function renderStayList(){
    var list = STAYS.filter(function(s){ return s.type === stayType && s.group.indexOf(stayGroup) !== -1; });
    var el = document.getElementById("stayList");
    if (!list.length){
      el.innerHTML = '<p class="stayEmpty">No hay alojamiento de este tipo para este número de viajeros en la selección. Prueba otra combinación.</p>';
      return;
    }
    el.innerHTML = list.map(function(s, i){
      return '<article><div class="rank">0'+(i+1)+'</div><div>'
        + '<span class="badge">'+esc(s.badge)+' · '+esc(s.place)+'</span>'
        + '<h3>'+esc(s.name)+'</h3>'
        + '<span class="rating">'+esc(s.rating)+'</span>'
        + '<span class="why">'+esc(s.why)+'</span>'
        + '</div><a href="'+esc(s.link)+'" target="_blank" rel="noopener noreferrer">Ver alojamiento ↗</a></article>';
    }).join("");
  }

  function renderBudgetTabs(){
    document.getElementById("budgetTabs").innerHTML = BUDGET_KEYS.map(function(k){
      return '<button type="button" class="'+(budget===k?"active":"")+'" data-budget="'+k+'">'+esc(BUDGETS[k].label)+'</button>';
    }).join("");
  }
  function renderBudgetResult(){
    var b = BUDGETS[budget];
    document.getElementById("budgetResult").innerHTML =
      '<h3>'+esc(b.title)+'</h3><p>'+esc(b.text)+'</p>'
      + '<ul>'+b.items.map(function(x){ return '<li>✓ '+esc(x)+'</li>'; }).join("")+'</ul>';
  }

  function renderDayTabs(){
    document.getElementById("dayTabs").innerHTML = DAYS.map(function(d, i){
      return '<button type="button" class="'+(day===i?"active":"")+'" data-day="'+i+'"><small>DÍA</small><b>'+String(i+1).padStart(2,"0")+'</b><span>'+esc(d.tag.split(" · ")[1]||"")+'</span></button>';
    }).join("");
  }
  function renderDayDetail(){
    var d = DAYS[day];
    var stops = pace === "short" ? d.short : d.long;
    var stopsHtml = stops.map(function(s, i){
      return '<li><span>'+String(i+1).padStart(2,"0")+'</span><strong>'+esc(s)+'</strong></li>';
    }).join("");
    var noteHtml = d.note ? '<p class="dayNote">'+esc(d.note)+'</p>' : "";
    document.getElementById("dayDetail").innerHTML =
      '<div><span class="zone">'+esc(d.tag)+'</span><h3>'+esc(d.title)+'</h3>'
      + '<blockquote>&ldquo;'+esc(d.quote)+'&rdquo;</blockquote>'
      + noteHtml
      + '<em>COMER HOY</em><p class="eatNote">'+esc(d.eat)+'</p></div>'
      + '<ol>'+stopsHtml+'</ol>';
  }

  function renderFoodGrid(){
    document.getElementById("foodGrid").innerHTML = FOOD.map(function(f, i){
      return '<article><span>0'+(i+1)+'</span><p class="place">'+esc(f.area)+' · '+esc(f.price)+'</p><h3>'+esc(f.name)+'</h3>'
        + '<p class="dish">'+esc(f.dish)+'</p><p class="truth">'+esc(f.truth)+'</p>'
        + '<a href="'+esc(f.link)+'" target="_blank" rel="noopener noreferrer">Web / Maps ↗</a></article>';
    }).join("");
  }

  function renderDishes(){
    document.getElementById("dishesGrid").innerHTML = DISHES.map(function(x){ return '<span>'+esc(x)+'</span>'; }).join("");
  }

  function saveChecked(){ try { localStorage.setItem("roma-prep", JSON.stringify(checked)); } catch(e){} }
  function loadChecked(){
    try { var saved = localStorage.getItem("roma-prep"); if (saved) checked = JSON.parse(saved) || []; } catch(e){}
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
    var typeBtn = e.target.closest("[data-type]");
    if (typeBtn){ stayType = typeBtn.getAttribute("data-type"); renderTypeTabs(); renderStayList(); return; }
    var groupBtn = e.target.closest("[data-group]");
    if (groupBtn){ stayGroup = groupBtn.getAttribute("data-group"); renderGroupTabs(); renderStayList(); return; }
    var budgetBtn = e.target.closest("[data-budget]");
    if (budgetBtn){ budget = budgetBtn.getAttribute("data-budget"); renderBudgetTabs(); renderBudgetResult(); return; }
    var dayBtn = e.target.closest("[data-day]");
    if (dayBtn){ day = parseInt(dayBtn.getAttribute("data-day"),10); renderDayTabs(); renderDayDetail(); return; }
  });
  document.addEventListener("change", function(e){
    if (e.target.matches('#checklistWrap input[type="checkbox"]')){ toggleTask(parseInt(e.target.getAttribute("data-idx"),10)); }
  });

  loadChecked();
  renderPaceTabs();
  renderTypeTabs();
  renderGroupTabs();
  renderStayList();
  renderBudgetTabs();
  renderBudgetResult();
  renderDayTabs();
  renderDayDetail();
  renderFoodGrid();
  renderDishes();
  renderChecklist();
})();
