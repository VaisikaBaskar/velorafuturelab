const express = require('express');
const adminBlogController = require('../../controllers/admin/adminBlogController');
const { authenticateAdmin } = require('../../middleware/auth');
const { validate } = require('../../middleware/validate');
const {
  createBlogPostSchema,
  updateBlogPostSchema,
  createBlogCategorySchema,
  uuidParamSchema,
} = require('../../validators/schemas');

const router = express.Router();

router.use(authenticateAdmin);

router.get('/', adminBlogController.getPosts);
router.post('/', validate({ body: createBlogPostSchema }), adminBlogController.createPost);
router.put('/:id', validate({ params: uuidParamSchema, body: updateBlogPostSchema }), adminBlogController.updatePost);
router.delete('/:id', validate({ params: uuidParamSchema }), adminBlogController.deletePost);

// Category creation
router.post('/categories', validate({ body: createBlogCategorySchema }), adminBlogController.createCategory);

module.exports = router;
