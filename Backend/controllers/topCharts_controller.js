const axios = require("axios");
require("dotenv").config();

const getTopCharts = async (req, res) => {
  try {
    const playlistId = "37i9dQZF1DX0XUfTFmNBRM";
    const url = `https://v1.nocodeapi.com/scholarschool1010/spotify/PrHjFAbLYwKdlEAX/playlists?id=${playlistId}`;

    const response = await axios.get(url);

    const tracksy = response.data.tracks.items;


    const topCharts = tracksy
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

module.exports = { getTopCharts};
