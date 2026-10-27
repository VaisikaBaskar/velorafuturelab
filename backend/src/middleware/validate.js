const { z } = require('zod');
const { sendError } = require('../utils/response');

/**
 * Validates request payload/params/query against a Zod schema
 * @param {object} schema - { body?: z.ZodSchema, query?: z.ZodSchema, params?: z.ZodSchema }
 */
const validate = (schema) => {
  return (req, res, next) => {
    try {
      if (schema.body) {
        req.body = schema.body.parse(req.body);
      }
      if (schema.query) {
        req.query = schema.query.parse(req.query);
      }
      if (schema.params) {
        req.params = schema.params.parse(req.params);
      }
      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((e) => {
          const field = e.path.length > 0 ? e.path.join('.') : 'field';
          return `${field}: ${e.message}`;
        });
        return sendError(res, `Validation error: ${errorMessages.join(', ')}`, 400);
      }
      return sendError(res, 'Invalid request input', 400);
    }
  };
};

module.exports = {
  validate,
};
