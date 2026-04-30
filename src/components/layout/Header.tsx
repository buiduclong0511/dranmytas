import Link from 'next/link';
import { Phone } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/button';
import { MobileNav } from './MobileNav';
import { PRIMARY_NAV, HOTLINE, TEL_LINK } from '@/lib/nav';
import { getProductCategories } from '@/lib/data/categories';

export function Header() {
  const productCats = getProductCategories();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold tracking-tight md:text-2xl">
            Dr.<span className="text-primary">Anmytas</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {PRIMARY_NAV.map((item) => {
            if (item.label === 'Sản phẩm') {
              return (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className="inline-flex h-10 items-center gap-1 rounded-md px-3 text-sm font-medium hover:bg-accent/20"
                  >
                    {item.label}
                  </Link>
                  <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-1 opacity-0 transition group-hover:visible group-hover:opacity-100">
                    <div className="min-w-[260px] rounded-md border border-border bg-popover p-2 shadow-lg">
                      {productCats.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/danh-muc-san-pham/${cat.slug}`}
                          className="block rounded-sm px-3 py-2 text-sm hover:bg-accent/20"
                        >
                          {cat.name}{' '}
                          <span className="text-xs text-muted-foreground">({cat.count})</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex h-10 items-center rounded-md px-3 text-sm font-medium transition-colors hover:bg-accent/20"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="outline" className="hidden lg:inline-flex">
            <a href={TEL_LINK}>
              <Phone className="h-4 w-4" />
              {HOTLINE}
            </a>
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
