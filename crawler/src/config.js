import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PROJECT_ROOT = path.resolve(__dirname, '..');
export const DATA_DIR = path.join(PROJECT_ROOT, 'data');

export const BASE_URL = 'https://dranmytas.com';
export const USER_AGENT =
  'Mozilla/5.0 (compatible; dranmytas-crawler/1.0; +personal-archive)';

export const REQUEST_TIMEOUT_MS = 30_000;
export const MIN_REQUEST_DELAY_MS = 500;
export const REQUEST_CONCURRENCY = 2;
export const MAX_RETRIES = 3;
export const PER_PAGE = 100;

export const PAGE_LINK_BLOCKLIST = [
  /\/elements\//,
  /\/demos\//,
  /\/test(-\d+)?\/?$/,
  /\/shop-2\/?$/,
  /\/wishlist\/?$/,
  /\/my-account\/?$/,
  /\/checkout\/?$/,
  /\/cart\/?$/,
  /\/track-order\/?$/,
  /\/ads\/?$/,
  /\/khai-truong-cua-hang\/?$/,
];

export function isPageBlocked(link) {
  if (!link) return false;
  return PAGE_LINK_BLOCKLIST.some((re) => re.test(link));
}

export const SKIP_IMAGE_HOST_PATTERNS = [
  /(^|\.)fbcdn\.net$/i,
  /(^|\.)cdninstagram\.com$/i,
  /(^|\.)facebook\.com$/i,
  /(^|\.)instagram\.com$/i,
];

export function shouldSkipImage(url) {
  try {
    const u = new URL(url);
    return SKIP_IMAGE_HOST_PATTERNS.some((re) => re.test(u.hostname));
  } catch {
    return false;
  }
}
