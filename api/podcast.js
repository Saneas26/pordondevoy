// /api/podcast — catálogo de podcasts y últimos episodios (RSS públicos).
// La app permite descargar el audio a la caché del móvil para escucharlo en modo avión.
//
// OJO al editar: los ids son un contrato con las apps ya instaladas (iOS/Android llevan la lista
// dentro del binario). Se pueden AÑADIR podcasts y cambiar feeds; no borrar ni renombrar ids.
// La ficha (autor, tema, descripcion, claves, imagen) alimenta el buscador de la app; la copia que
// lleva index.html (PODCASTS_BASE) debe quedar igual para que funcione sin conexión.

const FEED_BBVA = "https://feed.ausha.co/wk6NLfKOG8qW"; // antes rss.libsyn.com/shows/109232/... (redirigía aquí)
const PODCASTS = {
  kuppers: {
    nombre: "Víctor Küppers — Aprendemos juntos", autor: "Víctor Küppers", tema: "mente",
    descripcion: "Sus charlas sobre actitud y ánimo en Aprendemos juntos.",
    claves: "actitud animo motivacion optimismo", imagen: null,
    feed: FEED_BBVA, filtro: /k(ü|u)ppers/i, solo: true,
  },
  marian: {
    nombre: "Marian Rojas Estapé — Aprendemos juntos", autor: "Marian Rojas Estapé", tema: "mente",
    descripcion: "La psiquiatra habla de emociones, estrés y bienestar mental.",
    claves: "psiquiatra psicologia estres emociones cerebro", imagen: null,
    feed: FEED_BBVA, filtro: /marian\s+rojas/i, solo: true,
  },
  aprendemos: {
    nombre: "BBVA Aprendemos juntos", autor: "BBVA", tema: "cultura",
    descripcion: "Entrevistas con científicos, artistas y pensadores. Lo último, primero.",
    claves: "ciencia cultura entrevistas arte musica historia", imagen: "img/podcasts/aprendemos.jpg",
    feed: FEED_BBVA,
  },
  dietacojea: {
    nombre: "Mi Dieta Cojea — Aitor Sánchez", autor: "Aitor Sánchez", tema: "salud",
    descripcion: "Nutrición y ciencia de la alimentación, contadas sin tópicos.",
    claves: "dieta alimentacion nutricion dietista comer", imagen: "img/podcasts/dietacojea.jpg",
    feed: "https://feeds.ivoox.com/feed_fg_f1135597_filtro_1.xml",
  },
  tengounplan: {
    nombre: "Tengo un Plan", autor: "Sergio Beguería y Juan Domínguez", tema: "mente",
    descripcion: "Entrevistas largas sobre mente, hábitos y actualidad.",
    claves: "habitos psicologia entrevistas neurociencia vida", imagen: "img/podcasts/tengounplan.jpg",
    feed: "https://anchor.fm/s/1007af750/podcast/rss",
  },
  isabelvina: {
    nombre: "Dra. Isabel Viña — Tus amigas las hormonas", autor: "Dra. Isabel Viña", tema: "salud",
    descripcion: "Salud y hormonas de la mujer, explicadas por una doctora.",
    claves: "hormonas mujer menopausia regla endometriosis medicina doctora", imagen: "img/podcasts/isabelvina.jpg",
    feed: "https://www.spreaker.com/show/5751435/episodes/feed",
  },
  worldcast: {
    nombre: "WORLDCAST — Pedro Buerbaum", autor: "Pedro Buerbaum", tema: "cultura",
    descripcion: "Conversaciones y casos reales con Pedro Buerbaum.",
    claves: "entrevistas casos reales crimen sociedad", imagen: "img/podcasts/worldcast.jpg",
    feed: "https://feeds.megaphone.fm/HOT7749589265",
  },
  urisabat: {
    nombre: "La Fórmula del Éxito — Uri Sabat", autor: "Uri Sabat", tema: "negocios",
    descripcion: "Entrevistas sobre negocios, deporte y casos reales.",
    claves: "negocios emprendimiento deporte entrevistas exito", imagen: "img/podcasts/urisabat.jpg",
    feed: "https://anchor.fm/s/476c0ec/podcast/rss",
  },
  adriansaenz: {
    nombre: "Adrián Sáenz Podcast", autor: "Adrián Sáenz", tema: "negocios",
    descripcion: "Dinero, negocios y emprendimiento, con invitados de primera.",
    claves: "dinero finanzas inversion negocios empresa trader", imagen: "img/podcasts/adriansaenz.jpg",
    feed: "https://anchor.fm/s/10801f8fc/podcast/rss",
  },
  rocaproject: {
    nombre: "ROCA PROJECT", autor: "Carlos Roca", tema: "cultura",
    descripcion: "Conversaciones largas sobre historias de vida.",
    claves: "entrevistas vida historias sociedad", imagen: "img/podcasts/rocaproject.jpg",
    feed: "https://anchor.fm/s/ff4c5068/podcast/rss",
  },
  wildproject: {
    nombre: "The Wild Project — Jordi Wild", autor: "Jordi Wild", tema: "cultura",
    descripcion: "Entrevistas largas sobre actualidad, política y sociedad.",
    claves: "politica actualidad entrevistas sociedad", imagen: "img/podcasts/wildproject.jpg",
    feed: "https://anchor.fm/s/115a4336c/podcast/rss",
  },
};

