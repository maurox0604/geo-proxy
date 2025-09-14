export default async function handler(req, res) {
  try {
    // Headers potenciales con IP
    const xff = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || '';
    const remote = req.socket?.remoteAddress || null;
    const ipFromQuery = req.query?.ip || '';

    // Elegimos prioridad: ?ip (si se envía), luego xff, luego remote
    const chosenIP = ipFromQuery || (xff ? xff.split(',')[0].trim() : '') || remote || '';

    // Hacemos la consulta a ip-api con la IP escogida (si hay), si no pedimos sin IP
    const url = chosenIP ? `http://ip-api.com/json/${chosenIP}` : "http://ip-api.com/json/";
    const response = await fetch(url);
    const data = await response.json();

    // Devuelve datos + debug para inspección en Unity
    res.status(200).json({
      debug: {
        x_forwarded_for: xff,
        socket_remoteAddress: remote,
        query_ip: ipFromQuery,
        chosen_ip: chosenIP,
      },
      ipApi: data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
