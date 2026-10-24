// api/checkout.js
// Proxy sécurisé : le navigateur appelle /api/checkout,
// le serveur Vercel ajoute la clé secrète LeCart et relaie vers api.getlecart.com

export default async function handler(req, res) {
  // 1. On n'accepte que les requêtes POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    // 2. Clé secrète LeCart (variable d'environnement Vercel)
    const lecartSecret = process.env.LECART_SECRET_KEY;
    if (!lecartSecret) {
      return res.status(500).json({
        error: 'Configuration serveur manquante : LECART_SECRET_KEY absente.'
      });
    }

    // 3. Relais vers l'API LeCart
    const response = await fetch('https://api.getlecart.com/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': lecartSecret,
      },
      body: JSON.stringify(req.body),
    });

    // 4. Lecture de la réponse LeCart
    const data = await response.json();

    // 5. Relais du statut et du corps
    return res.status(response.status).json(data);

  } catch (error) {
    console.error('Erreur proxy paiement :', error);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}