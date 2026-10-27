const express = require('express');
const adminApplicationController = require('../../controllers/admin/adminApplicationController');
const { authenticateAdmin } = require('../../middleware/auth');
const { validate } = require('../../middleware/validate');
const { updateApplicationStatusSchema, uuidParamSchema } = require('../../validators/schemas');

const router = express.Router();

router.use(authenticateAdmin);

router.get('/', adminApplicationController.getApplications);
router.put(
  '/:id',
  validate({ params: uuidParamSchema, body: updateApplicationStatusSchema }),
  adminApplicationController.updateApplicationStatus
);

module.exports = router;
