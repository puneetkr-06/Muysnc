const express = require("express");
const router = express.Router();
const { getTrendingTracks } = require("../controllers/trending_controller");
const {getCategories} = require('../controllers/categories_controller');




router.get("/trending", getTrendingTracks);
// router.get("/categories", getCategories);


module.exports = router;
