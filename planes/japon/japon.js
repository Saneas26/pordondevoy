(function(){
"use strict";
const $ = id => document.getElementById(id);

const days = [
  {n:"01",city:"Madrid → Japón",tag:"Volar",title:"El viaje también forma parte del viaje",short:"Aeropuerto sin prisas, documentación a mano y noche a bordo.",long:"Elegimos el vuelo por horario total, escalas y llegada, no solo por el precio que aparece primero. Con niñas, una escala barata puede salir cara en cansancio.",meals:"Cena en el aeropuerto o a bordo. Lleva una merienda que sabes que comerán.",icon:"✈"},
  {n:"02",city:"Tokio",tag:"Aterrizar",title:"Llegar sin intentar conquistar Tokio",short:"Hotel, paseo corto, cena temprana y cama.",long:"Nada de cinco barrios después de un vuelo intercontinental. El objetivo de hoy es ajustar el cuerpo y que mañana todos quieran empezar.",meals:"Udon, curry japonés o restaurante familiar cerca del hotel.",icon:"東"},
  {n:"03",city:"Tokio",tag:"Tradición + neón",title:"Asakusa, Ueno y Akihabara",short:"Sensō-ji temprano, parque de Ueno y el Tokio eléctrico.",long:"Templo por la mañana, una pausa amplia después de comer y Akihabara cuando enciende sus luces. Historia para los adultos, personajes y videojuegos para ellas.",meals:"Sushi en cinta o tonkatsu. Evita los locales diminutos en la hora punta.",icon:"雷"},
  {n:"04",city:"Tokio",tag:"Seiko",title:"Precisión japonesa y el gran cruce",short:"Seiko Museum Ginza, Tokyo Station, Harajuku y Shibuya.",long:"Tu mañana empieza en Seiko. Ellas tienen Tokyo Character Street como contrapunto. Cerramos en Shibuya: el Japón exacto y el Japón desbordante en un solo día.",meals:"Depachika al mediodía; cena con vistas o yakitori familiar.",icon:"◷"},
  {n:"05",city:"Tokyo DisneySea",tag:"Día completo",title:"Hoy todos volvemos a tener siete años",short:"Un parque único en el mundo. De apertura a cierre, con estrategia.",long:"Entradas fechadas, aplicación configurada y prioridades decididas antes de entrar. Compra Premier Access donde realmente compre tiempo; no conviertas el día en una carrera de atracciones.",meals:"Reserva un descanso sentado. Agua, merienda y cena temprana dentro del parque.",icon:"✦"},
  {n:"06",city:"Tokio → Nagoya → Kioto",tag:"Toyota",title:"De la industria al Shinkansen",short:"Maletas por delante, Toyota en Nagoya y noche en Kioto.",long:"Enviamos las maletas grandes a Kioto. El museo Toyota muestra telares, motores y fabricación real: visual, técnico y mucho más familiar que una sala llena de coches quietos.",meals:"Ekiben en el tren; cena ligera al llegar a Kyoto Station.",icon:"新"},
  {n:"07",city:"Kioto",tag:"El Japón esencial",title:"Fushimi Inari, Higashiyama y Gion",short:"Torii temprano, calles antiguas y Kioto al caer la tarde.",long:"Subimos solo lo que la familia disfrute. Después Kiyomizu-dera, calles con tiempo para mirar y Gion cuando baja la luz. Cuatro templos seguidos no hacen mejor el día.",meals:"Tofu, soba o una cena tranquila de obanzai que acepte niños.",icon:"鳥"},
  {n:"08",city:"Nara + Osaka",tag:"Naturaleza + calle",title:"Ciervos por la mañana, neón por la noche",short:"Nara, Tōdai-ji y Dotonbori.",long:"Los ciervos no son mascotas: se les alimenta con las galletas autorizadas y se guarda la comida. Osaka por la tarde aporta ruido, luces y una recompensa gastronómica.",meals:"Okonomiyaki o takoyaki en Osaka; sin encadenar puestos por obligación.",icon:"鹿"},
  {n:"09",city:"Kioto → Osaka",tag:"Último Japón",title:"Arashiyama antes que los autobuses",short:"Bosque temprano y final abierto según el vuelo.",long:"Madrugamos para que Arashiyama conserve algo de magia. Si salimos por Kansai, dormimos en Osaka. Si el regreso es desde Tokio, Shinkansen con margen y sin experimentos.",meals:"Una última comida elegida por cada miembro de la familia.",icon:"竹"},
  {n:"10",city:"Japón → Madrid",tag:"Volver",title:"La maleta pesa más. Vosotros también sois otros.",short:"Aeropuerto, compras finales y vuelo de regreso.",long:"Documentación preparada la noche anterior. Nada importante en la maleta facturada y margen generoso: Japón funciona bien, pero un viaje familiar no necesita un último sprint.",meals:"Compra algo conocido para el avión y guarda yenes para el aeropuerto.",icon:"帰"}
];

const budgets = {
  smart:{label:"Ahorro inteligente",price:"6.000 — 8.500 €",note:"familia de cuatro · estimación orientativa",
    items:["Vuelo con escala solo si el ahorro compensa","Ueno o Asakusa: habitación familiar real","Billetes de tren por trayecto","Una comida especial al día","Disney + 1 o 2 Premier Access","Maletas Tokio → Kioto una vez"],
    truthTitle:"Ahorrar bien",truthText:"No es dormir lejos, comer mal ni enlazar tres escalas. Es dejar de pagar por lo que no cambia el recuerdo."},
  premium:{label:"Sin mirar tanto el precio",price:"12.000 € → 20.000 €+",note:"la comodidad pone el límite",
    items:["Directo, Premium Economy o Business","Suite familiar en Ginza o Tokyo Station","Hotel oficial Disney y accesos prioritarios","Guía privada en Tokio y Kioto","Green Car y traslados privados","Ryokan, wagyu y experiencias reservadas"],
    truthTitle:"Pagar por tiempo",truthText:"El lujo aquí no es el mármol del hotel. Es una habitación amplia, menos colas, maletas que llegan solas y nadie agotado."}
};

const prepItems = ["Pasaportes revisados","Vuelos comprados","Seguro médico","Alojamientos","Entradas DisneySea","Reserva Seiko","Entrada Toyota","Trenes y asientos","Envío de maletas","Visit Japan Web","eSIM y tarjetas","Restaurantes especiales"];

let activeDay = 0;
let budget = "smart";
let checked = [];

function renderDayTabs(){
  $("dayTabs").innerHTML = days.map((d,i) =>
    '<button type="button" role="tab" aria-selected="' + (activeDay===i) + '" class="' + (activeDay===i?"active":"") + '" data-day="' + i + '"><small>Día</small>' + d.n + '</button>'
  ).join("");
  $("dayTabs").querySelectorAll("[data-day]").forEach(b => {
    b.addEventListener("click", () => { activeDay = Number(b.dataset.day); render(); });
  });
}

function renderDayPanel(){
  const d = days[activeDay];
  $("dayPanel").innerHTML =
    '<div class="dayStamp"><span>' + d.icon + '</span><p>Día</p><b>' + d.n + '</b></div>' +
    '<div class="dayContent"><div class="tagRow"><span>' + d.city + '</span><em>' + d.tag + '</em></div>' +
    '<h3>' + d.title + '</h3><p class="dayShort">' + d.short + '</p><p>' + d.long + '</p>' +
    '<div class="meal"><span>Comer hoy</span><p>' + d.meals + '</p></div></div>' +
    '<div class="dayNav"><button type="button" id="dayPrev" ' + (activeDay===0?"disabled":"") + '>←</button>' +
    '<button type="button" id="dayNext" ' + (activeDay===days.length-1?"disabled":"") + '>→</button></div>';
  const prev = $("dayPrev"), next = $("dayNext");
  if (prev) prev.addEventListener("click", () => { activeDay = Math.max(0, activeDay-1); render(); });
  if (next) next.addEventListener("click", () => { activeDay = Math.min(days.length-1, activeDay+1); render(); });
}

function renderBudget(){
  const b = budgets[budget];
  $("bgLabel").textContent = b.label;
  $("bgPrice").textContent = b.price;
  $("bgNote").textContent = b.note;
  $("bgItems").innerHTML = b.items.map(x => '<li><span>✓</span>' + x + '</li>').join("");
  $("bgTruthTitle").textContent = b.truthTitle;
  $("bgTruthText").textContent = b.truthText;
  $("budgetCard").className = "budgetCard " + budget;
  document.querySelectorAll(".budgetToggle [data-budget]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.budget === budget);
  });
}

function renderChecklist(){
  $("checklistWrap").innerHTML = prepItems.map((x,i) => {
    const done = checked.includes(i);
    return '<label class="' + (done?"done":"") + '" data-idx="' + i + '">' +
      '<input type="checkbox" ' + (done?"checked":"") + '>' +
      '<span>' + (done?"✓":String(i+1).padStart(2,"0")) + '</span><b>' + x + '</b></label>';
  }).join("");
  $("checkCount").textContent = checked.length + " de " + prepItems.length + " preparados";
  $("checkBar").style.width = (checked.length / prepItems.length * 100) + "%";
  $("checklistWrap").querySelectorAll("label[data-idx]").forEach(label => {
    label.addEventListener("click", (e) => {
      e.preventDefault();
      const i = Number(label.dataset.idx);
      checked = checked.includes(i) ? checked.filter(n => n !== i) : checked.concat([i]);
      try { localStorage.setItem("japon-prep", JSON.stringify(checked)); } catch(err){}
      renderChecklist();
    });
  });
}

function render(){
  renderDayTabs();
  renderDayPanel();
}

try {
  const saved = JSON.parse(localStorage.getItem("japon-prep") || "[]");
  if (Array.isArray(saved)) checked = saved;
} catch(err){}

render();
renderBudget();
renderChecklist();

document.querySelectorAll(".budgetToggle [data-budget]").forEach(btn => {
  btn.addEventListener("click", () => { budget = btn.dataset.budget; renderBudget(); });
});
})();
