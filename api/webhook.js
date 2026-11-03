import { buffer } from 'micro';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// On initialise Stripe avec votre clé secrète (à mettre dans Vercel plus tard)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// On initialise Supabase avec la clé "Service Role" (qui a les droits d'admin)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// On désactive le body parser par défaut de Vercel (nécessaire pour Stripe)
export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // On vérifie que la requête vient bien de Stripe
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Erreur de signature Webhook : ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Si le paiement est réussi
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Récupérer l'email du client
    const customerEmail = session.customer_details.email;
    const montantTotal = session.amount_total / 100; // Stripe divise par 100

    // 1. Trouver l'ID du client dans notre table 'clients' grâce à son email
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .select('id')
      .eq('email', customerEmail)
      .single();

    if (clientError || !client) {
      console.error("Client introuvable dans Supabase :", customerEmail);
      return res.status(200).json({ received: true, info: "Client non trouvé" });
    }

    // 2. Insérer la commande dans la table 'commandes'
    const { error: insertError } = await supabase
      .from('commandes')
      .insert([
        {
          client_id: client.id,
          montant_total: montantTotal,
          statut: 'payé',
          details_produits: session.line_items, // ou session.metadata si LeCart le gère
          adresse_livraison: session.shipping_details?.address?.line1 || "Adresse non fournie"
        }
      ]);

    if (insertError) {
      console.error("Erreur insertion commande :", insertError);
      return res.status(500).json({ error: "Erreur base de données" });
    }

    console.log(`Commande enregistrée pour ${customerEmail}`);
  }

  res.status(200).json({ received: true });
}