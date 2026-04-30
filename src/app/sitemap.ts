import type { MetadataRoute } from 'next';
import { getProductSlugs } from '@/lib/data/products';
import { getPostSlugs } from '@/lib/data/posts';
import {
  getProductCategories,
  getPostCategories,
} from '@/lib/data/categories';

const BASE = 'https://dranmytas.example';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    '',
    '/san-pham',
    '/tin-tuc',
    '/gioi-thieu',
    '/lien-he',
    '/dao-tao',
    '/goi-vip',
    '/canh-bao-mua-hang',
  ];

  const products = getProductSlugs().map((slug) => ({
    url: `${BASE}/san-pham/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const posts = getPostSlugs().map((slug) => ({
    url: `${BASE}/tin-tuc/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const productCats = getProductCategories().map((c) => ({
    url: `${BASE}/danh-muc-san-pham/${c.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const postCats = getPostCategories().map((c) => ({
    url: `${BASE}/danh-muc-tin-tuc/${c.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [
    ...staticPaths.map((p) => ({
      url: `${BASE}${p}`,
      changeFrequency: 'weekly' as const,
      priority: p === '' ? 1.0 : 0.9,
    })),
    ...products,
    ...posts,
    ...productCats,
    ...postCats,
  ];
}
