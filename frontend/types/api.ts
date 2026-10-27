/**
 * API Response and Entity Types for VELORA Future Lab
 * Aligned precisely with the Node.js/Express PostgreSQL backend
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  details?: unknown;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  details?: unknown;
}

// ================= ENTITIES =================

export interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  image_url: string | null;
  icon: string | null;
  status: 'draft' | 'published' | 'archived';
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  category_id: string | null;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  author_name: string | null;
  status: 'draft' | 'published' | 'archived';
  meta_title: string | null;
  meta_description: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category_name?: string | null;
  category_slug?: string | null;
}

export interface BlogPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface BlogListResponse {
  posts: BlogPost[];
  pagination: BlogPagination;
}

export interface Career {
  id: string;
  job_title: string;
  slug: string;
  department: string | null;
  location: string | null;
  employment_type: string | null;
  experience: string | null;
  description: string | null;
  responsibilities: string | null;
  requirements: string | null;
  status: 'active' | 'closed' | 'draft';
  created_at: string;
  updated_at: string;
}

export interface JobApplicationInput {
  name: string;
  email: string;
  phone?: string;
  resume_url: string;
  cover_letter?: string;
}

export interface JobApplication {
  id: string;
  career_id: string;
  name: string;
  email: string;
  phone: string | null;
  resume_url: string;
  cover_letter: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// ================= ADMIN & CMS ENTITIES =================

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin';
  is_active?: boolean;
  last_login?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface AuthLoginResponse {
  token: string;
  admin: AdminUser;
}

export interface ServiceInput {
  title: string;
  slug: string;
  short_description?: string | null;
  description?: string | null;
  image_url?: string | null;
  icon?: string | null;
  status: 'draft' | 'published' | 'archived';
  display_order: number;
}

export interface BlogCategoryInput {
  name: string;
  slug: string;
  description?: string | null;
}

export interface BlogPostInput {
  category_id?: string | null;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  featured_image_url?: string | null;
  author_name?: string | null;
  status: 'draft' | 'published' | 'archived';
  meta_title?: string | null;
  meta_description?: string | null;
  published_at?: string | null;
}

export interface CareerInput {
  job_title: string;
  slug: string;
  department?: string | null;
  location?: string | null;
  employment_type?: string | null;
  experience?: string | null;
  description?: string | null;
  responsibilities?: string | null;
  requirements?: string | null;
  status: 'active' | 'closed' | 'draft';
}

export interface AdminApplication extends JobApplication {
  job_title?: string | null;
  department?: string | null;
  location?: string | null;
}

export interface ApplicationListResponse {
  applications: AdminApplication[];
  pagination: BlogPagination;
}

export interface ContactSubmissionListResponse {
  submissions: ContactSubmission[];
  pagination: BlogPagination;
}

