/**
 * Standard API Response Utilities
 */

/**
 * Send standard successful response
 * @param {import('express').Response} res
 * @param {any} data
 * @param {string|null} message
 * @param {number} statusCode
 */
const sendSuccess = (res, data = {}, message = null, statusCode = 200) => {
  const payload = {
    success: true,
    data,
  };
  if (message) {
    payload.message = message;
  }
  return res.status(statusCode).json(payload);
};

/**
 * Send standard error response
 * @param {import('express').Response} res
 * @param {string} message
 * @param {number} statusCode
 * @param {any} details
 */
const sendError = (res, message = 'Internal Server Error', statusCode = 500, details = null) => {
  const payload = {
    success: false,
    message,
  };
  if (details && process.env.NODE_ENV !== 'production') {
    payload.details = details;
  }
  return res.status(statusCode).json(payload);
};

module.exports = {
  sendSuccess,
  sendError,
};
