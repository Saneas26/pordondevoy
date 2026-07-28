// /api/podcast — lista los últimos episodios de podcasts (RSS públicos).
// La app permite descargar el audio a la caché del móvil para escucharlo en modo avión.

const FEED_BBVA = "https://rss.libsyn.com/shows/109232/destinations/631374.xml";

// Temas para filtrar episodios por título + descripción
const TEMAS = {
  nutricion: /nutrici|aliment|dieta|ayuno|prote(í|i)na|calor(í|i)a|obesid|adelgaz|suplement|az(ú|u)car|metabolismo|entren|deporte|salud/i,
  economia: /econom|empresa|negocio|dinero|inversi(ó|o)n|invertir|financ|emprend|marketing|ventas|riqueza|bolsa|ahorr|millon|facturar|impuesto|hipoteca|inmobiliari/i,
  tecnologia: /tecnolog|inteligencia artificial|\bia\b|chatgpt|openai|internet|redes sociales|criptomoned|bitcoin|programaci|robots?|ciberseg|videojueg|hacker/i,
};

// Sin "feed" fijo, el feed se resuelve solo con la búsqueda de iTunes ("busca" +
// comprobación "es" sobre el nombre del podcast). "temas" filtra los episodios.
const PODCASTS = {
  kuppers: { nombre: "Víctor Küppers — Aprendemos juntos", feed: FEED_BBVA, filtro: /k(ü|u)ppers/i, solo: true },
  marian: { nombre: "Marian Rojas Estapé — Aprendemos juntos", feed: FEED_BBVA, filtro: /marian\s+rojas/i, solo: true },
  aprendemos: { nombre: "BBVA Aprendemos juntos", feed: FEED_BBVA, filtro: /k(ü|u)ppers|marian\s+rojas/i },
  dietacojea: { nombre: "Mi Dieta Cojea — Aitor Sánchez", feed: "https://feeds.ivoox.com/feed_fg_f1135597_filtro_1.xml" },
  tengoplan: { nombre: "Tengo un plan", busca: "Tengo un plan", es: /tengo un plan/i, temas: ["nutricion", "economia"] },
  urisabat: { nombre: "Uri Sabat", busca: "Uri Sabat", es: /uri sabat/i, temas: ["nutricion", "economia", "tecnologia"] },
  wildproject: { nombre: "The Wild Project — Jordi Wild", busca: "The Wild Project", es: /wild project/i, temas: ["nutricion", "economia", "tecnologia"] },
};

// Busca el feed RSS público del podcast en el directorio de Apple
async function resolverFeed(pod) {
  if (pod.feed) return pod.feed;
  const r = await fetch(
    "https://itunes.apple.com/search?media=podcast&country=ES&limit=10&term=" + encodeURIComponent(pod.busca),
    { headers: { "user-agent": "Mozilla/5.0 (PorDondeVoy)" }, signal: AbortSignal.timeout(8000) }
  );
  const d = await r.json();
  const hit = (d.results || []).find(x => x.feedUrl && pod.es.test((x.collectionName || "") + " " + (x.artistName || "")));
  if (!hit) throw new Error("feed no encontrado");
  return hit.feedUrl;
}

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
    const feedUrl = await resolverFeed(pod);
    const xml = await fetch(feedUrl, { headers: { "user-agent": "Mozilla/5.0 (PorDondeVoy)" } }).then(r => r.text());
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
    // Con temas, solo los episodios que tocan alguno de ellos
    if (pod.temas) {
      const regs = pod.temas.map(t => TEMAS[t]);
      episodios = episodios.filter(e => regs.some(rx => rx.test(e.texto)));
    }
    episodios = episodios.slice(0, 10).map(({ texto, ...e }) => e);
    res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=86400");
    res.status(200).json({ id, nombre: pod.nombre, episodios });
  } catch (err) {
    res.status(502).json({ error: "no se pudo leer el feed" });
  }
}
