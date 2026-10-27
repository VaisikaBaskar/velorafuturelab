# VELORA Future Lab — Backend API

Production-ready REST API for the **VELORA Future Lab** platform built with Node.js, Express.js, and PostgreSQL.

---

## Prerequisites

- **Node.js**: v18.0.0+ (Tested on v24.21.0)
- **npm**: v9.0.0+ (Tested on v11.19.0)
- **PostgreSQL**: v14+ (Installed & verified on PostgreSQL 18.6)
- **Database**: `velora_futurelab` (with initial 9-table schema applied)

---

## Installation & Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set your PostgreSQL credentials and JWT secret:
   ```env
   NODE_ENV=development
   PORT=5000

   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=velora_futurelab
   DB_USER=postgres
   DB_PASSWORD=your_actual_postgres_password

   DATABASE_URL=postgresql://postgres:your_actual_postgres_password@localhost:5432/velora_futurelab

   JWT_SECRET=your_secure_random_jwt_secret_min_16_chars
   JWT_EXPIRES_IN=1d
   ```

---

## Running the Application

### Development Mode (with hot reloading via Nodemon):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

---

## Admin Account Provisioning

To create an initial administrator account securely without hardcoding credentials:
```bash
node scripts/create-admin.js "VELORA Administrator" "admin@velorafuturelab.com" "YourStrongPassword123!" admin
```

---

## API Endpoints Reference

### Public APIs (No Authentication Required)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check endpoint |
| `GET` | `/api/services` | List published services (ordered by `display_order ASC`) |
| `GET` | `/api/services/:slug` | Get service details by slug |
| `GET` | `/api/blog/categories` | List all blog categories |
| `GET` | `/api/blog` | List published blog posts (supports `category`, `page`, `limit`) |
| `GET` | `/api/blog/:slug` | Get published blog post by slug |
| `GET` | `/api/careers` | List active job openings |
| `GET` | `/api/careers/:slug` | Get job opening details by slug |
| `POST` | `/api/careers/:id/apply` | Submit job application (`name`, `email`, `phone`, `resume_url`, `cover_letter`) |
| `POST` | `/api/contact` | Submit contact inquiry (`name`, `email`, `phone`, `company`, `subject`, `message`) |

---

### Admin APIs (Protected via `Authorization: Bearer <JWT>`)

#### Authentication
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/admin/auth/login` | Admin login with email & password |
| `GET` | `/api/admin/auth/me` | Get current authenticated admin profile |

#### Service Management
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/services` | List all services (supports `?status=`) |
| `POST` | `/api/admin/services` | Create new service |
| `PUT` | `/api/admin/services/:id` | Update service by UUID |
| `DELETE` | `/api/admin/services/:id` | Delete service by UUID |

#### Blog Management
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/blog` | List all blog posts (supports `?status=`, `?category_id=`, `page`, `limit`) |
| `POST` | `/api/admin/blog` | Create new blog post |
| `PUT` | `/api/admin/blog/:id` | Update blog post by UUID |
| `DELETE` | `/api/admin/blog/:id` | Delete blog post by UUID |
| `POST` | `/api/admin/blog/categories` | Create new blog category |

#### Career Management
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/careers` | List all career openings (supports `?status=`, `?department=`) |
| `POST` | `/api/admin/careers` | Create new career opening |
| `PUT` | `/api/admin/careers/:id` | Update career opening by UUID |
| `DELETE` | `/api/admin/careers/:id` | Delete career opening by UUID |

#### Candidate Applications
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/applications` | List applications with job title & details |
| `PUT` | `/api/admin/applications/:id` | Update application status (`submitted`, `reviewing`, `interviewed`, `offered`, `rejected`) |

#### Contact Inquiries
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/contact-submissions` | List inquiries with status filter & pagination |
| `PUT` | `/api/admin/contact-submissions/:id` | Update inquiry status (`new`, `in_progress`, `resolved`, `archived`) |

---

## Standard Response Format

### Successful Response:
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional descriptive message"
}
```

### Error Response:
```json
{
  "success": false,
  "message": "Descriptive error message"
}
```

---

## Security Implementation

- **Helmet**: Secures HTTP response headers against standard web vulnerabilities.
- **CORS**: Configured with allowed methods and headers for Next.js frontend integration.
- **Parameterized SQL**: All database operations use `$1, $2, ...` placeholders via `pg` driver, preventing SQL injection.
- **Password Protection**: Passwords are encrypted with bcrypt (10 rounds) and never stored as plain text.
- **JWT Authorization**: Stateless Bearer tokens with active account validation on protected routes.
- **Input Validation**: Strict request schema validation powered by Zod on both public and admin routes.
- **Credential Safety**: No database passwords or JWT secrets are exposed in logs, API responses, or repository commits.
