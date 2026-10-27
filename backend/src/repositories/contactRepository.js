const { query } = require('../config/db');

const contactRepository = {
  /**
   * Submit a new contact message
   */
  async create({ name, email, phone, company, subject, message, status = 'new' }) {
    const sql = `
      INSERT INTO public.contact_submissions (
        name, email, phone, company, subject, message, status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, name, email, phone, company, subject, message, status, created_at, updated_at;
    `;
    const params = [name, email, phone, company, subject, message, status];
    const res = await query(sql, params);
    return res.rows[0];
  },

  /**
   * Admin: List contact submissions with pagination & status filter
   */
  async findAll({ status = null, page = 1, limit = 20 } = {}) {
    const offset = (Math.max(1, page) - 1) * limit;
    const params = [];
    const conditions = [];

    if (status) {
      params.push(status);
      conditions.push(`status = $${params.length}`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const countSql = `
      SELECT COUNT(*)::int AS total
      FROM public.contact_submissions
      ${whereClause};
    `;
    const countRes = await query(countSql, params);
    const total = countRes.rows[0].total;

    params.push(limit);
    const limitParam = `$${params.length}`;
    params.push(offset);
    const offsetParam = `$${params.length}`;

    const dataSql = `
      SELECT id, name, email, phone, company, subject, message, status, created_at, updated_at
      FROM public.contact_submissions
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ${limitParam} OFFSET ${offsetParam};
    `;
    const dataRes = await query(dataSql, params);

    return {
      submissions: dataRes.rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  /**
   * Find submission by UUID
   */
  async findById(id) {
    const sql = `
      SELECT id, name, email, phone, company, subject, message, status, created_at, updated_at
      FROM public.contact_submissions
      WHERE id = $1
      LIMIT 1;
    `;
    const res = await query(sql, [id]);
    return res.rows[0] || null;
  },

  /**
   * Admin: Update submission status
   */
  async updateStatus(id, status) {
    const sql = `
      UPDATE public.contact_submissions
      SET status = $2
      WHERE id = $1
      RETURNING id, name, email, phone, company, subject, message, status, created_at, updated_at;
    `;
    const res = await query(sql, [id, status]);
    return res.rows[0] || null;
  },
};

module.exports = contactRepository;
