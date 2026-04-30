import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { getStream } from '../http.js';
import { shouldSkipImage } from '../config.js';

function filenameFromUrl(url, fallbackIndex) {
  try {
    const u = new URL(url);
    const base = path.basename(u.pathname);
    if (base && /\.[a-z0-9]+$/i.test(base)) return base;
  } catch {
    /* ignore */
  }
  return `${String(fallbackIndex).padStart(3, '0')}.jpg`;
}

export async function downloadImage(url, dir, index = 0) {
  if (shouldSkipImage(url)) {
    return { url, skipped: true, externalSkipped: true };
  }
  await fsp.mkdir(dir, { recursive: true });
  const name = filenameFromUrl(url, index);
  const dest = path.join(dir, name);

  try {
    const stat = await fsp.stat(dest);
    if (stat.size > 0) return { url, path: dest, skipped: true };
  } catch {
    /* not exists */
  }

  const res = await getStream(url);
  await pipeline(res.data, fs.createWriteStream(dest));
  return { url, path: dest, skipped: false };
}

export async function downloadMany(urls, dir) {
  const results = [];
  let i = 0;
  for (const url of urls) {
    try {
      const r = await downloadImage(url, dir, i);
      results.push(r);
    } catch (err) {
      results.push({ url, error: err.message });
    }
    i += 1;
  }
  return results;
}
