const express = require("express");
const router = express.Router();
const { getTrendingTracks } = require("../controllers/trending_controller");
const {getTopCharts} = require('../controllers/topCharts_controller');
const { getSearchItem } = require("../controllers/search_controller");
const { getTopArtists } = require("../controllers/artistController");




router.get("/trending", getTrendingTracks);
router.get("/top-charts", getTopCharts);
router.get("/search", getSearchItem);
router.get("/artists", getTopArtists)


module.exports = router;
