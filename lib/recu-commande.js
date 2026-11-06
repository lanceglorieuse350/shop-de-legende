import nodemailer from "nodemailer";

function echapper(valeur) {
  return String(valeur ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function lienSuivi(id, email) {
  const origine = (process.env.SITE_URL || "https://shop-de-legende.vercel.app").replace(/\/$/, "");
  const url = new URL(origine + "/");
  url.searchParams.set("suivi", id);
  url.searchParams.set("e", email);
  url.hash = "commande";
  return url.href;
}

function lignesRecu(produits) {
  return (produits || []).map((produit) => {
    const quantite = produit.quantite || 1;
    const nom = produit.nom || "Produit";
    const prix = Number(produit.prix_unitaire);
    if (Number.isFinite(prix)) return quantite + " × " + nom + " — " + prix.toFixed(2) + " €";
    return quantite + " × " + nom;
  });
}

export function dejaEnvoye(details) {
  return Array.isArray(details) && details.some((item) => item && item.mail_envoye === true);
}

export async function envoyerRecu({ email, id, montant, produits, adresse }) {
  const compte = process.env.GMAIL_USER || "lanceglorieuse@gmail.com";
  const motDePasse = String(process.env.GMAIL_APP_PASSWORD || "").replace(/\s/g, "");
  if (!motDePasse) {
    throw new Error("GMAIL_APP_PASSWORD manquante");
  }

  const lien = lienSuivi(id, email);
  const lignes = lignesRecu(produits);
  const total = (Number(montant) || 0).toFixed(2);
  const texte = [
    "GUILLET IV — reçu de commande",
    "",
    "Merci pour votre achat. Ce message est votre reçu.",
    "Aucun compte n'est nécessaire pour suivre la commande.",
    "",
    "Numéro de commande :",
    id,
    "",
    "Montant : " + total + " €",
    "",
    "Produits :",
    ...lignes,
    "",
    "Adresse de livraison :",
    adresse || "",
    "",
    "Suivre la commande :",
    lien,
    "",
    "GUILLET IV — lanceglorieuse@gmail.com"
  ].join("\n");

  const html = [
    "<!DOCTYPE html><html lang=\"fr\"><body style=\"font-family:Georgia,serif;color:#111;background:#fff;margin:0;padding:24px;\">",
    "<h1 style=\"font-size:20px;margin:0 0 12px;\">GUILLET IV</h1>",
    "<p>Merci pour votre achat. Ce message est votre reçu. Aucun compte n'est nécessaire pour suivre la commande.</p>",
    "<p><strong>Numéro de commande</strong><br>" + echapper(id) + "</p>",
    "<p><strong>Montant</strong><br>" + echapper(total) + " €</p>",
    "<p><strong>Produits</strong></p><ul>",
    lignes.map((ligne) => "<li>" + echapper(ligne) + "</li>").join(""),
    "</ul>",
    "<p><strong>Adresse de livraison</strong><br>" + echapper(adresse || "") + "</p>",
    "<p><a href=\"" + echapper(lien) + "\">Voir le statut de ma commande</a></p>",
    "<p style=\"color:#555;font-size:14px;\">Ce lien ouvre le suivi avec votre e-mail et votre numéro déjà remplis.</p>",
    "<p style=\"color:#555;font-size:14px;\">GUILLET IV · lanceglorieuse@gmail.com</p>",
    "</body></html>"
  ].join("");

  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user: compte, pass: motDePasse }
  });

  await transport.sendMail({
    from: "GUILLET IV <" + compte + ">",
    to: email,
    replyTo: compte,
    subject: "GUILLET IV — reçu et suivi de commande",
    text: texte,
    html
  });
}
