
"use client";

import { Zap, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Header() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-foreground">
          <div className="rounded-lg bg-primary p-2">
            <Zap className="h-6 w-6 text-primary-foreground" />
          </div>
          HandyConnect
        </Link>
        <div className="flex items-center gap-2">
            <Link href="/dashboard" legacyBehavior passHref>
                <Button variant={isDashboard ? 'default' : 'outline'} size="sm">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                </Button>
            </Link>
        </div>
      </div>
    </header>
  );
}
