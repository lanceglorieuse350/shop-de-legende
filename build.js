// build.js — build dédié à app-src.js
const fs   = require('fs');
const { minify } = require('terser');
const JavaScriptObfuscator = require('javascript-obfuscator');

const INPUT  = './app-src.js';
const OUTPUT = './app.js';   // fichier final à charger dans le HTML

(async () => {
  const code = fs.readFileSync(INPUT, 'utf8');

  // -------- 1) MINIFICATION (Terser) --------
  const minified = await minify(code, {
    compress: {
      drop_debugger: true,
      passes: 2
    },
    mangle: {
      toplevel: false,          // ⚠️ NE PAS mangler les globals (window.*)
      reserved: [
        'navigateTo', 'toggleChatbot', 'envoyerMessageChat',
        'changerMusique', 'togglePlayMusique',
        'applyLanguage', 'changeLanguage', 'reapplyLanguage',
        'ouvrirZoom', 'fermerZoom',
        'actualiserBoutonHaut', 'scrollToElementWithOffset',
        'activerPageCyberEtScroll',
        'TRANSLATIONS', 'supabaseClient', 'LeCart',
        'chatOuvert', 'ancienFocus', 'retranslateChat',
        '__getDict', '__setMaintenance',
        'lecartApiKey', 'checkoutEndpoint', 'stripePublicKey'
      ]
    },
    format: { comments: false }
  });

  if (!minified.code) throw new Error('Terser a échoué');

  // -------- 2) OBFUSCATION --------
  const obfuscated = JavaScriptObfuscator.obfuscate(minified.code, {
    compact: true,
    simplify: true,
    identifierNamesGenerator: 'hexadecimal',

    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.5,
    deadCodeInjection: false,
    selfDefending: false,

    stringArray: true,
    stringArrayThreshold: 0.5,
    stringArrayEncoding: ['base64'],
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 2,
    stringArrayWrappersType: 'function',
    stringArrayIndexShift: true,
    splitStrings: true,
    splitStringsChunkLength: 10,

    numbersToExpressions: true,
    unicodeEscapeSequence: false,

    renameGlobals: false,
    transformObjectKeys: false,
    debugProtection: false,
    disableConsoleOutput: false,
    log: false,

    // ✅ PROTECTION DE LA CLÉ API ET DES MOTS-CLÉS LECART
    reservedStrings: [
      'lecart_QFARqlmd0rNhYWqJdJPcZ8YZpfRlEWKsNmhnXgVxkDg'
    ],
    reservedNames: [
      'LeCart', 'lecartApiKey', 'checkoutEndpoint', 'stripePublicKey'
    ]
  });

  fs.writeFileSync(OUTPUT, obfuscated.getObfuscatedCode(), 'utf8');

  const before = (code.length / 1024).toFixed(1);
  const after  = (obfuscated.getObfuscatedCode().length / 1024).toFixed(1);
  console.log(`✅ app-src.js → app.js  (${before} Ko → ${after} Ko)`);
})().catch(err => { console.error('❌', err); process.exit(1); });