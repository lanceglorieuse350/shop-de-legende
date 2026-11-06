// Vérifie que la page servie (app-src.js) parle au bon serveur.
// Le site charge app-src.js directement. Ce script ne crée pas app.js.
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'app-src.js');
const code = fs.readFileSync(file, 'utf8');

const checks = [
  ['clé LeCart du widget', 'lecart_MOX19svMWrKuq9jrqnb_ubW4SYDI_0-SVd6cjpblfgs'],
  ['paiement via /api/checkout', "window.location.origin + '/api/checkout'"],
  ['clé publique Stripe', 'pk_live_51UNkYQRNu37iEZT9'],
  ['projet Supabase', 'https://wrhokeajjmupnxpfurcc.supabase.co'],
  ['clé publishable Supabase', 'sb_publishable_0mmEGRZ_GKmgKSMKE83S8A_huJaAdL9']
];

let failed = false;
for (const [label, needle] of checks) {
  if (!code.includes(needle)) {
    console.error('ERREUR : ' + label + ' absent de app-src.js');
    failed = true;
  }
}

if (code.includes('https://api.getlecart.com/create-checkout')) {
  console.error('ERREUR : app-src.js appelle encore LeCart en direct. Le paiement doit passer par /api/checkout.');
  failed = true;
}

if (failed) process.exit(1);
console.log('app-src.js est aligné avec /api/checkout, Stripe et Supabase.');
