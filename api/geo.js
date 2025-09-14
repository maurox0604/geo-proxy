export default async function handler(req, res) {
  try {
    const response = await fetch("http://ip-api.com/json/");
    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*"); // habilitar CORS
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "No se pudo obtener datos", details: error.message });
  }
}
