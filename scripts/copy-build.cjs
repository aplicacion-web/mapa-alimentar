const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const distAssetsDir = path.join(distDir, 'assets');
const rootAssetsDir = path.join(rootDir, 'assets');

// 1. Clean old hashed JS and CSS in root/assets
if (fs.existsSync(rootAssetsDir)) {
  const existingFiles = fs.readdirSync(rootAssetsDir);
  for (const f of existingFiles) {
    if (f.startsWith('index-') && (f.endsWith('.js') || f.endsWith('.css') || f.endsWith('.map'))) {
      fs.unlinkSync(path.join(rootAssetsDir, f));
    }
  }
} else {
  fs.mkdirSync(rootAssetsDir, { recursive: true });
}

// 2. Copy dist/assets to root/assets
if (fs.existsSync(distAssetsDir)) {
  const files = fs.readdirSync(distAssetsDir);
  for (const file of files) {
    fs.copyFileSync(path.join(distAssetsDir, file), path.join(rootAssetsDir, file));
  }
  console.log(`Copied ${files.length} production assets to ${rootAssetsDir}`);
}

// 3. Copy dist/index.html to root/index.html for GitHub Pages legacy root hosting
const distIndex = path.join(distDir, 'index.html');
const rootIndex = path.join(rootDir, 'index.html');

if (fs.existsSync(distIndex)) {
  let content = fs.readFileSync(distIndex, 'utf8');
  // Ensure manifest points to ./manifest.json and sw.js points to ./sw.js
  content = content.replace(/href="[^"]*manifest[^"]*"/g, 'href="./manifest.json"');
  content = content.replace(/href="[^"]*icon-192[^"]*"/g, 'href="./icon-192.png"');
  content = content.replace(/href="[^"]*favicon[^"]*"/g, 'href="./favicon.svg"');
  fs.writeFileSync(rootIndex, content, 'utf8');
  console.log('Updated root index.html with production bundle for GitHub Pages');
}

// 4. Copy PWA root assets from public to root AND assets/ (manifest.json, sw.js, icons, 404.html, favicon.svg)
const publicDir = path.join(rootDir, 'public');
const pwaFiles = ['manifest.json', 'sw.js', 'icon-192.png', 'icon-512.png', 'favicon.svg', '404.html'];

for (const file of pwaFiles) {
  const src = path.join(publicDir, file);
  const destRoot = path.join(rootDir, file);
  const destAssets = path.join(rootAssetsDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, destRoot);
    fs.copyFileSync(src, destAssets);
    console.log(`Copied PWA asset ${file} to root and assets/`);
  }
}
