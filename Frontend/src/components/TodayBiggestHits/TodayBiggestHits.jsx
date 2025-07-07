import React , {useState, useEffect} from 'react'
import SongSlider from '../SongSlider/SongSlider'
import axios from 'axios'
import {BASE_URL} from "../../utils/config"


const BiggestHits = ({setCurrentSong}) => {

  const [hits, sethits] = useState([]);
  
  useEffect(() => {
    const fetchBiggestHits = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/musync/biggest-hits`); // Replace with your actual route
        sethits(res.data.biggestHits || []);
      } catch (err) {
        console.error("Failed to fetch Top Charts:", err);
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