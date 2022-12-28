const router = require('express').Router();

// Controllers
const { getEarthQuakes } = require('../controllers/earthQuakeController');

// Middlewares
const parseEarthQuakes = require('../middlewares/getEarthquakes');

// Routes
router.get('/earthquakes', parseEarthQuakes, getEarthQuakes);

// Export
module.exports = router;