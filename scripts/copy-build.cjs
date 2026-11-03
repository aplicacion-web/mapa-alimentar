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

// 3. Copy 404.html to root
const pub404 = path.join(rootDir, 'public', '404.html');
const root404 = path.join(rootDir, '404.html');
if (fs.existsSync(pub404)) {
  fs.copyFileSync(pub404, root404);
}
