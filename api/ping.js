// /api/ping — telemetría anónima del Grupo Saneas (todas las apps llaman aquí).
// Cada dispositivo manda un aviso al día: qué app, plataforma y si va instalada.
// El país lo pone Vercel a partir de la conexión (cabecera x-vercel-ip-country);
// no se guarda IP ni ningún dato personal, solo un identificador aleatorio.
//
// No hace falta configurar nada: entra en Supabase por la función
// telemetria_ping(), que solo permite apuntarse (ni leer ni consultar), así que
// basta con la clave pública. El resumen se ve únicamente desde el panel.

const SUPABASE_URL = process.env.SUPABASE_URL || "https://uisrxztowgdpkxeuznfh.supabase.co";
const PUBLICA = process.env.SUPABASE_ANON_KEY || "sb_publishable_8ybOGHnn9rsMDf57mx-Igw_AVvWK30D";

const APPS = ["pordondevoy", "saneas", "saneas_web", "saneas_instalar", "activala", "laora", "acumula"];
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "solo POST" });

  const { app, dispositivo, plataforma, instalada } = req.body || {};
  if (!APPS.includes(app)) return res.status(400).json({ error: "app no válida" });
  if (!UUID.test(dispositivo || "")) return res.status(400).json({ error: "dispositivo no válido" });

  const r = await fetch(SUPABASE_URL + "/rest/v1/rpc/telemetria_ping", {
    method: "POST",
    headers: { apikey: PUBLICA, authorization: "Bearer " + PUBLICA, "content-type": "application/json" },
    body: JSON.stringify({
      p_app: app,
      p_dispositivo: dispositivo,
      p_plataforma: ["iPhone", "Android", "Otro"].includes(plataforma) ? plataforma : "Otro",
      p_instalada: !!instalada,
      p_pais: req.headers["x-vercel-ip-country"] || null,
    }),
  });
  if (!r.ok) return res.status(502).json({ error: "no se pudo guardar" });
  res.status(200).json({ ok: true });
}
