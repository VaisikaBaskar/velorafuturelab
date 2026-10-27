'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoginPage = pathname === '/admin/login' || pathname?.startsWith('/admin/login');

  if (isLoginPage) {
    return <main className="min-h-screen bg-slate-950 flex flex-col">{children}</main>;
  }

  // Derive title from pathname
  const getHeaderInfo = (path: string) => {
    if (path === '/admin') {
      return { title: 'Executive Overview', subtitle: 'Real-time telemetry and management metrics' };
    }
    if (path.startsWith('/admin/services')) {
      return { title: 'Services Catalog CMS', subtitle: 'Manage offerings, specifications, and architecture programs' };
    }
    if (path.startsWith('/admin/blog/categories')) {
      return { title: 'Blog Categories CMS', subtitle: 'Manage editorial taxonomies and subject areas' };
    }
    if (path.startsWith('/admin/blog')) {
      return { title: 'Insights & Research CMS', subtitle: 'Publish technical articles, papers, and announcements' };
    }
    if (path.startsWith('/admin/careers')) {
      return { title: 'Careers & Talent CMS', subtitle: 'Manage open engineering roles and hiring pipelines' };
    }
    if (path.startsWith('/admin/applications')) {
      return { title: 'Candidate Applications', subtitle: 'Review and evaluate submitted candidate dossiers' };
    }
    if (path.startsWith('/admin/contact-submissions')) {
      return { title: 'Contact Submissions', subtitle: 'Review and triage client and partnership inquiries' };
    }
    return { title: 'Admin Console', subtitle: 'VELORA Future Lab' };
  };

  const headerInfo = getHeaderInfo(pathname);

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-900">
      <AdminSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          title={headerInfo.title}
          subtitle={headerInfo.subtitle}
          onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
