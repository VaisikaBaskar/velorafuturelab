const express = require('express');
const careerController = require('../../controllers/public/careerController');
const { validate } = require('../../middleware/validate');
const { applyCareerSchema, uuidParamSchema } = require('../../validators/schemas');

const router = express.Router();

router.get('/', careerController.getCareers);
router.get('/:slug', careerController.getCareerBySlug);
router.post(
  '/:id/apply',
  validate({ params: uuidParamSchema, body: applyCareerSchema }),
  careerController.applyForCareer
);

module.exports = router;
