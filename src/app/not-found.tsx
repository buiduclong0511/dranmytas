import Link from 'next/link';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <span className="text-xs uppercase tracking-[0.2em] text-primary">404</span>
      <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">
        Không tìm thấy trang
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Trang bạn đang tìm có thể đã được di chuyển hoặc không còn tồn tại.
      </p>
      <div className="mt-6 flex gap-3">
        <Button asChild>
          <Link href="/">Về trang chủ</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/san-pham">Xem sản phẩm</Link>
        </Button>
      </div>
    </Container>
  );
}
