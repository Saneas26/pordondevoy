// /api/noticias — devuelve las noticias del día: titular, el resumen que el propio
// periódico publica en su RSS para que se comparta, la fuente y el enlace.
// NUNCA el artículo completo: copiar el texto entero de un periódico sin licencia es
// un problema legal y motivo de rechazo en Apple (5.2). El artículo se lee en su web.

const FEEDS = [
  { fuente: "20minutos", url: "https://www.20minutos.es/rss/" },
  { fuente: "Europa Press", url: "https://www.europapress.es/rss/rss.aspx" },  // el RSS de RTVE se quedó parado en 2022
  { fuente: "El Mundo", url: "https://e00-elmundo.uecdn.es/elmundo/rss/portada.xml" },
];
const UA = { "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36" };

function limpiar(s) {
  return (s || "")
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")   // desescapa posibles tags embebidos…
    .replace(/<[^>]+>/g, " ")                       // …y ahora sí, fuera TODO el HTML
    .replace(/&amp;/g, "&")
    .replace(/&quot;|&#822[01];/g, '"').replace(/&#0?39;|&apos;|&#821[67];/g, "'")
    .replace(/&aacute;/g, "á").replace(/&eacute;/g, "é").replace(/&iacute;/g, "í")
    .replace(/&oacute;/g, "ó").replace(/&uacute;/g, "ú").replace(/&ntilde;/g, "ñ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (m, n) => String.fromCharCode(n))
    .replace(/Leer la noticia completa.*$/i, "")
    .replace(/\s*Leer\s*$/i, "")
    .replace(/\s+/g, " ").trim();
}

function parseRss(xml, fuente) {
  const items = [];
  for (const bloque of xml.split(/<item[\s>]/).slice(1, 15)) {
    const t = bloque.match(/<title>([\s\S]*?)<\/title>/);
    const d = bloque.match(/<description>([\s\S]*?)<\/description>/);
    const l = bloque.match(/<link>([\s\S]*?)<\/link>/);
    const f = bloque.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    if (!t) continue;
    // Solo noticias de verdad de hoy: un canal abandonado sigue sirviendo las viejas
    const fecha = f ? Date.parse(limpiar(f[1])) : NaN;
    if (!isNaN(fecha) && Date.now() - fecha > 48 * 3600 * 1000) continue;
    const titulo = limpiar(t[1]);
    let resumen = limpiar(d ? d[1] : "");
    if (resumen.length > 300) resumen = resumen.slice(0, 297).trimEnd() + "…";
    if (!titulo || titulo.length < 15) continue;
    items.push({ fuente, titulo, resumen, url: l ? limpiar(l[1]) : "" });
  }
  return items;
}

export default async function handler(req, res) {
  const porFuente = await Promise.allSettled(
    FEEDS.map(f => fetch(f.url, { headers: UA }).then(r => r.text()).then(x => parseRss(x, f.fuente)))
  );
  const listas = porFuente
    .filter(p => p.status === "fulfilled" && p.value.length)
    .map(p => p.value);

  // Reparto alterno entre fuentes hasta llegar a 20
  const noticias = [];
  const vistos = new Set();
  for (let i = 0; noticias.length < 20 && i < 14; i++) {
    for (const lista of listas) {
      const n = lista[i];
      if (!n || noticias.length >= 20) continue;
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
