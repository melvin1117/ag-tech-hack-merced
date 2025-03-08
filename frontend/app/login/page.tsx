// app/login/page.tsx
'use client';
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { DrillIcon as Drone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-2">
              <Drone className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">AgroDrone</CardTitle>
          <CardDescription>
            Login with your Google account to access your farm dashboard
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button type="button" className="w-full" onClick={() => loginWithRedirect()}>
            Login as Farmer
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
