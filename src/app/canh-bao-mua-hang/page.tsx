import type { Metadata } from 'next';
import { StaticPageContent } from '@/components/common/StaticPageContent';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Cảnh Báo Mua Hàng',
  description:
    'Thông tin cảnh báo mua hàng giả, hàng nhái và hướng dẫn nhận biết sản phẩm chính hãng Dr.Anmytas.',
  path: '/canh-bao-mua-hang',
});

export default function Page() {
  return (
    <StaticPageContent
      slug="canh-bao-mua-hang"
      fallbackTitle="Cảnh báo mua hàng"
      fallbackDescription="Hướng dẫn nhận diện sản phẩm chính hãng và cảnh báo các kênh bán hàng giả mạo."
    />
  );
}
