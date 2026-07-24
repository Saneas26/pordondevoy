// /api/podcast — lista los últimos episodios de podcasts de nutrición (RSS públicos).
// La app permite descargar el audio a la caché del móvil para escucharlo en modo avión.

const PODCASTS = {
  dietacojea: { nombre: "Mi Dieta Cojea — Aitor Sánchez", feed: "https://feeds.ivoox.com/feed_fg_f1135597_filtro_1.xml" },
  desdecero: { nombre: "Nutrición desde Cero", feed: "https://feeds.ivoox.com/feed_fg_f11372300_filtro_1.xml" },
  consciente: { nombre: "El Podcast de Nutrición Consciente", feed: "https://www.spreaker.com/show/5197590/episodes/feed" },
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
    const episodios = [];
    for (const bloque of xml.split(/<item[\s>]/).slice(1, 11)) {
      const t = bloque.match(/<title>([\s\S]*?)<\/title>/);
      const e = bloque.match(/<enclosure[^>]*url="([^"]+)"/);
      const f = bloque.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
      const d = bloque.match(/<itunes:duration>([\s\S]*?)<\/itunes:duration>/);
      if (!t || !e) continue;
      episodios.push({
        titulo: limpiar(t[1]),
        audio: e[1].replace(/&amp;/g, "&"),
        fecha: f ? limpiar(f[1]) : "",
        duracion: d ? limpiar(d[1]) : "",
      });
    }
    res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=86400");
    res.status(200).json({ id, nombre: pod.nombre, episodios });
  } catch (err) {
    res.status(502).json({ error: "no se pudo leer el feed" });
  }
}
