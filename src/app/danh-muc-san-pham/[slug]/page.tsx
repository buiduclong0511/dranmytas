import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/common/Container';
import { ProductGrid } from '@/components/product/ProductGrid';
import { getProductsByCategory } from '@/lib/data/products';
import {
  getProductCategories,
  getProductCategoryBySlug,
} from '@/lib/data/categories';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return getProductCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = getProductCategoryBySlug(slug);
  if (!cat) return { title: 'Không tìm thấy danh mục' };
  return buildMetadata({
    title: cat.name,
    description: cat.description || `Sản phẩm thuộc danh mục ${cat.name} của Dr.Anmytas.`,
    path: `/danh-muc-san-pham/${slug}`,
  });
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getProductCategoryBySlug(slug);
  if (!cat) notFound();
  const products = getProductsByCategory(slug);

  return (
    <Container className="py-12 md:py-16">
      <nav className="text-xs text-muted-foreground">
        <Link href="/san-pham" className="hover:text-primary">
          Sản phẩm
        </Link>{' '}
        / <span>{cat.name}</span>
      </nav>
      <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">{cat.name}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        {cat.description || `${products.length} sản phẩm thuộc danh mục ${cat.name}.`}
      </p>
      <div className="mt-10">
        <ProductGrid products={products} />
      </div>
    </Container>
  );
}
