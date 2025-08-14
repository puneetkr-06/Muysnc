const express = require("express");
const router = express.Router();
const { getTrendingTracks } = require("../controllers/trending_controller");
const {getTopCharts} = require('../controllers/topCharts_controller');
const { getSearchItem } = require("../controllers/search_controller");
const { getTopArtists } = require("../controllers/artistController");
const { getBiggestHits } = require("../controllers/biggestHitsController");
const {getAiSearchItem} = require('../controllers/aisearch_controller');
const { getSongsByMood } = require('../controllers/gemini_controller');




router.get("/trending", getTrendingTracks);
router.get("/top-charts", getTopCharts);
router.get("/search", getSearchItem);
router.get("/aisearch", getAiSearchItem);
router.get("/gemini-mood-search", getSongsByMood);
router.get("/artists", getTopArtists);
router.get("/biggest-hits", getBiggestHits);


module.exports = router;
