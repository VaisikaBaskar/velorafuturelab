'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { getAdminCareers, deleteAdminCareer } from '@/lib/api/admin';
import { Career } from '@/types/api';
import StatusBadge from '@/components/admin/StatusBadge';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import Button from '@/components/ui/Button';

export default function AdminCareersListPage() {
  const { token } = useAdminAuth();
  const [careers, setCareers] = useState<Career[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Deletion modal state
  const [careerToDelete, setCareerToDelete] = useState<Career | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadCareers = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminCareers(token, { status: statusFilter });
      setCareers(data);
    } catch {
      setError('Unable to load career listings from backend.');
    } finally {
      setLoading(false);
    }
  }, [token, statusFilter]);

  useEffect(() => {
    loadCareers();
  }, [loadCareers]);

  const handleDeleteConfirm = async () => {
    if (!token || !careerToDelete) return;
    setIsDeleting(true);
    try {
      await deleteAdminCareer(token, careerToDelete.id);
      setCareers((prev) => prev.filter((c) => c.id !== careerToDelete.id));
      setCareerToDelete(null);
    } catch {
      alert('Failed to delete career position.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label htmlFor="career-status-filter" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Filter Status:
          </label>
          <select
            id="career-status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <Button href="/admin/careers/new" variant="primary" size="md">
          + New Career Opening
        </Button>
      </div>

      {loading ? (
        <LoadingState message="Loading careers catalog..." />
      ) : error ? (
        <ErrorState title="Error Loading Careers" message={error} onRetry={loadCareers} />
      ) : careers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <p className="text-sm text-slate-500">No career openings found matching your filter criteria.</p>
          <div>
            <Button href="/admin/careers/new" variant="outline" size="sm">
              Create the first role opening
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4 sm:px-6">Job Title</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {careers.map((career) => (
                  <tr key={career.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-semibold text-slate-900">{career.job_title}</div>
                      <div className="text-xs font-mono text-slate-400 mt-0.5">{career.slug}</div>
                    </td>
                    <td className="py-4 px-4 text-xs font-medium text-slate-600">
                      {career.department || '—'}
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-500">
                      {career.location || '—'}
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-500">
                      {career.employment_type || '—'}
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={career.status} />
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right space-x-2">
                      <Link
                        href={`/admin/careers/${career.id}`}
                        className="inline-flex px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => setCareerToDelete(career)}
                        className="inline-flex px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!careerToDelete}
        title="Delete Career Position"
        message={`Are you sure you want to permanently delete "${careerToDelete?.job_title}"? Any linked applications will also be affected.`}
        confirmLabel="Delete Position"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setCareerToDelete(null)}
      />
    </div>
  );
}
