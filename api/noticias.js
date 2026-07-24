// /api/noticias — devuelve las 10 noticias del día a partir de RSS de prensa española.
// La app las guarda en el móvil para leerlas sin conexión durante el vuelo.

const FEEDS = [
  { fuente: "20minutos", url: "https://www.20minutos.es/rss/" },
  { fuente: "RTVE", url: "https://www.rtve.es/rss/temas_noticias.xml" },
  { fuente: "El Mundo", url: "https://e00-elmundo.uecdn.es/elmundo/rss/portada.xml" },
];

function limpiar(s) {
  return (s || "")
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
    .replace(/&aacute;/g, "á").replace(/&eacute;/g, "é").replace(/&iacute;/g, "í")
    .replace(/&oacute;/g, "ó").replace(/&uacute;/g, "ú").replace(/&ntilde;/g, "ñ")
    .replace(/&#(\d+);/g, (m, n) => String.fromCharCode(n))
    .replace(/\s+/g, " ").trim();
}

function parseRss(xml, fuente) {
  const items = [];
  for (const bloque of xml.split(/<item[\s>]/).slice(1, 8)) {
    const t = bloque.match(/<title>([\s\S]*?)<\/title>/);
    const d = bloque.match(/<description>([\s\S]*?)<\/description>/);
    const f = bloque.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    if (!t) continue;
    const titulo = limpiar(t[1]);
    let resumen = limpiar(d ? d[1] : "");
    if (resumen.length > 480) resumen = resumen.slice(0, 477).trimEnd() + "…";
    if (!titulo || titulo.length < 15) continue;
    items.push({ fuente, titulo, resumen, fecha: f ? limpiar(f[1]) : "" });
  }
  return items;
}

export default async function handler(req, res) {
  const porFuente = await Promise.allSettled(
    FEEDS.map(f =>
      fetch(f.url, { headers: { "user-agent": "Mozilla/5.0 (PorDondeVoy)" } })
        .then(r => r.text())
        .then(x => parseRss(x, f.fuente))
    )
  );
  const listas = porFuente
    .filter(p => p.status === "fulfilled" && p.value.length)
    .map(p => p.value);

  // Reparto alterno entre fuentes hasta llegar a 10
  const noticias = [];
  const vistos = new Set();
  for (let i = 0; noticias.length < 10 && i < 8; i++) {
    for (const lista of listas) {
      const n = lista[i];
      if (!n || noticias.length >= 10) continue;
      const clave = n.titulo.toLowerCase().slice(0, 60);
      if (vistos.has(clave)) continue;
      vistos.add(clave);
      noticias.push(n);
    }
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=3600");
  if (!noticias.length) return res.status(502).json({ error: "sin noticias" });
  res.status(200).json({ actualizado: new Date().toISOString(), noticias });
}
