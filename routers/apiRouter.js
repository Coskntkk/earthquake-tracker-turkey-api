const router = require('express').Router();

// Middlewares
const checkReqParams = require('../middlewares/checkReqParams');

// Routers
const earthquakeRouter = require('./earthquakeRouter');

// Routes
router.get('/earthquakes', earthquakeRouter);

// Export
module.exports = router;