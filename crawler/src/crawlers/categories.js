import path from 'node:path';
import { DATA_DIR, PER_PAGE } from '../config.js';
import { getJson } from '../http.js';
import { writeJson } from '../utils/fs.js';
import { recordError } from '../utils/manifest.js';

async function fetchAll(endpoint) {
  const all = [];
  let page = 1;
  while (true) {
    const data = await getJson(endpoint, { per_page: PER_PAGE, page });
    if (!Array.isArray(data) || data.length === 0) break;
    all.push(...data);
    if (data.length < PER_PAGE) break;
    page += 1;
  }
  return all;
}

export async function crawlCategories(manifest) {
  console.log('▶ Crawling categories…');
  const outDir = path.join(DATA_DIR, 'categories');

  try {
    const productCats = await fetchAll('/wp-json/wc/store/v1/products/categories');
    await writeJson(path.join(outDir, 'product-categories.json'), productCats);
    manifest.counts.product_categories = productCats.length;
    console.log(`  ✓ Product categories: ${productCats.length}`);
  } catch (err) {
    recordError(manifest, 'product_categories', null, err);
    console.warn(`  ✗ Product categories: ${err.message}`);
  }

  try {
    const postCats = await fetchAll('/wp-json/wp/v2/categories');
    await writeJson(path.join(outDir, 'post-categories.json'), postCats);
    manifest.counts.post_categories = postCats.length;
    console.log(`  ✓ Post categories: ${postCats.length}`);
  } catch (err) {
    recordError(manifest, 'post_categories', null, err);
    console.warn(`  ✗ Post categories: ${err.message}`);
  }
}
