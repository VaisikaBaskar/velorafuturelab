# VELORA Future Lab - Database Schema & Migrations

This directory contains the database schema and migration files for the **VELORA Future Lab** website.

---

## Database Connection Details

- **Host**: `localhost`
- **Port**: `5432`
- **Database**: `velora_futurelab`
- **Username**: `postgres`
- **Engine**: PostgreSQL 18.6
- **Target Schema**: `public`
- **Connection URL Format**:
  ```env
  DATABASE_URL=postgresql://postgres:<PASSWORD>@localhost:5432/velora_futurelab
  ```

---

## Schema Overview

The initial schema contains **9 core entities** designed for Next.js (frontend) and Node.js + Express (backend):

| # | Table Name | Purpose | Primary Key | Key Relations & Constraints |
|---|---|---|---|---|
| 1 | `admins` | Administrative users for CMS | `UUID` (gen_random_uuid) | `email` UNIQUE, role, auto `updated_at` |
| 2 | `services` | "What We Do" programs & offerings | `UUID` | `slug` UNIQUE, `display_order`, auto `updated_at` |
| 3 | `blog_categories` | Categories for blog publications | `UUID` | `slug` UNIQUE, auto `updated_at` |
| 4 | `blog_posts` | Research articles & blog posts | `UUID` | `slug` UNIQUE, FK `category_id -> blog_categories(id)`, auto `updated_at` |
| 5 | `careers` | Job vacancies & career openings | `UUID` | `slug` UNIQUE, department, status, auto `updated_at` |
| 6 | `job_applications` | Applications submitted by candidates | `UUID` | FK `career_id -> careers(id)`, `email`, `status` |
| 7 | `contact_submissions` | Contact Us submissions & leads | `UUID` | `email`, `status`, auto `updated_at` |
| 8 | `pages` | Dynamic page content & SEO metadata | `UUID` | `slug` UNIQUE, `title`, `meta_*`, auto `updated_at` |
| 9 | `media` | Uploaded media metadata & remote URLs | `UUID` | FK `uploaded_by -> admins(id)`, remote URLs |

---

## Key Features

- **UUID Primary Keys**: Uses native `gen_random_uuid()` for all entities, preventing ID enumeration.
- **Remote Media Storage**: Only file URLs, sizes, and MIME types are stored in the database.
- **Password Security**: Only password hashes are stored in `admins`. Plain text passwords are never saved.
- **Automatic Timestamps**: PostgreSQL function `set_updated_at_timestamp()` maintains `updated_at` automatically across all mutable tables.
- **Optimized Indexes**:
  - Email lookups (`admins`, `job_applications`, `contact_submissions`)
  - Slugs (`services`, `blog_categories`, `blog_posts`, `careers`, `pages`)
  - Status filters (`services`, `blog_posts`, `careers`, `job_applications`, `contact_submissions`, `pages`)
  - Publication dates (`blog_posts.published_at DESC`)
  - Foreign keys (`job_applications.career_id`, `blog_posts.category_id`, `media.uploaded_by`)
- **Safe Execution**: Uses `IF NOT EXISTS` constructs so migrations can be re-run safely without dropping data.

---

## Running the Migration

### Option 1: Automated Runner (PowerShell)
```powershell
powershell -ExecutionPolicy Bypass -File .\database\setup_db.ps1
```

### Option 2: Using PostgreSQL CLI (`psql`) directly
```bash
psql -U postgres -h localhost -p 5432 -d velora_futurelab -f database/migrations/001_initial_velora_futurelab.sql
```
