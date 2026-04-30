import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '@/types';
import { getPostFeaturedImage } from '@/lib/data/images';
import { formatDate, truncate } from '@/lib/format';
import { decodeEntities, stripHtml } from '@/lib/sanitize';

export function PostCard({ post }: { post: Post }) {
  const img = getPostFeaturedImage(post);
  const cat = post._embedded?.['wp:term']?.[0]?.[0];
  const excerpt = truncate(
    decodeEntities(stripHtml(post.excerpt?.rendered ?? '')),
    140,
  );
  const title = decodeEntities(stripHtml(post.title.rendered));

  return (
    <Link href={`/tin-tuc/${post.slug}`} className="group block">
      <article>
        {img ? (
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-muted">
            <Image
              src={img}
              alt={title}
              fill
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        ) : null}
        <div className="space-y-3 pt-5">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {cat ? (
              <span className="font-display font-semibold text-accent">{decodeEntities(cat.name)}</span>
            ) : null}
            <span aria-hidden>•</span>
            <span>{formatDate(post.date)}</span>
          </div>
          <h3 className="line-clamp-2 font-display text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {title}
          </h3>
          {excerpt ? (
            <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{excerpt}</p>
          ) : null}
          <div className="pt-1 font-display text-xs font-semibold uppercase tracking-[0.15em] text-primary transition-colors group-hover:text-accent">
            Đọc tiếp →
          </div>
        </div>
      </article>
    </Link>
  );
}
