export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const PRIMARY_NAV: NavItem[] = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Giới thiệu', href: '/gioi-thieu' },
  { label: 'Sản phẩm', href: '/san-pham' },
  { label: 'Gói VIP', href: '/goi-vip' },
  { label: 'Đào Tạo', href: '/dao-tao' },
  { label: 'Tin tức', href: '/tin-tuc' },
  { label: 'Cảnh báo mua hàng', href: '/canh-bao-mua-hang' },
  { label: 'Liên hệ', href: '/lien-he' },
];

export const HOTLINE = process.env.NEXT_PUBLIC_HOTLINE ?? '0355.610.136';
export const ZALO_PHONE = process.env.NEXT_PUBLIC_ZALO_PHONE ?? '0355610136';
export const ZALO_LINK = `https://zalo.me/${ZALO_PHONE}`;
export const TEL_LINK = `tel:+84${ZALO_PHONE.replace(/^0/, '')}`;
