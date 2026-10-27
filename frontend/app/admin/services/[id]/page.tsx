'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { getAdminServices, updateAdminService } from '@/lib/api/admin';
import { ApiError } from '@/lib/api/client';
import FormField from '@/components/admin/FormField';
import Button from '@/components/ui/Button';
import LoadingState from '@/components/common/LoadingState';

export default function AdminEditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { token } = useAdminAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    short_description: '',
    description: '',
    icon: '',
    image_url: '',
    status: 'published' as 'draft' | 'published' | 'archived',
    display_order: 0,
  });

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchService = async () => {
      if (!token) return;
      try {
        const all = await getAdminServices(token);
        const item = all.find((s) => s.id === id);
        if (!item) {
          setError('Service not found in catalog.');
        } else if (isMounted) {
          setFormData({
            title: item.title,
            slug: item.slug,
            short_description: item.short_description || '',
            description: item.description || '',
            icon: item.icon || '',
            image_url: item.image_url || '',
            status: item.status,
            display_order: item.display_order,
          });
        }
      } catch {
        if (isMounted) {
          setError('Failed to fetch service details.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchService();
    return () => {
      isMounted = false;
    };
  }, [id, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setError(null);
    setSuccess(false);

    if (formData.title.trim().length < 2) {
      setError('Title must be at least 2 characters.');
      return;
    }

    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(formData.slug.trim())) {
      setError('Slug must be lowercase alphanumeric with hyphens.');
      return;
    }

    setIsSaving(true);
    try {
      await updateAdminService(token, id, {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        short_description: formData.short_description.trim() || null,
        description: formData.description.trim() || null,
        icon: formData.icon.trim() || null,
        image_url: formData.image_url.trim() || null,
        status: formData.status,
        display_order: Number(formData.display_order) || 0,
      });

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/services');
      }, 1000);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to update service.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <LoadingState message="Retrieving service specifications..." />;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-950">Edit Service Specification</h2>
          <p className="text-xs text-slate-500 font-mono">ID: {id}</p>
        </div>
        <Link
          href="/admin/services"
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          &larr; Back to services
        </Link>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-800">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
          Service updated successfully! Redirecting to list...
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField id="service-title" label="Service Title" required>
            <input
              id="service-title"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>

          <FormField id="service-slug" label="Service Slug" required>
            <input
              id="service-slug"
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase() })}
              className="w-full px-3.5 py-2.5 font-mono border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField id="service-status" label="Status" required>
            <select
              id="service-status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </FormField>

          <FormField id="service-order" label="Display Order">
            <input
              id="service-order"
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>
        </div>

        <FormField id="service-short-desc" label="Short Description (Summary)">
          <textarea
            id="service-short-desc"
            rows={2}
            value={formData.short_description}
            onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormField>

        <FormField id="service-desc" label="Full Service Description">
          <textarea
            id="service-desc"
            rows={6}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField id="service-icon" label="Icon Identifier (Optional)">
            <input
              id="service-icon"
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>

          <FormField id="service-image" label="Cover Image URL (Optional)">
            <input
              id="service-image"
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
          <Button href="/admin/services" variant="outline" size="md">
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
