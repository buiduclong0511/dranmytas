import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ChevronRight, Phone, MessageCircle } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ContactToBuyDialog } from '@/components/product/ContactToBuyDialog';
import { ProductGrid } from '@/components/product/ProductGrid';
import { RichHtml } from '@/components/common/RichHtml';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  getProductBySlug,
  getProductSlugs,
  getRelatedProducts,
} from '@/lib/data/products';
import { getProductGalleryImages } from '@/lib/data/images';
import { decodeEntities, stripHtml } from '@/lib/sanitize';
import { buildMetadata } from '@/lib/seo';
import { HOTLINE, TEL_LINK, ZALO_LINK } from '@/lib/nav';

export function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return { title: 'Không tìm thấy sản phẩm' };
  return buildMetadata({
    title: decodeEntities(p.name),
    description: p.short_description || p.description,
    path: `/san-pham/${slug}`,
    image: p.images?.[0]?.src ?? null,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const images = getProductGalleryImages(product);
  const related = getRelatedProducts(product, 4);
  const cat = product.categories?.[0];
  const brand = product.brands?.[0];

  return (
    <Container className="py-10 md:py-14">
      <nav className="flex items-center gap-1 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Trang chủ
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/san-pham" className="hover:text-primary">
          Sản phẩm
        </Link>
        {cat ? (
          <>
            <ChevronRight className="h-3 w-3" />
            <Link
              href={`/danh-muc-san-pham/${cat.slug}`}
              className="hover:text-primary"
            >
              {cat.name}
            </Link>
          </>
        ) : null}
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <ProductGallery images={images} name={product.name} />

        <div className="space-y-5">
          <div className="space-y-2">
            {cat ? (
              <Badge variant="secondary" className="rounded-md">
                {cat.name}
              </Badge>
            ) : null}
            <h1 className="font-display text-3xl font-bold leading-tight md:text-4xl">
              {decodeEntities(product.name)}
            </h1>
            {brand ? (
              <p className="text-sm text-muted-foreground">
                Thương hiệu:{' '}
                <span className="font-medium text-foreground">{brand.name}</span>
              </p>
            ) : null}
          </div>

          {product.short_description ? (
            <RichHtml html={product.short_description} className="text-muted-foreground" />
          ) : null}

          <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
            <div className="text-xs uppercase tracking-wider text-primary">Giá</div>
            <div className="mt-1 font-display text-2xl font-semibold">Liên hệ để biết giá</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Chuyên viên Dr.Anmytas tư vấn trực tiếp qua hotline.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <ContactToBuyDialog
              productSlug={product.slug}
              productName={decodeEntities(product.name)}
            />
            <Button asChild variant="outline" size="lg">
              <a href={TEL_LINK}>
                <Phone className="h-4 w-4" />
                Gọi {HOTLINE}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={ZALO_LINK} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" />
                Chat Zalo
              </a>
            </Button>
          </div>

          {product.sku ? (
            <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
          ) : null}
        </div>
      </div>

      {product.description ? (
        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_280px]">
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold">Mô tả chi tiết</h2>
            <RichHtml html={product.description} />
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-border bg-muted/30 p-5 text-sm">
              <div className="font-display text-base font-semibold">Cần tư vấn?</div>
              <p className="mt-2 text-muted-foreground">
                Chuyên viên Dr.Anmytas sẵn sàng hỗ trợ bạn.
              </p>
              <div className="mt-4 space-y-2">
                <Button asChild className="w-full" size="sm">
                  <a href={TEL_LINK}>
                    <Phone className="h-4 w-4" /> {HOTLINE}
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full" size="sm">
                  <a href={ZALO_LINK} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4" /> Zalo
                  </a>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      ) : null}

      {related.length ? (
        <section className="mt-20">
          <h2 className="mb-6 font-display text-2xl font-bold">Sản phẩm cùng danh mục</h2>
          <ProductGrid products={related} />
        </section>
      ) : null}
    </Container>
  );
}
