const { sendError } = require('../utils/response');

/**
 * Centralized Express Error Handling Middleware
 */
const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, err.message);

  // Handle SyntaxError (e.g. malformed JSON in request body)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return sendError(res, 'Malformed JSON in request body', 400);
  }

  // Handle Custom HTTP error with statusCode
  const statusCode = err.statusCode || err.status || 500;
  const message = err.isOperational || statusCode < 500 ? err.message : 'Internal Server Error';

  return sendError(res, message, statusCode, process.env.NODE_ENV !== 'production' ? err.stack : null);
};

/**
 * 404 Route Not Found Middleware
 */
const notFoundHandler = (req, res) => {
  return sendError(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
