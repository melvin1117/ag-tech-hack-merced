// app/Auth0ProviderWrapper.tsx
'use client';
import React, { ReactNode } from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { useRouter, usePathname } from 'next/navigation';

interface Auth0ProviderWrapperProps {
  children: ReactNode;
}

export default function Auth0ProviderWrapper({ children }: Auth0ProviderWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();

  const onRedirectCallback = (appState: { returnTo?: string } | undefined) => {
    router.push(appState?.returnTo || '/dashboard');
  };

  return (
    <Auth0Provider
      domain="dev-ifofxm2gogl3m1va.us.auth0.com"
      clientId="rfgBN5nvlX6QhPRT7LWKFwkU7eGTrsrO"
      authorizationParams={{
        redirect_uri: typeof window !== 'undefined' ? window.location.origin : ''
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
