// app/error.tsx
'use client';
import React from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-2 text-center">{error.message}</p>
      <button
        onClick={reset}
        className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
      >
        Try Again
      </button>
    </div>
  );
}
