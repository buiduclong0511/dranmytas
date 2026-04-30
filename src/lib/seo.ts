import type { Metadata } from 'next';
import { stripHtml, decodeEntities } from './sanitize';
import { truncate } from './format';

export const SITE_NAME = 'Dr.Anmytas';
export const SITE_DESCRIPTION =
  'Dr.Anmytas — Hệ thống nghiên cứu làn da Việt. Mỹ phẩm da liễu, dịch vụ chăm sóc da chuyên sâu và đào tạo chuyên môn.';

export function buildMetadata(input: {
  title: string;
  description?: string;
  path?: string;
  image?: string | null;
}): Metadata {
  const cleanDesc = input.description
    ? truncate(decodeEntities(stripHtml(input.description)), 160)
    : SITE_DESCRIPTION;
  const cleanTitle = decodeEntities(stripHtml(input.title));

  return {
    title: cleanTitle,
    description: cleanDesc,
    openGraph: {
      title: cleanTitle,
      description: cleanDesc,
      siteName: SITE_NAME,
      type: 'website',
      images: input.image ? [{ url: input.image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: cleanTitle,
      description: cleanDesc,
      images: input.image ? [input.image] : undefined,
    },
    alternates: input.path ? { canonical: input.path } : undefined,
  };
}
