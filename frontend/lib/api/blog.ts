import { apiRequest } from './client';
import { BlogCategory, BlogListResponse, BlogPost } from '@/types/api';

/**
 * Fetch all blog categories
 */
export async function getBlogCategories(): Promise<BlogCategory[]> {
  return apiRequest<BlogCategory[]>('/blog/categories');
}

/**
 * Fetch published blog posts with optional category filter and pagination
 */
export async function getBlogPosts(params?: {
  category?: string;
  page?: number;
  limit?: number;
}): Promise<BlogListResponse> {
  const query = new URLSearchParams();
  if (params?.category) query.append('category', params.category);
  if (params?.page) query.append('page', params.page.toString());
  if (params?.limit) query.append('limit', params.limit.toString());

  const queryString = query.toString();
  const endpoint = `/blog${queryString ? `?${queryString}` : ''}`;
  return apiRequest<BlogListResponse>(endpoint);
}

/**
 * Fetch single published blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  return apiRequest<BlogPost>(`/blog/${encodeURIComponent(slug)}`);
}
