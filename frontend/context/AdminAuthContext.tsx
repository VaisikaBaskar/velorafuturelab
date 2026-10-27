'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AdminUser } from '@/types/api';
import { adminLogin, getAdminMe } from '@/lib/api/admin';

interface AdminAuthContextType {
  token: string | null;
  admin: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const TOKEN_KEY = 'velora_admin_token';
const ADMIN_KEY = 'velora_admin_user';

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const logout = useCallback(() => {
    setToken(null);
    setAdmin(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(ADMIN_KEY);
      document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
      window.location.href = '/admin/login';
      return;
    }
    router.push('/admin/login');
  }, [router]);

  // Initial token verification
  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      if (typeof window === 'undefined') {
        setIsLoading(false);
        return;
      }

      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (!storedToken) {
        if (isMounted) {
          setIsLoading(false);
        }
        return;
      }

      try {
        const { admin: verifiedAdmin } = await getAdminMe(storedToken);
        if (isMounted) {
          setToken(storedToken);
          setAdmin(verifiedAdmin);
        }
      } catch {
        // Token expired or invalid
        if (isMounted) {
          setToken(null);
          setAdmin(null);
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(ADMIN_KEY);
          document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initAuth();

    // Listen for 401 unauthorized events from api client
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener('velora-admin-unauthorized', handleUnauthorized);

    return () => {
      isMounted = false;
      window.removeEventListener('velora-admin-unauthorized', handleUnauthorized);
    };
  }, [logout]);

  const login = async (email: string, password: string) => {
    const res = await adminLogin({ email, password });
    setToken(res.token);
    setAdmin(res.admin);

    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, res.token);
      localStorage.setItem(ADMIN_KEY, JSON.stringify(res.admin));
      document.cookie = `${TOKEN_KEY}=${res.token}; path=/; max-age=86400; SameSite=Lax`;
      window.location.href = '/admin';
      return;
    }

    router.push('/admin');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        token,
        admin,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
