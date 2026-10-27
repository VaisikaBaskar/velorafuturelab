const { query } = require('../config/db');

const blogRepository = {
  // ================= CATEGORIES =================
  async findCategories() {
    const sql = `
      SELECT id, name, slug, description, created_at, updated_at
      FROM public.blog_categories
      ORDER BY name ASC;
    `;
    const res = await query(sql);
    return res.rows;
  },

  async findCategoryBySlug(slug) {
    const sql = `
      SELECT id, name, slug, description, created_at, updated_at
      FROM public.blog_categories
      WHERE slug = $1
      LIMIT 1;
    `;
    const res = await query(sql, [slug]);
    return res.rows[0] || null;
  },

  async createCategory({ name, slug, description }) {
    const sql = `
      INSERT INTO public.blog_categories (name, slug, description)
      VALUES ($1, $2, $3)
      RETURNING id, name, slug, description, created_at, updated_at;
    `;
    const res = await query(sql, [name, slug, description]);
    return res.rows[0];
  },

  // ================= POSTS =================
  /**
   * Public: Find published blog posts with pagination and optional category filter
   */
  async findPublishedPosts({ categorySlug = null, page = 1, limit = 10 } = {}) {
    const offset = (Math.max(1, page) - 1) * limit;
    const params = [];
    let whereClause = `WHERE p.status = 'published'`;

    if (categorySlug) {
      params.push(categorySlug);
      whereClause += ` AND c.slug = $${params.length}`;
    }

    // Count total query
    const countSql = `
      SELECT COUNT(*)::int AS total
      FROM public.blog_posts p
      LEFT JOIN public.blog_categories c ON p.category_id = c.id
      ${whereClause};
    `;
    const countRes = await query(countSql, params);
    const total = countRes.rows[0].total;

    // Data query
    params.push(limit);
    const limitParam = `$${params.length}`;
    params.push(offset);
    const offsetParam = `$${params.length}`;

    const dataSql = `
      SELECT 
        p.id, p.title, p.slug, p.excerpt, p.content, p.featured_image_url,
        p.author_name, p.status, p.meta_title, p.meta_description,
        p.published_at, p.created_at, p.updated_at,
        c.id AS category_id, c.name AS category_name, c.slug AS category_slug
      FROM public.blog_posts p
      LEFT JOIN public.blog_categories c ON p.category_id = c.id
      ${whereClause}
      ORDER BY p.published_at DESC NULLS LAST, p.created_at DESC
      LIMIT ${limitParam} OFFSET ${offsetParam};
    `;

    const dataRes = await query(dataSql, params);
    return {
      posts: dataRes.rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  /**
   * Public: Find published post by unique slug
   */
  async findPublishedPostBySlug(slug) {
    const sql = `
      SELECT 
        p.id, p.title, p.slug, p.excerpt, p.content, p.featured_image_url,
        p.author_name, p.status, p.meta_title, p.meta_description,
        p.published_at, p.created_at, p.updated_at,
        c.id AS category_id, c.name AS category_name, c.slug AS category_slug
      FROM public.blog_posts p
      LEFT JOIN public.blog_categories c ON p.category_id = c.id
      WHERE p.slug = $1 AND p.status = 'published'
      LIMIT 1;
    `;
    const res = await query(sql, [slug]);
    return res.rows[0] || null;
  },

  /**
   * Admin: Find all posts
   */
  async findAllPosts({ status = null, categoryId = null, page = 1, limit = 20 } = {}) {
    const offset = (Math.max(1, page) - 1) * limit;
    const params = [];
    const conditions = [];

    if (status) {
      params.push(status);
      conditions.push(`p.status = $${params.length}`);
    }

    if (categoryId) {
      params.push(categoryId);
      conditions.push(`p.category_id = $${params.length}`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const countSql = `
      SELECT COUNT(*)::int AS total
      FROM public.blog_posts p
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
        p.id, p.title, p.slug, p.excerpt, p.featured_image_url,
        p.author_name, p.status, p.published_at, p.created_at, p.updated_at,
        c.id AS category_id, c.name AS category_name, c.slug AS category_slug
      FROM public.blog_posts p
      LEFT JOIN public.blog_categories c ON p.category_id = c.id
      ${whereClause}
      ORDER BY p.created_at DESC
      LIMIT ${limitParam} OFFSET ${offsetParam};
    `;
    const dataRes = await query(dataSql, params);

    return {
      posts: dataRes.rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async findPostById(id) {
    const sql = `
      SELECT 
        p.id, p.category_id, p.title, p.slug, p.excerpt, p.content, p.featured_image_url,
        p.author_name, p.status, p.meta_title, p.meta_description,
        p.published_at, p.created_at, p.updated_at,
        c.name AS category_name, c.slug AS category_slug
      FROM public.blog_posts p
      LEFT JOIN public.blog_categories c ON p.category_id = c.id
      WHERE p.id = $1
      LIMIT 1;
    `;
    const res = await query(sql, [id]);
    return res.rows[0] || null;
  },

  async createPost({ category_id, title, slug, excerpt, content, featured_image_url, author_name, status = 'draft', meta_title, meta_description, published_at }) {
    const sql = `
      INSERT INTO public.blog_posts (
        category_id, title, slug, excerpt, content, featured_image_url,
        author_name, status, meta_title, meta_description, published_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id, category_id, title, slug, excerpt, content, featured_image_url, author_name, status, meta_title, meta_description, published_at, created_at, updated_at;
    `;
    const params = [category_id, title, slug, excerpt, content, featured_image_url, author_name, status, meta_title, meta_description, published_at];
    const res = await query(sql, params);
    return res.rows[0];
  },

  async updatePost(id, fields) {
    const allowedKeys = ['category_id', 'title', 'slug', 'excerpt', 'content', 'featured_image_url', 'author_name', 'status', 'meta_title', 'meta_description', 'published_at'];
    const updates = [];
    const params = [id];

    for (const key of allowedKeys) {
      if (fields[key] !== undefined) {
        params.push(fields[key]);
        updates.push(`${key} = $${params.length}`);
      }
    }

    if (updates.length === 0) {
      return this.findPostById(id);
    }

    const sql = `
      UPDATE public.blog_posts
      SET ${updates.join(', ')}
      WHERE id = $1
      RETURNING id, category_id, title, slug, excerpt, content, featured_image_url, author_name, status, meta_title, meta_description, published_at, created_at, updated_at;
    `;
    const res = await query(sql, params);
    return res.rows[0] || null;
  },

  async deletePost(id) {
    const sql = `DELETE FROM public.blog_posts WHERE id = $1 RETURNING id;`;
    const res = await query(sql, [id]);
    return res.rows[0] || null;
  },
};

module.exports = blogRepository;
