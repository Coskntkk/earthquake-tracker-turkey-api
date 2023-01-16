const router = require('express').Router();

// Middlewares
const rateLimiter = require('../middlewares/rateLimiter');

// Routers
const docsRouter = require('./docsRouter');
const apiRouter = require('./apiRouter');

// Routes
router.get('/', (req,res) => res.redirect('/docs/v1'));
router.use('/docs', docsRouter);
router.use('/api/v1', rateLimiter, apiRouter);

// Export
module.exports = router;