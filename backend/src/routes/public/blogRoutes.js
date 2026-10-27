const express = require('express');
const blogController = require('../../controllers/public/blogController');

const router = express.Router();

router.get('/categories', blogController.getCategories);
router.get('/', blogController.getPosts);
router.get('/:slug', blogController.getPostBySlug);

module.exports = router;
