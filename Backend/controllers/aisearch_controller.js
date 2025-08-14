// controllers/searchController.js
const axios = require("axios");
require("dotenv").config();

const getAiSearchItem = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    console.log('Searching for:', query);

    const id_url_res = `https://jiosaavanapi-beta.vercel.app/api/search?query=${encodeURIComponent(query)}`;
    const searchData = await axios.get(id_url_res);
    
    // Check if search response is valid
    if (!searchData.data || !searchData.data.data || !searchData.data.data.songs || !searchData.data.data.songs.results) {
      console.log('No results found in search response');
      return res.status(200).json({ tracks: [] });
    }

    const results = searchData.data.data.songs.results.slice(0, 12); // max 12
    
    if (results.length === 0) {
      console.log('No songs found in search results');
      return res.status(200).json({ tracks: [] });
    }

    const ids = results.map(song => song.id).join(',');

    const songDetailsUrl = `https://jiosaavanapi-beta.vercel.app/api/songs?ids=${ids}`;
    const songDetailsResponse = await axios.get(songDetailsUrl);
    
    // Check if song details response is valid
    if (!songDetailsResponse.data || !songDetailsResponse.data.data) {
      console.log('No song details found');
      return res.status(200).json({ tracks: [] });
    }

    const songsData = songDetailsResponse.data.data;

    const finalTracks = songsData.map(song => {
      try {
        return {
          id: song.id,
          name: song.name || 'Unknown',
          artists: song.artists && song.artists.primary 
            ? song.artists.primary.map(artist => artist.name).join(", ")
            : 'Unknown Artist',
          image: song.image && song.image.length > 0 
            ? song.image[song.image.length-1]?.url || ""
            : "",
          preview_url: song.downloadUrl && song.downloadUrl.length > 0 
            ? song.downloadUrl[song.downloadUrl.length-1]?.url || ""
            : ""
        };
      } catch (err) {
        console.error('Error processing song:', song, err);
        return null;
      }
    }).filter(track => track && track.preview_url); // Only return tracks with valid preview URLs

    console.log(`Found ${finalTracks.length} tracks for query: ${query}`);
    res.status(200).json({ tracks: finalTracks });

  } catch (err) {
    console.error("Search API Error:", err.message);
    res.status(500).json({ error: "Search failed", details: err.message });
  }
};

module.exports = { getAiSearchItem };
