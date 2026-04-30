import path from 'node:path';
import { DATA_DIR, PER_PAGE } from '../config.js';
import { getJson } from '../http.js';
import { writeJson, writeText } from '../utils/fs.js';
import { downloadMany } from '../utils/download-image.js';
import { htmlToMarkdown, extractImageUrls } from '../utils/html-to-markdown.js';
import { safeSlug } from '../utils/slugify.js';
import { recordError, recordImageResults } from '../utils/manifest.js';

const ENDPOINT = '/wp-json/wp/v2/posts';

function featuredImageUrl(post) {
  const media = post?._embedded?.['wp:featuredmedia']?.[0];
  return media?.source_url ?? null;
}

function buildMarkdown(post) {
  const title = post?.title?.rendered ?? '';
  const date = post?.date ?? '';
  const link = post?.link ?? '';
  const body = htmlToMarkdown(post?.content?.rendered ?? '');
  return [
    `# ${title.replace(/<[^>]+>/g, '')}`,
    '',
    `_${date}_  `,
    `Source: ${link}`,
    '',
    body,
    '',
  ].join('\n');
}

export async function crawlPosts(manifest) {
  console.log('▶ Crawling posts…');
  const outDir = path.join(DATA_DIR, 'posts');
  const all = [];

  let page = 1;
  while (true) {
    let batch;
    try {
      batch = await getJson(ENDPOINT, { per_page: PER_PAGE, page, _embed: true });
    } catch (err) {
      recordError(manifest, 'posts_page', { page }, err);
      console.warn(`  ✗ posts page ${page}: ${err.message}`);
      break;
    }
    if (!Array.isArray(batch) || batch.length === 0) break;

    for (const post of batch) {
      const slug = safeSlug(post.slug, `post-${post.id}`);
      const dir = path.join(outDir, slug);
      const idx = all.length + 1;
      console.log(`  [${idx}] post/${slug}`);

      try {
        await writeJson(path.join(dir, 'post.json'), post);
        await writeText(path.join(dir, 'post.md'), buildMarkdown(post));

        const urls = new Set(extractImageUrls(post?.content?.rendered ?? ''));
        const featured = featuredImageUrl(post);
        if (featured) urls.add(featured);

        const results = await downloadMany([...urls], path.join(dir, 'images'));
        recordImageResults(manifest, results);
        all.push(post);
      } catch (err) {
        recordError(manifest, 'post', { slug, id: post.id }, err);
        console.warn(`    ✗ ${slug}: ${err.message}`);
      }
    }

    if (batch.length < PER_PAGE) break;
    page += 1;
  }

  await writeJson(path.join(outDir, '_all.json'), all);
  manifest.counts.posts = all.length;
  console.log(`  ✓ Posts: ${all.length}`);
}
