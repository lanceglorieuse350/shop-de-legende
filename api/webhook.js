import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const config = {
  api: {
    bodyParser: false,
  },
};

async function lireCorpsBrut(req) {
  if (Buffer.isBuffer(req.rawBody)) return req.rawBody;
  if (typeof req.rawBody === 'string') return Buffer.from(req.rawBody);
  return buffer(req);
}

async function trouverOuCreerClient(email) {
  const { data: existing, error: readError } = await supabase
    .from('clients')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  if (readError) {
    throw new Error('Lecture clients : ' + readError.message);
  }
  if (existing) return existing.id;

  const { data: created, error: insertError } = await supabase
    .from('clients')
    .insert([{ email }])
    .select('id')
    .single();

  if (insertError) {
    throw new Error(
      'Création client impossible. La colonne clients.id doit avoir une valeur par défaut, ou une ligne doit déjà exister avec cet e-mail. ' +
      insertError.message
    );
  }
  return created.id;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return res.status(500).json({ error: 'STRIPE_SECRET_KEY ou STRIPE_WEBHOOK_SECRET manquante' });
  }
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: 'SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquante' });
  }

  let event;
  try {
    const buf = await lireCorpsBrut(req);
    event = stripe.webhooks.constructEvent(
      buf,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Signature webhook refusée :', err.message);
    return res.status(400).send('Webhook Error: ' + err.message);
  }

  if (event.type !== 'checkout.session.completed') {
    return res.status(200).json({ received: true, ignore: event.type });
  }

  const session = event.data.object;
  const customerEmail = session.customer_details?.email || session.customer_email;
  const montantTotal = (session.amount_total || 0) / 100;

  if (!customerEmail) {
    console.error('Paiement sans e-mail, session', session.id);
    return res.status(500).json({ error: 'E-mail client absent' });
  }

  let panier = [];
  let lineItemsData = [];
  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });
    lineItemsData = lineItems.data;
    panier = lineItems.data.map((item) => {
      const quantite = item.quantity || 1;
      const totalLigne = (item.amount_total || 0) / 100;
      return {
        nom: item.description,
        prix_unitaire: Math.round((totalLigne / quantite) * 100) / 100,
        quantite,
        stripe_price_id: item.price?.id || null
      };
    });
  } catch (error) {
    console.error('Détails du panier Stripe illisibles', error);
    panier = [{ nom: 'Produit inconnu', note: 'Erreur de récupération' }];
  }

  try {
    const clientId = await trouverOuCreerClient(customerEmail);
    const adresse = [
      session.shipping_details?.address?.line1 || session.customer_details?.address?.line1,
      session.shipping_details?.address?.postal_code || session.customer_details?.address?.postal_code,
      session.shipping_details?.address?.city || session.customer_details?.address?.city
    ].filter(Boolean).join(', ') || 'Adresse non fournie';

    const { error: insertError } = await supabase.from('commandes').insert([{
      client_id: clientId,
      montant_total: montantTotal,
      statut: 'payé',
      details_produits: panier,
      adresse_livraison: adresse
    }]);

    if (insertError) {
      console.error('Erreur insertion commande :', insertError);
      return res.status(500).json({ error: insertError.message });
    }

    for (const item of lineItemsData) {
      if (!item.price?.id) continue;
      const { error: stockError } = await supabase.rpc('decrement_stock', {
        price_id: item.price.id,
        qty: item.quantity || 1
      });
      if (stockError) {
        console.error('Stock non mis à jour pour', item.price.id, stockError);
      }
    }

    console.log('Commande enregistrée :', montantTotal, 'EUR pour', customerEmail);
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook commande :', error);
    return res.status(500).json({ error: error.message });
  }
}
