const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const distAssetsDir = path.join(distDir, 'assets');
const rootAssetsDir = path.join(rootDir, 'assets');

// 1. Copy dist/assets to root/assets
if (fs.existsSync(distAssetsDir)) {
  if (!fs.existsSync(rootAssetsDir)) {
    fs.mkdirSync(rootAssetsDir, { recursive: true });
  }
  const files = fs.readdirSync(distAssetsDir);
  for (const file of files) {
    fs.copyFileSync(path.join(distAssetsDir, file), path.join(rootAssetsDir, file));
  }
  console.log(`Copied ${files.length} assets to ${rootAssetsDir}`);
}

// 2. Copy dist/index.html to root/index.html (saving index.dev.html first if needed)
const distIndex = path.join(distDir, 'index.html');
const rootIndex = path.join(rootDir, 'index.html');
const devIndex = path.join(rootDir, 'index.dev.html');

if (fs.existsSync(distIndex)) {
  const currentRootIndex = fs.readFileSync(rootIndex, 'utf8');
  if (currentRootIndex.includes('/src/main.tsx') && !fs.existsSync(devIndex)) {
    fs.writeFileSync(devIndex, currentRootIndex, 'utf8');
    console.log('Saved development template as index.dev.html');
  }
  fs.copyFileSync(distIndex, rootIndex);
  console.log('Updated root index.html with production build');
}

// 3. Copy PWA root assets from public to root (manifest.json, sw.js, icons, 404.html, favicon.svg)
const publicDir = path.join(rootDir, 'public');
const pwaFiles = ['manifest.json', 'sw.js', 'icon-192.png', 'icon-512.png', 'favicon.svg', '404.html'];

for (const file of pwaFiles) {
  const src = path.join(publicDir, file);
  const dest = path.join(rootDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied PWA asset ${file} to root`);
  }
}
