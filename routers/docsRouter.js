const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const docs = require('../docs/docs.json');

// Routes
router.use('/v1', swaggerUi.serve);
router.get('/v1', swaggerUi.setup(docs));

// Export
module.exports = router;