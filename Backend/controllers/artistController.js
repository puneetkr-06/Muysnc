const axios = require("axios");
require("dotenv").config();

const getTopArtists = async (req, res) => {
  try {
    const artistNames = [
      "Arijit Singh",
      "Shreya Ghoshal",
      "Talwiinder",
      "Ed Sheeran",
      "Justin Bieber",
      "Raga",
      "Raftaar",
      "Honey Singh",
      "Dua Lipa",
      "Eminem"
    ];

    const user = process.env.NOCODE_USER;
    const key = process.env.NOCODE_KEY;

    const responses = await Promise.all(
      artistNames.map(name =>
        axios.get(
          `https://v1.nocodeapi.com/${user}/spotify/${key}/search?q=${encodeURIComponent(
            name
          )}&type=artist`
        )
      )
    );

    const formatted = responses.map(res => {
      const artist = res.data.artists.items[0];
      return {
        id: artist.id,
        name: artist.name,
        image: artist.images?.[0]?.url || ""
      };
    });

    res.status(200).json({ artists: formatted });
  } catch (error) {

        try {
              const fallbackRes = await axios.get("https://raw.githubusercontent.com/puneetkr-06/MUSYNC-API/main/topArtists/getTopArtists.json");
        
              res.status(200).json({ artists: fallbackRes.data.artists });
        
            } catch (fallbackError) {
              console.error("🔥 GitHub fallback failed too:", fallbackError.message);
            }

    console.error("Artist Spotlight API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch artist spotlight data" });
  }
};

module.exports = { getTopArtists };
