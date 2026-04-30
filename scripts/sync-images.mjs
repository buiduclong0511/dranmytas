#!/usr/bin/env node
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data');
const PUBLIC_IMAGES = path.join(ROOT, 'public', 'images');

async function dirExists(p) {
  try {
    const s = await fsp.stat(p);
    return s.isDirectory();
  } catch {
    return false;
  }
}

async function syncKind(kind) {
  const srcRoot = path.join(DATA, kind);
  const destRoot = path.join(PUBLIC_IMAGES, kind);
  if (!(await dirExists(srcRoot))) {
    console.log(`  skip ${kind} (no source)`);
    return { copied: 0, skipped: 0 };
  }
  await fsp.mkdir(destRoot, { recursive: true });

  const slugs = await fsp.readdir(srcRoot, { withFileTypes: true });
  let copied = 0;
  let skipped = 0;

  for (const dirent of slugs) {
    if (!dirent.isDirectory()) continue;
    const srcImages = path.join(srcRoot, dirent.name, 'images');
    if (!(await dirExists(srcImages))) continue;
    const destImages = path.join(destRoot, dirent.name);
    const files = await fsp.readdir(srcImages);
    for (const file of files) {
      const srcFile = path.join(srcImages, file);
      const destFile = path.join(destImages, file);
      try {
        const [srcStat, destStat] = await Promise.allSettled([
          fsp.stat(srcFile),
          fsp.stat(destFile),
        ]);
        if (
          srcStat.status === 'fulfilled' &&
          destStat.status === 'fulfilled' &&
          srcStat.value.size === destStat.value.size
        ) {
          skipped += 1;
          continue;
        }
      } catch {
        /* fall through */
      }
      await fsp.mkdir(destImages, { recursive: true });
      await fsp.copyFile(srcFile, destFile);
      copied += 1;
    }
  }

  return { copied, skipped };
}

async function main() {
  if (!fs.existsSync(DATA)) {
    console.error(`Data directory not found at ${DATA}. Run crawler first.`);
    process.exit(1);
  }
  console.log('Syncing images data/ → public/images/ …');
  const products = await syncKind('products');
  const posts = await syncKind('posts');
  const pages = await syncKind('pages');
  console.log(
    `  products: ${products.copied} copied, ${products.skipped} skipped\n` +
      `  posts:    ${posts.copied} copied, ${posts.skipped} skipped\n` +
      `  pages:    ${pages.copied} copied, ${pages.skipped} skipped`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
