import type { Metadata } from 'next';
import { AdminAuthProvider } from '@/context/AdminAuthContext';
import AdminGuard from '@/components/admin/AdminGuard';
import AdminLayout from '@/components/admin/AdminLayout';

export const metadata: Metadata = {
  title: 'Admin Console | VELORA Future Lab',
  description: 'Authorized administrative management for VELORA Future Lab.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <AdminGuard>
        <AdminLayout>{children}</AdminLayout>
      </AdminGuard>
    </AdminAuthProvider>
  );
}
