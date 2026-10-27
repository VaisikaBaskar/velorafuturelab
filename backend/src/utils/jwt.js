const jwt = require('jsonwebtoken');
const env = require('../config/env');

/**
 * Signs a new JWT for an authenticated admin
 * @param {object} payload - Admin identity data (id, email, role)
 * @returns {string} - Signed JWT string
 */
const signToken = (payload) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

/**
 * Verifies a JWT and returns decoded payload
 * @param {string} token
 * @returns {object} Decoded payload
 */
const verifyToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};

module.exports = {
  signToken,
  verifyToken,
};
