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

    // const url = `https://v1.nocodeapi.com/${user}/spotify/${key}/search?q=${encodeURIComponent(query)}&type=track`;

    const id_url_res = `https://jiosaavanapi-beta.vercel.app/api/search?query=${query}`;
const searchData = await axios.get(id_url_res);
const results = searchData.data.data.songs.results.slice(0, 12); // max 12
const ids = results.map(song => song.id).join(',');

const songDetailsUrl = `https://jiosaavanapi-beta.vercel.app/api/songs?ids=${ids}`;
const songDetailsResponse = await axios.get(songDetailsUrl);
const songsData = songDetailsResponse.data.data;

const finalTracks = songsData.map(song => ({
  id: song.id,
  name: song.name,
  artists: song.artists.primary.map(artist => artist.name).join(", "),
  image: song.image[song.image.length-1]?.url || "",
  preview_url: song.downloadUrl[song.downloadUrl.length-1]?.url || ""
})).filter(track => track.preview_url);

res.status(200).json({ tracks: finalTracks });


    // const response = await axios.get(url);
    // res.status(200).json({ tracks: response.data.tracks.items });

  } catch (err) {
    console.error("Search API Error:", err.message);
    res.status(500).json({ error: "Search failed" });
  }
};

module.exports = { getSearchItem };
