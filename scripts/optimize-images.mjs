import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);
const BATCH_SIZE = 4;

async function* walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkDir(fullPath);
    } else if (IMAGE_EXTENSIONS.has(extname(entry.name).toLowerCase())) {
      yield fullPath;
    }
  }
}

async function toWebP(inputPath) {
  const ext = extname(inputPath);
  const webpPath = inputPath.slice(0, -ext.length) + '.webp';
  try {
    const [src, webp] = await Promise.all([stat(inputPath), stat(webpPath)]);
    if (webp.mtimeMs >= src.mtimeMs) {
      console.log(`  skip  ${basename(webpPath)}`);
      return;
    }
  } catch {
    // webp doesn't exist yet — proceed
  }
  await sharp(inputPath)
    .resize(1920, undefined, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(webpPath);
  console.log(`  ✓     ${basename(inputPath)} → ${basename(webpPath)}`);
}

async function main() {
  const imagesDir = join(fileURLToPath(import.meta.url), '../../public/images');
  const files = [];
  for await (const f of walkDir(imagesDir)) {
    files.push(f);
  }
  console.log(`Optimizing ${files.length} image(s)...`);
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    await Promise.all(files.slice(i, i + BATCH_SIZE).map(toWebP));
  }
  console.log('Done.');
}

main().catch((err) => {
  console.error('Image optimization failed:', err);
  process.exit(1);
});
