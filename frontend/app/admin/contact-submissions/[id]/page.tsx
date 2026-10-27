'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { getAdminContactSubmissions, updateAdminContactSubmissionStatus } from '@/lib/api/admin';
import { ContactSubmission } from '@/types/api';
import StatusBadge from '@/components/admin/StatusBadge';
import LoadingState from '@/components/common/LoadingState';
import Button from '@/components/ui/Button';

export default function AdminContactSubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { token } = useAdminAuth();

  const [submission, setSubmission] = useState<ContactSubmission | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('new');
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchSub = async () => {
      if (!token) return;
      try {
        const data = await getAdminContactSubmissions(token, { limit: 100 });
        const item = data.submissions.find((s) => s.id === id);
        if (!item) {
          setError('Inquiry submission not found.');
        } else if (isMounted) {
          setSubmission(item);
          setSelectedStatus(item.status);
        }
      } catch {
        if (isMounted) setError('Failed to retrieve inquiry record.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSub();
    return () => {
      isMounted = false;
    };
  }, [id, token]);

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !submission) return;
    setIsUpdating(true);
    setError(null);
    setSuccess(false);

    try {
      const updated = await updateAdminContactSubmissionStatus(token, id, selectedStatus);
      setSubmission(updated);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError('Failed to update submission status.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading inquiry details..." />;
  }

  if (error || !submission) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4">
        <p className="text-sm text-rose-600 font-medium">{error || 'Inquiry not found.'}</p>
        <div>
          <Link href="/admin/contact-submissions" className="text-xs font-semibold text-blue-600 hover:underline">
            &larr; Back to inquiries list
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-950">Inquiry Communication Record</h2>
          <p className="text-xs text-slate-500 font-mono">MSG-REF: {submission.id}</p>
        </div>
        <Link
          href="/admin/contact-submissions"
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          &larr; Back to all inquiries
        </Link>
      </div>

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
          Inquiry triage status updated successfully!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Communication Details */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <h3 className="text-xl font-bold text-slate-950">
                {submission.subject || 'General Inquiry'}
              </h3>
              <p className="text-sm text-slate-600 mt-0.5">
                From: <span className="font-semibold text-slate-900">{submission.name}</span>
                {submission.company && ` &middot; ${submission.company}`}
              </p>
            </div>
            <StatusBadge status={submission.status} />
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="font-bold text-slate-400 uppercase tracking-wider">Email Address</span>
              <p className="text-slate-900 font-semibold text-sm select-all">{submission.email}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="font-bold text-slate-400 uppercase tracking-wider">Phone Contact</span>
              <p className="text-slate-900 font-semibold text-sm">{submission.phone || 'Not provided'}</p>
            </div>
          </div>

          {/* Message Body */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Message Content
            </h4>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-sm text-slate-800 leading-relaxed whitespace-pre-line">
              {submission.message}
            </div>
          </div>
        </div>

        {/* Right: Status Updater & Meta */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-950">Triage & Resolution</h3>
            <p className="text-xs text-slate-500 mt-0.5">Manage response status</p>
          </div>

          <form onSubmit={handleStatusUpdate} className="space-y-4">
            <div>
              <label htmlFor="triage-status" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Status
              </label>
              <select
                id="triage-status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="new">New / Unread</option>
                <option value="in_progress">In Progress / Assigned</option>
                <option value="resolved">Resolved / Replied</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isUpdating}
              className="w-full"
            >
              Update Status
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
            <div className="flex justify-between">
              <span>Received On:</span>
              <span className="font-medium text-slate-700">
                {new Date(submission.created_at).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Last Updated:</span>
              <span className="font-medium text-slate-700">
                {new Date(submission.updated_at).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
