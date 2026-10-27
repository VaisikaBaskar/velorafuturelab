# VELORA Future Lab — Next.js Frontend Foundation

Production-ready frontend foundation for **VELORA Future Lab** built with Next.js (App Router), React, TypeScript, and Tailwind CSS.

---

## Architecture Overview

```
frontend/
├── app/
│   ├── layout.tsx             # Root layout with SEO metadata, Navbar & Footer
│   ├── page.tsx               # Home page
│   ├── about-us/page.tsx      # About Us page
│   ├── what-we-do/
│   │   ├── page.tsx           # Services listing (GET /api/services)
│   │   └── [slug]/page.tsx    # Service detail (GET /api/services/:slug)
│   ├── careers/
│   │   ├── page.tsx           # Careers listing (GET /api/careers)
│   │   └── [slug]/page.tsx    # Career detail & application form (POST /api/careers/:id/apply)
│   ├── blog/
│   │   ├── page.tsx           # Blog listing with category filter & pagination
│   │   └── [slug]/page.tsx    # Blog post detail (GET /api/blog/:slug)
│   └── contact-us/page.tsx    # Contact Us page (POST /api/contact)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── PageContainer.tsx
│   ├── common/
│   │   ├── LoadingState.tsx
│   │   └── ErrorState.tsx
│   └── sections/
│       ├── ContactForm.tsx
│       └── CareerApplicationForm.tsx
├── lib/
│   └── api/
│       ├── client.ts          # Centralized fetch wrapper
│       ├── services.ts        # Services API queries
│       ├── blog.ts            # Blog API queries
│       ├── careers.ts         # Careers API queries & application submissions
│       └── contact.ts         # Contact inquiries submission
├── types/
│   └── api.ts                 # TypeScript types matching PostgreSQL backend responses
├── .env.example
├── .env.local
└── package.json
```

---

## Getting Started

### 1. Prerequisites
- **Node.js**: v18+ (tested with v24.21.0)
- **Backend API**: Running at `http://localhost:5000`

### 2. Environment Configuration
Create or edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Running the Frontend

Development mode:
```bash
npm run dev
```
The application will be accessible at: `http://localhost:3000`

Production build:
```bash
npm run build
npm start
```
