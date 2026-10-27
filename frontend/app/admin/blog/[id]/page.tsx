'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { getAdminBlogPosts, updateAdminBlogPost } from '@/lib/api/admin';
import { getBlogCategories } from '@/lib/api/blog';
import { BlogCategory } from '@/types/api';
import { ApiError } from '@/lib/api/client';
import FormField from '@/components/admin/FormField';
import Button from '@/components/ui/Button';
import LoadingState from '@/components/common/LoadingState';

export default function AdminEditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
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

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!token) return;
      try {
        const [postsRes, catsRes] = await Promise.all([
          getAdminBlogPosts(token, { limit: 100 }),
          getBlogCategories().catch(() => []),
        ]);

        if (isMounted) {
          setCategories(catsRes);
          const post = postsRes.posts.find((p) => p.id === id);
          if (!post) {
            setError('Article not found.');
          } else {
            setFormData({
              title: post.title,
              slug: post.slug,
              category_id: post.category_id || '',
              author_name: post.author_name || '',
              status: post.status,
              excerpt: post.excerpt || '',
              content: post.content || '',
              featured_image_url: post.featured_image_url || '',
              meta_title: post.meta_title || '',
              meta_description: post.meta_description || '',
            });
          }
        }
      } catch {
        if (isMounted) {
          setError('Failed to fetch article details.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();
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

    if (formData.content.trim().length < 10) {
      setError('Content must be at least 10 characters.');
      return;
    }

    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(formData.slug.trim())) {
      setError('Slug must be lowercase alphanumeric with hyphens.');
      return;
    }

    setIsSaving(true);
    try {
      await updateAdminBlogPost(token, id, {
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

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/blog');
      }, 1000);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to update blog post.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <LoadingState message="Retrieving article contents..." />;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-950">Edit Insight Article</h2>
          <p className="text-xs text-slate-500 font-mono">ID: {id}</p>
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

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
          Article updated successfully! Redirecting...
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
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            />
          </FormField>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
          <Button href="/admin/blog" variant="outline" size="md">
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
