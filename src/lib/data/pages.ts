import 'server-only';
import { readJson, fileExists } from './_fs';
import type { Page } from '@/types';

export function getPageBySlug(slug: string): Page | null {
  const rel = `pages/${slug}/page.json`;
  if (!fileExists(rel)) return null;
  try {
    return readJson<Page>(rel);
  } catch {
    return null;
  }
}
