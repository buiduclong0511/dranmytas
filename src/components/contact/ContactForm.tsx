'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const Schema = z.object({
  name: z.string().min(2, 'Vui lòng nhập họ tên'),
  phone: z
    .string()
    .min(8, 'Số điện thoại không hợp lệ')
    .regex(/^[0-9+\s().-]+$/, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  subject: z.string().optional(),
  message: z.string().min(5, 'Vui lòng nhập lời nhắn'),
});
type FormData = z.infer<typeof Schema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverErr, setServerErr] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(Schema) });

  const onSubmit = async (data: FormData) => {
    setServerErr(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'contact-page' }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      reset();
    } catch {
      setServerErr('Không gửi được, vui lòng thử lại hoặc gọi hotline.');
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
        <h3 className="font-display text-lg font-semibold">Cảm ơn bạn đã liên hệ</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Chuyên viên Dr.Anmytas sẽ phản hồi trong giờ làm việc (9:00 – 18:00).
        </p>
        <Button className="mt-4" variant="outline" onClick={() => setSubmitted(false)}>
          Gửi yêu cầu khác
        </Button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-4 md:grid-cols-2">
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
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" {...register('email')} />
          {errors.email ? (
            <span className="text-xs text-destructive">{errors.email.message}</span>
          ) : null}
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="subject">Chủ đề</Label>
          <Input id="subject" placeholder="VD: Tư vấn sản phẩm chống nắng" {...register('subject')} />
        </div>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="message">Lời nhắn *</Label>
        <Textarea id="message" rows={5} {...register('message')} />
        {errors.message ? (
          <span className="text-xs text-destructive">{errors.message.message}</span>
        ) : null}
      </div>
      {serverErr ? <p className="text-sm text-destructive">{serverErr}</p> : null}
      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? 'Đang gửi…' : 'Gửi yêu cầu'}
      </Button>
    </form>
  );
}
