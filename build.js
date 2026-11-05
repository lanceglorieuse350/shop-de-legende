// build.js — build dédié à app-src.js
// LeCart et Stripe sont restaurés.
// Les clés API critiques sont protégées via reservedStrings.

const fs   = require('fs');
const path = require('path');
const { minify } = require('terser');
const JavaScriptObfuscator = require('javascript-obfuscator');

const INPUT  = './app-src.js';
const OUTPUT = './app.js';

// ============================================================
// ✅ CLÉS SENSIBLES — NE JAMAIS SUPPRIMER DE CETTE LISTE
// ============================================================
const SENSITIVE_KEYS = [
  // --- LeCart (clé API privée, ne doit PAS fuiter) ---
  'lecartApiKey',
  'lecart_QFARqlmd0rNhYWqJdJPcZ8YZpfRlEWKsNmhnXgVxkDg',
  'checkoutEndpoint',
  'https://api.getlecart.com/create-checkout',

  // --- Stripe (publishable key, publique par design MAIS protégée) ---
  'stripePublicKey',
  'pk_live_51UNkYQRNu37iEZT9JFa1lJZFQ2eVox5wR6oSjl7A4MznYh5RypGYCqDTFVoaLrPEsV5r5XFRlLYmv85c6bzq8qCq00zNEhZHTn',

  // --- Supabase (publishable, publique par design) ---
  'sb_publishable_0mmEGRZ_GKmgKSMKE83S8A_huJaAdL9',
  'https://wrhokeajjmupnxpfurcc.supabase.co'
];

// ============================================================
// ✅ VARIABLES GLOBALES — NE PAS MANGLER
// ============================================================
const GLOBALS_TO_KEEP = [
  // Navigation & UI
  'navigateTo',
  'actualiserBoutonHaut',
  'scrollToElementWithOffset',
  'activerPageCyberEtScroll',
  'ouvrirZoom',
  'fermerZoom',
  // Musique
  'changerMusique',
  'togglePlayMusique',
  // Chatbot
  'toggleChatbot',
  'envoyerMessageChat',
  'retranslateChat',
  'chatOuvert',
  // i18n
  'applyLanguage',
  'changeLanguage',
  'reapplyLanguage',
  '__getDict',
  'TRANSLATIONS',
  // Maintenance
  '__setMaintenance',
  // Auth
  'supabaseClient',
  // Divers
  'ancienFocus'
];

(async () => {
  // ✅ Garde-fou : vérifier que le fichier source existe
  if (!fs.existsSync(INPUT)) {
    console.error(`❌ Fichier source introuvable : ${INPUT}`);
    process.exit(1);
  }

  const code = fs.readFileSync(INPUT, 'utf8');

  // ============================================================
  // 1) MINIFICATION (Terser)
  // ============================================================
  const minified = await minify(code, {
    compress: {
      drop_debugger: true,
      drop_console: false,   // garder les console.warn/error utiles au debug
      passes: 2
    },
    mangle: {
      toplevel: false,                    // ⚠️ ne mangle pas les window.*
      reserved: GLOBALS_TO_KEEP
    },
    format: {
      comments: false,
      ascii_only: true
    }
  });

  if (!minified.code) {
    console.error('❌ Terser a échoué (pas de code en sortie).');
    process.exit(1);
  }

  // ============================================================
  // 2) OBFUSCATION
  // ============================================================
  const obfuscated = JavaScriptObfuscator.obfuscate(minified.code, {
    compact: true,
    simplify: true,
    identifierNamesGenerator: 'hexadecimal',

    // Contrôle du flux
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.5,
    deadCodeInjection: false,

    // selfDefending et debugProtection à false :
    // ils cassent facilement sur mobile / WebView / Prettier
    selfDefending: false,
    debugProtection: false,
    disableConsoleOutput: false,

    // Chaînes de caractères obfusquées
    stringArray: true,
    stringArrayThreshold: 0.75,
    stringArrayEncoding: ['base64'],
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 2,
    stringArrayWrappersType: 'function',
    stringArrayIndexShift: true,
    splitStrings: true,
    splitStringsChunkLength: 10,

    // Nombres et Unicode
    numbersToExpressions: true,
    unicodeEscapeSequence: false,

    // Renommage & structure
    renameGlobals: false,
    transformObjectKeys: false,

    log: false,

    // ============================================================
    // ✅ PROTECTION DES CLÉS LeCart + Stripe + Supabase
    //    → toutes les valeurs listées dans SENSITIVE_KEYS
    //      resteront intactes après obfuscation
    // ============================================================
    reservedNames: GLOBALS_TO_KEEP,
    reservedStrings: SENSITIVE_KEYS
  });

  fs.writeFileSync(OUTPUT, obfuscated.getObfuscatedCode(), 'utf8');

  // ============================================================
  // 3) RAPPORT
  // ============================================================
  const before = (code.length / 1024).toFixed(1);
  const after  = (obfuscated.getObfuscatedCode().length / 1024).toFixed(1);
  console.log(`✅ app-src.js → app.js  (${before} Ko → ${after} Ko)`);
  console.log(`   Fichier : ${path.resolve(OUTPUT)}`);
  console.log(`   Clés protégées : ${SENSITIVE_KEYS.length} entrées`);

})().catch(err => {
  console.error('❌ Erreur de build :', err);
  process.exit(1);
});