import axios from "axios";
import {BASE_URL} from "./config"


export const updateRecentlyPlayed = async (userId, item) => {
    if(userId === null || userId === undefined) {
        console.error("User ID is null or undefined");  
    }
  try {
    const simplifiedSong = {
      name: item.name,
      artists: Array.isArray(item.artists)
        ? item.artists.map((a) => a.name).join(", ")
        : item.artists,
      image: item.album?.images[0]?.url || item.image,
      preview_url: item.preview_url,
    };
    const res = await axios.post(`${BASE_URL}/user/recent`, {
      userId ,
      song : simplifiedSong,
    });
    return res.data;
  } catch (error) {
    console.error("Error updating recently played", error);
    throw error;
  }
};
