import path from 'node:path';
import { DATA_DIR, PER_PAGE } from '../config.js';
import { getJson } from '../http.js';
import { writeJson } from '../utils/fs.js';
import { downloadMany } from '../utils/download-image.js';
import { safeSlug } from '../utils/slugify.js';
import { recordError, recordImageResults } from '../utils/manifest.js';

const ENDPOINT = '/wp-json/wc/store/v1/products';

function imageUrlsOf(product) {
  const urls = new Set();
  for (const img of product.images ?? []) {
    if (img?.src) urls.add(img.src);
  }
  return [...urls];
}

export async function crawlProducts(manifest) {
  console.log('▶ Crawling products…');
  const outDir = path.join(DATA_DIR, 'products');
  const all = [];

  let page = 1;
  while (true) {
    let batch;
    try {
      batch = await getJson(ENDPOINT, { per_page: PER_PAGE, page });
    } catch (err) {
      recordError(manifest, 'products_page', { page }, err);
      console.warn(`  ✗ products page ${page}: ${err.message}`);
      break;
    }
    if (!Array.isArray(batch) || batch.length === 0) break;

    for (let i = 0; i < batch.length; i += 1) {
      const product = batch[i];
      const slug = safeSlug(product.slug, `product-${product.id}`);
      const productDir = path.join(outDir, slug);
      const idx = all.length + 1;
      console.log(`  [${idx}] product/${slug}`);

      try {
        await writeJson(path.join(productDir, 'product.json'), product);
        const urls = imageUrlsOf(product);
        const results = await downloadMany(urls, path.join(productDir, 'images'));
        recordImageResults(manifest, results);
        all.push(product);
      } catch (err) {
        recordError(manifest, 'product', { slug, id: product.id }, err);
        console.warn(`    ✗ ${slug}: ${err.message}`);
      }
    }

    if (batch.length < PER_PAGE) break;
    page += 1;
  }

  await writeJson(path.join(outDir, '_all.json'), all);
  manifest.counts.products = all.length;
  console.log(`  ✓ Products: ${all.length}`);
}
