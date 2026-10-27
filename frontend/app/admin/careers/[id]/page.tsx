'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { getAdminCareers, updateAdminCareer } from '@/lib/api/admin';
import { ApiError } from '@/lib/api/client';
import FormField from '@/components/admin/FormField';
import Button from '@/components/ui/Button';
import LoadingState from '@/components/common/LoadingState';

export default function AdminEditCareerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { token } = useAdminAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    job_title: '',
    slug: '',
    department: '',
    location: '',
    employment_type: '',
    experience: '',
    status: 'active' as 'active' | 'closed' | 'draft',
    description: '',
    responsibilities: '',
    requirements: '',
  });

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchCareer = async () => {
      if (!token) return;
      try {
        const all = await getAdminCareers(token);
        const item = all.find((c) => c.id === id);
        if (!item) {
          setError('Career opening not found.');
        } else if (isMounted) {
          setFormData({
            job_title: item.job_title,
            slug: item.slug,
            department: item.department || '',
            location: item.location || '',
            employment_type: item.employment_type || '',
            experience: item.experience || '',
            status: item.status,
            description: item.description || '',
            responsibilities: item.responsibilities || '',
            requirements: item.requirements || '',
          });
        }
      } catch {
        if (isMounted) {
          setError('Failed to fetch career details.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCareer();
    return () => {
      isMounted = false;
    };
  }, [id, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setError(null);
    setSuccess(false);

    if (formData.job_title.trim().length < 2) {
      setError('Job title must be at least 2 characters.');
      return;
    }

    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(formData.slug.trim())) {
      setError('Slug must be lowercase alphanumeric with hyphens.');
      return;
    }

    setIsSaving(true);
    try {
      await updateAdminCareer(token, id, {
        job_title: formData.job_title.trim(),
        slug: formData.slug.trim(),
        department: formData.department.trim() || null,
        location: formData.location.trim() || null,
        employment_type: formData.employment_type.trim() || null,
        experience: formData.experience.trim() || null,
        status: formData.status,
        description: formData.description.trim() || null,
        responsibilities: formData.responsibilities.trim() || null,
        requirements: formData.requirements.trim() || null,
      });

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/careers');
      }, 1000);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to update career opening.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <LoadingState message="Retrieving position specifications..." />;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-950">Edit Career Opening</h2>
          <p className="text-xs text-slate-500 font-mono">ID: {id}</p>
        </div>
        <Link
          href="/admin/careers"
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          &larr; Back to careers
        </Link>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-800">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
          Career position updated successfully! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField id="job-title" label="Job Title" required>
            <input
              id="job-title"
              type="text"
              required
              value={formData.job_title}
              onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>

          <FormField id="job-slug" label="URL Slug" required>
            <input
              id="job-slug"
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase() })}
              className="w-full px-3.5 py-2.5 font-mono border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <FormField id="job-dept" label="Department">
            <input
              id="job-dept"
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>

          <FormField id="job-location" label="Location">
            <input
              id="job-location"
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>

          <FormField id="job-status" label="Status" required>
            <select
              id="job-status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active (Visible)</option>
              <option value="draft">Draft</option>
              <option value="closed">Closed</option>
            </select>
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField id="job-type" label="Employment Type">
            <input
              id="job-type"
              type="text"
              value={formData.employment_type}
              onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>

          <FormField id="job-exp" label="Experience Level">
            <input
              id="job-exp"
              type="text"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>
        </div>

        <FormField id="job-desc" label="Role Description">
          <textarea
            id="job-desc"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormField>

        <FormField id="job-resp" label="Responsibilities">
          <textarea
            id="job-resp"
            rows={4}
            value={formData.responsibilities}
            onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormField>

        <FormField id="job-reqs" label="Requirements & Qualifications">
          <textarea
            id="job-reqs"
            rows={4}
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormField>

        <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
          <Button href="/admin/careers" variant="outline" size="md">
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="md" isLoading={isSaving}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
