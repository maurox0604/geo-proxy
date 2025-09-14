import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const resp = await fetch("http://ip-api.com/json/"); // API original (solo HTTP)
    const data = await resp.json();

    res.setHeader("Access-Control-Allow-Origin", "*"); // habilita CORS
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "No se pudo obtener datos", details: err.message });
  }
}
