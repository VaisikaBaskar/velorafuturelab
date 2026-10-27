'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { getAdminApplications, updateAdminApplicationStatus } from '@/lib/api/admin';
import { AdminApplication } from '@/types/api';
import StatusBadge from '@/components/admin/StatusBadge';
import LoadingState from '@/components/common/LoadingState';
import Button from '@/components/ui/Button';

export default function AdminApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { token } = useAdminAuth();

  const [application, setApplication] = useState<AdminApplication | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('submitted');
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchApp = async () => {
      if (!token) return;
      try {
        const data = await getAdminApplications(token, { limit: 100 });
        const item = data.applications.find((a) => a.id === id);
        if (!item) {
          setError('Application dossier not found.');
        } else if (isMounted) {
          setApplication(item);
          setSelectedStatus(item.status);
        }
      } catch {
        if (isMounted) setError('Failed to retrieve application dossier.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchApp();
    return () => {
      isMounted = false;
    };
  }, [id, token]);

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !application) return;
    setIsUpdating(true);
    setError(null);
    setSuccess(false);

    try {
      const updated = await updateAdminApplicationStatus(token, id, selectedStatus);
      setApplication(updated);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError('Failed to update candidate application status.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading candidate dossier..." />;
  }

  if (error || !application) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4">
        <p className="text-sm text-rose-600 font-medium">{error || 'Application not found.'}</p>
        <div>
          <Link href="/admin/applications" className="text-xs font-semibold text-blue-600 hover:underline">
            &larr; Back to applications list
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Breadcrumb Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-950">Candidate Dossier</h2>
          <p className="text-xs text-slate-500 font-mono">APP-REF: {application.id}</p>
        </div>
        <Link
          href="/admin/applications"
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          &larr; Back to all applications
        </Link>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
          Application stage updated successfully!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Main Details */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          {/* Candidate Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-950">{application.name}</h3>
              <p className="text-sm font-medium text-blue-600 mt-0.5">
                Target Role: {application.job_title || 'General Application'}
              </p>
              {application.department && (
                <span className="text-xs text-slate-500">{application.department} &middot; {application.location || 'Remote'}</span>
              )}
            </div>
            <StatusBadge status={application.status} />
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="font-bold text-slate-400 uppercase tracking-wider">Email Address</span>
              <p className="text-slate-900 font-semibold text-sm select-all">{application.email}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="font-bold text-slate-400 uppercase tracking-wider">Phone Number</span>
              <p className="text-slate-900 font-semibold text-sm">{application.phone || 'Not provided'}</p>
            </div>
          </div>

          {/* Resume Link */}
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-950">Curriculum Vitae / Portfolio</h4>
                <p className="text-xs text-slate-500 truncate max-w-xs">{application.resume_url}</p>
              </div>
            </div>
            <a
              href={application.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition"
            >
              Open Link &rarr;
            </a>
          </div>

          {/* Cover Letter */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Candidate Motivation & Cover Letter
            </h4>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {application.cover_letter || 'No cover letter was submitted with this application.'}
            </div>
          </div>
        </div>

        {/* Right: Pipeline Management Form */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-950">Hiring Pipeline Stage</h3>
            <p className="text-xs text-slate-500 mt-0.5">Update evaluation milestone for this candidate</p>
          </div>

          <form onSubmit={handleStatusUpdate} className="space-y-4">
            <div>
              <label htmlFor="pipeline-stage" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Evaluation Stage
              </label>
              <select
                id="pipeline-stage"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="submitted">Submitted</option>
                <option value="reviewing">Under Technical Review</option>
                <option value="interviewed">Interviewed</option>
                <option value="offered">Offer Extended</option>
                <option value="rejected">Rejected / Closed</option>
              </select>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isUpdating}
              className="w-full"
            >
              Update Stage
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
            <div className="flex justify-between">
              <span>Submitted On:</span>
              <span className="font-medium text-slate-700">
                {new Date(application.created_at).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Last Evaluated:</span>
              <span className="font-medium text-slate-700">
                {new Date(application.updated_at).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
