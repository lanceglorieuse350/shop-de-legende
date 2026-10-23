export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const lecartSecret = process.env.LECART_SECRET_KEY;
    if (!lecartSecret) {
      return res.status(500).json({ error: 'Configuration serveur manquante (LECART_SECRET_KEY absente)' });
    }

    const response = await fetch('https://api.getlecart.com/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${lecartSecret}`, // C'est ici que ça se joue
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Erreur proxy checkout:', error);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}