import type { Post } from '@/types';
import { PostCard } from './PostCard';

export function PostGrid({ posts }: { posts: Post[] }) {
  if (!posts.length) {
    return <p className="py-10 text-center text-muted-foreground">Chưa có bài viết nào.</p>;
  }
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}
