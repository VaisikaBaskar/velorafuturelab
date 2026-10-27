const serviceRepository = require('../../repositories/serviceRepository');
const { sendSuccess, sendError } = require('../../utils/response');

const adminServiceController = {
  /**
   * GET /api/admin/services
   * List all services with optional status filter
   */
  async getServices(req, res, next) {
    try {
      const { status } = req.query;
      const services = await serviceRepository.findAll({ status });
      return sendSuccess(res, services);
    } catch (error) {
      return next(error);
    }
  },

  /**
   * POST /api/admin/services
   * Create a new service
   */
  async createService(req, res, next) {
    try {
      const { title, slug, short_description, description, image_url, icon, status, display_order } = req.body;

      // Check if slug is already taken
      const existing = await serviceRepository.findBySlug(slug, false);
      if (existing) {
        return sendError(res, `Service slug '${slug}' is already in use`, 409);
      }

      const service = await serviceRepository.create({
        title,
        slug,
        short_description,
        description,
        image_url,
        icon,
        status,
        display_order,
      });

      return sendSuccess(res, service, 'Service created successfully', 201);
    } catch (error) {
      return next(error);
    }
  },

  /**
   * PUT /api/admin/services/:id
   * Update an existing service
   */
  async updateService(req, res, next) {
    try {
      const { id } = req.params;
      const { slug } = req.body;

      const existing = await serviceRepository.findById(id);
      if (!existing) {
        return sendError(res, 'Service not found', 404);
      }

      if (slug && slug !== existing.slug) {
        const conflict = await serviceRepository.findBySlug(slug, false);
        if (conflict) {
          return sendError(res, `Service slug '${slug}' is already in use`, 409);
        }
      }

      const updated = await serviceRepository.update(id, req.body);
      return sendSuccess(res, updated, 'Service updated successfully');
    } catch (error) {
      return next(error);
    }
  },

  /**
   * DELETE /api/admin/services/:id
   * Delete a service
   */
  async deleteService(req, res, next) {
    try {
      const { id } = req.params;
      const existing = await serviceRepository.findById(id);
      if (!existing) {
        return sendError(res, 'Service not found', 404);
      }

      await serviceRepository.delete(id);
      return sendSuccess(res, { id }, 'Service deleted successfully');
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = adminServiceController;
