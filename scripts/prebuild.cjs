const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const srcHtml = path.join(rootDir, 'index.src.html');
const destHtml = path.join(rootDir, 'index.html');

if (fs.existsSync(srcHtml)) {
  fs.copyFileSync(srcHtml, destHtml);
  console.log('[prebuild] Restored index.html from index.src.html with <script type="module" src="/src/main.tsx">');
}
