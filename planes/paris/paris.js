// ============================================================
// París en 5 días · datos e interacción
// Puerto a plano de app/page.tsx (React) entregado por Óscar.
// Misma información, sin framework.
// ============================================================
(function(){
  var PACE_KEYS = ["short","long"];
  var PACE_LABEL = { short:"Ruta corta", long:"Ruta larga" };
  var PACE_SMALL = { short:"Lo esencial de cada día, sin correr.", long:"Todas las paradas, para quien camina mucho." };

  var DAYS = [
    { tag:"DÍA 01 · ÓPERA · VENDÔME · TULLERÍAS · LOUVRE", title:"El París que imaginabas",
      quote:"Un café puede ser caro. La vista frente a la Ópera también forma parte del pedido.",
      short:["Café frente a la Ópera Garnier","Place Vendôme y Rue de la Paix","Tullerías: descanso real con baguette, queso y pastelería","Louvre: recorrido esencial de 2-3 horas"],
      long:["Ópera Garnier, por dentro o desde su fachada","Place Vendôme · Rue de la Paix","Palais Royal y las columnas de Buren","Jardín de las Tullerías con baguette, queso y pastelería","Arco del Carrusel","Louvre con recorrido decidido de antemano","Azoteas cerca de la Ópera al atardecer"],
      note:"No llenes el día de entradas: parar al sol en las Tullerías con algo de comer es parte del plan, no una pérdida de tiempo.",
      eat:"Baguette, queso y pastelería en las Tullerías. Cena en un bouillon de verdad." },
    { tag:"DÍA 02 · ÎLE DE LA CITÉ · NOTRE-DAME · BARRIO LATINO", title:"La piedra, los libros y la noche",
      quote:"Notre-Dame es imprescindible. Cenar bien en el Barrio Latino, también.",
      short:["Notre-Dame temprano","Sainte-Chapelle o paseo por la isla","Bouquinistes y Shakespeare and Company","Cena, la experiencia principal del día, en el Barrio Latino"],
      long:["Île de la Cité y Notre-Dame","Sainte-Chapelle · Conciergerie","Pont Neuf y Square du Vert-Galant","Bouquinistes junto al Sena","Shakespeare and Company","Panthéon","Jardines de Luxemburgo","Cena en el Barrio Latino"],
      note:"Evita las cartas de seis páginas y a quien te llame desde la puerta: son la señal de un restaurante hecho solo para turistas.",
      eat:"Carta corta, cocina francesa reconocible y nadie tirando de ti desde la puerta." },
    { tag:"DÍA 03 · LOUVRE → SENA → TORRE EIFFEL", title:"Hoy París se hace caminando",
      quote:"El Sena es la avenida más bonita de París.",
      short:["Pont des Arts y Pont Neuf","Place de la Concorde y Pont Alexandre III","Invalides y Champ-de-Mars","Torre Eiffel y Trocadéro"],
      long:["Louvre y Pont des Arts","Pont Neuf","Musée d'Orsay, por fuera","Passerelle Léopold-Sédar-Senghor","Place de la Concorde","Pont Alexandre III","Grand Palais y Petit Palais","Invalides","Pont d'Iéna","Champ-de-Mars y Torre Eiffel","Trocadéro"],
      note:"La ruta larga sigue los puentes en un orden geográfico razonable, sin obligarte a cruzar el río dos veces.",
      eat:"Crêpe durante la marcha. Mesa reservada para después de la Torre Eiffel." },
    { tag:"DÍA 04 · ARCO · CAMPOS ELÍSEOS · ALMA · TROCADÉRO", title:"Grandes perspectivas y una historia incómoda",
      quote:"El lugar donde murió Diana se explica con respeto. No es un decorado.",
      short:["Arco del Triunfo y Campos Elíseos","Avenue Montaigne","Llama de la Libertad, con respeto","Torre Eiffel iluminada desde Trocadéro"],
      long:["Arco del Triunfo","Campos Elíseos","Grand Palais y Petit Palais","Avenue Montaigne","Pont de l'Alma","Llama de la Libertad","Trocadéro","Torre Eiffel iluminada"],
      note:"La Llama de la Libertad está sobre el túnel donde murió Diana de Gales y se convirtió espontáneamente en memorial. Lo contamos con contexto, no como una atracción más.",
      eat:"Brasserie clásica o una cena especial con vistas: aquí sí compensa reservar." },
    { tag:"DÍA 05 · MONTMARTRE · PIGALLE · AZOTEAS", title:"París desde arriba",
      quote:"Las cubiertas de zinc, las cúpulas y los remates dorados son un espectáculo sin entrada.",
      short:["Sacré-Cœur temprano","Place du Tertre","Muro de los Te quiero","Azotea cerca de la Ópera"],
      long:["Sacré-Cœur antes de la multitud","Calles secundarias de Montmartre","Place du Tertre","Moulin de la Galette","Muro de los Te quiero","Pigalle","Exterior del Moulin Rouge","Azoteas de los grandes almacenes cerca de la Ópera"],
      note:"Las azoteas de los grandes almacenes son gratis y muestran cubiertas de zinc, cúpulas y detalles dorados: una de las mejores imágenes de París sin pagar entrada.",
      eat:"Croissant serio por la mañana. Última cena elegida según el tipo de viaje." }
  ];
  var DAY_KM = { short:["5 km","5 km","6 km","5 km","5 km"], long:["8 km","8 km","11 km","8 km","8 km"] };

  var BRIDGES = ["Pont des Arts","Pont Neuf","Passerelle Léopold-Sédar-Senghor","Pont de la Concorde","Pont Alexandre III","Pont d'Iéna"];

  var STAYS = [
    { who:"LE MARAIS · BASTILLE", name:"Equilibrio", text:"Vida de barrio, buenas cenas y buenas conexiones. La base más equilibrada para casi cualquier viaje.", q:"apartamentos Le Marais Paris" },
    { who:"SAINT-GERMAIN · LATINO", name:"Primera visita", text:"Se vive a pie y de noche. Precio más alto, pero vuelves caminando a una ciudad viva.", q:"apartamentos Saint-Germain-des-Pres Paris" },
    { who:"ÓPERA · MADELEINE", name:"Logística y elegancia", text:"Central, elegante y muy práctica. Fácil desde los aeropuertos y perfecta para esta ruta.", q:"apartamentos Opera Paris" },
    { who:"MONTPARNASSE · RÉPUBLIQUE", name:"Ahorro razonable", text:"Mejor precio sin salir de París. Comprueba siempre la calle y la estación exactas.", q:"apartamentos Montparnasse Paris" }
  ];

  var TRAVELERS = {
    pareja:{ label:"En pareja", line:"París funciona mejor dejando huecos.", tips:["Un atardecer junto al Sena sin reserva","Cena especial el día de la Torre Eiffel","Montmartre temprano, Barrio Latino de noche"] },
    familia:{ label:"Con niños", line:"Menos museo, más ciudad y descansos de verdad.", tips:["Louvre con la misión de las 8 obras, no el museo entero","Tullerías y Luxemburgo para parar a media mañana","Crucero corto por el Sena cuando fallen las piernas"] },
    amigos:{ label:"Con amigos", line:"Más barrio, mesa compartida y última copa.", tips:["Bouillon y cena larga en el Barrio Latino","Ruta larga de los puentes del Sena","Noche en Pigalle después de Montmartre"] },
    solo:{ label:"Por tu cuenta", line:"París es una de las mejores ciudades para caminar sola o solo.", tips:["Barra de café cuando exista, para sentarte a mirar","Museos al ritmo que tú decidas","Mercados, librerías y fotografía urbana"] }
  };
  var TRAVELER_KEYS = ["pareja","familia","amigos","solo"];

  var BUDGETS = {
    smart:{ label:"€ · Ahorro inteligente", title:"La ciudad ya ofrece el espectáculo",
      text:"Alojamiento bien conectado, no necesariamente pegado a un monumento. Desayuno de boulangerie. Transporte según el uso real. Una gran visita de pago al día.",
      items:["Alojamiento conectado, no pegado al monumento","Desayuno de boulangerie","Transporte según el uso real","Una gran visita de pago al día","Bouillons, mercados y picnic bien elegido","Tullerías, azoteas, puentes y orillas del Sena: gratis"] },
    premium:{ label:"€€€ · Sin mirar tanto el precio", title:"Comprar tiempo y una buena ventana",
      text:"Hotel realmente central en Saint-Germain o en Ópera. Traslado privado cuando compre tiempo de verdad. Cena gastronómica o con vistas.",
      items:["Hotel realmente central en Saint-Germain o Ópera","Traslado privado cuando compre tiempo","Cena gastronómica o con vistas","Crucero en una embarcación pequeña","Horarios y accesos bien reservados de antemano","Una habitación a la que apetezca volver"] }
  };
  var BUDGET_KEYS = ["smart","premium"];

  var EIFFEL = [
    { label:"Escaleras", title:"La opción física, normalmente más económica", text:"Subes caminando hasta la segunda planta. Comprueba la disponibilidad antes de decidirte: no siempre está abierta." },
    { label:"2ª planta", title:"La elección equilibrada para primeras visitas", text:"Ascensor, buena altura y menos tiempo que la cima. La opción que funciona para la mayoría." },
    { label:"La cima", title:"La experiencia completa, si el día acompaña", text:"Más cara y más disputada. Depende del viento, de incidencias y de la disponibilidad del día: resérvala con margen." },
    { label:"No subir", title:"También es una decisión legítima", text:"Desde Trocadéro, el Champ-de-Mars o el propio Sena la torre aparece igual en la experiencia y en las fotos. Sin colas ni reserva." }
  ];

  var FOOD = [
    { tag:"01 · RECIÉN HECHO", name:"Baguette tradition", text:"No compres la primera que veas junto a un monumento. Busca una boulangerie con cola local." },
    { tag:"02 · MAÑANA", name:"Croissant de mantequilla", text:"Crujiente fuera, alveolado dentro. Si parece pan blando con forma de luna, sigue caminando." },
    { tag:"03 · TAMBIÉN DE MAÑANA", name:"Pain au chocolat", text:"El otro clásico de bollería. Se juzga igual que el croissant: hojaldre de verdad, no una imitación blanda." },
    { tag:"04 · EN LA CALLE", name:"Crêpe", text:"Perfecta para comer caminando entre una parada y otra, sin sentarte a nada." },
    { tag:"05 · CLÁSICO", name:"Sopa de cebolla", text:"Gratinada, con pan y queso fundido. Un plato de cuchara que vale la pena buscar bien." },
    { tag:"06 · AL MENOS UNA VEZ", name:"Steak-frites", text:"No necesitas alta cocina para comer francés. Necesitas elegir un sitio que realmente cocine." },
    { tag:"07 · PARA LLEVAR", name:"Quesos franceses", text:"Una selección de una fromagerie de barrio, para comer en un banco o en las Tullerías." },
    { tag:"08 · ECONÓMICO", name:"Un bouillon", text:"Mesas juntas, cocina francesa reconocible y precios que todavía tienen sentido." },
    { tag:"09 · SERIA", name:"Una pastelería seria", text:"Elige por el escaparate y por la cola, no por estar en la calle más fotografiada." },
    { tag:"10 · SIN TRAMPA", name:"Cena en el Barrio Latino", text:"Cena aquí, sí. Pero evita cartas de seis páginas y a quien te persiga desde la puerta." }
  ];

  var PREP = ["Alojamiento reservado y bien conectado","Louvre reservado con antelación","Torre Eiffel: entrada oficial elegida y reservada","Ritmo corto o largo decidido","Calzado cómodo para caminar mucho","Transporte según el uso real, sin excesos","Restaurante de la cena del Barrio Latino elegido","Presupuesto decidido: ahorro inteligente o sin mirar tanto el precio","Tipo de viaje (pareja, niños, amigos, solo) tenido en cuenta","Ropa preparada para el clima parisino"];

  var pace = "long";
  var day = 0;
  var trav = 0;
  var traveler = "pareja";
  var budget = "smart";
  var eiffel = 1;
  var checked = [];

  function esc(s){ return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
  function mapUrl(q){ return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q); }

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
      '<span>'+esc(s.who)+'</span><h3>'+esc(s.name)+'</h3><p>'+esc(s.text)+'</p>'
      + '<a href="'+esc(mapUrl(s.q))+'" target="_blank" rel="noopener noreferrer">Buscar alojamiento ↗</a>';
  }

  function renderTravelerTabs(){
    document.getElementById("travelerTabs").innerHTML = TRAVELER_KEYS.map(function(k){
      return '<button type="button" class="'+(traveler===k?"active":"")+'" data-traveler="'+k+'">'+esc(TRAVELERS[k].label)+'</button>';
    }).join("");
  }
  function renderTravelerResult(){
    var t = TRAVELERS[traveler];
    document.getElementById("travelerResult").innerHTML =
      '<h3>'+esc(t.line)+'</h3>' + t.tips.map(function(x){ return '<p><span>→</span>'+esc(x)+'</p>'; }).join("");
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
    document.getElementById("dayTabs").innerHTML = DAYS.map(function(_, i){
      return '<button type="button" class="'+(day===i?"active":"")+'" data-day="'+i+'">DÍA '+String(i+1).padStart(2,"0")+'</button>';
    }).join("");
  }
  function renderDayDetail(){
    var d = DAYS[day];
    var stops = pace === "short" ? d.short : d.long;
    var km = DAY_KM[pace][day];
    var stopsHtml = stops.map(function(s, i){
      return '<li><span>'+String(i+1).padStart(2,"0")+'</span><strong>'+esc(s)+'</strong>'
        + '<a href="'+esc(mapUrl(s+" Paris"))+'" target="_blank" rel="noopener noreferrer">MAPA ↗</a></li>';
    }).join("");
    document.getElementById("dayDetail").innerHTML =
      '<div><span>'+esc(d.tag)+'</span><h3>'+esc(d.title)+'</h3><b>'+esc(km)+' APROX. · '+esc(PACE_LABEL[pace].toUpperCase())+'</b>'
      + '<blockquote>&ldquo;'+esc(d.quote)+'&rdquo;</blockquote>'
      + '<p>'+esc(d.note)+'</p><em>COMER HOY · '+esc(d.eat)+'</em></div>'
      + '<ol>'+stopsHtml+'</ol>';
  }

  function renderBridgeLine(){
    document.getElementById("bridgeLine").innerHTML = BRIDGES.map(function(b, i){
      return '<div><i>'+(i+1)+'</i><span>'+esc(b)+'</span></div>';
    }).join("");
  }

  function renderEiffelTabs(){
    document.getElementById("eiffelTabs").innerHTML = EIFFEL.map(function(e, i){
      return '<button type="button" class="'+(eiffel===i?"active":"")+'" data-eiffel="'+i+'">'+esc(e.label)+'</button>';
    }).join("");
  }
  function renderEiffelResult(){
    var e = EIFFEL[eiffel];
    document.getElementById("eiffelResult").innerHTML = '<h4>'+esc(e.title)+'</h4><p>'+esc(e.text)+'</p>';
  }

  function renderFoodGrid(){
    document.getElementById("foodGrid").innerHTML = FOOD.map(function(f){
      return '<article><span>'+esc(f.tag)+'</span><h3>'+esc(f.name)+'</h3><p>'+esc(f.text)+'</p></article>';
    }).join("");
  }

  function saveChecked(){ try { localStorage.setItem("paris-prep", JSON.stringify(checked)); } catch(e){} }
  function loadChecked(){
    try { var saved = localStorage.getItem("paris-prep"); if (saved) checked = JSON.parse(saved) || []; } catch(e){}
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
    var travelerBtn = e.target.closest("[data-traveler]");
    if (travelerBtn){ traveler = travelerBtn.getAttribute("data-traveler"); renderTravelerTabs(); renderTravelerResult(); return; }
    var budgetBtn = e.target.closest("[data-budget]");
    if (budgetBtn){ budget = budgetBtn.getAttribute("data-budget"); renderBudgetTabs(); renderBudgetResult(); return; }
    var dayBtn = e.target.closest("[data-day]");
    if (dayBtn){ day = parseInt(dayBtn.getAttribute("data-day"),10); renderDayTabs(); renderDayDetail(); return; }
    var eiffelBtn = e.target.closest("[data-eiffel]");
    if (eiffelBtn){ eiffel = parseInt(eiffelBtn.getAttribute("data-eiffel"),10); renderEiffelTabs(); renderEiffelResult(); return; }
  });
  document.addEventListener("change", function(e){
    if (e.target.matches('#checklistWrap input[type="checkbox"]')){ toggleTask(parseInt(e.target.getAttribute("data-idx"),10)); }
  });

  loadChecked();
  renderPaceTabs();
  renderTravTabs();
  renderStayDetail();
  renderTravelerTabs();
  renderTravelerResult();
  renderBudgetTabs();
  renderBudgetResult();
  renderDayTabs();
  renderDayDetail();
  renderBridgeLine();
  renderEiffelTabs();
  renderEiffelResult();
  renderFoodGrid();
  renderChecklist();
})();
