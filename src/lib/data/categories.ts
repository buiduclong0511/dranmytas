import 'server-only';
import { readJson } from './_fs';
import type { ProductCategory, PostCategory } from '@/types';

let productCatsCache: ProductCategory[] | null = null;
let postCatsCache: PostCategory[] | null = null;

export function getProductCategories(): ProductCategory[] {
  if (productCatsCache) return productCatsCache;
  const all = readJson<ProductCategory[]>('categories/product-categories.json', []);
  productCatsCache = all.filter((c) => c.count > 0);
  return productCatsCache;
}

export function getProductCategoryBySlug(slug: string): ProductCategory | null {
  return getProductCategories().find((c) => c.slug === slug) ?? null;
}

export function getPostCategories(): PostCategory[] {
  if (postCatsCache) return postCatsCache;
  const all = readJson<PostCategory[]>('categories/post-categories.json', []);
  postCatsCache = all.filter((c) => c.count > 0);
  return postCatsCache;
}

export function getPostCategoryBySlug(slug: string): PostCategory | null {
  return getPostCategories().find((c) => c.slug === slug) ?? null;
}
