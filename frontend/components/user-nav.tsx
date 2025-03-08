// components/user-nav.tsx
'use client';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Link from 'next/link';

export function UserNav() {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  if (!isAuthenticated) {
    return (
      <button
        onClick={() => loginWithRedirect()}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Login
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/dashboard" className="flex items-center hover:underline">
        {user?.picture && (
          <img
            src={user.picture}
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
        )}
        <span className="ml-2">{user?.name}</span>
      </Link>
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
}
