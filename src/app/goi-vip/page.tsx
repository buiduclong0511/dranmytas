import type { Metadata } from 'next';
import { StaticPageContent } from '@/components/common/StaticPageContent';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Gói VIP',
  description: 'Quyền lợi và ưu đãi dành cho khách hàng VIP của Dr.Anmytas.',
  path: '/goi-vip',
});

export default function Page() {
  return (
    <StaticPageContent
      slug="goi-vip"
      fallbackTitle="Gói VIP Dr.Anmytas"
      fallbackDescription="Đặc quyền chăm sóc da chuyên sâu, dịch vụ ưu tiên và sản phẩm cao cấp."
    />
  );
}
