import Link from 'next/link';
import { Mail, MapPin, Phone, Clock, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { HOTLINE, TEL_LINK, ZALO_LINK, PRIMARY_NAV } from '@/lib/nav';

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent" />

      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="font-display text-3xl font-bold tracking-[0.05em] text-cream">
            Dr.Anmytas
          </div>
          <p className="mt-1 text-xs uppercase tracking-[0.4em] text-accent">
            Beauty · Science
          </p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-primary-foreground/80">
            Hệ thống tiên phong tại Việt Nam nghiên cứu và phát triển công thức dành riêng cho làn
            da Việt — từ chống nắng, dưỡng phục hồi đến trị liệu chuyên sâu cùng đội ngũ chuyên gia
            da liễu hàng đầu.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-accent" />
              <a href={TEL_LINK} className="hover:text-accent">
                Hotline: {HOTLINE}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-accent" />
              <a href="mailto:info@dranmytas.com" className="hover:text-accent">
                info@dranmytas.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 text-accent" />
              <span>Thứ Hai – Chủ Nhật, 9:00 – 18:00</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-accent" />
              <span>Mã số doanh nghiệp: 0109426251</span>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Liên kết
          </div>
          <ul className="mt-5 space-y-2.5 text-sm">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-primary-foreground/80 transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="font-display text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Kết nối
          </div>
          <p className="mt-5 max-w-xs text-sm text-primary-foreground/80">
            Theo dõi Dr.Anmytas để cập nhật bí quyết chăm sóc da và sự kiện chuyên môn.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              { href: 'https://www.facebook.com/dranmytas', icon: Facebook, label: 'Facebook' },
              { href: 'https://www.instagram.com/dranmytas', icon: Instagram, label: 'Instagram' },
              { href: 'https://www.youtube.com/@dranmytas', icon: Youtube, label: 'YouTube' },
              { href: ZALO_LINK, icon: MessageCircle, label: 'Zalo' },
              { href: 'mailto:info@dranmytas.com', icon: Mail, label: 'Email' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 text-cream transition-colors hover:border-accent hover:bg-accent hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-accent/30 bg-primary-foreground/5 p-4">
            <div className="text-xs uppercase tracking-[0.2em] text-accent">Đặt mua nhanh</div>
            <a
              href={TEL_LINK}
              className="mt-1 block font-display text-xl font-bold text-cream hover:text-accent"
            >
              {HOTLINE}
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-primary-foreground/10 py-5">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-primary-foreground/70 md:flex-row">
          <span>© {new Date().getFullYear()} Dr.Anmytas. All rights reserved.</span>
          <span className="tracking-wider">Made with care for Vietnamese skin.</span>
        </Container>
      </div>
    </footer>
  );
}
