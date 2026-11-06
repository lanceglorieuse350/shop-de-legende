import { createClient } from "@supabase/supabase-js";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function uuidPropre(valeur) {
  const brut = String(valeur || "").trim().toLowerCase();
  if (UUID.test(brut)) return brut;
  const compact = brut.replace(/-/g, "");
  if (!/^[0-9a-f]{32}$/.test(compact)) return "";
  return compact.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, "$1-$2-$3-$4-$5");
}

function emailPropre(valeur) {
  const email = String(valeur || "").trim().toLowerCase();
  if (email.length < 6 || email.length > 120) return "";
  if (/[%_*]/.test(email)) return "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "";
  return email;
}

function texteCourt(valeur) {
  return String(valeur || "").replace(/[<>]/g, "").trim().slice(0, 140);
}

function lienSuivi(valeur) {
  try {
    const url = new URL(String(valeur || ""));
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

async function lireDemande(req) {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) return req.body;
  if (typeof req.body === "string" && req.body.trim()) return JSON.parse(req.body);
  if (Buffer.isBuffer(req.body)) return JSON.parse(req.body.toString("utf8"));
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return {};
  return JSON.parse(raw);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "methode" });
  }

  const origin = req.headers.origin || "";
  if (origin) {
    let hote = "";
    try { hote = new URL(origin).hostname; } catch { hote = ""; }
    const permis = hote === "shop-de-legende.vercel.app" || hote === "localhost" || hote === "127.0.0.1";
    if (!permis) return res.status(403).json({ error: "origine" });
  }

  const url = process.env.SUPABASE_URL;
  const cle = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !cle) {
    return res.status(500).json({ error: "serveur" });
  }

  let corps = {};
  try {
    corps = await lireDemande(req);
  } catch {
    return res.status(400).json({ error: "invalide" });
  }

  const email = emailPropre(corps.email);
  const id = uuidPropre(corps.reference);
  if (!email || !id) {
    return res.status(400).json({ error: "invalide" });
  }

  const supabase = createClient(url, cle);
  const { data: client, error: clientError } = await supabase
    .from("clients")
    .select("id")
    .ilike("email", email)
    .limit(1)
    .maybeSingle();

  if (clientError || !client) {
    return res.status(404).json({ error: "introuvable" });
  }

  const { data: commande, error: commandeError } = await supabase
    .from("commandes")
    .select("id, created_at, statut, montant_total, details_produits, numero_suivi, lien_suivi")
    .eq("id", id)
    .eq("client_id", client.id)
    .maybeSingle();

  if (commandeError || !commande) {
    return res.status(404).json({ error: "introuvable" });
  }

  const produits = Array.isArray(commande.details_produits)
    ? commande.details_produits.slice(0, 12).map((prod) => ({
        nom: texteCourt(prod && prod.nom) || "Produit",
        quantite: Math.min(99, Math.max(1, Number(prod && prod.quantite) || 1))
      }))
    : [];

  return res.status(200).json({
    id: commande.id,
    date: commande.created_at,
    statut: texteCourt(commande.statut) || "en attente",
    montant: Number(commande.montant_total) || 0,
    produits,
    suivi: texteCourt(commande.numero_suivi),
    lien_suivi: lienSuivi(commande.lien_suivi)
  });
}
