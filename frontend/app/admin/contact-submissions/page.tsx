'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { getAdminContactSubmissions } from '@/lib/api/admin';
import { ContactSubmission, BlogPagination } from '@/types/api';
import StatusBadge from '@/components/admin/StatusBadge';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';

export default function AdminContactSubmissionsListPage() {
  const { token } = useAdminAuth();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [pagination, setPagination] = useState<BlogPagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
  });
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSubmissions = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminContactSubmissions(token, {
        status: statusFilter,
        page,
        limit: 20,
      });
      setSubmissions(data.submissions || []);
      setPagination(data.pagination || { page: 1, limit: 20, total: 0, totalPages: 1 });
    } catch {
      setError('Unable to load inquiries from backend.');
    } finally {
      setLoading(false);
    }
  }, [token, statusFilter, page]);

  useEffect(() => {
    loadSubmissions();
  }, [loadSubmissions]);

  return (
    <div className="space-y-6">
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label htmlFor="contact-status-filter" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Triage Status:
          </label>
          <select
            id="contact-status-filter"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Inquiries ({pagination.total})</option>
            <option value="new">New (Unresolved)</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing {submissions.length} of {pagination.total} inquiries
        </div>
      </div>

      {loading ? (
        <LoadingState message="Loading inquiries..." />
      ) : error ? (
        <ErrorState title="Error Loading Inquiries" message={error} onRetry={loadSubmissions} />
      ) : submissions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-2">
          <h3 className="text-base font-bold text-slate-900">No Inquiries Recorded</h3>
          <p className="text-sm text-slate-500">No contact submissions match the selected status filter.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4 sm:px-6">Contact / Sender</th>
                  <th className="py-3.5 px-4">Organization & Subject</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-semibold text-slate-900">{sub.name}</div>
                      <div className="text-xs text-slate-500">{sub.email}</div>
                    </td>
                    <td className="py-4 px-4 text-xs">
                      <div className="font-medium text-slate-900">{sub.subject || 'General Inquiry'}</div>
                      <div className="text-slate-400 mt-0.5">{sub.company || 'Private Entity'}</div>
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-500">
                      {new Date(sub.created_at).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={sub.status} />
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <Link
                        href={`/admin/contact-submissions/${sub.id}`}
                        className="inline-flex px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition"
                      >
                        Review Message &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition"
              >
                &larr; Previous Page
              </button>
              <span>
                Page {page} of {pagination.totalPages}
              </span>
              <button
                disabled={page >= pagination.totalPages}
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition"
              >
                Next Page &rarr;
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
