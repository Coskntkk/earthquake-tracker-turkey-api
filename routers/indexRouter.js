const router = require('express').Router();

// Routers
const docsRouter = require('./docsRouter');
const earthquakeRouter = require('./earthquakeRouter');

// Routes
router.use('/docs', docsRouter);
router.get('/earthquakes', earthquakeRouter);

// Export
module.exports = router;