// ============================================================
// Londres en 5 días · datos e interacción
// Sitio 100% estático, sin framework.
// ============================================================
(function(){
  var PACE_KEYS = ["first","again"];
  var PACE_LABEL = { first:"Primera vez", again:"Ya conozco Londres" };
  var PACE_SMALL = { first:"Los iconos que no puedes perderte.", again:"Barrios, canales y una ciudad menos evidente." };

  var DAYS = [
    { tag:"DÍA 01 · WESTMINSTER · BUCKINGHAM · WEST END", title:"El Londres que has venido a buscar",
      quote:"La primera vez se fotografía. Esta noche empieza a sentirse.",
      first:["Big Ben y el Parlamento","Abadía de Westminster","St James's Park","Buckingham Palace","Trafalgar Square","Covent Garden","Soho, Regent Street y Piccadilly Circus de noche","Free tour en español, como alternativa de primera mañana"],
      again:["Westminster desde el otro lado del río","St James's y sus calles laterales","Seven Dials y Neal's Yard","Covent Garden sin las horas punta","Soho más allá de Chinatown","Regent Street","Piccadilly Circus de noche"],
      note:"Seven Dials y Neal's Yard son parada de repetidor: la primera vez ya tienes suficiente West End con Covent Garden y Soho.",
      eat:"Chinatown o Soho. Evita cenar justo donde la pantalla de Piccadilly te obliga a mirar la carta." },
    { tag:"DÍA 02 · LA CITY · TORRE · TÁMESIS · BOROUGH", title:"La City, la Torre y el Támesis",
      quote:"La City parece futurista hasta que una iglesia quemada aparece entre dos rascacielos.",
      first:["Tower of London","Tower Bridge","St Dunstan in the East","Sky Garden o un mirador alternativo","St Paul's Cathedral","Millennium Bridge","Tate Modern","Shakespeare's Globe","Borough Market","South Bank de noche"],
      again:["Leadenhall Market temprano","St Dunstan in the East","St Bartholomew the Great","Tower Bridge desde Bermondsey, sin colas","St Paul's y Millennium Bridge","Borough Market a primera hora","South Bank de noche"],
      note:"Leadenhall Market y St Bartholomew the Great son parada de repetidor: la primera vez el tiempo cunde más en la Torre y la catedral.",
      eat:"Borough Market si eliges puesto con criterio. St John o Quality Chop House para cocina británica seria." },
    { tag:"DÍA 03 · NOTTING HILL · CAMDEN · PRIMROSE", title:"Los barrios que explican por qué vuelves",
      quote:"Camden no es solo mercado. Notting Hill no es solo una puerta de colores.",
      first:["Portobello Road","Calles residenciales y mews de Notting Hill","Little Venice","Regent's Canal","Camden High Street","Camden Lock y Stables Market","Primrose Hill al atardecer"],
      again:["Portobello según el día de mercado","Mews y calles residenciales de Notting Hill","Little Venice y el canal","Camden sin comprar por obligación","Murales, música y fachadas","Paseo completo por Regent's Canal","Primrose Hill al atardecer"],
      note:"Camden no necesita el día entero ni una compra obligatoria. Notting Hill tampoco se reduce a fachadas de colores o localizaciones de cine: cruza a sus calles residenciales.",
      eat:"Camden para probar, no para comer cualquier cosa. Cena de barrio lejos de la entrada principal del mercado." },
    { tag:"DÍA 04 · MUSEOS · CHELSEA · KNIGHTSBRIDGE", title:"Museos, Chelsea y coches de lujo",
      first:["Natural History Museum","Science Museum","Victoria and Albert Museum","Harrods","Sloane Street","Chelsea y King's Road","Hyde Park"],
      again:["Victoria and Albert Museum, con un objetivo concreto","Duke of York Square","Saatchi Gallery","King's Road","Calles residenciales de Chelsea","Sloane Street y Knightsbridge","Belgravia"],
      quote:"Aquí un Ferrari, un Lamborghini o un Rolls-Royce circula con la normalidad de un utilitario en cualquier barrio español.",
      note:"Hyde Park y Belgravia entran o no según el ritmo del día: sujetos a las piernas y al calor, no a una lista cerrada.",
      eat:"Chelsea y Knightsbridge cuestan. Decide si pagas por producto, historia o localización, nunca sin saber por qué." },
    { tag:"DÍA 05 · GREENWICH · TÁMESIS · CANARY WHARF", title:"Greenwich y el Londres desde el agua",
      quote:"El barco no es una excursión añadida. Hoy es el transporte.",
      first:["Barco por el Támesis, usado como transporte","Cutty Sark","Old Royal Naval College y Painted Hall","Queen's House","Meridiano de Greenwich","Greenwich Park","Greenwich Market","Canary Wharf y regreso en Elizabeth line"],
      again:["Thames Clipper como transporte","Greenwich Market temprano","Painted Hall","Queen's House","Meridiano de Greenwich","Greenwich Park","Túnel peatonal, si encaja con el grupo","Canary Wharf y regreso en Elizabeth line"],
      note:"",
      eat:"Mercado de Greenwich al mediodía. Última cena en un pub histórico o en un restaurante elegido, no en una cadena por agotamiento." }
  ];

  var STAYS = [
    { badge:"PRIMERA VISITA", name:"The Resident Covent Garden", place:"Covent Garden", rating:"9,3 · ubicación 9,8 · 1.100+ reseñas", why:"Sales andando a West End, Trafalgar, Soho y el río. Primera visita y presupuesto alto.", link:"https://www.booking.com/hotel/gb/the-nadler-covent-garden.en-gb.html" },
    { badge:"FAMILIAS", name:"The Ampersand Hotel", place:"South Kensington", rating:"9,1 · ubicación 9,7 · 1.900+ reseñas", why:"Museos y metro a un minuto, habitaciones cuidadas. Londres familiar sin renunciar a la tranquilidad.", link:"https://www.booking.com/hotel/gb/the-ampersand.html" },
    { badge:"LOGÍSTICA", name:"The Clermont London Victoria", place:"Victoria", rating:"8,7 · ubicación 9,6 · 6.700+ reseñas", why:"Muy práctico para Gatwick, Buckingham y la estación Victoria. Gran volumen de reseñas.", link:"https://www.booking.com/hotel/gb/the-clermont-victoria.es.html" }
  ];

  var HOME_CHECKLIST = ["Camas reales, no sofás cama","Número real de baños","Escaleras y ascensor","Ruido de la calle o del edificio","Ventilación y climatización","Política de cancelación","Depósito y cargos adicionales","Distancia real a pie al metro"];

  var ZONES = [
    { name:"Covent Garden / Soho", text:"Primera visita, vida nocturna y presupuesto alto." },
    { name:"South Bank / Waterloo", text:"Támesis a la puerta y recorridos caminables." },
    { name:"Victoria", text:"Logística y conexión directa con Gatwick." },
    { name:"Paddington", text:"Heathrow cerca y buenas conexiones de metro." },
    { name:"South Kensington", text:"Familias, museos y un barrio tranquilo." },
    { name:"King's Cross", text:"Conexiones ferroviarias y oferta variada." },
    { name:"Shoreditch", text:"Ambiente, gastronomía y vida nocturna." },
    { name:"Canary Wharf", text:"Hoteles competitivos algún fin de semana, pero sin la sensación del Londres histórico." }
  ];

  var TOURS = {
    clasico:{ label:"Londres clásico", title:"La mejor primera mañana",
      text:"El recorrido para situarte: Trafalgar, Covent Garden, West End y la historia que conecta cada esquina. El punto de encuentro varía entre operadores: compruébalo en tu reserva." },
    city:{ label:"La City", title:"Historia financiera y callejones",
      text:"Iglesias escondidas entre rascacielos, gremios centenarios y la City que casi nadie mira por encima del móvil. Sale de puntos distintos según el operador del día." },
    barrios:{ label:"Camden / Notting Hill", title:"El Londres que no explica un autobús turístico",
      text:"Mercados, canales, fachadas y calles residenciales contadas por alguien que camina esas calles cada semana, no por un guion genérico." },
    noche:{ label:"Soho / Jack el Destripador", title:"Cuando la ciudad cambia de tono",
      text:"Whitechapel y Soho de noche: crimen victoriano, teatros y una cara de Londres que de día pasa desapercibida." }
  };
  var TOUR_KEYS = ["clasico","city","barrios","noche"];

  var BUDGETS = {
    smart:{ label:"£ · Ahorro inteligente", title:"Museos gratis. Barrios infinitos.",
      text:"Un alojamiento bien conectado no tiene por qué estar pegado a un monumento. La contactless bien usada, los museos nacionales y una gran entrada de pago al día bastan para un viaje completo.",
      items:["Hotel conectado, no necesariamente remoto","Contactless correctamente utilizada","Museos nacionales gratuitos","Mirador gratuito reservado con tiempo","Mercados seleccionados, no todas las comidas","Una gran entrada de pago al día","Camden, Notting Hill, Chelsea, parques y Támesis, gratis"] },
    premium:{ label:"£££ · Sin mirar tanto el precio", title:"Comprar ubicación, tiempo y una gran mesa",
      text:"Un hotel en Covent Garden, Soho o South Bank, un traslado cuando de verdad compre tiempo y un restaurante británico reservado con margen.",
      items:["Hotel en Covent Garden, Soho o South Bank","Traslado aeroportuario cuando ahorre tiempo","Musical con buenos asientos","Afternoon tea de referencia","Restaurante británico reservado","Barco y mirador elegido","Habitación amplia y silenciosa"] }
  };
  var BUDGET_KEYS = ["smart","premium"];

  var FOOD = [
    { name:"St John", area:"Smithfield", price:"€€€", dish:"Cocina nose-to-tail, directa e influyente", truth:"El referente de la cocina británica moderna. Reserva con antelación.", link:"https://stjohnrestaurant.com/" },
    { name:"The Quality Chop House", area:"Farringdon", price:"€€€", dish:"Producto británico y carne, en un comedor victoriano", truth:"Cocina que justifica cruzar la ciudad, no solo el edificio.", link:"https://thequalitychophouse.com/" },
    { name:"Rules", area:"Covent Garden", price:"€€€", dish:"Caza, pies y puddings", truth:"Histórico de Covent Garden desde 1798. Se paga historia, pero también cocina.", link:"https://rules.co.uk/" },
    { name:"Dishoom", area:"Covent Garden y varias sedes", price:"€€", dish:"Cocina india de Bombay reinterpretada", truth:"Muy conocido y concurrido: no es ningún secreto local, resérvalo con margen.", link:"https://www.dishoom.com/" },
    { name:"The Devonshire", area:"Soho", price:"€€€", dish:"Pub y grill contemporáneo", truth:"El pub que Londres convirtió en fenómeno. Reserva si quieres comer, no solo beber.", link:"https://devonshiresoho.co.uk/" },
    { name:"The Shed", area:"Notting Hill", price:"€€", dish:"Pequeños platos y producto de temporada", truth:"Una buena razón para comer en el barrio y no solo fotografiar sus fachadas.", link:"https://www.theshed-restaurant.com/" }
  ];

  var DISHES = ["Full English breakfast","Fish and chips bien hecho","Sunday roast, si coincide","Pie and mash","Curry británico-indio","Bagel de Brick Lane","Afternoon tea elegido por calidad","Una pinta en un pub con sentido"];

  var PREP = ["Alojamiento reservado y bien conectado","ETA solicitada en GOV.UK y aprobada","Pasaporte vigente de cada viajero","Contactless o tarjeta lista, siempre el mismo soporte","Ritmo decidido: primera vez o ya conozco Londres","Calzado cómodo, ya usado antes del viaje","Al menos una cena reservada con antelación","Chubasquero o paraguas, por si acaso","Presupuesto decidido: ahorro inteligente o sin mirar tanto el precio","Documentación duplicada en la nube"];

  var pace = "first";
  var day = 0;
  var stayType = "hotel";
  var tour = "clasico";
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

  function renderTravTabs(){
    document.getElementById("travTabs").innerHTML =
      '<button type="button" class="'+(stayType==="hotel"?"active":"")+'" data-type="hotel">Booking · Hotel</button>'
      + '<button type="button" class="'+(stayType==="home"?"active":"")+'" data-type="home">Airbnb · Casa completa</button>';
  }
  function renderStayDetail(){
    var el = document.getElementById("stayDetail");
    if (stayType === "hotel"){
      el.innerHTML = STAYS.map(function(s, i){
        return '<article><div class="rank">0'+(i+1)+'</div><div>'
          + '<span class="badge">'+esc(s.badge)+' · '+esc(s.place)+'</span>'
          + '<h3>'+esc(s.name)+'</h3>'
          + '<span class="rating">'+esc(s.rating)+'</span>'
          + '<span class="why">'+esc(s.why)+'</span>'
          + '</div><a href="'+esc(s.link)+'" target="_blank" rel="noopener noreferrer">Ver alojamiento ↗</a></article>';
      }).join("");
    } else {
      el.innerHTML = '<div class="homeNote"><h3>Sin fichas fijas: verifícalas antes de reservar</h3>'
        + '<p>No fijamos aquí URLs concretas de Airbnb porque cada ficha debe comprobarse antes de publicarla: disponibilidad, precio y anfitrión cambian constantemente. Busca en Covent Garden, Soho, South Bank o South Kensington según el ritmo del viaje y revisa siempre estos puntos antes de pagar:</p>'
        + '<ul>' + HOME_CHECKLIST.map(function(x){ return '<li>✓ '+esc(x)+'</li>'; }).join("") + '</ul></div>';
    }
  }
  function renderZones(){
    document.getElementById("zonesGrid").innerHTML = ZONES.map(function(z){
      return '<article><b>'+esc(z.name)+'</b><p>'+esc(z.text)+'</p></article>';
    }).join("");
  }

  function renderDayTabs(){
    document.getElementById("dayTabs").innerHTML = DAYS.map(function(d, i){
      return '<button type="button" class="'+(day===i?"active":"")+'" data-day="'+i+'"><small>DÍA</small><b>'+String(i+1).padStart(2,"0")+'</b><span>'+esc(d.tag.split(" · ")[1]||"")+'</span></button>';
    }).join("");
  }
  function renderDayDetail(){
    var d = DAYS[day];
    var stops = pace === "first" ? d.first : d.again;
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

  function renderTourTabs(){
    document.getElementById("tourTabs").innerHTML = TOUR_KEYS.map(function(k){
      return '<button type="button" class="'+(tour===k?"active":"")+'" data-tour="'+k+'">'+esc(TOURS[k].label)+'</button>';
    }).join("");
  }
  function renderTourResult(){
    var t = TOURS[tour];
    document.getElementById("tourResult").innerHTML =
      '<span>£10&ndash;15</span><div><h3>'+esc(t.title)+'</h3><p>'+esc(t.text)+'</p>'
      + '<p>Aportación orientativa por persona para un buen recorrido, según duración y calidad. Algunas plataformas recomiendan cifras superiores y algunos operadores piden un mínimo a grupos grandes.</p>'
      + '<a href="https://www.guruwalk.com/es/londres" target="_blank" rel="noopener noreferrer">Comprobar tours actuales ↗</a></div>';
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

  function renderFoodGrid(){
    document.getElementById("foodGrid").innerHTML = FOOD.map(function(f, i){
      return '<article><span>0'+(i+1)+'</span><p class="place">'+esc(f.area)+' · '+esc(f.price)+'</p><h3>'+esc(f.name)+'</h3>'
        + '<p class="dish">'+esc(f.dish)+'</p><p class="truth">'+esc(f.truth)+'</p>'
        + '<a href="'+esc(f.link)+'" target="_blank" rel="noopener noreferrer">Web ↗</a></article>';
    }).join("");
  }

  function renderDishes(){
    document.getElementById("dishesGrid").innerHTML = DISHES.map(function(x){ return '<span>'+esc(x)+'</span>'; }).join("");
  }

  function saveChecked(){ try { localStorage.setItem("londres-prep", JSON.stringify(checked)); } catch(e){} }
  function loadChecked(){
    try { var saved = localStorage.getItem("londres-prep"); if (saved) checked = JSON.parse(saved) || []; } catch(e){}
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
    if (typeBtn){ stayType = typeBtn.getAttribute("data-type"); renderTravTabs(); renderStayDetail(); return; }
    var tourBtn = e.target.closest("[data-tour]");
    if (tourBtn){ tour = tourBtn.getAttribute("data-tour"); renderTourTabs(); renderTourResult(); return; }
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
  renderTravTabs();
  renderStayDetail();
  renderZones();
  renderDayTabs();
  renderDayDetail();
  renderTourTabs();
  renderTourResult();
  renderBudgetTabs();
  renderBudgetResult();
  renderFoodGrid();
  renderDishes();
  renderChecklist();
})();
