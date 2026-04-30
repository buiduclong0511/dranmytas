import path from 'node:path';
import { DATA_DIR, PER_PAGE, isPageBlocked } from '../config.js';
import { getJson } from '../http.js';
import { writeJson, writeText } from '../utils/fs.js';
import { downloadMany } from '../utils/download-image.js';
import { htmlToMarkdown, extractImageUrls } from '../utils/html-to-markdown.js';
import { safeSlug } from '../utils/slugify.js';
import { recordError, recordImageResults } from '../utils/manifest.js';

const ENDPOINT = '/wp-json/wp/v2/pages';

function buildMarkdown(page) {
  const title = page?.title?.rendered ?? '';
  const link = page?.link ?? '';
  const body = htmlToMarkdown(page?.content?.rendered ?? '');
  return [
    `# ${title.replace(/<[^>]+>/g, '')}`,
    '',
    `Source: ${link}`,
    '',
    body,
    '',
  ].join('\n');
}

export async function crawlPages(manifest) {
  console.log('▶ Crawling pages…');
  const outDir = path.join(DATA_DIR, 'pages');
  const all = [];
  const skipped = [];

  let page = 1;
  while (true) {
    let batch;
    try {
      batch = await getJson(ENDPOINT, { per_page: PER_PAGE, page });
    } catch (err) {
      recordError(manifest, 'pages_page', { page }, err);
      console.warn(`  ✗ pages page ${page}: ${err.message}`);
      break;
    }
    if (!Array.isArray(batch) || batch.length === 0) break;

    for (const p of batch) {
      const rawSlug = p.slug ?? '';
      const link = p.link ?? '';
      if (isPageBlocked(link)) {
        skipped.push(rawSlug || link);
        continue;
      }
      const slug = safeSlug(rawSlug || `page-${p.id}`, `page-${p.id}`);
      const dir = path.join(outDir, slug);
      console.log(`  [${all.length + 1}] page/${slug}`);

      try {
        await writeJson(path.join(dir, 'page.json'), p);
        await writeText(path.join(dir, 'page.md'), buildMarkdown(p));

        const urls = extractImageUrls(p?.content?.rendered ?? '');
        const results = await downloadMany(urls, path.join(dir, 'images'));
        recordImageResults(manifest, results);
        all.push(p);
      } catch (err) {
        recordError(manifest, 'page', { slug, id: p.id }, err);
        console.warn(`    ✗ ${slug}: ${err.message}`);
      }
    }

    if (batch.length < PER_PAGE) break;
    page += 1;
  }

  await writeJson(path.join(outDir, '_all.json'), all);
  manifest.counts.pages = all.length;
  console.log(`  ✓ Pages: ${all.length} (skipped demo/test: ${skipped.length})`);
}
