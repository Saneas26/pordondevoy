// /api/stats — resumen de la telemetría del grupo, protegido con clave.
// Ejemplo: https://pordondevoy-saneas.vercel.app/api/stats?clave=TU_CLAVE
// Devuelve, por cada app: dispositivos totales, instaladas vs navegador,
// iPhone/Android, activos de hoy, activos por día (30 días) y países.
//
// Necesita en Vercel, además de las de /api/ping, la variable:
//   STATS_KEY → la clave que eliges tú para poder consultar el resumen

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store");

  const clave = (req.query && req.query.clave) || "";
  if (!process.env.STATS_KEY || clave !== process.env.STATS_KEY)
    return res.status(401).json({ error: "clave no válida" });

  const URL_SB = process.env.SUPABASE_URL;
  const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!URL_SB || !KEY) return res.status(500).json({ error: "telemetría sin configurar" });

  const r = await fetch(`${URL_SB}/rest/v1/rpc/telemetria_resumen`, {
    method: "POST",
    headers: { apikey: KEY, authorization: "Bearer " + KEY, "content-type": "application/json" },
    body: "{}",
  });
  if (!r.ok) return res.status(502).json({ error: "no se pudo consultar", detalle: await r.text() });
  res.status(200).json(await r.json());
}
