const careerRepository = require('../../repositories/careerRepository');
const applicationRepository = require('../../repositories/applicationRepository');
const { sendSuccess, sendError } = require('../../utils/response');

const careerController = {
  /**
   * GET /api/careers
   * List all active career vacancies
   */
  async getCareers(req, res, next) {
    try {
      const careers = await careerRepository.findActive();
      return sendSuccess(res, careers);
    } catch (error) {
      return next(error);
    }
  },

  /**
   * GET /api/careers/:slug
   * Retrieve career vacancy by unique slug
   */
  async getCareerBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const career = await careerRepository.findBySlug(slug, true);

      if (!career) {
        return sendError(res, 'Career vacancy not found', 404);
      }

      return sendSuccess(res, career);
    } catch (error) {
      return next(error);
    }
  },

  /**
   * POST /api/careers/:id/apply
   * Submit job application for a career vacancy
   */
  async applyForCareer(req, res, next) {
    try {
      const { id } = req.params;
      const { name, email, phone, resume_url, cover_letter } = req.body;

      // Verify career opening exists and is active
      const career = await careerRepository.findById(id);
      if (!career || career.status !== 'active') {
        return sendError(res, 'Career opening is not active or does not exist', 404);
      }

      const application = await applicationRepository.create({
        career_id: id,
        name,
        email,
        phone,
        resume_url,
        cover_letter,
      });

      return sendSuccess(res, application, 'Application submitted successfully', 201);
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = careerController;
