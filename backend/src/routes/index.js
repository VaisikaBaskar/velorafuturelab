const express = require('express');

// Public route modules
const serviceRoutes = require('./public/serviceRoutes');
const blogRoutes = require('./public/blogRoutes');
const careerRoutes = require('./public/careerRoutes');
const contactRoutes = require('./public/contactRoutes');

// Admin route modules
const adminAuthRoutes = require('./admin/authRoutes');
const adminServiceRoutes = require('./admin/adminServiceRoutes');
const adminBlogRoutes = require('./admin/adminBlogRoutes');
const adminCareerRoutes = require('./admin/adminCareerRoutes');
const adminApplicationRoutes = require('./admin/adminApplicationRoutes');
const adminContactRoutes = require('./admin/adminContactRoutes');

const router = express.Router();

/**
 * Health Check Endpoint
 * GET /api/health
 */
router.get('/health', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'VELORA Future Lab API is running',
  });
});

// Mount Public APIs
router.use('/services', serviceRoutes);
router.use('/blog', blogRoutes);
router.use('/careers', careerRoutes);
router.use('/contact', contactRoutes);

// Mount Admin APIs
router.use('/admin/auth', adminAuthRoutes);
router.use('/admin/services', adminServiceRoutes);
router.use('/admin/blog', adminBlogRoutes);
router.use('/admin/careers', adminCareerRoutes);
router.use('/admin/applications', adminApplicationRoutes);
router.use('/admin/contact-submissions', adminContactRoutes);

module.exports = router;
