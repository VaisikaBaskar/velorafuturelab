import {
  AdminUser,
  AuthLoginResponse,
  Service,
  ServiceInput,
  BlogCategory,
  BlogCategoryInput,
  BlogPost,
  BlogPostInput,
  BlogListResponse,
  Career,
  CareerInput,
  AdminApplication,
  ApplicationListResponse,
  ContactSubmission,
  ContactSubmissionListResponse,
  ApiResponse,
} from '@/types/api';
import { ApiError } from './client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Low-level authenticated request runner for admin endpoints
 */
export async function adminRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeoutMs = 10000;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const config: RequestInit = {
    ...options,
    signal: options.signal || controller.signal,
    headers,
    cache: 'no-store',
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(timeoutId);
    const result = await response.json().catch(() => null);

    if (!response.ok) {
      if (response.status === 401 && typeof window !== 'undefined' && !endpoint.includes('/auth/login')) {
        window.dispatchEvent(new CustomEvent('velora-admin-unauthorized'));
      }

      const errorMessage =
        result && typeof result === 'object' && 'message' in result
          ? (result as { message: string }).message
          : `Request failed with status ${response.status}`;

      throw new ApiError(errorMessage, response.status, result?.details);
    }

    const payload = result as ApiResponse<T>;
    return payload.data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError('Request timed out. Please verify backend server connectivity.', 408);
    }
    const message = error instanceof Error ? error.message : 'Network communication failure';
    throw new ApiError(message, 500);
  }
}

// ================= AUTH =================

export async function adminLogin(credentials: {
  email: string;
  password: string;
}): Promise<AuthLoginResponse> {
  return adminRequest<AuthLoginResponse>('/admin/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function getAdminMe(token: string): Promise<{ admin: AdminUser }> {
  return adminRequest<{ admin: AdminUser }>('/admin/auth/me', { method: 'GET' }, token);
}

// ================= SERVICES =================

export async function getAdminServices(token: string, status?: string): Promise<Service[]> {
  const query = status && status !== 'all' ? `?status=${encodeURIComponent(status)}` : '';
  return adminRequest<Service[]>(`/admin/services${query}`, { method: 'GET' }, token);
}

export async function createAdminService(token: string, data: ServiceInput): Promise<Service> {
  return adminRequest<Service>('/admin/services', {
    method: 'POST',
    body: JSON.stringify(data),
  }, token);
}

export async function updateAdminService(
  token: string,
  id: string,
  data: Partial<ServiceInput>
): Promise<Service> {
  return adminRequest<Service>(`/admin/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, token);
}

export async function deleteAdminService(token: string, id: string): Promise<{ id: string }> {
  return adminRequest<{ id: string }>(`/admin/services/${id}`, {
    method: 'DELETE',
  }, token);
}

// ================= BLOG =================

export async function getAdminBlogPosts(
  token: string,
  params?: { status?: string; category_id?: string; page?: number; limit?: number }
): Promise<BlogListResponse> {
  const query = new URLSearchParams();
  if (params?.status && params.status !== 'all') query.set('status', params.status);
  if (params?.category_id && params.category_id !== 'all') query.set('category_id', params.category_id);
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));

  const qs = query.toString() ? `?${query.toString()}` : '';
  return adminRequest<BlogListResponse>(`/admin/blog${qs}`, { method: 'GET' }, token);
}

export async function createAdminBlogPost(token: string, data: BlogPostInput): Promise<BlogPost> {
  return adminRequest<BlogPost>('/admin/blog', {
    method: 'POST',
    body: JSON.stringify(data),
  }, token);
}

export async function updateAdminBlogPost(
  token: string,
  id: string,
  data: Partial<BlogPostInput>
): Promise<BlogPost> {
  return adminRequest<BlogPost>(`/admin/blog/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, token);
}

export async function deleteAdminBlogPost(token: string, id: string): Promise<{ id: string }> {
  return adminRequest<{ id: string }>(`/admin/blog/${id}`, {
    method: 'DELETE',
  }, token);
}

export async function createAdminBlogCategory(
  token: string,
  data: BlogCategoryInput
): Promise<BlogCategory> {
  return adminRequest<BlogCategory>('/admin/blog/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  }, token);
}

// ================= CAREERS =================

export async function getAdminCareers(
  token: string,
  params?: { status?: string; department?: string }
): Promise<Career[]> {
  const query = new URLSearchParams();
  if (params?.status && params.status !== 'all') query.set('status', params.status);
  if (params?.department && params.department !== 'all') query.set('department', params.department);

  const qs = query.toString() ? `?${query.toString()}` : '';
  return adminRequest<Career[]>(`/admin/careers${qs}`, { method: 'GET' }, token);
}

export async function createAdminCareer(token: string, data: CareerInput): Promise<Career> {
  return adminRequest<Career>('/admin/careers', {
    method: 'POST',
    body: JSON.stringify(data),
  }, token);
}

export async function updateAdminCareer(
  token: string,
  id: string,
  data: Partial<CareerInput>
): Promise<Career> {
  return adminRequest<Career>(`/admin/careers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }, token);
}

export async function deleteAdminCareer(token: string, id: string): Promise<{ id: string }> {
  return adminRequest<{ id: string }>(`/admin/careers/${id}`, {
    method: 'DELETE',
  }, token);
}

// ================= APPLICATIONS =================

export async function getAdminApplications(
  token: string,
  params?: { status?: string; career_id?: string; page?: number; limit?: number }
): Promise<ApplicationListResponse> {
  const query = new URLSearchParams();
  if (params?.status && params.status !== 'all') query.set('status', params.status);
  if (params?.career_id && params.career_id !== 'all') query.set('career_id', params.career_id);
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));

  const qs = query.toString() ? `?${query.toString()}` : '';
  return adminRequest<ApplicationListResponse>(`/admin/applications${qs}`, { method: 'GET' }, token);
}

export async function updateAdminApplicationStatus(
  token: string,
  id: string,
  status: string
): Promise<AdminApplication> {
  return adminRequest<AdminApplication>(`/admin/applications/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }, token);
}

// ================= CONTACT SUBMISSIONS =================

export async function getAdminContactSubmissions(
  token: string,
  params?: { status?: string; page?: number; limit?: number }
): Promise<ContactSubmissionListResponse> {
  const query = new URLSearchParams();
  if (params?.status && params.status !== 'all') query.set('status', params.status);
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));

  const qs = query.toString() ? `?${query.toString()}` : '';
  return adminRequest<ContactSubmissionListResponse>(`/admin/contact-submissions${qs}`, { method: 'GET' }, token);
}

export async function updateAdminContactSubmissionStatus(
  token: string,
  id: string,
  status: string
): Promise<ContactSubmission> {
  return adminRequest<ContactSubmission>(`/admin/contact-submissions/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }, token);
}
