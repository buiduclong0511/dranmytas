export interface ProductImage {
  id: number;
  src: string;
  thumbnail: string;
  srcset: string;
  sizes: string;
  name: string;
  alt: string;
}

export interface ProductCategoryRef {
  id: number;
  name: string;
  slug: string;
  link: string;
}

export interface ProductBrand {
  id: number;
  name: string;
  slug: string;
  link: string;
}

export interface ProductPrices {
  price: string;
  regular_price: string;
  sale_price: string;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  sku: string;
  short_description: string;
  description: string;
  on_sale: boolean;
  prices: ProductPrices;
  price_html: string;
  average_rating: string;
  review_count: number;
  images: ProductImage[];
  categories: ProductCategoryRef[];
  tags: ProductCategoryRef[];
  brands?: ProductBrand[];
  is_in_stock: boolean;
  is_purchasable: boolean;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent: number;
  count: number;
  image?: { src: string } | null;
}

export interface PostRendered {
  rendered: string;
  protected?: boolean;
}

export interface EmbeddedTerm {
  id: number;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
}

export interface EmbeddedMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    width: number;
    height: number;
  };
}

export interface Post {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  slug: string;
  link: string;
  title: PostRendered;
  content: PostRendered;
  excerpt: PostRendered;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:featuredmedia'?: EmbeddedMedia[];
    'wp:term'?: EmbeddedTerm[][];
    author?: { id: number; name: string; link: string }[];
  };
}

export interface PostCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent: number;
  count: number;
}

export interface Page {
  id: number;
  slug: string;
  link: string;
  title: PostRendered;
  content: PostRendered;
  excerpt: PostRendered;
  date: string;
  modified: string;
}
