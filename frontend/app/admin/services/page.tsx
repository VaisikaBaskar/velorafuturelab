'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { getAdminServices, deleteAdminService } from '@/lib/api/admin';
import { Service } from '@/types/api';
import StatusBadge from '@/components/admin/StatusBadge';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import Button from '@/components/ui/Button';

export default function AdminServicesListPage() {
  const { token } = useAdminAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Deletion modal state
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadServices = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminServices(token, statusFilter);
      setServices(data);
    } catch {
      setError('Unable to load services catalog. Please verify backend connectivity.');
    } finally {
      setLoading(false);
    }
  }, [token, statusFilter]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const handleDeleteConfirm = async () => {
    if (!token || !serviceToDelete) return;
    setIsDeleting(true);
    try {
      await deleteAdminService(token, serviceToDelete.id);
      setServices((prev) => prev.filter((s) => s.id !== serviceToDelete.id));
      setServiceToDelete(null);
    } catch {
      alert('Failed to delete service. Please check your connection and permissions.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label htmlFor="services-filter" className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Filter Status:
          </label>
          <select
            id="services-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <Button href="/admin/services/new" variant="primary" size="md">
          + Create Service
        </Button>
      </div>

      {loading ? (
        <LoadingState message="Loading services catalog..." />
      ) : error ? (
        <ErrorState title="Error Loading Services" message={error} onRetry={loadServices} />
      ) : services.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <p className="text-sm text-slate-500">No services cataloged matching your filter criteria.</p>
          <div>
            <Button href="/admin/services/new" variant="outline" size="sm">
              Create the first service
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4 sm:px-6">Order</th>
                  <th className="py-3.5 px-4">Title</th>
                  <th className="py-3.5 px-4">Slug</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-4 px-4 sm:px-6 font-mono text-xs text-slate-400">
                      #{service.display_order}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-900">{service.title}</div>
                      {service.short_description && (
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {service.short_description}
                        </p>
                      )}
                    </td>
                    <td className="py-4 px-4 font-mono text-xs text-slate-500">
                      {service.slug}
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={service.status} />
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right space-x-2">
                      <Link
                        href={`/admin/services/${service.id}`}
                        className="inline-flex px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => setServiceToDelete(service)}
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
        isOpen={!!serviceToDelete}
        title="Delete Service Specification"
        message={`Are you sure you want to delete "${serviceToDelete?.title}"? This action cannot be undone.`}
        confirmLabel="Delete Service"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setServiceToDelete(null)}
      />
    </div>
  );
}
