import type { Metadata } from 'next';
import { Phone, Mail, Clock, MapPin, MessageCircle } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { ContactForm } from '@/components/contact/ContactForm';
import { Button } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo';
import { HOTLINE, TEL_LINK, ZALO_LINK } from '@/lib/nav';

export const metadata: Metadata = buildMetadata({
  title: 'Liên hệ',
  description: 'Liên hệ Dr.Anmytas để được tư vấn sản phẩm và dịch vụ chăm sóc da.',
  path: '/lien-he',
});

export default function ContactPage() {
  return (
    <Container className="py-12 md:py-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-primary">Liên hệ</span>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">
            Chúng tôi sẵn sàng lắng nghe bạn
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Gửi yêu cầu tư vấn về sản phẩm, dịch vụ chăm sóc da hoặc chương trình đào tạo. Chuyên viên
            Dr.Anmytas sẽ phản hồi trong giờ làm việc.
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-lg font-semibold">Thông tin liên hệ</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-primary" />
                <div>
                  <div className="font-medium">Hotline</div>
                  <a href={TEL_LINK} className="text-muted-foreground hover:text-primary">
                    {HOTLINE}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-primary" />
                <div>
                  <div className="font-medium">Email</div>
                  <a
                    href="mailto:info@dranmytas.com"
                    className="text-muted-foreground hover:text-primary"
                  >
                    info@dranmytas.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 text-primary" />
                <div>
                  <div className="font-medium">Giờ làm việc</div>
                  <div className="text-muted-foreground">Thứ Hai – Chủ Nhật, 9:00 – 18:00</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <div>
                  <div className="font-medium">Mã số doanh nghiệp</div>
                  <div className="text-muted-foreground">0109426251</div>
                </div>
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button asChild size="sm" variant="outline">
                <a href={TEL_LINK}>
                  <Phone className="h-4 w-4" />
                  Gọi ngay
                </a>
              </Button>
              <Button asChild size="sm" variant="outline">
                <a href={ZALO_LINK} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Chat Zalo
                </a>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
            <h3 className="font-display text-base font-semibold">Tư vấn nhanh</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Gọi hotline để được tư vấn trực tiếp về sản phẩm phù hợp với tình trạng da của bạn.
            </p>
          </div>
        </aside>
      </div>
    </Container>
  );
}
