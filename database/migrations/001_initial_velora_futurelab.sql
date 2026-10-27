-- =============================================================
-- Migration: 001_initial_velora_futurelab.sql
-- Project: VELORA Future Lab
-- Target Database: velora_futurelab
-- Target Schema: public
-- Database Engine: PostgreSQL 18.6
-- =============================================================

-- Ensure pgcrypto extension is available for UUID generation (gen_random_uuid)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Ensure search path is explicitly public
SET search_path TO public;

-- -------------------------------------------------------------
-- 0. TRIGGER FUNCTION: set_updated_at_timestamp
-- Purpose: Maintain updated_at timestamp automatically on record modification
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -------------------------------------------------------------
-- 1. TABLE: admins
-- Purpose: Store administrative users for the VELORA Future Lab admin panel
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'admin',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_admins_email UNIQUE (email)
);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'trg_admins_updated_at'
    ) THEN
        CREATE TRIGGER trg_admins_updated_at
        BEFORE UPDATE ON public.admins
        FOR EACH ROW
        EXECUTE FUNCTION public.set_updated_at_timestamp();
    END IF;
END $$;

-- -------------------------------------------------------------
-- 2. TABLE: services
-- Purpose: Store services / "What We Do" programs and offerings
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(220) NOT NULL,
    short_description TEXT,
    description TEXT,
    image_url TEXT,
    icon VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'published',
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_services_slug UNIQUE (slug)
);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'trg_services_updated_at'
    ) THEN
        CREATE TRIGGER trg_services_updated_at
        BEFORE UPDATE ON public.services
        FOR EACH ROW
        EXECUTE FUNCTION public.set_updated_at_timestamp();
    END IF;
END $$;

-- -------------------------------------------------------------
-- 3. TABLE: blog_categories
-- Purpose: Categories for blog posts and publications
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blog_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(180) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_blog_categories_slug UNIQUE (slug)
);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'trg_blog_categories_updated_at'
    ) THEN
        CREATE TRIGGER trg_blog_categories_updated_at
        BEFORE UPDATE ON public.blog_categories
        FOR EACH ROW
        EXECUTE FUNCTION public.set_updated_at_timestamp();
    END IF;
END $$;

-- -------------------------------------------------------------
-- 4. TABLE: blog_posts
-- Purpose: Articles, updates, and research publications
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(280) NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image_url TEXT,
    author_name VARCHAR(150),
    status VARCHAR(50) NOT NULL DEFAULT 'draft',
    meta_title VARCHAR(255),
    meta_description TEXT,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_blog_posts_slug UNIQUE (slug)
);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'trg_blog_posts_updated_at'
    ) THEN
        CREATE TRIGGER trg_blog_posts_updated_at
        BEFORE UPDATE ON public.blog_posts
        FOR EACH ROW
        EXECUTE FUNCTION public.set_updated_at_timestamp();
    END IF;
END $$;

-- -------------------------------------------------------------
-- 5. TABLE: careers
-- Purpose: Store career and job vacancies
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.careers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_title VARCHAR(200) NOT NULL,
    slug VARCHAR(220) NOT NULL,
    department VARCHAR(150),
    location VARCHAR(150),
    employment_type VARCHAR(50),
    experience VARCHAR(100),
    description TEXT,
    responsibilities TEXT,
    requirements TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_careers_slug UNIQUE (slug)
);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'trg_careers_updated_at'
    ) THEN
        CREATE TRIGGER trg_careers_updated_at
        BEFORE UPDATE ON public.careers
        FOR EACH ROW
        EXECUTE FUNCTION public.set_updated_at_timestamp();
    END IF;
END $$;

-- -------------------------------------------------------------
-- 6. TABLE: job_applications
-- Purpose: Store job applications submitted by candidates
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    career_id UUID REFERENCES public.careers(id) ON DELETE SET NULL,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    resume_url TEXT NOT NULL,
    cover_letter TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'submitted',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'trg_job_applications_updated_at'
    ) THEN
        CREATE TRIGGER trg_job_applications_updated_at
        BEFORE UPDATE ON public.job_applications
        FOR EACH ROW
        EXECUTE FUNCTION public.set_updated_at_timestamp();
    END IF;
END $$;

-- -------------------------------------------------------------
-- 7. TABLE: contact_submissions
-- Purpose: Inquiries and messages submitted via Contact Us page
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    company VARCHAR(200),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'trg_contact_submissions_updated_at'
    ) THEN
        CREATE TRIGGER trg_contact_submissions_updated_at
        BEFORE UPDATE ON public.contact_submissions
        FOR EACH ROW
        EXECUTE FUNCTION public.set_updated_at_timestamp();
    END IF;
END $$;

-- -------------------------------------------------------------
-- 8. TABLE: pages
-- Purpose: Dynamic CMS content and SEO meta data for website pages (Home, About Us, etc.)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(180) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    meta_title VARCHAR(255),
    meta_description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_pages_slug UNIQUE (slug)
);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'trg_pages_updated_at'
    ) THEN
        CREATE TRIGGER trg_pages_updated_at
        BEFORE UPDATE ON public.pages
        FOR EACH ROW
        EXECUTE FUNCTION public.set_updated_at_timestamp();
    END IF;
END $$;

-- -------------------------------------------------------------
-- 9. TABLE: media
-- Purpose: Store media assets metadata and remote URLs (S3/Cloudinary/Vercel Blob)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_type VARCHAR(100),
    file_size BIGINT,
    uploaded_by UUID REFERENCES public.admins(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================
-- PERFORMANCE & INTEGRITY INDEXES
-- =============================================================

-- 1. admins indexes
CREATE INDEX IF NOT EXISTS idx_admins_email ON public.admins (email);
CREATE INDEX IF NOT EXISTS idx_admins_role ON public.admins (role);
CREATE INDEX IF NOT EXISTS idx_admins_is_active ON public.admins (is_active);

-- 2. services indexes
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services (slug);
CREATE INDEX IF NOT EXISTS idx_services_status ON public.services (status);
CREATE INDEX IF NOT EXISTS idx_services_display_order ON public.services (display_order ASC);
CREATE INDEX IF NOT EXISTS idx_services_created_at ON public.services (created_at DESC);

-- 3. blog_categories indexes
CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON public.blog_categories (slug);

-- 4. blog_posts indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_category_id ON public.blog_posts (category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts (status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON public.blog_posts (created_at DESC);

-- 5. careers indexes
CREATE INDEX IF NOT EXISTS idx_careers_slug ON public.careers (slug);
CREATE INDEX IF NOT EXISTS idx_careers_status ON public.careers (status);
CREATE INDEX IF NOT EXISTS idx_careers_department ON public.careers (department);
CREATE INDEX IF NOT EXISTS idx_careers_created_at ON public.careers (created_at DESC);

-- 6. job_applications indexes
CREATE INDEX IF NOT EXISTS idx_job_applications_career_id ON public.job_applications (career_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_email ON public.job_applications (email);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON public.job_applications (status);
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at ON public.job_applications (created_at DESC);

-- 7. contact_submissions indexes
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON public.contact_submissions (email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON public.contact_submissions (status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions (created_at DESC);

-- 8. pages indexes
CREATE INDEX IF NOT EXISTS idx_pages_slug ON public.pages (slug);
CREATE INDEX IF NOT EXISTS idx_pages_status ON public.pages (status);

-- 9. media indexes
CREATE INDEX IF NOT EXISTS idx_media_uploaded_by ON public.media (uploaded_by);
CREATE INDEX IF NOT EXISTS idx_media_created_at ON public.media (created_at DESC);
