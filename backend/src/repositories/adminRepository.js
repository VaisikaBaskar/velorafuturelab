const { query } = require('../config/db');

const adminRepository = {
  /**
   * Find an admin by email
   * @param {string} email
   */
  async findByEmail(email) {
    const sql = `
      SELECT id, name, email, password_hash, role, is_active, last_login, created_at, updated_at
      FROM public.admins
      WHERE LOWER(email) = LOWER($1)
         OR LOWER(email) = LOWER(SPLIT_PART($1, '@', 1))
         OR LOWER(SPLIT_PART(email, '@', 1)) = LOWER($1)
      LIMIT 1;
    `;
    const res = await query(sql, [email]);
    return res.rows[0] || null;
  },

  /**
   * Find an admin by UUID
   * @param {string} id
   */
  async findById(id) {
    const sql = `
      SELECT id, name, email, role, is_active, last_login, created_at, updated_at
      FROM public.admins
      WHERE id = $1
      LIMIT 1;
    `;
    const res = await query(sql, [id]);
    return res.rows[0] || null;
  },

  /**
   * Update the last_login timestamp for an admin
   * @param {string} id
   */
  async updateLastLogin(id) {
    const sql = `
      UPDATE public.admins
      SET last_login = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING id, last_login;
    `;
    const res = await query(sql, [id]);
    return res.rows[0] || null;
  },

  /**
   * Count total registered admins
   */
  async count() {
    const sql = `SELECT COUNT(*)::int AS total FROM public.admins;`;
    const res = await query(sql);
    return res.rows[0].total;
  },

  /**
   * Create a new admin account (internal use / initial provisioning)
   */
  async create({ name, email, password_hash, role = 'admin' }) {
    const sql = `
      INSERT INTO public.admins (name, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, role, is_active, created_at;
    `;
    const res = await query(sql, [name, email, password_hash, role]);
    return res.rows[0];
  },
};

module.exports = adminRepository;
