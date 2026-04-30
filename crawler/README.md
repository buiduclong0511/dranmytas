# dranmytas-crawler

Crawler Node.js lấy toàn bộ dữ liệu công khai từ [dranmytas.com](https://dranmytas.com): products, posts, pages, categories, kèm tải ảnh và convert HTML sang Markdown.

## Yêu cầu

- Node.js >= 20

## Cài đặt

```bash
npm install
```

## Chạy crawl

```bash
npm start
```

Tiến trình in ra console. Kết quả lưu trong `data/`:

```
data/
├── manifest.json                 # tổng hợp counts + errors + thời gian
├── products/
│   ├── _all.json
│   └── {slug}/{product.json, images/}
├── posts/
│   ├── _all.json
│   └── {slug}/{post.json, post.md, images/}
├── pages/
│   ├── _all.json
│   └── {slug}/{page.json, page.md}
└── categories/
    ├── product-categories.json
    └── post-categories.json
```

## Resume

Crawler idempotent: chạy lại sẽ skip ảnh đã tải. Xóa `data/` để crawl lại từ đầu.

## Nguồn data

| Loại | Endpoint |
|---|---|
| Products | `wp-json/wc/store/v1/products` |
| Product categories | `wp-json/wc/store/v1/products/categories` |
| Posts | `wp-json/wp/v2/posts?_embed=true` |
| Categories | `wp-json/wp/v2/categories` |
| Pages | `wp-json/wp/v2/pages` (đã lọc demo/test) |

## Politeness

- Rate limit ~2 req/s
- Retry 3 lần với exponential backoff
- User-Agent rõ ràng
