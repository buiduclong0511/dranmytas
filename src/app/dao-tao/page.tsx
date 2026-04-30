import type { Metadata } from 'next';
import { StaticPageContent } from '@/components/common/StaticPageContent';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Đào Tạo',
  description: 'Chương trình đào tạo chuyên sâu của Dr.Anmytas dành cho chuyên viên skincare.',
  path: '/dao-tao',
});

export default function Page() {
  return (
    <StaticPageContent
      slug="dao-tao"
      fallbackTitle="Đào Tạo"
      fallbackDescription="Chương trình đào tạo chuyên môn cùng các đối tác quốc tế như Lucas Meyer Cosmetics by Clariant."
    />
  );
}
