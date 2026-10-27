const { verifyToken } = require('../utils/jwt');
const { sendError } = require('../utils/response');
const adminRepository = require('../repositories/adminRepository');

/**
 * Middleware: Authenticate Admin via Bearer JWT
 */
const authenticateAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Authentication required: missing or invalid authorization header', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);

    if (!decoded || !decoded.id) {
      return sendError(res, 'Invalid authentication token', 401);
    }

    const admin = await adminRepository.findById(decoded.id);

    if (!admin) {
      return sendError(res, 'Admin account not found or revoked', 401);
    }

    if (!admin.is_active) {
      return sendError(res, 'Admin account has been deactivated', 403);
    }

    // Attach sanitized admin object to request
    req.admin = {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    };

    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return sendError(res, 'Authentication token has expired. Please log in again', 401);
    }
    return sendError(res, 'Authentication failed: invalid token signature', 401);
  }
};

/**
 * Middleware: Role-based Authorization
 * @param {...string} allowedRoles
 */
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.admin) {
      return sendError(res, 'Authentication required', 401);
    }

    if (!allowedRoles.includes(req.admin.role)) {
      return sendError(res, 'Access denied: insufficient permissions', 403);
    }

    return next();
  };
};

module.exports = {
  authenticateAdmin,
  authorizeRoles,
};
