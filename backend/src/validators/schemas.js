const { z } = require('zod');

// Slug validation regex (alphanumeric and hyphens only)
const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// ================= AUTH =================
const loginSchema = z.object({
  email: z.string().trim().min(1, 'Username or email is required'),
  password: z.string().min(1, 'Password is required'),
});

// ================= SERVICES =================
const createServiceSchema = z.object({
  title: z.string().trim().min(2, 'Title must be at least 2 characters').max(200),
  slug: z.string().trim().min(2).max(220).regex(slugRegex, 'Slug must be lower-case alphanumeric with hyphens'),
  short_description: z.string().trim().optional().nullable(),
  description: z.string().trim().optional().nullable(),
  image_url: z.string().trim().url('Image URL must be a valid URL').optional().nullable(),
  icon: z.string().trim().optional().nullable(),
  status: z.enum(['draft', 'published', 'archived']).default('published'),
  display_order: z.coerce.number().int().default(0),
});

const updateServiceSchema = createServiceSchema.partial();

// ================= BLOG =================
const createBlogCategorySchema = z.object({
  name: z.string().trim().min(2, 'Category name must be at least 2 characters').max(150),
  slug: z.string().trim().min(2).max(180).regex(slugRegex, 'Slug must be lower-case alphanumeric with hyphens'),
  description: z.string().trim().optional().nullable(),
});

const createBlogPostSchema = z.object({
  category_id: z.string().uuid('Category ID must be a valid UUID').optional().nullable(),
  title: z.string().trim().min(2, 'Title must be at least 2 characters').max(255),
  slug: z.string().trim().min(2).max(280).regex(slugRegex, 'Slug must be lower-case alphanumeric with hyphens'),
  excerpt: z.string().trim().optional().nullable(),
  content: z.string().trim().min(10, 'Content must be at least 10 characters'),
  featured_image_url: z.string().trim().url('Featured image URL must be a valid URL').optional().nullable(),
  author_name: z.string().trim().max(150).optional().nullable(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  meta_title: z.string().trim().max(255).optional().nullable(),
  meta_description: z.string().trim().optional().nullable(),
  published_at: z.string().datetime().optional().nullable(),
});

const updateBlogPostSchema = createBlogPostSchema.partial();

// ================= CAREERS =================
const createCareerSchema = z.object({
  job_title: z.string().trim().min(2, 'Job title must be at least 2 characters').max(200),
  slug: z.string().trim().min(2).max(220).regex(slugRegex, 'Slug must be lower-case alphanumeric with hyphens'),
  department: z.string().trim().max(150).optional().nullable(),
  location: z.string().trim().max(150).optional().nullable(),
  employment_type: z.string().trim().max(50).optional().nullable(),
  experience: z.string().trim().max(100).optional().nullable(),
  description: z.string().trim().optional().nullable(),
  responsibilities: z.string().trim().optional().nullable(),
  requirements: z.string().trim().optional().nullable(),
  status: z.enum(['active', 'closed', 'draft']).default('active'),
});

const updateCareerSchema = createCareerSchema.partial();

const applyCareerSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(150),
  email: z.string().trim().email('A valid email address is required'),
  phone: z.string().trim().max(30).optional().nullable(),
  resume_url: z.string().trim().url('A valid resume URL is required'),
  cover_letter: z.string().trim().optional().nullable(),
});

// ================= CONTACT =================
const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(150),
  email: z.string().trim().email('A valid email address is required'),
  phone: z.string().trim().max(30).optional().nullable(),
  company: z.string().trim().max(200).optional().nullable(),
  subject: z.string().trim().max(255).optional().nullable(),
  message: z.string().trim().min(5, 'Message must be at least 5 characters'),
});

// ================= STATUS UPDATE SCHEMAS =================
const updateApplicationStatusSchema = z.object({
  status: z.enum(['submitted', 'reviewing', 'interviewed', 'offered', 'rejected']),
});

const updateContactStatusSchema = z.object({
  status: z.enum(['new', 'in_progress', 'resolved', 'archived']),
});

// UUID param schema
const uuidParamSchema = z.object({
  id: z.string().uuid('Invalid UUID parameter'),
});

module.exports = {
  loginSchema,
  createServiceSchema,
  updateServiceSchema,
  createBlogCategorySchema,
  createBlogPostSchema,
  updateBlogPostSchema,
  createCareerSchema,
  updateCareerSchema,
  applyCareerSchema,
  contactSchema,
  updateApplicationStatusSchema,
  updateContactStatusSchema,
  uuidParamSchema,
};
