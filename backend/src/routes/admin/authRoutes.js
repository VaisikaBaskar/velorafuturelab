const express = require('express');
const authController = require('../../controllers/admin/authController');
const { authenticateAdmin } = require('../../middleware/auth');
const { validate } = require('../../middleware/validate');
const { loginSchema } = require('../../validators/schemas');

const router = express.Router();

router.post('/login', validate({ body: loginSchema }), authController.login);
router.get('/me', authenticateAdmin, authController.me);

module.exports = router;
