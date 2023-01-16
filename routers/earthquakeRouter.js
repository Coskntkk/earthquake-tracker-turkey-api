const router = require('express').Router();

// Controllers
const { getEarthQuakes } = require('../controllers/earthQuakeController');

// Middlewares
const parseEarthQuakes = require('../middlewares/getEarthquakes');
const checkReqParams = require('../middlewares/checkReqParams');

// Routes
router.get('/earthquakes', parseEarthQuakes, checkReqParams, getEarthQuakes);

// Export
module.exports = router;