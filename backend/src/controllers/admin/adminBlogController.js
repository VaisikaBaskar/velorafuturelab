const blogRepository = require('../../repositories/blogRepository');
const { sendSuccess, sendError } = require('../../utils/response');

const adminBlogController = {
  /**
   * GET /api/admin/blog
   * List all blog posts with filtering & pagination
   */
  async getPosts(req, res, next) {
    try {
      const { status, category_id, page = 1, limit = 20 } = req.query;
      const data = await blogRepository.findAllPosts({
        status: status ? String(status) : null,
        categoryId: category_id ? String(category_id) : null,
        page: Number(page) || 1,
        limit: Math.min(100, Math.max(1, Number(limit) || 20)),
      });
      return sendSuccess(res, data);
    } catch (error) {
      return next(error);
    }
  },

  /**
   * POST /api/admin/blog
   * Create a new blog post
   */
  async createPost(req, res, next) {
    try {
      const { category_id, title, slug, excerpt, content, featured_image_url, author_name, status, meta_title, meta_description, published_at } = req.body;

      const existing = await blogRepository.findPublishedPostBySlug(slug);
      if (existing) {
        return sendError(res, `Blog post slug '${slug}' is already in use`, 409);
      }

      const post = await blogRepository.createPost({
        category_id,
        title,
        slug,
        excerpt,
        content,
        featured_image_url,
        author_name,
        status,
        meta_title,
        meta_description,
        published_at: published_at || (status === 'published' ? new Date().toISOString() : null),
      });

      return sendSuccess(res, post, 'Blog post created successfully', 201);
    } catch (error) {
      return next(error);
    }
  },

  /**
   * PUT /api/admin/blog/:id
   * Update an existing blog post
   */
  async updatePost(req, res, next) {
    try {
      const { id } = req.params;
      const { slug, status } = req.body;

      const existing = await blogRepository.findPostById(id);
      if (!existing) {
        return sendError(res, 'Blog post not found', 404);
      }

      if (slug && slug !== existing.slug) {
        const conflict = await blogRepository.findPublishedPostBySlug(slug);
        if (conflict && conflict.id !== id) {
          return sendError(res, `Blog post slug '${slug}' is already in use`, 409);
        }
      }

      const payload = { ...req.body };
      // If setting to published and published_at is not provided and post was not previously published
      if (status === 'published' && !payload.published_at && !existing.published_at) {
        payload.published_at = new Date().toISOString();
      }

      const updated = await blogRepository.updatePost(id, payload);
      return sendSuccess(res, updated, 'Blog post updated successfully');
    } catch (error) {
      return next(error);
    }
  },

  /**
   * DELETE /api/admin/blog/:id
   * Delete a blog post
   */
  async deletePost(req, res, next) {
    try {
      const { id } = req.params;
      const existing = await blogRepository.findPostById(id);
      if (!existing) {
        return sendError(res, 'Blog post not found', 404);
      }

      await blogRepository.deletePost(id);
      return sendSuccess(res, { id }, 'Blog post deleted successfully');
    } catch (error) {
      return next(error);
    }
  },

  /**
   * POST /api/admin/blog/categories
   * Create a new blog category
   */
  async createCategory(req, res, next) {
    try {
      const { name, slug, description } = req.body;

      const existing = await blogRepository.findCategoryBySlug(slug);
      if (existing) {
        return sendError(res, `Category slug '${slug}' is already in use`, 409);
      }

      const category = await blogRepository.createCategory({ name, slug, description });
      return sendSuccess(res, category, 'Blog category created successfully', 201);
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = adminBlogController;
