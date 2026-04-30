'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function ProductGallery({
  images,
  name,
}: {
  images: { src: string; alt: string }[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  if (!images.length) return null;
  const main = images[active];

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-muted">
        <Image
          key={main.src}
          src={main.src}
          alt={main.alt || name}
          fill
          sizes="(min-width:1024px) 50vw, 100vw"
          className="object-contain"
          priority
        />
      </div>
      {images.length > 1 ? (
        <div className="grid grid-cols-5 gap-2">
          {images.slice(0, 10).map((img, i) => (
            <button
              key={img.src + i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                'relative aspect-square overflow-hidden rounded-md border bg-muted transition',
                i === active ? 'border-primary' : 'border-border hover:border-primary/50',
              )}
            >
              <Image
                src={img.src}
                alt={img.alt || name}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
