const express = require('express');
const adminCareerController = require('../../controllers/admin/adminCareerController');
const { authenticateAdmin } = require('../../middleware/auth');
const { validate } = require('../../middleware/validate');
const { createCareerSchema, updateCareerSchema, uuidParamSchema } = require('../../validators/schemas');

const router = express.Router();

router.use(authenticateAdmin);

router.get('/', adminCareerController.getCareers);
router.post('/', validate({ body: createCareerSchema }), adminCareerController.createCareer);
router.put('/:id', validate({ params: uuidParamSchema, body: updateCareerSchema }), adminCareerController.updateCareer);
router.delete('/:id', validate({ params: uuidParamSchema }), adminCareerController.deleteCareer);

module.exports = router;
