import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { buffer } from 'micro';

// On initialise Stripe avec la clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// On initialise Supabase avec la clé "Service Role" (qui contourne le RLS)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Désactive le body parser pour vérifier la signature Stripe
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Vérification que la requête vient bien de Stripe
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

    // Sécurisation de l'email (au cas où le client paie avec Apple Pay/Google Pay)
    const customerEmail = session.customer_details?.email || session.customer_email;
    const montantTotal = (session.amount_total || 0) / 100;

    // 🚨 CORRECTION ICI : On va chercher les produits (line_items) directement chez Stripe
    let panier = [];
    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      panier = lineItems.data.map(item => ({
        nom: item.description,
        prix_unitaire: (item.amount_total || 0) / 100,
        quantite: item.quantity
      }));
    } catch (error) {
      console.error("Impossible de récupérer les détails du panier", error);
      panier = [{ nom: "Produit inconnu", note: "Erreur de récupération" }];
    }

    // 1. Trouver l'ID du client dans notre table 'clients' grâce à son email
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .select('id')
      .eq('email', customerEmail)
      .single();

    if (clientError || !client) {
      console.warn("Client introuvable dans Supabase :", customerEmail);
      // On répond 200 à Stripe pour qu'il ne réessaie pas en boucle, 
      // mais on ne plante pas le serveur.
      return res.status(200).json({ received: true, info: "Client non trouvé dans la base" });
    }

    // 2. Insérer la commande dans la table 'commandes'
    const { error: insertError } = await supabase
      .from('commandes')
      .insert([
        {
          client_id: client.id,
          montant_total: montantTotal,
          statut: 'payé',
          details_produits: panier, // ✅ On insère les vrais produits ici
          adresse_livraison: session.shipping_details?.address?.line1 || session.customer_details?.address?.line1 || "Adresse non fournie"
        }
      ]);

    if (insertError) {
      console.error("Erreur insertion commande :", insertError);
      return res.status(500).json({ error: "Erreur base de données" });
    }

    console.log(`✅ Commande de ${montantTotal}€ enregistrée pour ${customerEmail}`);
  }

  // On dit toujours à Stripe que tout s'est bien passé
  res.status(200).json({ received: true });
}