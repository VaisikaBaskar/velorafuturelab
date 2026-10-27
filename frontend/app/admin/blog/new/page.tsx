'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { createAdminBlogPost } from '@/lib/api/admin';
import { getBlogCategories } from '@/lib/api/blog';
import { BlogCategory } from '@/types/api';
import { ApiError } from '@/lib/api/client';
import FormField from '@/components/admin/FormField';
import Button from '@/components/ui/Button';

export default function AdminNewBlogPostPage() {
  const { token } = useAdminAuth();
  const router = useRouter();

  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category_id: '',
    author_name: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
    excerpt: '',
    content: '',
    featured_image_url: '',
    meta_title: '',
    meta_description: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getBlogCategories()
      .then((cats) => setCategories(cats))
      .catch(() => {});
  }, []);

  const handleTitleChange = (val: string) => {
    const slugified = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug === '' || prev.slug === slugified.slice(0, -1) ? slugified : prev.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setError(null);

    if (formData.title.trim().length < 2) {
      setError('Title must be at least 2 characters.');
      return;
    }

    if (formData.content.trim().length < 10) {
      setError('Article content must be at least 10 characters.');
      return;
    }

    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(formData.slug.trim())) {
      setError('Slug must be lowercase alphanumeric with hyphens.');
      return;
    }

    setIsLoading(true);
    try {
      await createAdminBlogPost(token, {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        category_id: formData.category_id ? formData.category_id : null,
        author_name: formData.author_name.trim() || null,
        status: formData.status,
        excerpt: formData.excerpt.trim() || null,
        content: formData.content.trim(),
        featured_image_url: formData.featured_image_url.trim() || null,
        meta_title: formData.meta_title.trim() || null,
        meta_description: formData.meta_description.trim() || null,
      });

      router.push('/admin/blog');
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to create blog post.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-950">Draft New Insight Article</h2>
          <p className="text-xs text-slate-500">Publish or draft technical research and announcements</p>
        </div>
        <Link
          href="/admin/blog"
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          &larr; Back to articles
        </Link>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-800">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField id="post-title" label="Article Title" required>
            <input
              id="post-title"
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Distributed Consensus in Cloud Systems"
            />
          </FormField>

          <FormField id="post-slug" label="Article Slug" required>
            <input
              id="post-slug"
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase() })}
              className="w-full px-3.5 py-2.5 font-mono border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="distributed-consensus-cloud-systems"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <FormField id="post-category" label="Category">
            <select
              id="post-category"
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">No Category Assigned</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="post-status" label="Status" required>
            <select
              id="post-status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </FormField>

          <FormField id="post-author" label="Author Name">
            <input
              id="post-author"
              type="text"
              value={formData.author_name}
              onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Dr. Vance, Research Team"
            />
          </FormField>
        </div>

        <FormField id="post-excerpt" label="Lead Excerpt (Summary)">
          <textarea
            id="post-excerpt"
            rows={2}
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Brief summary displayed in index cards and social previews..."
          />
        </FormField>

        <FormField id="post-content" label="Article Content (Body)" required>
          <textarea
            id="post-content"
            rows={10}
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
            placeholder="Full article content (supports multiline text and paragraphs)..."
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField id="post-meta-title" label="SEO Meta Title (Optional)">
            <input
              id="post-meta-title"
              type="text"
              value={formData.meta_title}
              onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormField>

          <FormField id="post-image" label="Featured Image URL (Optional)">
            <input
              id="post-image"
              type="url"
              value={formData.featured_image_url}
              onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://..."
            />
          </FormField>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
          <Button href="/admin/blog" variant="outline" size="md">
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="md" isLoading={isLoading}>
            Save Article
          </Button>
        </div>
      </form>
    </div>
  );
}
