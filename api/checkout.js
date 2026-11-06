const PRIX_AUTORISES = new Set([
  "price_1URq5TRNu37iEZT9kBjY7X1G",
  "price_1URs5zRNu37iEZT9MkNDMhFW",
  "price_1URsA0RNu37iEZT9Yq7pXGpL",
  "price_1US30aRNu37iEZT9EGBkxLCy",
  "price_1UV4VuRNu37iEZT9QXBQFhLp"
]);

const HOTES_AUTORISES = new Set([
  "shop-de-legende.vercel.app",
  "localhost",
  "127.0.0.1"
]);

function hoteAutorise(valeur) {
  try {
    return HOTES_AUTORISES.has(new URL(valeur).hostname);
  } catch {
    return false;
  }
}

async function lirePanier(req) {
  if (Buffer.isBuffer(req.body)) return JSON.parse(req.body.toString("utf8"));
  if (typeof req.body === "string" && req.body.trim()) return JSON.parse(req.body);
  if (req.body && typeof req.body === "object" && !Array.isArray(req.body) && req.body.items) {
    return req.body;
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return null;
  return JSON.parse(raw);
}

function panierValide(payload) {
  if (!payload || !Array.isArray(payload.items) || payload.items.length === 0 || payload.items.length > 8) {
    return false;
  }
  if (!hoteAutorise(payload.success_url) || !hoteAutorise(payload.cancel_url)) return false;
  return payload.items.every((item) => {
    const quantite = Number(item.quantity);
    return PRIX_AUTORISES.has(item.stripePriceId) && Number.isInteger(quantite) && quantite >= 1 && quantite <= 5;
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const origin = req.headers.origin || "";
  if (origin && !hoteAutorise(origin)) {
    return res.status(403).json({ error: "Origine refusée" });
  }

  const apiKey = process.env.LECART_SECRET_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Variable Vercel manquante : LECART_SECRET_KEY" });
  }

  let payload;
  try {
    payload = await lirePanier(req);
  } catch (error) {
    console.error("Panier illisible");
    return res.status(400).json({ error: "Corps de requête illisible" });
  }

  if (!panierValide(payload)) {
    return res.status(400).json({ error: "Panier refusé" });
  }

  try {
    const response = await fetch("https://api.getlecart.com/create-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
        "Origin": "https://shop-de-legende.vercel.app"
      },
      body: JSON.stringify({
        items: payload.items.map((item) => ({
          stripePriceId: item.stripePriceId,
          quantity: Number(item.quantity)
        })),
        success_url: payload.success_url,
        cancel_url: payload.cancel_url,
        metadata: { cart_id: String(payload.metadata?.cart_id || "").slice(0, 40) },
        shipping_address_collection: payload.shipping_address_collection,
        phone_number_collection: payload.phone_number_collection
      })
    });

    const data = await response.json().catch(() => null);
    if (!response.ok || !data || !data.url || !String(data.url).startsWith("https://checkout.stripe.com/")) {
      console.error("LeCart a refusé le paiement :", response.status, data && data.code);
      return res.status(400).json({ error: "Paiement refusé" });
    }

    return res.status(200).json({ url: data.url });
  } catch (error) {
    console.error("Erreur proxy checkout");
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
}
