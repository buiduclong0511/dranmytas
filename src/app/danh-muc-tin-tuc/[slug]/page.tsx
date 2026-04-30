import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/common/Container';
import { PostGrid } from '@/components/post/PostGrid';
import { getPostsByCategory } from '@/lib/data/posts';
import {
  getPostCategories,
  getPostCategoryBySlug,
} from '@/lib/data/categories';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return getPostCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = getPostCategoryBySlug(slug);
  if (!cat) return { title: 'Không tìm thấy danh mục' };
  return buildMetadata({
    title: cat.name,
    description: cat.description || `Bài viết thuộc chuyên mục ${cat.name}.`,
    path: `/danh-muc-tin-tuc/${slug}`,
  });
}

export default async function PostCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getPostCategoryBySlug(slug);
  if (!cat) notFound();
  const posts = getPostsByCategory(slug);

  return (
    <Container className="py-12 md:py-16">
      <nav className="text-xs text-muted-foreground">
        <Link href="/tin-tuc" className="hover:text-primary">
          Tin tức
        </Link>{' '}
        / <span>{cat.name}</span>
      </nav>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">{cat.name}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        {posts.length} bài viết trong chuyên mục.
      </p>
      <div className="mt-10">
        <PostGrid posts={posts} />
      </div>
    </Container>
  );
}
