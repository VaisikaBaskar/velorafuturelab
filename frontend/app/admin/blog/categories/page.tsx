'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { getBlogCategories } from '@/lib/api/blog';
import { createAdminBlogCategory } from '@/lib/api/admin';
import { BlogCategory } from '@/types/api';
import { ApiError } from '@/lib/api/client';
import FormField from '@/components/admin/FormField';
import Button from '@/components/ui/Button';
import LoadingState from '@/components/common/LoadingState';

export default function AdminBlogCategoriesPage() {
  const { token } = useAdminAuth();
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // New Category Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getBlogCategories();
      setCategories(data);
    } catch {
      setError('Failed to load blog categories.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleNameChange = (val: string) => {
    setName(val);
    const slugified = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    setSlug(slugified);
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setError(null);
    setSuccess(false);

    if (name.trim().length < 2) {
      setError('Category name must be at least 2 characters.');
      return;
    }

    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(slug.trim())) {
      setError('Slug must be lowercase alphanumeric with hyphens.');
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await createAdminBlogCategory(token, {
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim() || null,
      });

      setCategories((prev) => [...prev, created]);
      setName('');
      setSlug('');
      setDescription('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to create category.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-950">Blog Categories & Taxonomies</h2>
          <p className="text-xs text-slate-500">Manage topic areas for insights, whitepapers, and research</p>
        </div>
        <Link
          href="/admin/blog"
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          &larr; Back to articles
        </Link>
      </div>

      {/* Backend API Capability Notice */}
      <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200/80 text-xs text-blue-900 flex items-start gap-3">
        <svg className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="leading-relaxed">
          <strong>Backend Schema Policy:</strong> The current backend REST API supports category listing and new category registration (<code className="font-mono">POST /api/admin/blog/categories</code>). In-place category mutation and deletion endpoints are not implemented on the backend to preserve database referential integrity for published posts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Create Category Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-950">Add New Category</h3>
            <p className="text-xs text-slate-500 mt-0.5">Register a new research or editorial taxonomy</p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-xs font-medium text-rose-800 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800 rounded-lg">
              Category created successfully!
            </div>
          )}

          <form onSubmit={handleCreateCategory} className="space-y-4">
            <FormField id="cat-name" label="Category Name" required>
              <input
                id="cat-name"
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Distributed Computing"
              />
            </FormField>

            <FormField id="cat-slug" label="Slug" required helpText="URL safe identifier">
              <input
                id="cat-slug"
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase())}
                className="w-full px-3 py-2 font-mono border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="distributed-computing"
              />
            </FormField>

            <FormField id="cat-desc" label="Description">
              <textarea
                id="cat-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Topic focus description..."
              />
            </FormField>

            <div className="pt-2">
              <Button type="submit" variant="primary" size="md" isLoading={isSubmitting} className="w-full">
                Register Category
              </Button>
            </div>
          </form>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-950">Active Categories</h3>
            <span className="text-xs font-semibold text-slate-500">{categories.length} Registered</span>
          </div>

          {loading ? (
            <LoadingState message="Fetching categories..." />
          ) : categories.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 italic">
              No categories registered yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-100 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/60 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3 px-4 sm:px-6">Category Name</th>
                    <th className="py-3 px-4">Slug</th>
                    <th className="py-3 px-4">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {categories.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/40 transition">
                      <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900">
                        {c.name}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-500">
                        {c.slug}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-500 max-w-xs truncate">
                        {c.description || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
