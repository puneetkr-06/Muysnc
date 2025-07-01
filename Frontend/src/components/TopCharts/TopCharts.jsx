import React , {useState, useEffect} from 'react'
import SongSlider from '../SongSlider/SongSlider'
import axios from 'axios'
import {baseUrl} from "../../utils/config"


const TopCharts = ({setCurrentSong}) => {

  const [charts, setCharts] = useState([]);
  
  useEffect(() => {
    const fetchTopCharts = async () => {
      try {
        const res = await axios.get(`${baseUrl}/musync/top-charts`); 
        setCharts(res.data.topCharts || []);
      } catch (err) {
        console.error("Failed to fetch Top Charts:", err);

                    try {
      const fallbackRes = await axios.get("https://raw.githubusercontent.com/puneetkr-06/MUSYNC-API/main/topCharts/topChartsSongs.json");

      setCharts(fallbackRes.data);

    } catch (fallbackError) {
      console.error("🔥 GitHub fallback failed too:", fallbackError.message);
    }
      }
    };

    fetchTopCharts();
  }, []);

  return (
    <div>
      <SongSlider title='Top Charts' songs={charts} setCurrentSong={setCurrentSong}></SongSlider>
    </div>
  )
}

export default TopCharts