const express = require('express');
const contactController = require('../../controllers/public/contactController');
const { validate } = require('../../middleware/validate');
const { contactSchema } = require('../../validators/schemas');

const router = express.Router();

router.post('/', validate({ body: contactSchema }), contactController.submitContact);

module.exports = router;
