// build.js — version simple et fiable (esbuild uniquement)
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔨 Build avec esbuild…');

execSync(
  'npx esbuild app-src.js --bundle --minify --target=es2020 --outfile=app.js',
  { stdio: 'inherit' }
);

const code = fs.readFileSync('app.js', 'utf8');
const expectedKey = 'lecart_QFARqlmd0rNhYWqJdJPcZ8YZpfRlEWKsNmhnXgVxkDg';

if (!code.includes(expectedKey)) {
  console.error('❌ ERREUR : la clé LeCart n\'est pas dans app.js');
  process.exit(1);
}

console.log('✅ app.js régénéré et contient la bonne clé LeCart');