import fs from 'node:fs';
import path from 'node:path';

const PUBLIC_IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

const FALLBACK = '/images/placeholder.svg';

export type ImageKind = 'products' | 'posts' | 'pages';

function basenameFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const base = path.basename(u.pathname);
    return base && /\.[a-z0-9]+$/i.test(base) ? base : null;
  } catch {
    return null;
  }
}

export function localizeImageUrl(
  remoteUrl: string | null | undefined,
  kind: ImageKind,
  slug: string,
): string {
  if (!remoteUrl) return FALLBACK;
  const filename = basenameFromUrl(remoteUrl);
  if (!filename) return remoteUrl;
  const localPath = path.join(PUBLIC_IMAGES_DIR, kind, slug, filename);
  if (fs.existsSync(localPath)) {
    return `/images/${kind}/${slug}/${filename}`;
  }
  return remoteUrl;
}

export function getProductMainImage(product: {
  slug: string;
  images: Array<{ src: string }>;
}): string {
  const first = product.images?.[0]?.src;
  return localizeImageUrl(first, 'products', product.slug);
}

export function getProductGalleryImages(product: {
  slug: string;
  images: Array<{ src: string; alt: string; name: string }>;
}): { src: string; alt: string }[] {
  return (product.images ?? []).map((img) => ({
    src: localizeImageUrl(img.src, 'products', product.slug),
    alt: img.alt || img.name || product.slug,
  }));
}

export function getPostFeaturedImage(post: {
  slug: string;
  _embedded?: { 'wp:featuredmedia'?: Array<{ source_url: string }> };
}): string | null {
  const url = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  if (!url) return null;
  return localizeImageUrl(url, 'posts', post.slug);
}
