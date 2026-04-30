import 'server-only';
import { readJson } from './_fs';
import type { Post } from '@/types';

let cache: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (cache) return cache;
  const all = readJson<Post[]>('posts/_all.json', []);
  cache = all
    .filter((p) => p && p.id && p.slug)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return cache;
}

export function getPostBySlug(slug: string): Post | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return getAllPosts().filter((p) =>
    (p._embedded?.['wp:term']?.[0] ?? []).some(
      (t) => t.taxonomy === 'category' && t.slug === categorySlug,
    ),
  );
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getLatestPosts(limit = 6): Post[] {
  return getAllPosts().slice(0, limit);
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const catIds = new Set(post.categories ?? []);
  return getAllPosts()
    .filter((p) => p.id !== post.id && (p.categories ?? []).some((id) => catIds.has(id)))
    .slice(0, limit);
}
