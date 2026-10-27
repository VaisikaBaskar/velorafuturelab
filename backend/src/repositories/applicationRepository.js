const { query } = require('../config/db');

const applicationRepository = {
  /**
   * Submit a new job application
   */
  async create({ career_id, name, email, phone, resume_url, cover_letter, status = 'submitted' }) {
    const sql = `
      INSERT INTO public.job_applications (
        career_id, name, email, phone, resume_url, cover_letter, status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, career_id, name, email, phone, resume_url, cover_letter, status, created_at, updated_at;
    `;
    const params = [career_id, name, email, phone, resume_url, cover_letter, status];
    const res = await query(sql, params);
    return res.rows[0];
  },

  /**
   * Admin: List applications with optional status/career filter & pagination
   */
  async findAll({ status = null, careerId = null, page = 1, limit = 20 } = {}) {
    const offset = (Math.max(1, page) - 1) * limit;
    const params = [];
    const conditions = [];

    if (status) {
      params.push(status);
      conditions.push(`a.status = $${params.length}`);
    }

    if (careerId) {
      params.push(careerId);
      conditions.push(`a.career_id = $${params.length}`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const countSql = `
      SELECT COUNT(*)::int AS total
      FROM public.job_applications a
      ${whereClause};
    `;
    const countRes = await query(countSql, params);
    const total = countRes.rows[0].total;

    params.push(limit);
    const limitParam = `$${params.length}`;
    params.push(offset);
    const offsetParam = `$${params.length}`;

    const dataSql = `
      SELECT 
        a.id, a.career_id, a.name, a.email, a.phone, a.resume_url, a.cover_letter, a.status,
        a.created_at, a.updated_at,
        c.job_title, c.department, c.location
      FROM public.job_applications a
      LEFT JOIN public.careers c ON a.career_id = c.id
      ${whereClause}
      ORDER BY a.created_at DESC
      LIMIT ${limitParam} OFFSET ${offsetParam};
    `;
    const dataRes = await query(dataSql, params);

    return {
      applications: dataRes.rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  /**
   * Find application by UUID
   */
  async findById(id) {
    const sql = `
      SELECT 
        a.id, a.career_id, a.name, a.email, a.phone, a.resume_url, a.cover_letter, a.status,
        a.created_at, a.updated_at,
        c.job_title, c.department, c.location
      FROM public.job_applications a
      LEFT JOIN public.careers c ON a.career_id = c.id
      WHERE a.id = $1
      LIMIT 1;
    `;
    const res = await query(sql, [id]);
    return res.rows[0] || null;
  },

  /**
   * Admin: Update application status
   */
  async updateStatus(id, status) {
    const sql = `
      UPDATE public.job_applications
      SET status = $2
      WHERE id = $1
      RETURNING id, career_id, name, email, phone, resume_url, cover_letter, status, created_at, updated_at;
    `;
    const res = await query(sql, [id, status]);
    return res.rows[0] || null;
  },
};

module.exports = applicationRepository;
