const axios = require("axios");
require("dotenv").config();
const User = require("../models/user");

const recentlyPlayed = async (req, res) => {
  const { userId, song } = req.body;
    if (!song) {
    return res.status(400).json({ message: "No song provided" });
  }
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    user.recentlyPlayed = user.recentlyPlayed.filter(Boolean);
     let updatedRecentlyPlayed = user.recentlyPlayed.filter(
      (s) => s.preview_url && s.preview_url !== song.preview_url
    );

    updatedRecentlyPlayed.unshift(song);

    updatedRecentlyPlayed = updatedRecentlyPlayed.slice(0, 10);

    await User.findByIdAndUpdate(userId, { recentlyPlayed: updatedRecentlyPlayed });

    res.status(200).json({ message: "Song added to recently played" });
  } catch (error) {
    console.error("Error adding to recently played", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRecentlyPlayed = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
   
    res.status(200).json({ recentlyPlayed: user.recentlyPlayed });
  } catch (error) {
    console.error("Error fetching recently played", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {recentlyPlayed , getRecentlyPlayed}
