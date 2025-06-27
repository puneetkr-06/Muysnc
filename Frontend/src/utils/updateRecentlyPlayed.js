import axios from "axios";

export const updateRecentlyPlayed = async (userId, item) => {
  try {
    const simplifiedSong = {
      name: item.name,
      artists: Array.isArray(item.artists)
        ? item.artists.map((a) => a.name).join(", ")
        : item.artists,
      image: item.album?.images[0]?.url || item.image,
      preview_url: item.preview_url,
    };
    const res = await axios.post("http://localhost:4000/user/recent", {
      userId ,
      song : simplifiedSong,
    });
    return res.data;
  } catch (error) {
    console.error("Error updating recently played", error);
    throw error;
  }
};
