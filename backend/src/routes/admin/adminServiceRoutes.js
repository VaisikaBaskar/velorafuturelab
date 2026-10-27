const express = require('express');
const adminServiceController = require('../../controllers/admin/adminServiceController');
const { authenticateAdmin } = require('../../middleware/auth');
const { validate } = require('../../middleware/validate');
const { createServiceSchema, updateServiceSchema, uuidParamSchema } = require('../../validators/schemas');

const router = express.Router();

// All routes here require admin authentication
router.use(authenticateAdmin);

router.get('/', adminServiceController.getServices);
router.post('/', validate({ body: createServiceSchema }), adminServiceController.createService);
router.put('/:id', validate({ params: uuidParamSchema, body: updateServiceSchema }), adminServiceController.updateService);
router.delete('/:id', validate({ params: uuidParamSchema }), adminServiceController.deleteService);

module.exports = router;