function limpiar(s) {
  return (s || "")
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (m, n) => String.fromCharCode(n))
    .replace(/\s+/g, " ").trim();
}

// "3212" (segundos) · "53:32" · "02:18:21" → "53 min" · "2 h 18 min". Vacío si no se entiende.
function duracionLegible(raw) {
  const t = limpiar(raw);
  if (!t) return "";
  let seg;
  if (/^\d+$/.test(t)) seg = parseInt(t, 10);
  else if (/^\d+(:\d{1,2}){1,2}$/.test(t)) seg = t.split(":").reduce((a, n) => a * 60 + parseInt(n, 10), 0);
  else return "";
  const min = Math.round(seg / 60);
  if (min < 1) return "menos de 1 min";
  if (min < 60) return min + " min";
  const h = Math.floor(min / 60), m = min % 60;
  return m ? h + " h " + m + " min" : h + " h";
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const id = (req.query && req.query.id) || "";

  if (!id) {
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    return res.status(200).json({
      podcasts: Object.entries(PODCASTS).map(([pid, p]) => ({
        id: pid, nombre: p.nombre, autor: p.autor, tema: p.tema,
        descripcion: p.descripcion, claves: p.claves, imagen: p.imagen,
      })),
    });
  }
  const pod = PODCASTS[id];
  if (!pod) return res.status(404).json({ error: "podcast desconocido" });

  try {
    const xml = await fetch(pod.feed, {
      headers: { "user-agent": "Mozilla/5.0 (PorDondeVoy)" },
      signal: AbortSignal.timeout(15000),
    }).then(r => r.text());
    const todos = [];
    for (const bloque of xml.split(/<item[\s>]/).slice(1)) {
      const t = bloque.match(/<title>([\s\S]*?)<\/title>/);
      const e = bloque.match(/<enclosure[^>]*url="([^"]+)"/);
      const f = bloque.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
      const d = bloque.match(/<itunes:duration>([\s\S]*?)<\/itunes:duration>/);
      const de = bloque.match(/<description>([\s\S]*?)<\/description>/);
      if (!t || !e) continue;
      const titulo = limpiar(t[1]);
      const fecha = f ? limpiar(f[1]) : "";
      const ms = fecha ? Date.parse(fecha) : NaN;
      todos.push({
        titulo,
        texto: titulo + " " + (de ? limpiar(de[1]).slice(0, 2000) : ""),
        audio: e[1].replace(/&amp;/g, "&"),
        fecha,
        iso: isNaN(ms) ? "" : new Date(ms).toISOString().slice(0, 10),
        duracion: d ? duracionLegible(d[1]) : "",
        _ms: isNaN(ms) ? 0 : ms,
      });
    }
    // Siempre lo más reciente primero (algunos feeds vienen desordenados)
    todos.sort((a, b) => b._ms - a._ms);
    // Con filtro (título o descripción) solo salen los episodios del ponente
    const episodios = (pod.filtro ? todos.filter(e => pod.filtro.test(e.texto)) : todos)
      .slice(0, 10)
      .map(({ texto, _ms, ...e }) => e);
    res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=86400");
    res.status(200).json({ id, nombre: pod.nombre, episodios });
  } catch (err) {
    res.status(502).json({ error: "no se pudo leer el feed" });
  }
}
