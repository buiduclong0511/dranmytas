import fs from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const Schema = z.object({
  name: z.string().min(1).max(120),
  phone: z.string().min(6).max(40),
  email: z.string().email().optional().or(z.literal('').transform(() => undefined)),
  subject: z.string().max(200).optional(),
  message: z.string().max(5000).optional(),
  product_slug: z.string().max(200).optional(),
  product_name: z.string().max(300).optional(),
  source: z.string().max(50).optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = Schema.parse(json);
    const lead = {
      ...data,
      received_at: new Date().toISOString(),
      ua: request.headers.get('user-agent') ?? null,
    };

    // Local dev: persist lead to data/leads/. Vercel filesystem is read-only
    // at runtime — silently fall back to console log so the form still works.
    try {
      const ts = new Date().toISOString().replace(/[:.]/g, '-');
      const phoneSlug = data.phone.replace(/[^0-9]/g, '').slice(0, 15) || 'unknown';
      const filename = `${ts}-${phoneSlug}.json`;
      const dir = path.join(process.cwd(), 'data', 'leads');
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(path.join(dir, filename), JSON.stringify(lead, null, 2), 'utf8');
    } catch {
      console.log('[contact] lead received (fs write skipped):', JSON.stringify(lead));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
