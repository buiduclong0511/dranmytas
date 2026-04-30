import Link from 'next/link';
import type { Metadata } from 'next';
import { Container } from '@/components/common/Container';
import { PostGrid } from '@/components/post/PostGrid';
import { getAllPosts } from '@/lib/data/posts';
import { getPostCategories } from '@/lib/data/categories';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Tin tức',
  description: 'Bí quyết làm đẹp, kiến thức chăm sóc da và tin tức từ Dr.Anmytas.',
  path: '/tin-tuc',
});

export default function PostsPage() {
  const posts = getAllPosts();
  const cats = getPostCategories();

  return (
    <Container className="py-12 md:py-16">
      <div className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.2em] text-primary">Cập nhật mới</span>
        <h1 className="font-display text-4xl font-bold md:text-5xl">Tin tức & Bí quyết làm đẹp</h1>
        <p className="max-w-2xl text-muted-foreground">
          {posts.length} bài viết về chăm sóc da, sản phẩm và sự kiện Dr.Anmytas.
        </p>
      </div>

      {cats.length ? (
        <div className="mt-8 flex flex-wrap gap-2">
          {cats.map((c) => (
            <Link
              key={c.id}
              href={`/danh-muc-tin-tuc/${c.slug}`}
              className="rounded-full border border-border bg-card px-4 py-1.5 text-sm hover:border-primary hover:bg-accent/40"
            >
              {c.name} ({c.count})
            </Link>
          ))}
        </div>
      ) : null}

      <div className="mt-10">
        <PostGrid posts={posts} />
      </div>
    </Container>
  );
}
