(function(){
"use strict";
const $ = id => document.getElementById(id);

const routes = {
  valencia:{name:"Valencia",verdict:"Aquí gana el tren.",note:"Centro a centro, sin controles aeroportuarios ni coche parado. El coche aparece si continuáis hacia la Albufera o la costa.",defaults:{
    flight:{label:"Avión",fare:55,transfer:24,hours:4.6,detail:"El vuelo es corto. El viaje no."},
    lowcost:{label:"Low cost",fare:34,transfer:28,hours:4.8,detail:"Solo gana con tarifa limpia y horario perfecto."},
    train:{label:"Alta velocidad",fare:38,transfer:8,hours:2.5,detail:"Chamartín → Joaquín Sorolla."},
    car:{label:"Coche",fare:78,transfer:22,hours:4.1,detail:"Combustible, peajes estimados y parking."},
    bus:{label:"Autobús",fare:28,transfer:6,hours:4.8,detail:"Ahorro si el horario encaja."}
  }},
  barcelona:{name:"Barcelona",verdict:"El tren tiene que perder para que elijas avión.",note:"Sants está dentro de Barcelona. Volar solo gana con una combinación excepcional o si Barajas y El Prat te quedan especialmente bien.",defaults:{
    flight:{label:"Avión",fare:62,transfer:28,hours:5.0,detail:"Suma Barajas, seguridad y El Prat."},
    lowcost:{label:"Low cost",fare:42,transfer:34,hours:5.2,detail:"Equipaje y asiento cambian la comparación."},
    train:{label:"Alta velocidad",fare:48,transfer:9,hours:3.2,detail:"Atocha → Sants, centro a centro."},
    car:{label:"Coche",fare:118,transfer:30,hours:6.7,detail:"No para dejarlo cuatro días aparcado."},
    bus:{label:"Autobús",fare:36,transfer:6,hours:7.8,detail:"Barato, pero consume casi un día."}
  }},
  sevilla:{name:"Sevilla",verdict:"Para una escapada urbana: tren.",note:"Santa Justa queda cerca del centro. El coche gana cuando Sevilla es el principio de una ruta hacia Cádiz o los pueblos blancos.",defaults:{
    flight:{label:"Avión",fare:65,transfer:26,hours:4.8,detail:"No confundas 65 minutos de vuelo con el viaje total."},
    lowcost:{label:"Low cost",fare:39,transfer:31,hours:5.0,detail:"Comprueba equipaje y hora de regreso."},
    train:{label:"Alta velocidad",fare:44,transfer:8,hours:3.1,detail:"Atocha → Santa Justa."},
    car:{label:"Coche",fare:104,transfer:24,hours:5.7,detail:"Interesante para continuar la ruta."},
    bus:{label:"Autobús",fare:32,transfer:6,hours:6.8,detail:"Opción de ahorro, no de tiempo."}
  }},
  paris:{name:"París",verdict:"El aeropuerto decide más que la compañía.",note:"Beauvais puede mantener el mejor precio, pero solo después de sumar autobús, equipaje y dos traslados urbanos. CDG por RER no equivale a CDG por carretera en hora punta.",defaults:{
    flight:{label:"Vuelo a CDG/Orly",fare:105,transfer:42,hours:6.0,detail:"Mejor conexión, normalmente mayor tarifa."},
    lowcost:{label:"Ryanair / Beauvais",fare:48,transfer:70,hours:7.6,detail:"Beauvais no es París. Cuenta ida y vuelta."},
    train:{label:"Tren",fare:125,transfer:12,hours:10.5,detail:"No es el más rápido desde Madrid; puede ser experiencia."},
    car:{label:"Coche",fare:235,transfer:85,hours:13.8,detail:"Solo para una ruta europea, no para París ciudad."},
    bus:{label:"Autobús",fare:58,transfer:8,hours:17.0,detail:"Ahorro extremo y muchas horas."}
  }},
  london:{name:"Londres",verdict:"Compra el aeropuerto, no la palabra Londres.",note:"Heathrow, Gatwick, Stansted, Luton, City y Southend no son intercambiables. El barrio donde duermes decide la conexión correcta.",defaults:{
    flight:{label:"Vuelo bien conectado",fare:118,transfer:58,hours:6.4,detail:"Heathrow/Gatwick según alojamiento."},
    lowcost:{label:"Low cost periférico",fare:52,transfer:76,hours:8.0,detail:"Stansted/Luton: suma traslado y madrugada."},
    train:{label:"Tren vía París",fare:185,transfer:16,hours:13.0,detail:"Bonito, largo y con transbordo."},
    car:{label:"Coche",fare:280,transfer:95,hours:16.0,detail:"No tiene sentido para visitar la ciudad."},
    bus:{label:"Autobús",fare:72,transfer:8,hours:20.0,detail:"Solo si manda absolutamente el precio."}
  }},
  lisboa:{name:"Lisboa",verdict:"Para cuatro días, avión. Para una ruta, coche.",note:"No existe hoy una alta velocidad directa competitiva desde Madrid. El autobús nocturno puede ahorrar una noche si realmente duermes en él.",defaults:{
    flight:{label:"Vuelo directo",fare:78,transfer:27,hours:4.7,detail:"El aeropuerto está razonablemente cerca."},
    lowcost:{label:"Low cost",fare:49,transfer:35,hours:4.9,detail:"Añade equipaje y asiento antes de decidir."},
    train:{label:"Tren con enlaces",fare:74,transfer:12,hours:11.5,detail:"No lo recomendamos como opción práctica."},
    car:{label:"Coche",fare:120,transfer:52,hours:6.7,detail:"Gana si sois varios y continuáis la ruta."},
    bus:{label:"Autobús nocturno",fare:32,transfer:7,hours:7.4,detail:"Puede sustituir una noche; no una cama."}
  }},
  oporto:{name:"Oporto",verdict:"Avión para escapar; coche para recorrer el norte.",note:"El tren desde Madrid no es una solución directa y sencilla. Para Braga, Guimarães, Aveiro o Duero, el coche cambia de sentido.",defaults:{
    flight:{label:"Vuelo directo",fare:86,transfer:28,hours:4.8,detail:"Mejor para tres o cuatro días."},
    lowcost:{label:"Low cost",fare:53,transfer:35,hours:5.0,detail:"Compara tarifa completa."},
    train:{label:"Tren con enlaces",fare:83,transfer:14,hours:12.5,detail:"No es primera recomendación hoy."},
    car:{label:"Coche",fare:112,transfer:48,hours:6.4,detail:"Muy útil para una ruta por el norte."},
    bus:{label:"Autobús nocturno",fare:35,transfer:7,hours:9.8,detail:"Barato; jornada exigente."}
  }}
};

const modeOrder = ["flight","lowcost","train","car","bus"];
const comfortByMode = {flight:6,lowcost:4,train:9,car:6,bus:3};
const fmt = n => new Intl.NumberFormat("es-ES",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(n);

let destination = "paris";
let adults = 2, children = 0, bags = 1;
let priority = "balance";
let edited = {};

function weightsFor(p){
  if (p === "price") return [.7,.2,.1];
  if (p === "time") return [.2,.7,.1];
  if (p === "comfort") return [.15,.25,.6];
  return [.4,.35,.25];
}

function computeResults(){
  const route = routes[destination];
  const people = Math.max(adults + children, 1);
  const weights = weightsFor(priority);
  const results = modeOrder.map(mode => {
    const d = route.defaults[mode];
    const key = destination + "-" + mode;
    const e = edited[key] || {};
    const fare = e.fare != null ? e.fare : d.fare;
    const transfer = e.transfer != null ? e.transfer : d.transfer;
    const hours = e.hours != null ? e.hours : d.hours;
    const childFactor = adults + children * 0.72;
    const bagCost = (mode === "flight" || mode === "lowcost") ? bags * (mode === "lowcost" ? 34 : 26) : 0;
    const transportCost = mode === "car" ? fare : fare * childFactor;
    const total = Math.max(0, Math.round(transportCost + transfer + bagCost));
    const comfort = comfortByMode[mode];
    const normPrice = total / people;
    const score = normPrice * weights[0] + hours * 18 * weights[1] + (10 - comfort) * 14 * weights[2];
    return {mode, d, fare, transfer, hours, total, comfort, score};
  });
  results.sort((a,b) => a.score - b.score);
  return {route, people, results};
}

function renderDestinoOptions(){
  $("cDestino").innerHTML = Object.entries(routes).map(([k,r]) =>
    '<option value="' + k + '"' + (k === destination ? " selected" : "") + '>' + r.name + "</option>").join("");
}

function render(){
  const {route, people, results} = computeResults();
  const winner = results[0];

  $("cVerdict").innerHTML =
    '<div><span>Nuestra lectura · Madrid → ' + route.name.toUpperCase() + '</span>' +
    '<h3>' + route.verdict + '</h3>' +
    '<p>' + route.note + '</p></div>' +
    '<div class="winner"><small>Con tus datos</small><b>' + winner.d.label + '</b>' +
    '<strong>' + fmt(winner.total) + '</strong>' +
    '<span>' + winner.hours.toFixed(1).replace(".", ",") + ' h · grupo completo</span></div>';

  $("cResults").innerHTML = results.map((r, i) => {
    const rankBadge = i === 0 ? '<b>Recomendado</b>' : "";
    return '<article class="' + (i === 0 ? "best" : "") + '" data-mode="' + r.mode + '">' +
      '<div class="rank"><span>' + String(i + 1).padStart(2, "0") + '</span>' + rankBadge + '</div>' +
      '<div class="mode"><h3>' + r.d.label + '</h3><p>' + r.d.detail + '</p></div>' +
      '<label>Billete / coste base (€)<input type="number" min="0" step="1" data-field="fare" value="' + r.fare + '"></label>' +
      '<label>Traslados totales (€)<input type="number" min="0" step="1" data-field="transfer" value="' + r.transfer + '"></label>' +
      '<label>Puerta a puerta (h)<input type="number" min="0" step="0.1" data-field="hours" value="' + r.hours + '"></label>' +
      '<div class="total"><small>Total grupo</small><b>' + fmt(r.total) + '</b><span>' + fmt(r.total / people) + ' / persona</span></div>' +
      '</article>';
  }).join("");

  $("cResults").querySelectorAll("input[data-field]").forEach(inp => {
    inp.addEventListener("input", () => {
      const article = inp.closest("[data-mode]");
      const mode = article.dataset.mode;
      const field = inp.dataset.field;
      const key = destination + "-" + mode;
      const v = Math.max(0, Number(inp.value) || 0);
      edited[key] = Object.assign({}, edited[key], {[field]: v});
      render();
    });
  });
}

function stepper(kind, dir){
  const limits = {adults: [1,9], children: [0,6], bags: [0,9]};
  const [min, max] = limits[kind];
  if (kind === "adults") adults = Math.min(max, Math.max(min, adults + dir));
  if (kind === "children") children = Math.min(max, Math.max(min, children + dir));
  if (kind === "bags") bags = Math.min(max, Math.max(min, bags + dir));
  $("cAdultos").textContent = adults;
  $("cNinos").textContent = children;
  $("cMaletas").textContent = bags;
  render();
}

renderDestinoOptions();
render();

$("cDestino").addEventListener("change", () => {
  destination = $("cDestino").value;
  render();
});

document.querySelectorAll("[data-step]").forEach(btn => {
  btn.addEventListener("click", () => stepper(btn.dataset.step, Number(btn.dataset.dir)));
});

document.querySelectorAll(".priorities [data-priority]").forEach(btn => {
  btn.addEventListener("click", () => {
    priority = btn.dataset.priority;
    document.querySelectorAll(".priorities [data-priority]").forEach(b => b.classList.toggle("active", b === btn));
    render();
  });
});

if ("serviceWorker" in navigator) { /* recarga.js gestiona el registro global */ }
})();
