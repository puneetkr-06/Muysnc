const express = require('express');
const router = express.Router();
const { registerUser , loginUser } = require('../controllers/user_controller');
const {recentlyPlayed , getRecentlyPlayed} = require('../controllers/recentlyPlayed_controller');



router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/recent", recentlyPlayed);
router.get("/recent/:userId", getRecentlyPlayed);

module.exports = router;