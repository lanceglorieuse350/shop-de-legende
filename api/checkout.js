export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const apiKey = process.env.LECART_SECRET_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "Variable Vercel manquante : LECART_SECRET_KEY"
    });
  }

  let payload = req.body;
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch {
      return res.status(400).json({ error: "Corps de requête illisible" });
    }
  }

  if (!payload || typeof payload !== "object") {
    return res.status(400).json({ error: "Panier vide" });
  }

  try {
    const response = await fetch("https://api.getlecart.com/create-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({ error: "Réponse LeCart illisible" }));

    if (!response.ok) {
      console.error("LeCart a refusé le paiement :", response.status, data);
      return res.status(response.status).json(data);
    }

    if (!data || !data.url) {
      console.error("LeCart n'a pas renvoyé d'URL Stripe :", data);
      return res.status(502).json({
        error: "LeCart n'a pas renvoyé d'adresse de paiement Stripe",
        details: data
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Erreur proxy checkout :", error);
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
}
