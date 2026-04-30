import { ProductCard } from './ProductCard';
import type { Product } from '@/types';

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <p className="py-10 text-center text-muted-foreground">Chưa có sản phẩm nào.</p>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
