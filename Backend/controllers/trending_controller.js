const axios = require("axios");
require("dotenv").config();

const getTrendingTracks = async (req, res) => {
  try {
    const playlistId = "37i9dQZF1DX4ghkRUdIogy";

    const user = process.env.NOCODE_USER;
    const key = process.env.NOCODE_KEY;
    const url = `https://v1.nocodeapi.com/${user}/spotify/${key}/playlists?id=${playlistId}`;

    const response = await axios.get(url);

    const tracksy = response.data.tracks.items;


    const trending = tracksy
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

    res.status(200).json({ trending });
  } catch (err) {

      try {
      const fallbackRes = await axios.get("https://raw.githubusercontent.com/puneetkr-06/MUSYNC-API/main/trending/trendingSongs.json");

      res.status(200).json({ trending : fallbackRes.data });

    } catch (fallbackError) {
      console.error("🔥 GitHub fallback failed too:", fallbackError.message);
    }

    console.error("Spotify Trending Error:", err.message);
    res.status(500).json({ error: "Failed to fetch trending songs" });
  }
};

module.exports = { getTrendingTracks };
