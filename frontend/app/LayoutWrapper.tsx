// app/LayoutWrapper.tsx
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { DashboardNav } from '@/components/dashboard/dashboard-nav';
import { PageHeader } from '@/components/page-header';
import { FloatingChatButton } from '@/components/floating-chat-button';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  // Define secure pages as those that start with these segments.
  const isSecurePage =
    pathname.startsWith('/dashboard') || pathname.startsWith('/drones');

  return (
    <div className="relative flex min-h-screen flex-col">
      <PageHeader title="AgroVision" />
      <div className="flex flex-1">
        {isSecurePage && (
          <aside className="hidden w-64 border-r bg-muted/40 md:block">
            <div className="p-4">
              <DashboardNav />
            </div>
          </aside>
        )}
        <main className="flex-1">{children}</main>
      </div>
      <FloatingChatButton />
    </div>
  );
}
