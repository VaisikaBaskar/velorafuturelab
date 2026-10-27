const serviceRepository = require('../../repositories/serviceRepository');
const { sendSuccess, sendError } = require('../../utils/response');

const serviceController = {
  /**
   * GET /api/services
   * List all published services ordered by display_order
   */
  async getServices(req, res, next) {
    try {
      const services = await serviceRepository.findPublished();
      return sendSuccess(res, services);
    } catch (error) {
      return next(error);
    }
  },

  /**
   * GET /api/services/:slug
   * Retrieve a published service by unique slug
   */
  async getServiceBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const service = await serviceRepository.findBySlug(slug, true);

      if (!service) {
        return sendError(res, 'Service not found', 404);
      }

      return sendSuccess(res, service);
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = serviceController;
