import { Container } from './Container';
import { RichHtml } from './RichHtml';
import { decodeEntities, stripHtml } from '@/lib/sanitize';
import { getPageBySlug } from '@/lib/data/pages';

export function StaticPageContent({
  slug,
  fallbackTitle,
  fallbackDescription,
}: {
  slug: string;
  fallbackTitle: string;
  fallbackDescription?: string;
}) {
  const page = getPageBySlug(slug);
  const title = page?.title?.rendered
    ? decodeEntities(stripHtml(page.title.rendered))
    : fallbackTitle;
  const html = page?.content?.rendered ?? '';

  return (
    <Container className="max-w-4xl py-12 md:py-16">
      <header className="space-y-3">
        <span className="text-xs uppercase tracking-[0.2em] text-primary">Dr.Anmytas</span>
        <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">{title}</h1>
        {fallbackDescription ? (
          <p className="max-w-2xl text-muted-foreground">{fallbackDescription}</p>
        ) : null}
      </header>
      {html ? (
        <div className="mt-10">
          <RichHtml html={html} />
        </div>
      ) : (
        <p className="mt-10 text-muted-foreground">Đang cập nhật nội dung…</p>
      )}
    </Container>
  );
}
