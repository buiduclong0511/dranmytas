import fsp from 'node:fs/promises';
import { DATA_DIR } from './config.js';
import { newManifest, writeManifest } from './utils/manifest.js';
import { crawlCategories } from './crawlers/categories.js';
import { crawlProducts } from './crawlers/products.js';
import { crawlPosts } from './crawlers/posts.js';
import { crawlPages } from './crawlers/pages.js';

async function main() {
  await fsp.mkdir(DATA_DIR, { recursive: true });
  const manifest = newManifest();

  const t0 = Date.now();
  console.log(`Crawl started at ${manifest.started_at}`);
  console.log(`Output dir: ${DATA_DIR}\n`);

  await crawlCategories(manifest);
  await crawlProducts(manifest);
  await crawlPosts(manifest);
  await crawlPages(manifest);

  manifest.finished_at = new Date().toISOString();
  manifest.duration_seconds = ((Date.now() - t0) / 1000).toFixed(1);
  await writeManifest(manifest);

  console.log('\n=== Done ===');
  console.log(JSON.stringify(manifest.counts, null, 2));
  console.log(`Errors: ${manifest.errors.length}`);
  console.log(`Duration: ${manifest.duration_seconds}s`);
  console.log(`Manifest: ${DATA_DIR}/manifest.json`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
