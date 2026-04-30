import fsp from 'node:fs/promises';
import path from 'node:path';
import { DATA_DIR } from '../config.js';

const MANIFEST_PATH = path.join(DATA_DIR, 'manifest.json');

export function newManifest() {
  return {
    started_at: new Date().toISOString(),
    finished_at: null,
    base_url: 'https://dranmytas.com',
    counts: {
      products: 0,
      posts: 0,
      pages: 0,
      product_categories: 0,
      post_categories: 0,
      images_downloaded: 0,
      images_skipped: 0,
      images_external_skipped: 0,
    },
    errors: [],
  };
}

export async function writeManifest(manifest) {
  await fsp.mkdir(DATA_DIR, { recursive: true });
  await fsp.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
}

export function recordImageResults(manifest, results) {
  for (const r of results) {
    if (r.error) {
      manifest.errors.push({ type: 'image', url: r.url, error: r.error });
    } else if (r.externalSkipped) {
      manifest.counts.images_external_skipped += 1;
    } else if (r.skipped) {
      manifest.counts.images_skipped += 1;
    } else {
      manifest.counts.images_downloaded += 1;
    }
  }
}

export function recordError(manifest, type, ref, error) {
  manifest.errors.push({
    type,
    ref,
    error: error?.message ?? String(error),
  });
}
