export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Méthode non autorisée"
    });
  }

  try {
    const apiKey = process.env.LECART_SECRET_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error:
          "Configuration serveur manquante : la variable LECART_SECRET_KEY est absente sur Vercel."
      });
    }

    const response = await fetch(
      "https://api.getlecart.com/create-checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey
        },
        body: JSON.stringify(req.body)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Erreur lors du paiement par proxy :", error);

    return res.status(500).json({
      error: "Erreur interne du serveur"
    });
  }
}