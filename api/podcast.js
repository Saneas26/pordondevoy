// /api/podcast — lista los últimos episodios de podcasts (RSS públicos).
// La app permite descargar el audio a la caché del móvil para escucharlo en modo avión.

const FEED_BBVA = "https://rss.libsyn.com/shows/109232/destinations/631374.xml";
const PODCASTS = {
  kuppers: { nombre: "Víctor Küppers — Aprendemos juntos", feed: FEED_BBVA, filtro: /k(ü|u)ppers/i, solo: true },
  marian: { nombre: "Marian Rojas Estapé — Aprendemos juntos", feed: FEED_BBVA, filtro: /marian\s+rojas/i, solo: true },
  aprendemos: { nombre: "BBVA Aprendemos juntos", feed: FEED_BBVA, filtro: /k(ü|u)ppers|marian\s+rojas/i },
  dietacojea: { nombre: "Mi Dieta Cojea — Aitor Sánchez", feed: "https://feeds.ivoox.com/feed_fg_f1135597_filtro_1.xml" },
  tengounplan: { nombre: "Tengo un Plan", feed: "https://anchor.fm/s/1007af750/podcast/rss" },
  isabelvina: { nombre: "Dra. Isabel Viña — Tus amigas las hormonas", feed: "https://www.spreaker.com/show/5751435/episodes/feed" },
  worldcast: { nombre: "WORLDCAST — Pedro Buerbaum", feed: "https://feeds.megaphone.fm/HOT7749589265" },
  urisabat: { nombre: "La Fórmula del Éxito — Uri Sabat", feed: "https://anchor.fm/s/476c0ec/podcast/rss" },
  adriansaenz: { nombre: "Adrián Sáenz Podcast", feed: "https://anchor.fm/s/10801f8fc/podcast/rss" },
  rocaproject: { nombre: "ROCA PROJECT", feed: "https://anchor.fm/s/ff4c5068/podcast/rss" },
  wildproject: { nombre: "The Wild Project — Jordi Wild", feed: "https://anchor.fm/s/115a4336c/podcast/rss" },
};

function limpiar(s) {
  return (s || "")
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (m, n) => String.fromCharCode(n))
    .replace(/\s+/g, " ").trim();
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const id = (req.query && req.query.id) || "";

  if (!id) {
    res.setHeader("Cache-Control", "s-maxage=86400");
    return res.status(200).json({
      podcasts: Object.entries(PODCASTS).map(([pid, p]) => ({ id: pid, nombre: p.nombre })),
    });
  }
  const pod = PODCASTS[id];
  if (!pod) return res.status(404).json({ error: "podcast desconocido" });

  try {
    const xml = await fetch(pod.feed, { headers: { "user-agent": "Mozilla/5.0 (PorDondeVoy)" } }).then(r => r.text());
    const todos = [];
    for (const bloque of xml.split(/<item[\s>]/).slice(1)) {
      const t = bloque.match(/<title>([\s\S]*?)<\/title>/);
      const e = bloque.match(/<enclosure[^>]*url="([^"]+)"/);
      const f = bloque.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
      const d = bloque.match(/<itunes:duration>([\s\S]*?)<\/itunes:duration>/);
      const de = bloque.match(/<description>([\s\S]*?)<\/description>/);
      if (!t || !e) continue;
      const titulo = limpiar(t[1]);
      todos.push({
        titulo,
        texto: titulo + " " + (de ? limpiar(de[1]).slice(0, 2000) : ""),
        audio: e[1].replace(/&amp;/g, "&"),
        fecha: f ? limpiar(f[1]) : "",
        duracion: d ? limpiar(d[1]) : "",
      });
    }
    // Con filtro (título o descripción), los episodios del ponente van primero; con "solo", únicamente los suyos
    let episodios = todos;
    if (pod.filtro) {
      const destacados = todos.filter(e => pod.filtro.test(e.texto));
      const resto = todos.filter(e => !pod.filtro.test(e.texto));
      episodios = pod.solo ? destacados : destacados.concat(resto);
    }
    episodios = episodios.slice(0, 10).map(({ texto, ...e }) => e);
    res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=86400");
    res.status(200).json({ id, nombre: pod.nombre, episodios });
  } catch (err) {
    res.status(502).json({ error: "no se pudo leer el feed" });
  }
}
