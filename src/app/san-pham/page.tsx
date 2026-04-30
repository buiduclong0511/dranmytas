import Link from 'next/link';
import type { Metadata } from 'next';
import { Container } from '@/components/common/Container';
import { ProductGrid } from '@/components/product/ProductGrid';
import { getAllProducts } from '@/lib/data/products';
import { getProductCategories } from '@/lib/data/categories';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Sản phẩm',
  description: 'Toàn bộ sản phẩm chăm sóc da của Dr.Anmytas — chống nắng, retinol, dưỡng phục hồi.',
  path: '/san-pham',
});

export default function ProductsPage() {
  const products = getAllProducts();
  const cats = getProductCategories();

  return (
    <Container className="py-12 md:py-16">
      <div className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.2em] text-primary">Bộ sưu tập</span>
        <h1 className="font-display text-4xl font-bold md:text-5xl">Sản phẩm Dr.Anmytas</h1>
        <p className="max-w-2xl text-muted-foreground">
          {products.length} sản phẩm chăm sóc da chuyên sâu — phân loại theo nhu cầu da của bạn.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-2">
          <div className="font-display text-sm font-semibold uppercase tracking-wider">
            Danh mục
          </div>
          <Link
            href="/san-pham"
            className="block rounded-md bg-accent px-3 py-2 text-sm font-medium"
          >
            Tất cả ({products.length})
          </Link>
          {cats.map((c) => (
            <Link
              key={c.id}
              href={`/danh-muc-san-pham/${c.slug}`}
              className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
            >
              {c.name}{' '}
              <span className="text-xs text-muted-foreground">({c.count})</span>
            </Link>
          ))}
        </aside>
        <div>
          <ProductGrid products={products} />
        </div>
      </div>
    </Container>
  );
}
