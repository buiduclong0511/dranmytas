import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, GraduationCap, Phone } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/common/Reveal';
import { CountUp } from '@/components/common/CountUp';
import { HeroSlider, type SlideItem } from '@/components/home/HeroSlider';
import { ProductCard } from '@/components/product/ProductCard';
import { PostCard } from '@/components/post/PostCard';
import { getFeaturedProducts } from '@/lib/data/products';
import { getLatestPosts } from '@/lib/data/posts';
import { getProductCategories } from '@/lib/data/categories';
import { HOTLINE, TEL_LINK } from '@/lib/nav';

const HERO_SLIDES: SlideItem[] = [
  {
    src: '/images/slides/slide-4.jpg',
    alt: 'Dr.Anmytas — Vẻ đẹp khoa học cho làn da Việt',
    eyebrow: 'Nghiên cứu làn da Việt',
    title: 'Vẻ đẹp khoa học cho làn da khỏe mạnh',
    subtitle:
      'Hệ thống tiên phong nghiên cứu công thức dành riêng cho cấu trúc da người Việt — từ chống nắng, dưỡng phục hồi đến trị liệu chuyên sâu.',
    primaryCta: { label: 'Khám phá sản phẩm', href: '/san-pham' },
    secondaryCta: { label: 'Liên hệ tư vấn', href: '/lien-he' },
    align: 'left',
  },
  {
    src: '/images/slides/slide-1.jpg',
    alt: 'Bộ sưu tập Dr.Anmytas',
    eyebrow: 'Bộ sưu tập 2025',
    title: 'Công thức từ hoạt chất quốc tế',
    subtitle: 'SWT-7™, Vitamin B5, Hyaluronic Acid 2%, Retinol bền cấu trúc.',
    primaryCta: { label: 'Xem sản phẩm', href: '/san-pham' },
    align: 'left',
  },
  {
    src: '/images/slides/slide-3.jpg',
    alt: 'Đào tạo chuyên sâu Dr.Anmytas',
    eyebrow: 'Đào tạo chuyên sâu',
    title: 'Hợp tác cùng Lucas Meyer Cosmetics',
    subtitle: 'Chương trình đào tạo theo chuẩn quốc tế dành cho chuyên viên skincare Việt.',
    primaryCta: { label: 'Tìm hiểu chương trình', href: '/dao-tao' },
    align: 'left',
  },
  {
    src: '/images/slides/slide-2.jpg',
    alt: 'Gói VIP Dr.Anmytas',
    eyebrow: 'Đặc quyền',
    title: 'Gói VIP — chăm sóc da chuyên biệt',
    subtitle: 'Quyền lợi cao cấp dành cho khách hàng thân thiết của Dr.Anmytas.',
    primaryCta: { label: 'Xem quyền lợi', href: '/goi-vip' },
    align: 'left',
  },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'An toàn lâm sàng',
    desc: 'Công thức nghiên cứu cùng chuyên gia da liễu hàng đầu Việt Nam.',
  },
  {
    icon: Sparkles,
    title: 'Hoạt chất quốc tế',
    desc: 'SWT-7™, Vitamin B5, Hyaluronic Acid 2%, Retinol bền cấu trúc.',
  },
  {
    icon: GraduationCap,
    title: 'Đào tạo chuyên sâu',
    desc: 'Chương trình hợp tác cùng Lucas Meyer Cosmetics by Clariant.',
  },
];

const STATS = [
  { value: 10, suffix: '+', label: 'Năm nghiên cứu' },
  { value: 34, suffix: '+', label: 'Sản phẩm' },
  { value: 1000, suffix: '+', label: 'Khách hàng' },
];

