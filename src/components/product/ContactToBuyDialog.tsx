'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, MessageCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { HOTLINE, TEL_LINK, ZALO_LINK } from '@/lib/nav';

const Schema = z.object({
  name: z.string().min(2, 'Vui lòng nhập họ tên'),
  phone: z
    .string()
    .min(8, 'Số điện thoại không hợp lệ')
    .regex(/^[0-9+\s().-]+$/, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  message: z.string().optional(),
});
type FormData = z.infer<typeof Schema>;

export function ContactToBuyDialog({
  productSlug,
  productName,
  triggerLabel = 'Liên hệ đặt mua',
  triggerVariant = 'default',
  triggerSize = 'lg',
}: {
  productSlug?: string;
  productName?: string;
  triggerLabel?: string;
  triggerVariant?: 'default' | 'outline' | 'secondary';
  triggerSize?: 'default' | 'sm' | 'lg';
}) {
  const [submitted, setSubmitted] = useState(false);
  const [serverErr, setServerErr] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(Schema) });

  const onSubmit = async (data: FormData) => {
    setServerErr(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          product_slug: productSlug,
          product_name: productName,
          source: 'product-dialog',
        }),
      });
      if (!res.ok) throw new Error('Server error');
      setSubmitted(true);
    } catch (e) {
      setServerErr('Không gửi được, vui lòng gọi hotline.');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={triggerVariant} size={triggerSize}>
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Liên hệ đặt mua</DialogTitle>
          <DialogDescription>
            {productName
              ? `Để lại thông tin để chuyên viên tư vấn ${productName}.`
              : 'Chuyên viên Dr.Anmytas sẽ liên hệ trong giờ làm việc.'}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="space-y-3 py-4">
            <p className="text-sm">
              Cảm ơn bạn! Chúng tôi đã nhận thông tin và sẽ gọi lại sớm.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <a href={TEL_LINK}>
                  <Phone className="h-4 w-4" />
                  {HOTLINE}
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href={ZALO_LINK} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Chat Zalo
                </a>
              </Button>
            </div>
          </div>
        ) : (
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-1.5">
              <Label htmlFor="name">Họ tên *</Label>
              <Input id="name" autoComplete="name" {...register('name')} />
              {errors.name ? (
                <span className="text-xs text-destructive">{errors.name.message}</span>
              ) : null}
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="phone">Số điện thoại *</Label>
              <Input id="phone" type="tel" autoComplete="tel" {...register('phone')} />
              {errors.phone ? (
                <span className="text-xs text-destructive">{errors.phone.message}</span>
              ) : null}
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="email" {...register('email')} />
              {errors.email ? (
                <span className="text-xs text-destructive">{errors.email.message}</span>
              ) : null}
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="message">Lời nhắn</Label>
              <Textarea id="message" rows={3} {...register('message')} />
            </div>
            {serverErr ? (
              <p className="text-sm text-destructive">{serverErr}</p>
            ) : null}
            <div className="flex flex-wrap gap-2 pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Đang gửi…' : 'Gửi yêu cầu'}
              </Button>
              <Button asChild variant="outline" type="button">
                <a href={TEL_LINK}>
                  <Phone className="h-4 w-4" />
                  Gọi {HOTLINE}
                </a>
              </Button>
              <Button asChild variant="outline" type="button">
                <a href={ZALO_LINK} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Zalo
                </a>
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
