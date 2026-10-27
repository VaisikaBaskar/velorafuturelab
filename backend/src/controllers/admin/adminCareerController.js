const careerRepository = require('../../repositories/careerRepository');
const { sendSuccess, sendError } = require('../../utils/response');

const adminCareerController = {
  /**
   * GET /api/admin/careers
   * List all career openings
   */
  async getCareers(req, res, next) {
    try {
      const { status, department } = req.query;
      const careers = await careerRepository.findAll({ status, department });
      return sendSuccess(res, careers);
    } catch (error) {
      return next(error);
    }
  },

  /**
   * POST /api/admin/careers
   * Create a new career opening
   */
  async createCareer(req, res, next) {
    try {
      const { job_title, slug, department, location, employment_type, experience, description, responsibilities, requirements, status } = req.body;

      const existing = await careerRepository.findBySlug(slug, false);
      if (existing) {
        return sendError(res, `Career slug '${slug}' is already in use`, 409);
      }

      const career = await careerRepository.create({
        job_title,
        slug,
        department,
        location,
        employment_type,
        experience,
        description,
        responsibilities,
        requirements,
        status,
      });

      return sendSuccess(res, career, 'Career opening created successfully', 201);
    } catch (error) {
      return next(error);
    }
  },

  /**
   * PUT /api/admin/careers/:id
   * Update an existing career opening
   */
  async updateCareer(req, res, next) {
    try {
      const { id } = req.params;
      const { slug } = req.body;

      const existing = await careerRepository.findById(id);
      if (!existing) {
        return sendError(res, 'Career opening not found', 404);
      }

      if (slug && slug !== existing.slug) {
        const conflict = await careerRepository.findBySlug(slug, false);
        if (conflict) {
          return sendError(res, `Career slug '${slug}' is already in use`, 409);
        }
      }

      const updated = await careerRepository.update(id, req.body);
      return sendSuccess(res, updated, 'Career opening updated successfully');
    } catch (error) {
      return next(error);
    }
  },

  /**
   * DELETE /api/admin/careers/:id
   * Delete a career opening
   */
  async deleteCareer(req, res, next) {
    try {
      const { id } = req.params;
      const existing = await careerRepository.findById(id);
      if (!existing) {
        return sendError(res, 'Career opening not found', 404);
      }

      await careerRepository.delete(id);
      return sendSuccess(res, { id }, 'Career opening deleted successfully');
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = adminCareerController;
