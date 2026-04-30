import { sanitizeHtml } from '@/lib/sanitize';
import { cn } from '@/lib/utils';

export function RichHtml({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  const safe = sanitizeHtml(html ?? '');
  return (
    <div
      className={cn('prose-vn max-w-none', className)}
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}
