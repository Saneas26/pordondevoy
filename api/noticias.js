// /api/noticias — devuelve las 10 noticias del día CON el texto completo del artículo.
// La app las guarda en el móvil para leerlas enteras sin conexión durante el vuelo.

const FEEDS = [
  { fuente: "20minutos", url: "https://www.20minutos.es/rss/" },
  { fuente: "RTVE", url: "https://www.rtve.es/rss/temas_noticias.xml" },
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
    .replace(/\s+Leer$/i, "")
    .replace(/\s+/g, " ").trim();
}

function parseRss(xml, fuente) {
  const items = [];
  for (const bloque of xml.split(/<item[\s>]/).slice(1, 8)) {
    const t = bloque.match(/<title>([\s\S]*?)<\/title>/);
    const d = bloque.match(/<description>([\s\S]*?)<\/description>/);
    const l = bloque.match(/<link>([\s\S]*?)<\/link>/);
    if (!t) continue;
    const titulo = limpiar(t[1]);
    let resumen = limpiar(d ? d[1] : "");
    if (resumen.length > 480) resumen = resumen.slice(0, 477).trimEnd() + "…";
    if (!titulo || titulo.length < 15) continue;
    items.push({ fuente, titulo, resumen, url: l ? limpiar(l[1]) : "" });
  }
  return items;
}

// Extrae el texto del artículo: párrafos largos dentro de <article> (o de toda la página)
async function cuerpoDe(url) {
  if (!url) return "";
  try {
    const html = await fetch(url, { headers: UA, redirect: "follow", signal: AbortSignal.timeout(8000) }).then(r => r.text());
    const art = html.match(/<article[\s\S]*?<\/article>/i);
    const zona = art ? art[0] : html;
    const parrafos = [];
    const re = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    let m, total = 0;
    while ((m = re.exec(zona)) && total < 7000) {
      const t = limpiar(m[1]);
      if (t.length < 60) continue;
      if (/cookies|suscr[ií]bete|newsletter|whatsapp|tel[eé]gram|reg[ií]strate|hazte premium|derechos reservados/i.test(t)) continue;
      parrafos.push(t);
      total += t.length;
    }
    return parrafos.join("\n\n");
  } catch (e) {
    return "";
  }
}

export default async function handler(req, res) {
  const porFuente = await Promise.allSettled(
    FEEDS.map(f => fetch(f.url, { headers: UA }).then(r => r.text()).then(x => parseRss(x, f.fuente)))
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

  // Texto completo de cada una (en paralelo)
  await Promise.allSettled(noticias.map(n => cuerpoDe(n.url).then(c => { n.cuerpo = c; delete n.url; })));

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=3600");
  if (!noticias.length) return res.status(502).json({ error: "sin noticias" });
  res.status(200).json({ actualizado: new Date().toISOString(), noticias });
}
