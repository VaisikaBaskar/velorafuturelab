const express = require('express');
const adminContactController = require('../../controllers/admin/adminContactController');
const { authenticateAdmin } = require('../../middleware/auth');
const { validate } = require('../../middleware/validate');
const { updateContactStatusSchema, uuidParamSchema } = require('../../validators/schemas');

const router = express.Router();

router.use(authenticateAdmin);

router.get('/', adminContactController.getSubmissions);
router.put(
  '/:id',
  validate({ params: uuidParamSchema, body: updateContactStatusSchema }),
  adminContactController.updateSubmissionStatus
);

module.exports = router;
