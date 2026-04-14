import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { join } from 'path';

const root = join(fileURLToPath(import.meta.url), '../..');
const logo = join(root, 'public/images/default/logo.png');
const appDir = join(root, 'src/app');

const sizes = [
  { size: 32, name: 'favicon.ico' },
  { size: 512, name: 'icon.png' },
  { size: 180, name: 'apple-icon.png' },
];

async function generate() {
  for (const { size, name } of sizes) {
    await sharp(logo)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(join(appDir, name));
    console.log(`  ✓  ${name} (${size}×${size})`);
  }
  console.log('Done.');
}

generate().catch((err) => {
  console.error('Favicon generation failed:', err);
  process.exit(1);
});
