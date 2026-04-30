'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const TRANSLATE_MAP: Record<Direction, string> = {
  up: 'translate-y-6',
  down: '-translate-y-6',
  left: 'translate-x-6',
  right: '-translate-x-6',
  none: '',
};

export function Reveal({
  children,
  delay = 0,
  duration = 700,
  direction = 'up',
  threshold = 0.15,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  threshold?: number;
  className?: string;
  as?: 'div' | 'section' | 'span' | 'li';
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== 'undefined') {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) {
        setVisible(true);
        return;
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref as never}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
      className={cn(
        'transition-[opacity,transform] ease-[cubic-bezier(0.22,1,0.36,1)]',
        visible ? 'translate-x-0 translate-y-0 opacity-100' : `${TRANSLATE_MAP[direction]} opacity-0`,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
