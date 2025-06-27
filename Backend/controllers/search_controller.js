

const axios = require("axios");
require("dotenv").config();

const getSearchItem = async (req, res) => {
  try {
    const url = `https://v1.nocodeapi.com/puneetweb/spotify/TObpKWitGOipDTEB/search?q=${keyword}&type=track`;

    const response = await axios.get(url);

    const tracksy = response.data.tracks.items;


    const searchItems = tracksy
      .map((item) => {
        const track = item.track;
        if (!track || !track.preview_url) return null;

        return {
          id: track.id,
          name: track.name,
          image: track.album.images[0]?.url || "",
          artists: track.artists.map((artist) => artist.name).join(", "),
          preview_url: track.preview_url,
        };
      })
      .filter(Boolean);

    res.status(200).json({ topCharts });
  } catch (err) {
    console.error("Spotify Trending Error:", err.message);
    res.status(500).json({ error: "Failed to fetch trending songs" });
  }
};

module.exports = { getSearchItem};
