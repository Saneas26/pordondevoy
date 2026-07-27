// /api/ping — telemetría anónima del Grupo Saneas (todas las apps llaman aquí).
// Cada dispositivo manda un aviso al día: qué app, plataforma y si va instalada.
// El país lo pone Vercel a partir de la conexión (cabecera x-vercel-ip-country);
// no se guarda IP ni ningún dato personal, solo un identificador aleatorio.
//
// Necesita en Vercel las variables de entorno:
//   SUPABASE_URL               → https://<proyecto>.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY  → la clave service_role (solo vive en el servidor)

const APPS = ["pordondevoy", "saneas", "activala", "laora", "acumula"];

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "solo POST" });

  const URL_SB = process.env.SUPABASE_URL;
  const CLAVE = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!URL_SB || !CLAVE) return res.status(500).json({ error: "telemetría sin configurar" });

  const { app, dispositivo, plataforma, instalada } = req.body || {};
  if (!APPS.includes(app)) return res.status(400).json({ error: "app no válida" });
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(dispositivo || ""))
    return res.status(400).json({ error: "dispositivo no válido" });

  const pais = req.headers["x-vercel-ip-country"] || null;
  const plat = ["iPhone", "Android", "Otro"].includes(plataforma) ? plataforma : "Otro";
  const ahora = new Date().toISOString();
  const hoy = ahora.slice(0, 10);
  const cab = {
    apikey: CLAVE,
    authorization: "Bearer " + CLAVE,
    "content-type": "application/json",
    prefer: "resolution=merge-duplicates",
  };

  // Ficha del dispositivo (una por app y dispositivo; primera_vez la pone la BD)
  const ficha = { app, dispositivo, plataforma: plat, instalada: !!instalada, ultima_vez: ahora };
  if (pais) ficha.pais = pais;
  // Apertura del día (una por app, dispositivo y día → los "activos" diarios)
  const apertura = { app, dispositivo, dia: hoy, instalada: !!instalada };
  if (pais) apertura.pais = pais;

  const [r1, r2] = await Promise.all([
    fetch(`${URL_SB}/rest/v1/telemetria_dispositivos?on_conflict=app,dispositivo`, {
      method: "POST", headers: cab, body: JSON.stringify([ficha]),
    }),
    fetch(`${URL_SB}/rest/v1/telemetria_aperturas?on_conflict=app,dispositivo,dia`, {
      method: "POST", headers: cab, body: JSON.stringify([apertura]),
    }),
  ]);
  if (!r1.ok || !r2.ok) return res.status(502).json({ error: "no se pudo guardar" });
  res.status(200).json({ ok: true });
}
