'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { getAdminBlogPosts, deleteAdminBlogPost } from '@/lib/api/admin';
import { getBlogCategories } from '@/lib/api/blog';
import { BlogPost, BlogCategory } from '@/types/api';
import StatusBadge from '@/components/admin/StatusBadge';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import Button from '@/components/ui/Button';

export default function AdminBlogListPage() {
  const { token } = useAdminAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Deletion modal state
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const [postsRes, catsRes] = await Promise.all([
        getAdminBlogPosts(token, {
          status: statusFilter,
          category_id: categoryFilter,
          limit: 50,
        }),
        getBlogCategories().catch(() => []),
      ]);

      setPosts(postsRes.posts || []);
      setCategories(catsRes);
    } catch {
      setError('Unable to load blog articles from backend.');
    } finally {
      setLoading(false);
    }
  }, [token, statusFilter, categoryFilter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDeleteConfirm = async () => {
    if (!token || !postToDelete) return;
    setIsDeleting(true);
    try {
      await deleteAdminBlogPost(token, postToDelete.id);
      setPosts((prev) => prev.filter((p) => p.id !== postToDelete.id));
      setPostToDelete(null);
    } catch {
      alert('Failed to delete post. Please verify connection.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <Button href="/admin/blog/categories" variant="outline" size="md">
            Taxonomies / Categories
          </Button>
          <Button href="/admin/blog/new" variant="primary" size="md">
            + New Article
          </Button>
        </div>
      </div>

      {loading ? (
        <LoadingState message="Loading articles catalog..." />
      ) : error ? (
        <ErrorState title="Error Loading Articles" message={error} onRetry={loadData} />
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <p className="text-sm text-slate-500">No blog posts found matching your filter parameters.</p>
          <div>
            <Button href="/admin/blog/new" variant="outline" size="sm">
              Draft the first article
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4 sm:px-6">Article Title</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Author</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/50 transition">
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-semibold text-slate-900">{post.title}</div>
                      <div className="text-xs font-mono text-slate-400 mt-0.5">{post.slug}</div>
                    </td>
                    <td className="py-4 px-4 text-xs font-medium text-slate-600">
                      {post.category_name || 'Unassigned'}
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-500">
                      {post.author_name || 'VELORA Team'}
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={post.status} />
                    </td>
                    <td className="py-4 px-4 text-xs text-slate-500">
                      {post.published_at ? new Date(post.published_at).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right space-x-2">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="inline-flex px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => setPostToDelete(post)}
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
        isOpen={!!postToDelete}
        title="Delete Blog Article"
        message={`Are you sure you want to permanently delete "${postToDelete?.title}"?`}
        confirmLabel="Delete Post"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setPostToDelete(null)}
      />
    </div>
  );
}
