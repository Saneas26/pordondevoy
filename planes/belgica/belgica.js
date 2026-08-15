// ============================================================
// Bélgica en 4 días · 3 ciudades · datos e interacción
// Sitio 100% estático, sin framework.
// ============================================================
(function(){
  var PACE_KEYS = ["short","long"];
  var PACE_LABEL = { short:"Plan corto", long:"Plan largo" };
  var PACE_SMALL = { short:"Lo esencial de cada ciudad, sin correr.", long:"Todas las paradas, para quien camina mucho." };

  var DAYS = [
    { tag:"DÍA 01 · BRUSELAS", title:"Bruselas monumental y cerveza",
      quote:"Cruza las Galerías Saint-Hubert y entra caminando en la Grand-Place. No mires demasiadas fotos antes: conserva ese primer golpe visual.",
      short:["Mont des Arts","Galerías Reales Saint-Hubert","Grand-Place","Manneken Pis","Jeanneke Pis","Cena en Sainte-Catherine"],
      long:["Catedral de San Miguel y Santa Gúdula","Palacio Real y Parque de Bruselas","Sablon","Palacio de Justicia","Ascensor hacia Marolles","Place du Jeu de Balle","Murales del cómic","Grand-Place iluminada de noche"],
      note:"Bruselas se camina fácilmente, pero no comprimas las galerías, la Grand-Place y Sainte-Catherine en las mismas dos horas: cada una pide su propio ritmo.",
      eat:"Croquettes aux crevettes y una gueuze bien servida. La primera cena, mejor en Sainte-Catherine que junto a la Grand-Place.",
      train:"Todo el día 1 se hace a pie, dentro de Bruselas.",
      map:"https://maps.google.com/?q=Grand+Place+Brussels" },
    { tag:"DÍA 02 · GANTE", title:"Gante, la ciudad viva",
      quote:"Gante mejora cuando se iluminan los muelles del Graslei y del Korenlei y se marchan los grupos de un día. No vuelvas a Bruselas demasiado pronto.",
      short:["Puente de San Miguel","Graslei y Korenlei","Iglesia de San Nicolás","Campanario","Catedral de San Bavón","Patershol","Castillo de los Condes por fuera"],
      long:["Entrar en Gravensteen","Reservar el Cordero Místico","Werregarenstraat, el callejón del grafiti","Vrijdagmarkt","Paseo en barco","Quedarse hasta que se iluminen los muelles"],
      note:"No compres la CityCard Gent por sistema para una sola jornada: solo compensa si la suma real de las entradas que vas a usar supera su precio.",
      eat:"Waterzooi de Gante en Patershol, lejos de la zona pegada a la estación.",
      train:"Tren directo Bruxelles-Central → Gent-Sint-Pieters, ≈ 36 min. Desde la estación, tranvía o paseo según el ritmo del día.",
      map:"https://maps.google.com/?q=Graslei+Ghent",
      extraLink:{ label:"Reserva del Cordero Místico ↗", href:"https://www.sintbaafskathedraal.be/en/visit-the-ghent-altarpiece/" } },
    { tag:"DÍA 03 · BRUJAS", title:"Brujas antes que los demás",
      quote:"El problema no es que Brujas sea turística. El problema es verla únicamente siguiendo a cientos de personas.",
      short:["Minnewater","Beguinaje","Hospital de San Juan","Iglesia de Nuestra Señora","Rozenhoedkaai","Burg","Markt","Campanario","Paseo por los canales"],
      long:["Subir al campanario, si entradas y piernas lo permiten","Jan van Eyckplein","Barrio de Santa Ana","Molinos de Kruisvest","Cervecería De Halve Maan","Atardecer junto al canal","Cena temprana y regreso a Bruselas"],
      note:"El barco por los canales merece la pena. Evita el primer restaurante con fotografías de platos junto al Markt: caminar diez minutos suele mejorar la mesa.",
      eat:"Moules-frites y gofre de Lieja, denso y caramelizado, lejos del Markt.",
      train:"Tren directo Bruxelles-Central → Brugge, ≈ 1 h 04 min. Llega temprano, antes de los grandes grupos.",
      map:"https://maps.google.com/?q=Rozenhoedkaai+Bruges",
      extraLink:{ label:"Visit Bruges, web oficial ↗", href:"https://www.visitbruges.be/en" } },
    { tag:"DÍA 04 · BRUSELAS", title:"La otra Bruselas",
      quote:"Este día se adapta al vuelo. El viaje termina bien cuando no conviertes la salida al aeropuerto en una carrera.",
      short:["Barrio Europeo","Parque Léopold","Cincuentenario","Atomium","Regreso con margen al aeropuerto"],
      long:["Parlamentarium","Arcos del Cincuentenario","Metro hasta Atomium","Laeken","Última vuelta por Sainte-Catherine","Compra de chocolate"],
      note:"Si el vuelo sale temprano, mueve el Atomium al día 1: no conviertas la salida al aeropuerto en una carrera.",
      eat:"Stoemp o vol-au-vent. Último gofre: Bruselas, ligero y rectangular; Lieja, denso y caramelizado.",
      train:"Metro y tren al aeropuerto. Comprueba el horario real de tu vuelo antes de fijar la hora de salida.",
      map:"https://maps.google.com/?q=Atomium+Brussels" }
  ];

  var BUDGETS = {
    smart:{ label:"€ · Ahorro inteligente", title:"Una sola base ya ahorra la mitad del viaje",
      text:"Con Bruselas como única base y los billetes de la SNCB comprados directamente, el resto del presupuesto se cuida solo: comer lejos de Markt y de la Grand-Place y comparar vuelos con el traslado total incluido, no solo el precio del billete.",
      items:["Una única base, en Bruselas","Billetes SNCB comprados directamente","Vuelos comparados con el traslado total incluido","Comidas alejadas de Markt y de la Grand-Place","Entradas gratuitas: iglesias, plazas, paseo por canales","Chocolate de obrador en pequeñas cantidades"] },
    premium:{ label:"€€€ · Cómodo, sin correr", title:"Comprar tiempo, horarios flexibles y una buena mesa",
      text:"Un alojamiento central, horarios de tren flexibles en lugar del más barato, entradas reservadas con antelación y un paseo en barco por los canales de Brujas sin mirar el reloj.",
      items:["Alojamiento central en Bruselas","Horarios de tren flexibles","Entradas reservadas con antelación","Paseo en barco por los canales de Brujas","Restaurantes seleccionados, no el más cercano","Campanario de Brujas si las piernas acompañan"] }
  };
  var BUDGET_KEYS = ["smart","premium"];

  var FOOD = [
    { name:"Carbonnade flamande", area:"Bruselas", note:"Estofado de ternera a la cerveza, lento y contundente. El plato de cuchara del país." },
    { name:"Moules-frites", area:"Las tres ciudades", note:"El clásico indiscutible. La calidad está en el punto de cocción del mejillón, no en la ración." },
    { name:"Waterzooi de Gante", area:"Gante", note:"Guiso suave de pollo o pescado con nata y verduras. Menos conocido, igual de propio." },
    { name:"Stoemp", area:"Bruselas", note:"Puré de patata con verdura, acompañamiento humilde y honesto de la cocina belga de siempre." },
    { name:"Croquettes aux crevettes", area:"Bruselas y costa", note:"Croquetas de camarón gris, mejores cuanto más simple es la carta que las sirve." },
    { name:"Vol-au-vent", area:"Bruselas", note:"Hojaldre relleno de pollo, albóndigas y champiñones. Plato de domingo convertido en clásico de restaurante." },
    { name:"Gofre de Bruselas", area:"Bruselas", note:"Rectangular, ligero, de textura aireada. Se sirve normalmente con algo encima, no solo azúcar." },
    { name:"Gofre de Lieja", area:"Lieja / todo el país", note:"Más denso, con perlas de azúcar caramelizadas dentro de la masa. El más fácil de comer caminando." },
    { name:"Chocolate de obrador", area:"Las tres ciudades", note:"Busca el obrador con producción visible, no el escaparate turístico con la caja más grande." },
    { name:"Trapenses, lambic, gueuze y kriek", area:"Las tres ciudades", note:"Cuatro familias de cerveza belga bien distintas entre sí. Merece la pena aprender a pedirlas por su nombre." }
  ];

  var PREP = ["Alojamiento reservado en Bruselas para las cuatro noches","Vuelo comparado con el traslado total incluido, no solo el precio del billete","Billetes de tren SNCB para Gante y Brujas revisados en la fecha real","Ritmo decidido: plan corto o plan largo","Calzado cómodo, ya usado antes del viaje","Impermeable ligero y una capa de abrigo","Batería externa cargada","Reserva del Cordero Místico si vas a entrar en la catedral de San Bavón","Presupuesto decidido: ahorro inteligente o cómodo sin correr","Documentación duplicada en la nube y billetes a mano"];

  var pace = "short";
  var day = 0;
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
    var stops = pace === "short" ? d.short : d.short.concat(d.long);
    var stopsHtml = stops.map(function(s, i){
      return '<li><span>'+String(i+1).padStart(2,"0")+'</span><strong>'+esc(s)+'</strong></li>';
    }).join("");
    var noteHtml = d.note ? '<p class="dayNote">'+esc(d.note)+'</p>' : "";
    var extraHtml = d.extraLink ? '<a class="dayExtra" href="'+esc(d.extraLink.href)+'" target="_blank" rel="noopener noreferrer">'+esc(d.extraLink.label)+'</a>' : "";
    document.getElementById("dayDetail").innerHTML =
      '<div><span class="zone">'+esc(d.tag)+'</span><h3>'+esc(d.title)+'</h3>'
      + '<blockquote>&ldquo;'+esc(d.quote)+'&rdquo;</blockquote>'
      + '<p class="trainPill">↔ '+esc(d.train)+'</p>'
      + noteHtml
      + '<em>COMER HOY</em><p class="eatNote">'+esc(d.eat)+'</p>'
      + '<div class="dayLinks"><a href="'+esc(d.map)+'" target="_blank" rel="noopener noreferrer">Abrir en Maps ↗</a>'+extraHtml+'</div>'
      + '</div>'
      + '<ol>'+stopsHtml+'</ol>';
  }

  function renderFoodGrid(){
    document.getElementById("foodGrid").innerHTML = FOOD.map(function(f, i){
      return '<article><span>'+String(i+1).padStart(2,"0")+'</span><p class="place">'+esc(f.area)+'</p><h3>'+esc(f.name)+'</h3>'
        + '<p class="truth">'+esc(f.note)+'</p></article>';
    }).join("");
  }

  function saveChecked(){ try { localStorage.setItem("belgica-prep", JSON.stringify(checked)); } catch(e){} }
  function loadChecked(){
    try { var saved = localStorage.getItem("belgica-prep"); if (saved) checked = JSON.parse(saved) || []; } catch(e){}
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
  renderBudgetTabs();
  renderBudgetResult();
  renderDayTabs();
  renderDayDetail();
  renderFoodGrid();
  renderChecklist();
})();
