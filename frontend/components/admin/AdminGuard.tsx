'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/AdminAuthContext';
import LoadingState from '@/components/common/LoadingState';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { token, isLoading } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === '/admin/login' || pathname?.startsWith('/admin/login');

  useEffect(() => {
    if (!isLoading) {
      if (!isLoginPage && !token) {
        router.replace('/admin/login');
      } else if (isLoginPage && token) {
        router.replace('/admin');
      }
    }
  }, [isLoading, token, isLoginPage, router]);

  // If on login page and not authenticated, render login page immediately without loading flicker
  if (isLoginPage && !token) {
    return <>{children}</>;
  }

  // While checking authentication state on protected admin routes, render loading indicator
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-white">
        <LoadingState message="Authenticating administrator credentials..." />
      </div>
    );
  }

  // If on login page, render login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  // If not authenticated and not on login page, render loading while redirecting
  if (!token) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-white">
        <LoadingState message="Redirecting to secure login portal..." />
      </div>
    );
  }

  // Authenticated
  return <>{children}</>;
}
