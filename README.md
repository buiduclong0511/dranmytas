# dranmytas

Clone Next.js của [dranmytas.com](https://dranmytas.com) — website mỹ phẩm da liễu Dr.Anmytas (Việt Nam).

Dự án gồm **2 phần**:

```
.
├── crawler/   # Node.js crawler — kéo data công khai từ dranmytas.com
└── src/       # Next.js 15 + Tailwind v4 + shadcn-style — render data
```

## Yêu cầu

- Node.js >= 20
- SSH key đã cấu hình cho GitHub (clone)

## Cài đặt

```bash
git clone git@github.com:buiduclong0511/dranmytas.git
cd dranmytas
npm install
```

## Quy trình data

Crawler đọc data từ dranmytas.com vào thư mục `data/` (gitignore vì size lớn).

```bash
# Bước 1: cài deps cho crawler
npm --prefix crawler install

# Bước 2: chạy crawler — xuất ra data/ (~119 MB, 358 ảnh)
npm run crawl

# Bước 3: chạy dev server (predev tự sync ảnh data/ → public/images/)
npm run dev
```

Mở `http://localhost:3000`.

## Build production

```bash
npm run build   # ~140 static pages
npm start
```

## Stack

- **Next.js 15** App Router · TypeScript · Turbopack
- **Tailwind CSS v4** với `@theme inline`
- **shadcn-style components** (Radix UI primitives)
- **Cormorant Garamond** + **Inter** fonts (Vietnamese subset)
- **isomorphic-dompurify** sanitize HTML từ WordPress
- **react-hook-form + zod** cho contact form
- Brand palette: `#003223` (forest green) + `#d4af37` (gold)

## Cấu trúc routes

| Route | Mô tả |
|---|---|
| `/` | Hero slider + featured products + latest posts |
| `/san-pham` · `/san-pham/[slug]` | 34 products + filter sidebar |
| `/danh-muc-san-pham/[slug]` | 10 product categories |
| `/tin-tuc` · `/tin-tuc/[slug]` | 78 posts với HTML sanitized |
| `/danh-muc-tin-tuc/[slug]` | 8 post categories |
| `/gioi-thieu` · `/lien-he` · `/dao-tao` · `/goi-vip` · `/canh-bao-mua-hang` | Static pages từ WP |
| `/api/contact` | POST handler ghi lead vào `data/leads/` |

## Mô hình kinh doanh

Brochure + Contact-to-buy: site không show giá, mọi sản phẩm có CTA "Liên hệ đặt mua" → form/Zalo/hotline.

## License

Private — cho mục đích học tập / clone tham khảo.
