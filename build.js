// build.js — build dédié à app-src.js
// ⚠️ LeCart et Stripe ont été supprimés du projet.
//    Ce build ne référence plus aucune clé API tierce.

const fs   = require('fs');
const path = require('path');
const { minify } = require('terser');
const JavaScriptObfuscator = require('javascript-obfuscator');

const INPUT  = './app-src.js';
const OUTPUT = './app.js';

// ✅ Variables globales exposées sur window.*
//    Terser ne les manglera pas (toplevel:false) mais on les liste
//    quand même pour la clarté + pour le futur si on active toplevel.
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
      // ✅ Les URLs critiques restent lisibles pour le debug
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

    // Contrôle du flux : ralentit la lecture mais garde le code fonctionnel
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.5,
    deadCodeInjection: false,          // ⚠️ gonfle le fichier ×2, à laisser false

    // ✅ selfDefending et debugProtection à false :
    //    ils cassent facilement sur mobile / dans les WebView / avec Prettier
    selfDefending: false,
    debugProtection: false,
    disableConsoleOutput: false,

    // Chaînes de caractères obfusquées
    stringArray: true,
    stringArrayThreshold: 0.75,        // ↑ un peu plus agressif qu'avant
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
    // ✅ PLUS AUCUNE CLÉ LECART / STRIPE À PROTÉGER
    //    Seule la clé anon Supabase (déjà publique) est présente.
    // ============================================================
    reservedNames: GLOBALS_TO_KEEP,
    reservedStrings: [
      // Clé anon Supabase publique — la protéger ne fait que ralentir
      // un attaquant qui voudrait la lire, elle est de toute façon publique.
      'sb_publishable_0mmEGRZ_GKmgKSMKE83S8A_huJaAdL9'
    ]
  });

  fs.writeFileSync(OUTPUT, obfuscated.getObfuscatedCode(), 'utf8');

  // ============================================================
  // 3) RAPPORT
  // ============================================================
  const before = (code.length / 1024).toFixed(1);
  const after  = (obfuscated.getObfuscatedCode().length / 1024).toFixed(1);
  console.log(`✅ app-src.js → app.js  (${before} Ko → ${after} Ko)`);
  console.log(`   Fichier : ${path.resolve(OUTPUT)}`);

})().catch(err => {
  console.error('❌ Erreur de build :', err);
  process.exit(1);
});