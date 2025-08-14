import axios from "axios";
import { BASE_URL } from "../utils/config"; 

export async function getSongsByMood(mood) {
  console.log('Starting getSongsByMood with mood:', mood);
  
  try {
    console.log('Calling backend Gemini API endpoint...');
    const response = await axios.get(`${BASE_URL}/musync/gemini-mood-search?mood=${encodeURIComponent(mood)}`);
    
    console.log('Backend response:', response.data);
    
    const finalSongs = response.data.tracks || [];
    console.log('Final songs found:', finalSongs.length);

    return finalSongs;
    
  } catch (error) {
    console.error("Error in getSongsByMood:", error);
    
    // If backend fails, return empty array
    if (error.response) {
      console.error('Backend error:', error.response.data);
    } else if (error.request) {
      console.error('Network error - no response received');
    } else {
      console.error('Request setup error:', error.message);
    }
    
    return [];
  }
}
