const contactRepository = require('../../repositories/contactRepository');
const { sendSuccess } = require('../../utils/response');

const contactController = {
  /**
   * POST /api/contact
   * Submit a contact inquiry
   */
  async submitContact(req, res, next) {
    try {
      const { name, email, phone, company, subject, message } = req.body;

      const submission = await contactRepository.create({
        name,
        email,
        phone,
        company,
        subject,
        message,
      });

      return sendSuccess(res, submission, 'Your message has been sent successfully', 201);
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = contactController;
