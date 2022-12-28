const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const docs = require('../docs/docs.json');

// Routes
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(docs));

// Export
module.exports = router;