export default function HomePage() {
  const featured = getFeaturedProducts(8);
  const latest = getLatestPosts(6);
  const cats = getProductCategories().slice(0, 6);

  return (
    <>
      <HeroSlider slides={HERO_SLIDES} />

      {/* Hero text + values */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/40 via-background to-background">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_at_top,_var(--cream)_0%,_transparent_60%)] opacity-60"
        />
        <Container className="grid gap-14 py-16 md:grid-cols-12 md:gap-10 md:py-24 lg:py-28">
          <div className="flex flex-col justify-center gap-7 md:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex w-fit items-center gap-2 border-y border-accent/40 px-1 py-1 font-display text-[11px] font-semibold uppercase tracking-[0.4em] text-accent">
                <span className="h-1 w-1 rounded-full bg-accent animate-pulse-soft" />
                Nghiên cứu làn da Việt
              </span>
            </Reveal>
            <Reveal direction="up" delay={120}>
              <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
                Vẻ đẹp khoa học cho{' '}
                <span className="italic text-primary">làn da</span> khoẻ mạnh
              </h1>
            </Reveal>
            <Reveal direction="up" delay={220}>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Dr.Anmytas — hệ thống tiên phong nghiên cứu công thức dành cho cấu trúc da người Việt.
                Mỹ phẩm da liễu chuyên sâu, dịch vụ chăm sóc và đào tạo cùng các chuyên gia hàng đầu.
              </p>
            </Reveal>
            <Reveal direction="up" delay={300}>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild size="lg">
                  <Link href="/san-pham">
                    Khám phá sản phẩm <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={TEL_LINK}>
                    <Phone className="h-4 w-4" />
                    {HOTLINE}
                  </a>
                </Button>
              </div>
            </Reveal>

            {/* Trust strip */}
            <Reveal direction="up" delay={400}>
              <div className="mt-6 grid grid-cols-3 gap-6 border-t border-border pt-6 md:max-w-lg">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-2xl font-bold text-primary md:text-3xl">
                      <CountUp to={s.value} suffix={s.suffix} />
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="relative hidden md:col-span-5 md:block">
            <div className="absolute -right-10 -top-10 h-72 w-72 animate-pulse-soft rounded-full bg-accent/20 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-72 w-72 animate-pulse-soft rounded-full bg-primary/10 blur-3xl" />
            <div className="relative grid grid-cols-1 gap-4">
              {VALUES.map(({ icon: Icon, title, desc }, i) => (
                <Reveal key={title} direction="left" delay={150 * i + 200}>
                  <div className="group flex items-start gap-4 rounded-2xl border border-border bg-card/80 p-6 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-xl">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-primary transition-colors duration-500 group-hover:bg-accent group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div>
                      <div className="font-display text-lg font-semibold">{title}</div>
                      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section className="py-14 md:py-20">
        <Container>
          <Reveal direction="up">
            <div className="flex flex-col items-center text-center">
              <span className="font-display text-[11px] font-semibold uppercase tracking-[0.4em] text-accent">
                Danh mục
              </span>
              <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
                Chăm sóc theo nhu cầu da
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Lựa chọn nhóm sản phẩm phù hợp với tình trạng và mục tiêu chăm sóc da của bạn.
              </p>
            </div>
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {cats.map((c, i) => (
              <Reveal key={c.id} direction="up" delay={i * 80}>
                <Link
                  href={`/danh-muc-san-pham/${c.slug}`}
                  className="group block rounded-2xl border border-border bg-card p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-lg"
                >
                  <div className="font-display text-base font-semibold transition-colors group-hover:text-primary">
                    {c.name}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                    {c.count} sản phẩm
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured products */}
      <section className="border-y border-border bg-secondary/30 py-16 md:py-24">
        <Container>
          <Reveal direction="up">
            <div className="flex flex-col items-end justify-between gap-6 md:flex-row md:items-end">
              <div>
                <span className="font-display text-[11px] font-semibold uppercase tracking-[0.4em] text-accent">
                  Sản phẩm nổi bật
                </span>
                <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
                  Bộ sưu tập Dr.Anmytas
                </h2>
              </div>
              <Link
                href="/san-pham"
                className="group inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.15em] text-primary hover:text-accent"
              >
                Xem tất cả
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {featured.map((p, i) => (
              <Reveal key={p.id} direction="up" delay={(i % 4) * 100}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA banner */}
      <section className="relative overflow-hidden bg-primary py-14 text-primary-foreground md:py-20">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.18),_transparent_60%)]"
        />
        <Container className="relative flex flex-col items-center text-center">
          <Reveal direction="up">
            <span className="font-display text-[11px] font-semibold uppercase tracking-[0.4em] text-accent">
              Tư vấn miễn phí
            </span>
          </Reveal>
          <Reveal direction="up" delay={120}>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight md:text-5xl">
              Bạn cần lộ trình chăm sóc da phù hợp riêng?
            </h2>
          </Reveal>
          <Reveal direction="up" delay={220}>
            <p className="mt-4 max-w-xl text-primary-foreground/80">
              Chuyên viên Dr.Anmytas tư vấn 1:1 dựa trên tình trạng da và mục tiêu của bạn.
            </p>
          </Reveal>
          <Reveal direction="up" delay={320}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-accent text-primary hover:bg-accent/90"
              >
                <a href={TEL_LINK}>
                  <Phone className="h-4 w-4" />
                  Gọi {HOTLINE}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-cream/30 bg-transparent text-cream hover:bg-cream/10 hover:text-cream"
              >
                <Link href="/lien-he">Đặt lịch tư vấn</Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Latest posts */}
      <section className="py-14 md:py-24">
        <Container>
          <Reveal direction="up">
            <div className="flex flex-col items-end justify-between gap-6 md:flex-row md:items-end">
              <div>
                <span className="font-display text-[11px] font-semibold uppercase tracking-[0.4em] text-accent">
                  Cập nhật mới
                </span>
                <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
                  Bí quyết & tin tức làm đẹp
                </h2>
              </div>
              <Link
                href="/tin-tuc"
                className="group inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.15em] text-primary hover:text-accent"
              >
                Xem thêm
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((p, i) => (
              <Reveal key={p.id} direction="up" delay={(i % 3) * 120}>
                <PostCard post={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
