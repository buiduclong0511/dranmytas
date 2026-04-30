import type { Metadata } from 'next';
import { StaticPageContent } from '@/components/common/StaticPageContent';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Giới thiệu',
  description: 'Câu chuyện và sứ mệnh của Dr.Anmytas — hệ thống nghiên cứu làn da Việt.',
  path: '/gioi-thieu',
});

export default function Page() {
  return (
    <StaticPageContent
      slug="gioi-thieu"
      fallbackTitle="Giới thiệu Dr.Anmytas"
      fallbackDescription="Hệ thống tiên phong tại Việt Nam nghiên cứu công thức cho làn da Việt."
    />
  );
}
