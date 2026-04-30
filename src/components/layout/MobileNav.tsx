'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { PRIMARY_NAV, HOTLINE, TEL_LINK, ZALO_LINK } from '@/lib/nav';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Mở menu" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[360px]">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">Dr.Anmytas</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-1">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent/20"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-6 space-y-2 border-t border-border pt-6 text-sm">
          <p className="font-semibold">Hotline tư vấn</p>
          <a href={TEL_LINK} className="block text-primary">
            {HOTLINE}
          </a>
          <a href={ZALO_LINK} target="_blank" rel="noreferrer" className="block text-primary">
            Zalo: {HOTLINE}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
