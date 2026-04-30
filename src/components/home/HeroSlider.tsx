'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface SlideItem {
  src: string;
  alt: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  align?: 'left' | 'center' | 'right';
}

const AUTOPLAY_MS = 5500;
const TEXT_SHADOW =
  '0 2px 12px rgba(0,0,0,0.65), 0 1px 3px rgba(0,0,0,0.4)';

export function HeroSlider({ slides }: { slides: SlideItem[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(() => setActive((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setActive((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    if (paused || total <= 1) return;
    intervalRef.current = setInterval(next, AUTOPLAY_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next, paused, total]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
  }

  if (!total) return null;

  return (
    <section
      aria-label="Hero slider"
      className="relative overflow-hidden bg-primary"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden sm:aspect-[16/9] md:aspect-[16/7] lg:aspect-[21/9]">
        {/* Track that translates horizontally */}
        <div
          className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
          style={{ transform: `translate3d(-${active * 100}%, 0, 0)` }}
        >
          {slides.map((slide) => {
            const align = slide.align ?? 'left';
            return (
              <div
                key={slide.src}
                className="relative h-full w-full shrink-0"
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={slide === slides[0]}
                  sizes="100vw"
                  className="object-cover"
                />

                {/* Strong gradient: dark from left → fade right; plus bottom vignette */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/30" />

                <div
                  className={cn(
                    'container-page absolute inset-0 flex flex-col justify-center',
                    align === 'center' && 'items-center text-center',
                    align === 'right' && 'items-end text-right',
                  )}
                >
                  <div className="max-w-2xl space-y-5 md:space-y-6">
                    {slide.eyebrow ? (
                      <span
                        className="inline-flex items-center gap-2 border-y border-accent/70 px-1 py-1 font-display text-[11px] font-semibold uppercase tracking-[0.4em] text-accent"
                        style={{ textShadow: TEXT_SHADOW }}
                      >
                        <span className="h-1 w-1 rounded-full bg-accent" />
                        {slide.eyebrow}
                      </span>
                    ) : null}
                    <h1
                      className="font-display text-3xl font-semibold leading-[1.05] text-cream sm:text-5xl md:text-6xl lg:text-7xl"
                      style={{ textShadow: TEXT_SHADOW }}
                    >
                      {slide.title}
                    </h1>
                    {slide.subtitle ? (
                      <p
                        className="max-w-xl text-sm leading-relaxed text-white/95 sm:text-base md:text-lg"
                        style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}
                      >
                        {slide.subtitle}
                      </p>
                    ) : null}
                    {(slide.primaryCta || slide.secondaryCta) && (
                      <div className="flex flex-wrap gap-3 pt-2">
                        {slide.primaryCta ? (
                          <Button
                            asChild
                            size="lg"
                            className="bg-accent text-primary shadow-lg hover:bg-accent/90"
                          >
                            <Link href={slide.primaryCta.href}>
                              {slide.primaryCta.label}
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        ) : null}
                        {slide.secondaryCta ? (
                          <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-cream/60 bg-white/10 text-cream backdrop-blur hover:bg-white/20 hover:text-cream"
                          >
                            <Link href={slide.secondaryCta.href}>
                              {slide.secondaryCta.label}
                            </Link>
                          </Button>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prev/Next arrows */}
      {total > 1 ? (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Slide trước"
            className="group absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-cream/40 bg-black/30 p-2.5 text-cream backdrop-blur transition hover:border-cream hover:bg-black/50 md:flex md:left-6"
          >
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Slide sau"
            className="group absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-cream/40 bg-black/30 p-2.5 text-cream backdrop-blur transition hover:border-cream hover:bg-black/50 md:flex md:right-6"
          >
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </>
      ) : null}

      {/* Dot indicators */}
      {total > 1 ? (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 md:bottom-8">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Đi tới slide ${i + 1}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className={cn(
                'h-1 rounded-full transition-all',
                i === active
                  ? 'w-10 bg-accent'
                  : 'w-5 bg-cream/50 hover:bg-cream/80',
              )}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
