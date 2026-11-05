import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { buffer } from 'micro';

// ============================================================
// 1. INITIALISATION
// ============================================================
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Nécessaire pour vérifier la signature Stripe (body brut)
export const config = {
  api: {
    bodyParser: false,
  },
};

// ============================================================
// 2. HANDLER
// ============================================================
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  // --- 2.1 Vérification de la signature Stripe ---
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`❌ Erreur de signature Webhook : ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // --- 2.2 On ne traite QUE les paiements réussis ---
  if (event.type !== 'checkout.session.completed') {
    return res.status(200).json({ received: true, type: event.type, ignored: true });
  }

  const session = event.data.object;
  const stripeSessionId = session.id;
  const customerEmail =
    session.customer_details?.email || session.customer_email || null;
  const montantTotal = (session.amount_total || 0) / 100;

  // ============================================================
  // 3. IDEMPOTENCE — Stripe peut renvoyer le même webhook plusieurs fois
  // ============================================================
  try {
    const { data: existingOrder } = await supabase
      .from('commandes')
      .select('id')
      .eq('stripe_session_id', stripeSessionId)
      .maybeSingle();

    if (existingOrder) {
      console.log(`⚠️ Commande déjà traitée (session ${stripeSessionId})`);
      return res.status(200).json({ received: true, info: 'Déjà traitée' });
    }
  } catch (e) {
    // Si la colonne `stripe_session_id` n'existe pas encore en base,
    // on log mais on continue (dégradé mais fonctionnel).
    console.warn('[IDEMPOTENCE] Check impossible :', e.message);
  }

  // ============================================================
  // 4. RÉCUPÉRATION DES PRODUITS DEPUIS STRIPE
  // ============================================================
  let panier = [];
  let lineItemsData = [];

  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ['data.price'],
    });
    lineItemsData = lineItems.data;

    panier = lineItems.data.map((item) => {
      // `item.price` peut être une string (ID) ou un objet (si expand)
      const priceId =
        typeof item.price === 'string' ? item.price : item.price?.id || null;

      // Prix unitaire = total ligne / quantité (plus fiable que le 1er champ)
      const unitPrice =
        item.quantity > 0 ? (item.amount_total || 0) / 100 / item.quantity : 0;

      return {
        nom: item.description || 'Produit',
        prix_unitaire: unitPrice,
        quantite: item.quantity || 1,
        stripe_price_id: priceId,
      };
    });
  } catch (error) {
    console.error('❌ Impossible de récupérer les détails du panier :', error);
    panier = [{ nom: 'Produit inconnu', note: 'Erreur de récupération' }];
  }

  // ============================================================
  // 5. ADRESSE DE LIVRAISON (compatible Stripe 2024+ et anciennes versions)
  // ============================================================
  const shipping =
    session.collected_information?.shipping_details ||
    session.shipping_details ||
    null;
  const address = shipping?.address || session.customer_details?.address || null;

  const adresseLivraison = address
    ? [
        address.line1,
        address.line2,
        address.postal_code,
        address.city,
        address.country,
      ]
        .filter(Boolean)
        .join(', ')
    : 'Adresse non fournie';

  // ============================================================
  // 6. TROUVER OU CRÉER LE CLIENT DANS SUPABASE
  // ============================================================
  let clientId = null;

  if (customerEmail) {
    const { data: client } = await supabase
      .from('clients')
      .select('id')
      .eq('email', customerEmail)
      .maybeSingle();

    if (client) {
      clientId = client.id;
    } else {
      // Création automatique pour les achats sans compte
      console.log(`👤 Client absent — création automatique pour ${customerEmail}`);
      const { data: newClient, error: createErr } = await supabase
        .from('clients')
        .insert([{ email: customerEmail }])
        .select('id')
        .single();

      if (createErr) {
        console.error('❌ Impossible de créer le client :', createErr);
      } else {
        clientId = newClient.id;
      }
    }
  }

  if (!clientId) {
    console.warn(
      `⚠️ Aucun client identifié pour la session ${stripeSessionId} (email manquant ou erreur DB)`
    );
    return res.status(200).json({ received: true, info: 'Client non identifié' });
  }

  // ============================================================
  // 7. ENREGISTREMENT DE LA COMMANDE
  // ============================================================
  const { error: insertError } = await supabase.from('commandes').insert([
    {
      client_id: clientId,
      montant_total: montantTotal,
      statut: 'payé',
      details_produits: panier,
      adresse_livraison: adresseLivraison,
      stripe_session_id: stripeSessionId,
    },
  ]);

  if (insertError) {
    console.error('❌ Erreur insertion commande :', insertError);
    return res.status(500).json({ error: 'Erreur base de données' });
  }

  // ============================================================
  // 8. DÉCRÉMENTATION DES STOCKS
  // ============================================================
  for (const item of lineItemsData) {
    const priceId =
      typeof item.price === 'string' ? item.price : item.price?.id;

    if (priceId) {
      const { error: stockError } = await supabase.rpc('decrement_stock', {
        price_id: priceId,
        qty: item.quantity,
      });

      if (stockError) {
        console.error(`⚠️ Erreur stock pour ${priceId} :`, stockError);
      }
    }
  }

  console.log(
    `✅ Commande ${montantTotal} € enregistrée pour ${customerEmail} (session ${stripeSessionId})`
  );

  return res.status(200).json({ received: true });
}