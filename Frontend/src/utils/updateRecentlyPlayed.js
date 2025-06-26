import axios from "axios";

export const updateRecentlyPlayed = async (userId, item) => {
  try {
    const res = await axios.post("http://localhost:4000/user/recent", {
      userId ,
      song : item,
    });
    return res.data;
  } catch (error) {
    console.error("Error updating recently played", error);
    throw error;
  }
};
