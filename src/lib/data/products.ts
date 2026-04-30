import 'server-only';
import { readJson } from './_fs';
import type { Product } from '@/types';

let cache: Product[] | null = null;

export function getAllProducts(): Product[] {
  if (cache) return cache;
  const all = readJson<Product[]>('products/_all.json', []);
  cache = all.filter((p) => p && p.id && p.slug);
  return cache;
}

export function getProductBySlug(slug: string): Product | null {
  return getAllProducts().find((p) => p.slug === slug) ?? null;
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return getAllProducts().filter((p) =>
    (p.categories ?? []).some((c) => c.slug === categorySlug),
  );
}

export function getProductSlugs(): string[] {
  return getAllProducts().map((p) => p.slug);
}

export function getFeaturedProducts(limit = 8): Product[] {
  const all = getAllProducts();
  const dranAnmytas = all.filter((p) =>
    (p.categories ?? []).some((c) => c.slug === 'san-pham-dr-anmytas'),
  );
  const pool = dranAnmytas.length >= limit ? dranAnmytas : all;
  return pool.slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const catSlugs = new Set((product.categories ?? []).map((c) => c.slug));
  return getAllProducts()
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.categories ?? []).some((c) => catSlugs.has(c.slug)),
    )
    .slice(0, limit);
}
