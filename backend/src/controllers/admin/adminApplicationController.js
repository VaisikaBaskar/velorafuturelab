const applicationRepository = require('../../repositories/applicationRepository');
const { sendSuccess, sendError } = require('../../utils/response');

const adminApplicationController = {
  /**
   * GET /api/admin/applications
   * List all candidate job applications with filtering & pagination
   */
  async getApplications(req, res, next) {
    try {
      const { status, career_id, page = 1, limit = 20 } = req.query;
      const data = await applicationRepository.findAll({
        status: status ? String(status) : null,
        careerId: career_id ? String(career_id) : null,
        page: Number(page) || 1,
        limit: Math.min(100, Math.max(1, Number(limit) || 20)),
      });
      return sendSuccess(res, data);
    } catch (error) {
      return next(error);
    }
  },

  /**
   * PUT /api/admin/applications/:id
   * Update candidate application status
   */
  async updateApplicationStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const existing = await applicationRepository.findById(id);
      if (!existing) {
        return sendError(res, 'Job application not found', 404);
      }

      const updated = await applicationRepository.updateStatus(id, status);
      return sendSuccess(res, updated, 'Application status updated successfully');
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = adminApplicationController;
