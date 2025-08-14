const axios = require("axios");
require("dotenv").config();

// Fallback song suggestions for different moods
const fallbackSongs = {
  happy: ["Happy", "Good as Hell", "Can't Stop the Feeling", "Uptown Funk", "Dancing Queen"],
  sad: ["Someone Like You", "Hello", "Tears in Heaven", "Mad World", "The Sound of Silence"],
  energetic: ["Pump It", "Eye of the Tiger", "Stronger", "Titanium", "Don't Stop Me Now"],
  calm: ["Weightless", "Claire de Lune", "Gymnopédie No.1", "Satie", "Ambient 1"],
  romantic: ["Perfect", "Thinking Out Loud", "All of Me", "Make You Feel My Love", "A Thousand Years"],
  party: ["Party Rock Anthem", "I Gotta Feeling", "Good 4 U", "Blinding Lights", "Levitating"]
};

// Function to get mood category from user input
function getMoodCategory(mood) {
  const moodLower = mood.toLowerCase();
  if (moodLower.includes('happy') || moodLower.includes('joyful') || moodLower.includes('cheerful')) return 'happy';
  if (moodLower.includes('sad') || moodLower.includes('depressed') || moodLower.includes('melancholy')) return 'sad';
  if (moodLower.includes('energetic') || moodLower.includes('excited') || moodLower.includes('pumped')) return 'energetic';
  if (moodLower.includes('calm') || moodLower.includes('peaceful') || moodLower.includes('relaxing')) return 'calm';
  if (moodLower.includes('romantic') || moodLower.includes('love') || moodLower.includes('romantic')) return 'romantic';
  if (moodLower.includes('party') || moodLower.includes('celebration') || moodLower.includes('dance')) return 'party';
  return 'happy'; // default fallback
}

// Function to call Gemini API
async function callGeminiAPI(prompt) {
  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not found in environment variables');
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
    
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.5,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 200,
      }
    };

    console.log('Making Gemini API request...');
    
    const response = await axios.post(url, requestBody, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 second timeout
    });

    if (!response.data) {
      throw new Error('Empty response from Gemini API');
    }

    return response.data;
  } catch (error) {
    console.error('Gemini API call failed:', error);
    if (error.response) {
      console.error('Gemini API error response:', error.response.data);
      throw new Error(`Gemini API error: ${error.response.status} - ${error.response.data?.error?.message || 'Unknown error'}`);
    } else if (error.request) {
      throw new Error('Network error: Could not reach Gemini API');
    } else {
      throw new Error(`Request setup error: ${error.message}`);
    }
  }
}

