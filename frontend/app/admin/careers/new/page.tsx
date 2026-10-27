'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { createAdminCareer } from '@/lib/api/admin';
import { ApiError } from '@/lib/api/client';
import FormField from '@/components/admin/FormField';
import Button from '@/components/ui/Button';

export default function AdminNewCareerPage() {
  const { token } = useAdminAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    job_title: '',
    slug: '',
    department: '',
    location: '',
    employment_type: 'Full-time',
    experience: '',
    status: 'active' as 'active' | 'closed' | 'draft',
    description: '',
    responsibilities: '',
    requirements: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (val: string) => {
    const slugified = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    setFormData((prev) => ({
      ...prev,
      job_title: val,
      slug: prev.slug === '' || prev.slug === slugified.slice(0, -1) ? slugified : prev.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setError(null);

    if (formData.job_title.trim().length < 2) {
      setError('Job title must be at least 2 characters.');
      return;
    }

    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(formData.slug.trim())) {
      setError('Slug must be lowercase alphanumeric with hyphens.');
      return;
    }

    setIsLoading(true);
    try {
      await createAdminCareer(token, {
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

      router.push('/admin/careers');
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to create career opening.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-950">Add Career Opening</h2>
          <p className="text-xs text-slate-500">Post a new position to the public careers board</p>
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

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField id="job-title" label="Job Title" required>
            <input
              id="job-title"
              type="text"
              required
              value={formData.job_title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Senior Distributed Systems Engineer"
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
              placeholder="senior-distributed-systems-engineer"
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
              placeholder="e.g. Systems Architecture"
            />
          </FormField>

          <FormField id="job-location" label="Location">
            <input
              id="job-location"
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Remote / Hybrid"
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
              placeholder="e.g. Full-time, Contract, Fellowship"
            />
          </FormField>

          <FormField id="job-exp" label="Experience Level">
            <input
              id="job-exp"
              type="text"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 5+ Years, Senior / Lead"
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
            placeholder="High-level overview of the role and research mandate..."
          />
        </FormField>

        <FormField id="job-resp" label="Responsibilities">
          <textarea
            id="job-resp"
            rows={4}
            value={formData.responsibilities}
            onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Key day-to-day duties and engineering deliverables..."
          />
        </FormField>

        <FormField id="job-reqs" label="Requirements & Qualifications">
          <textarea
            id="job-reqs"
            rows={4}
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Technical requirements, languages, systems background..."
          />
        </FormField>

        <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
          <Button href="/admin/careers" variant="outline" size="md">
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="md" isLoading={isLoading}>
            Create Career Opening
          </Button>
        </div>
      </form>
    </div>
  );
}
