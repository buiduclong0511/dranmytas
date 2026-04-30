import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { RichHtml } from '@/components/common/RichHtml';
import { PostGrid } from '@/components/post/PostGrid';
import {
  getPostBySlug,
  getPostSlugs,
  getRelatedPosts,
} from '@/lib/data/posts';
import { getPostFeaturedImage } from '@/lib/data/images';
import { decodeEntities, stripHtml } from '@/lib/sanitize';
import { formatDate } from '@/lib/format';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPostBySlug(slug);
  if (!p) return { title: 'Không tìm thấy bài viết' };
  return buildMetadata({
    title: decodeEntities(stripHtml(p.title.rendered)),
    description: p.excerpt?.rendered,
    path: `/tin-tuc/${slug}`,
    image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null,
  });
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const img = getPostFeaturedImage(post);
  const cat = post._embedded?.['wp:term']?.[0]?.[0];
  const related = getRelatedPosts(post, 3);
  const cleanTitle = decodeEntities(stripHtml(post.title.rendered));

  return (
    <article>
      <Container className="max-w-3xl py-10 md:py-14">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Trang chủ
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/tin-tuc" className="hover:text-primary">
            Tin tức
          </Link>
          {cat ? (
            <>
              <ChevronRight className="h-3 w-3" />
              <Link
                href={`/danh-muc-tin-tuc/${cat.slug}`}
                className="hover:text-primary"
              >
                {decodeEntities(cat.name)}
              </Link>
            </>
          ) : null}
        </nav>

        <header className="mt-6 space-y-3">
          {cat ? (
            <span className="text-xs uppercase tracking-[0.2em] text-primary">
              {decodeEntities(cat.name)}
            </span>
          ) : null}
          <h1 className="font-display text-3xl font-bold leading-tight md:text-5xl">
            {cleanTitle}
          </h1>
          <p className="text-sm text-muted-foreground">{formatDate(post.date)}</p>
        </header>

        {img ? (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl border border-border bg-muted">
            <Image
              src={img}
              alt={cleanTitle}
              fill
              sizes="(min-width:1024px) 768px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        ) : null}

        <div className="mt-10">
          <RichHtml html={post.content.rendered} />
        </div>
      </Container>

      {related.length ? (
        <section className="border-t border-border bg-muted/30 py-14">
          <Container>
            <h2 className="mb-6 font-display text-2xl font-bold">Bài viết liên quan</h2>
            <PostGrid posts={related} />
          </Container>
        </section>
      ) : null}
    </article>
  );
}
