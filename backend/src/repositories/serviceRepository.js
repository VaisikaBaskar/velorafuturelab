const { query } = require('../config/db');

const serviceRepository = {
  /**
   * Find all publicly accessible services
   */
  async findPublished() {
    const sql = `
      SELECT id, title, slug, short_description, description, image_url, icon, status, display_order, created_at, updated_at
      FROM public.services
      WHERE status = 'published'
      ORDER BY display_order ASC, created_at DESC;
    `;
    const res = await query(sql);
    return res.rows;
  },

  /**
   * Find a service by unique slug
   * @param {string} slug
   * @param {boolean} onlyPublished
   */
  async findBySlug(slug, onlyPublished = true) {
    let sql = `
      SELECT id, title, slug, short_description, description, image_url, icon, status, display_order, created_at, updated_at
      FROM public.services
      WHERE slug = $1
    `;
    const params = [slug];

    if (onlyPublished) {
      sql += ` AND status = 'published'`;
    }

    sql += ` LIMIT 1;`;
    const res = await query(sql, params);
    return res.rows[0] || null;
  },

  /**
   * Admin: Find all services with optional status filter
   */
  async findAll({ status = null } = {}) {
    let sql = `
      SELECT id, title, slug, short_description, description, image_url, icon, status, display_order, created_at, updated_at
      FROM public.services
    `;
    const params = [];

    if (status) {
      params.push(status);
      sql += ` WHERE status = $${params.length}`;
    }

    sql += ` ORDER BY display_order ASC, created_at DESC;`;
    const res = await query(sql, params);
    return res.rows;
  },

  /**
   * Find a service by UUID
   * @param {string} id
   */
  async findById(id) {
    const sql = `
      SELECT id, title, slug, short_description, description, image_url, icon, status, display_order, created_at, updated_at
      FROM public.services
      WHERE id = $1
      LIMIT 1;
    `;
    const res = await query(sql, [id]);
    return res.rows[0] || null;
  },

  /**
   * Create a new service
   */
  async create({ title, slug, short_description, description, image_url, icon, status = 'published', display_order = 0 }) {
    const sql = `
      INSERT INTO public.services (title, slug, short_description, description, image_url, icon, status, display_order)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, title, slug, short_description, description, image_url, icon, status, display_order, created_at, updated_at;
    `;
    const params = [title, slug, short_description, description, image_url, icon, status, display_order];
    const res = await query(sql, params);
    return res.rows[0];
  },

  /**
   * Update an existing service by UUID
   */
  async update(id, fields) {
    const allowedKeys = ['title', 'slug', 'short_description', 'description', 'image_url', 'icon', 'status', 'display_order'];
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
      UPDATE public.services
      SET ${updates.join(', ')}
      WHERE id = $1
      RETURNING id, title, slug, short_description, description, image_url, icon, status, display_order, created_at, updated_at;
    `;
    const res = await query(sql, params);
    return res.rows[0] || null;
  },

  /**
   * Delete a service by UUID
   */
  async delete(id) {
    const sql = `DELETE FROM public.services WHERE id = $1 RETURNING id;`;
    const res = await query(sql, [id]);
    return res.rows[0] || null;
  },
};

module.exports = serviceRepository;
