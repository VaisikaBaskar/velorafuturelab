const blogRepository = require('../../repositories/blogRepository');
const { sendSuccess, sendError } = require('../../utils/response');

const blogController = {
  /**
   * GET /api/blog/categories
   * List all blog categories
   */
  async getCategories(req, res, next) {
    try {
      const categories = await blogRepository.findCategories();
      return sendSuccess(res, categories);
    } catch (error) {
      return next(error);
    }
  },

  /**
   * GET /api/blog
   * List published blog posts with pagination and category filtering
   */
  async getPosts(req, res, next) {
    try {
      const { category, page = 1, limit = 10 } = req.query;
      const data = await blogRepository.findPublishedPosts({
        categorySlug: category ? String(category).trim() : null,
        page: Number(page) || 1,
        limit: Math.min(50, Math.max(1, Number(limit) || 10)),
      });

      return sendSuccess(res, data);
    } catch (error) {
      return next(error);
    }
  },

  /**
   * GET /api/blog/:slug
   * Retrieve single published blog post by slug
   */
  async getPostBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const post = await blogRepository.findPublishedPostBySlug(slug);

      if (!post) {
        return sendError(res, 'Blog post not found', 404);
      }

      return sendSuccess(res, post);
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = blogController;
