export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: { message: "Method Not Allowed" } });

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({
      error: { message: "GEMINI_API_KEY chưa được cấu hình trong Vercel Environment Variables." }
    });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch (e) {
    return res.status(400).json({ error: { message: "Invalid JSON" } });
  }

  const models = body.tools
    ? ["gemini-2.5-flash", "gemini-2.0-flash"]
    : ["gemini-2.5-flash", "gemini-2.5-flash-lite"];

  let lastError = null;

  for (const model of models) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      const data = await response.json();

      if (response.status === 429) {
        lastError = data;
        continue;
      }

      if (!response.ok) return res.status(response.status).json(data);

      return res.status(200).json(data);

    } catch (err) {
      lastError = { error: { message: err.message } };
      continue;
    }
  }

  return res.status(429).json({
    error: { message: "API đang bận. Vui lòng chờ 30 giây rồi thử lại." }
  });
}
