export default async function handler(req, res) {
  // 1. On n'accepte que les requêtes POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 2. On récupère la clé secrète depuis les variables d'environnement de Vercel
    const lecartSecret = process.env.LECART_SECRET_KEY;
    if (!lecartSecret) {
      return res.status(500).json({ 
        error: 'Configuration serveur manquante : la variable LECART_SECRET_KEY est absente sur Vercel.' 
      });
    }

    // 3. On transmet la requête à l'API LeCart avec le bon en-tête (X-API-Key)
    const response = await fetch('https://api.getlecart.com/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': lecartSecret, // <-- C'est ici que la clé est transmise
      },
      body: JSON.stringify(req.body),
    });

    // 4. On récupère la réponse de LeCart
    const data = await response.json();

    // 5. Si LeCart renvoie une erreur, on la transmet au navigateur
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    // 6. Si tout est bon, on renvoie l'URL de paiement Stripe générée par LeCart
    return res.status(200).json(data);

  } catch (error) {
    console.error('Erreur proxy checkout:', error);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}