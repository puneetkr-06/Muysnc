// controllers/searchController.js
const axios = require("axios");
require("dotenv").config();

const getSearchItem = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const user = process.env.NOCODE_USER;
    const key = process.env.NOCODE_KEY;

    const url = `https://v1.nocodeapi.com/${user}/spotify/${key}/search?q=${encodeURIComponent(query)}&type=track`;

    const response = await axios.get(url);
    res.status(200).json({ tracks: response.data.tracks.items });

  } catch (err) {
    console.error("Search API Error:", err.message);
    res.status(500).json({ error: "Search failed" });
  }
};

module.exports = { getSearchItem };
