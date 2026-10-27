'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAdminAuth } from '@/context/AdminAuthContext';
import {
  getAdminServices,
  getAdminBlogPosts,
  getAdminCareers,
  getAdminApplications,
  getAdminContactSubmissions,
} from '@/lib/api/admin';
import {
  Service,
  BlogPost,
  Career,
  AdminApplication,
  ContactSubmission,
} from '@/types/api';
import StatusBadge from '@/components/admin/StatusBadge';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';

export default function AdminDashboardPage() {
  const { token, admin } = useAdminAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [services, setServices] = useState<Service[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [careers, setCareers] = useState<Career[]>([]);
  const [applications, setApplications] = useState<AdminApplication[]>([]);
  const [submissions, setContactSubmissions] = useState<ContactSubmission[]>([]);

  const [stats, setStats] = useState({
    servicesCount: 0,
    blogCount: 0,
    careersCount: 0,
    applicationsCount: 0,
    submissionsCount: 0,
  });

  const loadDashboardData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);

    try {
      const [
        servicesRes,
        blogRes,
        careersRes,
        appsRes,
        contactsRes,
      ] = await Promise.all([
        getAdminServices(token),
        getAdminBlogPosts(token, { limit: 5 }),
        getAdminCareers(token),
        getAdminApplications(token, { limit: 5 }),
        getAdminContactSubmissions(token, { limit: 5 }),
      ]);

      setServices(servicesRes);
      setBlogPosts(blogRes.posts || []);
      setCareers(careersRes);
      setApplications(appsRes.applications || []);
      setContactSubmissions(contactsRes.submissions || []);

      setStats({
        servicesCount: servicesRes.length,
        blogCount: blogRes.pagination?.total ?? (blogRes.posts?.length || 0),
        careersCount: careersRes.length,
        applicationsCount: appsRes.pagination?.total ?? (appsRes.applications?.length || 0),
        submissionsCount: contactsRes.pagination?.total ?? (contactsRes.submissions?.length || 0),
      });
    } catch {
      setError('Failed to aggregate telemetry metrics. Please ensure backend services are running.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  if (loading) {
    return <LoadingState message="Aggregating lab telemetry and CMS records..." />;
  }

  if (error) {
    return <ErrorState title="Telemetry Sync Failed" message={error} onRetry={loadDashboardData} />;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/60 text-blue-300 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            NODE-01 // PRODUCTION ADMIN
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {admin?.name || 'Administrator'}
          </h2>
          <p className="text-slate-400 text-sm max-w-xl">
            Real-time control center for VELORA Future Lab. Review candidate dossiers, triage incoming inquiries, and manage website content.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 relative z-10 flex-shrink-0">
          <Link
            href="/admin/services/new"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition"
          >
            + New Service
          </Link>
          <Link
            href="/admin/blog/new"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition"
          >
            + New Article
          </Link>
          <Link
            href="/admin/careers/new"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition"
          >
            + New Career
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {/* Services KPI */}
        <Link
          href="/admin/services"
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition duration-200 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Services
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900">{stats.servicesCount}</div>
            <p className="text-xs text-slate-500 mt-1">Cataloged programs</p>
          </div>
        </Link>

        {/* Blog Posts KPI */}
        <Link
          href="/admin/blog"
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition duration-200 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Insights
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900">{stats.blogCount}</div>
            <p className="text-xs text-slate-500 mt-1">Published articles</p>
          </div>
        </Link>

        {/* Careers KPI */}
        <Link
          href="/admin/careers"
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition duration-200 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Careers
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900">{stats.careersCount}</div>
            <p className="text-xs text-slate-500 mt-1">Role listings</p>
          </div>
        </Link>

        {/* Applications KPI */}
        <Link
          href="/admin/applications"
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition duration-200 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Applications
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900">{stats.applicationsCount}</div>
            <p className="text-xs text-slate-500 mt-1">Total candidate dossiers</p>
          </div>
        </Link>

        {/* Inquiries KPI */}
        <Link
          href="/admin/contact-submissions"
          className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition duration-200 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Inquiries
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900">{stats.submissionsCount}</div>
            <p className="text-xs text-slate-500 mt-1">Contact submissions</p>
          </div>
        </Link>
      </div>

      {/* Two Column Section: Recent Applications & Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-950">Recent Applications</h3>
              <p className="text-xs text-slate-500">Latest candidate submissions</p>
            </div>
            <Link
              href="/admin/applications"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
            >
              View all &rarr;
            </Link>
          </div>

          {applications.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-6 text-center">
              No candidate applications received yet.
            </p>
          ) : (
            <div className="divide-y divide-slate-100 space-y-3">
              {applications.slice(0, 5).map((app) => (
                <div key={app.id} className="pt-3 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {app.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {app.job_title || 'General Application'} &middot; {app.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <StatusBadge status={app.status} />
                    <Link
                      href={`/admin/applications/${app.id}`}
                      className="text-xs font-semibold text-slate-700 hover:text-blue-600 transition"
                    >
                      Review &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Contact Inquiries */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-950">Recent Contact Inquiries</h3>
              <p className="text-xs text-slate-500">Incoming organizational inquiries</p>
            </div>
            <Link
              href="/admin/contact-submissions"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
            >
              View all &rarr;
            </Link>
          </div>

          {submissions.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-6 text-center">
              No contact submissions recorded yet.
            </p>
          ) : (
            <div className="divide-y divide-slate-100 space-y-3">
              {submissions.slice(0, 5).map((sub) => (
                <div key={sub.id} className="pt-3 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {sub.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {sub.company ? `${sub.company} · ` : ''}{sub.subject || sub.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <StatusBadge status={sub.status} />
                    <Link
                      href={`/admin/contact-submissions/${sub.id}`}
                      className="text-xs font-semibold text-slate-700 hover:text-blue-600 transition"
                    >
                      Review &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
