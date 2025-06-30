import React , {useState, useEffect} from 'react'
import SongSlider from '../SongSlider/SongSlider'
import axios from 'axios'
const baseUrl = import.meta.env.VITE_BACKEND_URL;


const BiggestHits = ({setCurrentSong}) => {

  const [hits, sethits] = useState([]);
  
  useEffect(() => {
    const fetchBiggestHits = async () => {
      try {
        const res = await axios.get(`${baseUrl}/musync/biggest-hits`); // Replace with your actual route
        sethits(res.data.biggestHits || []);
      } catch (err) {
        console.error("Failed to fetch Top Charts:", err);

                            try {
      const fallbackRes = await axios.get("https://raw.githubusercontent.com/puneetkr-06/MUSYNC-API/main/biggestHits/biggestHitsSongs.json");

      sethits(fallbackRes.data);

    } catch (fallbackError) {
      console.error("🔥 GitHub fallback failed too:", fallbackError.message);
    }
      }
    };

    fetchBiggestHits();
  }, []);

  return (
    <div>
      <SongSlider title="Today's Biggest Hits" songs={hits} setCurrentSong={setCurrentSong}></SongSlider>
    </div>
  )
}

export default BiggestHits