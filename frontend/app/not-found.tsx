// app/not-found.tsx
'use client';
import React from 'react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <p className="mt-2">The page you are looking for does not exist.</p>
    </div>
  );
}