const getSongsByMood = async (req, res) => {
  const { mood } = req.query;

  if (!mood) {
    return res.status(400).json({ error: "Mood query is required" });
  }

  console.log('Getting songs for mood:', mood);
  
  let songNames = [];
  
  try {
    // Step 1: Try to get song names from Gemini API
    console.log('Attempting Gemini API call...');
    const prompt = `
      Return ONLY a valid JSON array (nothing else) of exactly 8 popular Indian & English song names that match the mood "${mood}".
      Focus on well-known songs that are likely to be found in music databases.
      Example output:
      ["Shape of You", "Perfect", "Photograph", "Thinking Out Loud", "Galway Girl", "Blinding Lights", "Watermelon Sugar", "As It Was"]
      
      Mood: ${mood}
      
      Response format: JSON array only, no additional text.
    `;

    const geminiResponse = await callGeminiAPI(prompt);
    console.log('Gemini API Response received');
    
    // Extract text from Gemini response
    const aiResponse = geminiResponse?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
    console.log('Extracted text from Gemini:', aiResponse);
    
    // Clean the response to extract JSON with multiple strategies
    let cleanedResponse = aiResponse.trim();
    
    // Strategy 1: Remove markdown formatting if present
    cleanedResponse = cleanedResponse.replace(/```json\s*/gi, '').replace(/```\s*$/gi, '');
    
    // Strategy 2: Try to find JSON array in the response
    const jsonArrayMatch = cleanedResponse.match(/\[[\s\S]*?\]/);
    if (jsonArrayMatch) {
      cleanedResponse = jsonArrayMatch[0];
    }
    
    // Strategy 3: If still no valid JSON, try to extract song names from text
    try {
      songNames = JSON.parse(cleanedResponse);
      if (!Array.isArray(songNames)) {
        throw new Error('Response is not an array');
      }
      console.log('Successfully parsed song names from Gemini:', songNames);
    } catch (parseError) {
      console.log('JSON parsing failed, trying to extract songs from text...');
      
      // Extract quoted strings that might be song names
      const quotedStrings = aiResponse.match(/"([^"]+)"/g);
      if (quotedStrings && quotedStrings.length > 0) {
        songNames = quotedStrings.map(s => s.replace(/"/g, '')).slice(0, 8);
        console.log('Extracted songs from quoted strings:', songNames);
      } else {
        throw parseError;
      }
    }

  } catch (geminiError) {
    console.error("Gemini API Error:", geminiError);
    console.log('Falling back to predefined songs...');
    
    // Fallback: Use predefined songs based on mood
    const moodCategory = getMoodCategory(mood);
    songNames = fallbackSongs[moodCategory] || fallbackSongs.happy;
    console.log('Using fallback songs for mood category:', moodCategory, songNames);
  }

  if (!Array.isArray(songNames) || songNames.length === 0) {
    console.log('No valid song names, using default happy songs');
    songNames = fallbackSongs.happy;
  }

  // Step 2: Search for each song in the music database
  console.log('Searching for songs in music database...');
  const songDetailsPromises = songNames.map(async (song) => {
    try {
      console.log('Searching for:', song);
      
      // Use the existing aisearch endpoint internally
      const searchUrl = `https://jiosaavanapi-beta.vercel.app/api/search?query=${encodeURIComponent(song)}`;
      const searchData = await axios.get(searchUrl);
      
      if (!searchData.data || !searchData.data.data || !searchData.data.data.songs || !searchData.data.data.songs.results) {
        console.log('No results found for:', song);
        return null;
      }

      const results = searchData.data.data.songs.results.slice(0, 1); // Get first result
      
      if (results.length === 0) {
        console.log('No songs found for:', song);
        return null;
      }

      const songId = results[0].id;
      const songDetailsUrl = `https://jiosaavanapi-beta.vercel.app/api/songs?ids=${songId}`;
      const songDetailsResponse = await axios.get(songDetailsUrl);
      
      if (!songDetailsResponse.data || !songDetailsResponse.data.data) {
        console.log('No song details found for:', song);
        return null;
      }

      const songData = songDetailsResponse.data.data[0];
      if (!songData) return null;

      const track = {
        id: songData.id,
        name: songData.name || 'Unknown',
        artists: songData.artists && songData.artists.primary 
          ? songData.artists.primary.map(artist => artist.name).join(", ")
          : 'Unknown Artist',
        image: songData.image && songData.image.length > 0 
          ? songData.image[songData.image.length-1]?.url || ""
          : "",
        preview_url: songData.downloadUrl && songData.downloadUrl.length > 0 
          ? songData.downloadUrl[songData.downloadUrl.length-1]?.url || ""
          : ""
      };

      if (track.preview_url) {
        console.log('Found track:', track.name, 'by', track.artists);
        return track;
      } else {
        console.log('No preview URL for:', track.name);
        return null;
      }
      
    } catch (err) {
      console.error(`Error fetching details for ${song}:`, err);
      return null;
    }
  });

  // Step 3: Wait for all promises and filter nulls
  const finalSongs = (await Promise.all(songDetailsPromises)).filter(Boolean);
  console.log(`Found ${finalSongs.length} tracks for mood: ${mood}`);

  res.status(200).json({ 
    mood: mood,
    tracks: finalSongs,
    source: finalSongs.length > 0 ? 'gemini_api' : 'fallback'
  });
};

module.exports = { getSongsByMood };
