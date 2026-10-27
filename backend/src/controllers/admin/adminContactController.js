const contactRepository = require('../../repositories/contactRepository');
const { sendSuccess, sendError } = require('../../utils/response');

const adminContactController = {
  /**
   * GET /api/admin/contact-submissions
   * List contact submissions with status filter & pagination
   */
  async getSubmissions(req, res, next) {
    try {
      const { status, page = 1, limit = 20 } = req.query;
      const data = await contactRepository.findAll({
        status: status ? String(status) : null,
        page: Number(page) || 1,
        limit: Math.min(100, Math.max(1, Number(limit) || 20)),
      });
      return sendSuccess(res, data);
    } catch (error) {
      return next(error);
    }
  },

  /**
   * PUT /api/admin/contact-submissions/:id
   * Update submission status (e.g. 'new', 'in_progress', 'resolved', 'archived')
   */
  async updateSubmissionStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const existing = await contactRepository.findById(id);
      if (!existing) {
        return sendError(res, 'Contact submission not found', 404);
      }

      const updated = await contactRepository.updateStatus(id, status);
      return sendSuccess(res, updated, 'Submission status updated successfully');
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = adminContactController;
