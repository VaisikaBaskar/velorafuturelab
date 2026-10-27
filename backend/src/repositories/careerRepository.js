const { query } = require('../config/db');

const careerRepository = {
  /**
   * Public: List active career openings
   */
  async findActive() {
    const sql = `
      SELECT id, job_title, slug, department, location, employment_type, experience, description, responsibilities, requirements, status, created_at, updated_at
      FROM public.careers
      WHERE status = 'active'
      ORDER BY created_at DESC;
    `;
    const res = await query(sql);
    return res.rows;
  },

  /**
   * Public/Admin: Find career opening by unique slug
   */
  async findBySlug(slug, onlyActive = true) {
    let sql = `
      SELECT id, job_title, slug, department, location, employment_type, experience, description, responsibilities, requirements, status, created_at, updated_at
      FROM public.careers
      WHERE slug = $1
    `;
    const params = [slug];

    if (onlyActive) {
      sql += ` AND status = 'active'`;
    }

    sql += ` LIMIT 1;`;
    const res = await query(sql, params);
    return res.rows[0] || null;
  },

  /**
   * Admin: List all career openings with optional status/department filter
   */
  async findAll({ status = null, department = null } = {}) {
    let sql = `
      SELECT id, job_title, slug, department, location, employment_type, experience, description, responsibilities, requirements, status, created_at, updated_at
      FROM public.careers
    `;
    const params = [];
    const conditions = [];

    if (status) {
      params.push(status);
      conditions.push(`status = $${params.length}`);
    }

    if (department) {
      params.push(department);
      conditions.push(`department = $${params.length}`);
    }

    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    sql += ` ORDER BY created_at DESC;`;
    const res = await query(sql, params);
    return res.rows;
  },

  /**
   * Find career opening by UUID
   */
  async findById(id) {
    const sql = `
      SELECT id, job_title, slug, department, location, employment_type, experience, description, responsibilities, requirements, status, created_at, updated_at
      FROM public.careers
      WHERE id = $1
      LIMIT 1;
    `;
    const res = await query(sql, [id]);
    return res.rows[0] || null;
  },

  /**
   * Admin: Create a new career opening
   */
  async create({ job_title, slug, department, location, employment_type, experience, description, responsibilities, requirements, status = 'active' }) {
    const sql = `
      INSERT INTO public.careers (
        job_title, slug, department, location, employment_type, experience,
        description, responsibilities, requirements, status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id, job_title, slug, department, location, employment_type, experience, description, responsibilities, requirements, status, created_at, updated_at;
    `;
    const params = [job_title, slug, department, location, employment_type, experience, description, responsibilities, requirements, status];
    const res = await query(sql, params);
    return res.rows[0];
  },

  /**
   * Admin: Update career opening by UUID
   */
  async update(id, fields) {
    const allowedKeys = ['job_title', 'slug', 'department', 'location', 'employment_type', 'experience', 'description', 'responsibilities', 'requirements', 'status'];
    const updates = [];
    const params = [id];

    for (const key of allowedKeys) {
      if (fields[key] !== undefined) {
        params.push(fields[key]);
        updates.push(`${key} = $${params.length}`);
      }
    }

    if (updates.length === 0) {
      return this.findById(id);
    }

    const sql = `
      UPDATE public.careers
      SET ${updates.join(', ')}
      WHERE id = $1
      RETURNING id, job_title, slug, department, location, employment_type, experience, description, responsibilities, requirements, status, created_at, updated_at;
    `;
    const res = await query(sql, params);
    return res.rows[0] || null;
  },

  /**
   * Admin: Delete career opening by UUID
   */
  async delete(id) {
    const sql = `DELETE FROM public.careers WHERE id = $1 RETURNING id;`;
    const res = await query(sql, [id]);
    return res.rows[0] || null;
  },
};

module.exports = careerRepository;
