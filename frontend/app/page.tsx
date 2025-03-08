import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold">Welcome to AgroVision</h1>
      <p className="mt-4 text-lg">
        Manage your drones efficiently and get real-time insights into your farm.
      </p>
      <p className="mt-2">
        Please login to access your personalized dashboard.
      </p>
    </main>
  );
}