import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';
import { getProductMainImage } from '@/lib/data/images';
import { decodeEntities, stripHtml } from '@/lib/sanitize';
import { truncate } from '@/lib/format';

export function ProductCard({ product }: { product: Product }) {
  const img = getProductMainImage(product);
  const description = truncate(decodeEntities(stripHtml(product.short_description ?? '')), 90);
  const cat = product.categories?.[0]?.name;

  return (
    <Link href={`/san-pham/${product.slug}`} className="group block">
      <article className="overflow-hidden">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
          <Image
            src={img}
            alt={product.name}
            fill
            sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
            className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 ring-0 ring-accent transition-all duration-300 group-hover:ring-1" />
        </div>
        <div className="space-y-2 pt-4">
          {cat ? (
            <div className="font-display text-[10px] uppercase tracking-[0.3em] text-accent">
              {cat}
            </div>
          ) : null}
          <h3 className="font-display text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary md:text-lg">
            {decodeEntities(product.name)}
          </h3>
          {description ? (
            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
          ) : null}
          <div className="pt-1 font-display text-xs font-semibold uppercase tracking-[0.15em] text-primary transition-colors group-hover:text-accent">
            Liên hệ →
          </div>
        </div>
      </article>
    </Link>
  );
}
