export default async function handler(req, res) {
  try {
    // 1. Obtener la IP desde query (?ip=...)
    let ip = req.query.ip;

    // 2. Si no vino en query, usar X-Forwarded-For o la IP remota
    if (!ip) {
      ip =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket.remoteAddress;
    }

    // 3. Consultar ip-api con la IP obtenida
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`);
    const data = await response.json();

    // 4. Devolver SOLO lo que viene de ip-api
    res.status(200).json(data);

  } catch (error) {
    console.error("Error en el proxy geo:", error);
    res.status(500).json({ error: "Error interno en el proxy" });
  }
}
