export default async function handler(request) {
  try {
    const response = await fetch("http://ip-api.com/json/");
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "No se pudo obtener datos", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
