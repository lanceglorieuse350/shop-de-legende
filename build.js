const fs = require('fs');
const path = require('path');

const page = fs.readFileSync(path.join(__dirname, 'app-src.js'), 'utf8');
const checkout = fs.readFileSync(path.join(__dirname, 'api', 'checkout.js'), 'utf8');
let failed = false;

function exige(fichier, code, texte, label) {
  if (!code.includes(texte)) {
    console.error('ERREUR : ' + label + ' absent de ' + fichier);
    failed = true;
  }
}

function interdit(fichier, code, texte, label) {
  if (code.includes(texte)) {
    console.error('ERREUR : ' + label + ' encore présent dans ' + fichier);
    failed = true;
  }
}

exige('app-src.js', page, "window.location.origin + '/api/checkout'", 'paiement via /api/checkout');
exige('app-src.js', page, 'pk_live_51UNkYQRNu37iEZT9', 'clé publique Stripe');
exige('app-src.js', page, 'https://wrhokeajjmupnxpfurcc.supabase.co', 'projet Supabase');
exige('api/checkout.js', checkout, 'process.env.LECART_SECRET_KEY', 'clé LeCart côté serveur');
interdit('app-src.js', page, 'lecart_MOX19', 'clé secrète LeCart');
interdit('api/checkout.js', checkout, 'lecart_MOX19', 'clé secrète LeCart');
interdit('app-src.js', page, 'https://api.getlecart.com/create-checkout', 'appel direct à LeCart');

if (failed) process.exit(1);
console.log('Les fichiers publics ne contiennent plus la clé secrète LeCart.');
