const adminRepository = require('../../repositories/adminRepository');
const { comparePassword } = require('../../utils/password');
const { signToken } = require('../../utils/jwt');
const { sendSuccess, sendError } = require('../../utils/response');

const authController = {
  /**
   * POST /api/admin/auth/login
   * Admin credentials authentication
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const admin = await adminRepository.findByEmail(email);
      if (!admin) {
        return sendError(res, 'Invalid username or password', 401);
      }

      if (!admin.is_active) {
        return sendError(res, 'Admin account has been deactivated. Please contact support.', 403);
      }

      const isMatch = await comparePassword(password, admin.password_hash);
      if (!isMatch) {
        return sendError(res, 'Invalid username or password', 401);
      }

      // Update last_login timestamp
      await adminRepository.updateLastLogin(admin.id);

      // Issue signed JWT token
      const token = signToken({
        id: admin.id,
        email: admin.email,
        role: admin.role,
      });

      return sendSuccess(
        res,
        {
          token,
          admin: {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
          },
        },
        'Authentication successful'
      );
    } catch (error) {
      return next(error);
    }
  },

  /**
   * GET /api/admin/auth/me
   * Get current authenticated admin profile
   */
  async me(req, res) {
    return sendSuccess(res, { admin: req.admin });
  },
};

module.exports = authController;
