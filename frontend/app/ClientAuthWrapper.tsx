// app/ClientAuthWrapper.tsx
'use client';

import React, { ReactNode } from 'react';
import Auth0ProviderWrapper from './Auth0ProviderWrapper';

interface ClientAuthWrapperProps {
  children: ReactNode;
}

export default function ClientAuthWrapper({ children }: ClientAuthWrapperProps) {
  return (
    <Auth0ProviderWrapper>
      {children}
    </Auth0ProviderWrapper>
  );
}
