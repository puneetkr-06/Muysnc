import React , {useState, useEffect} from 'react'
import SongSlider from '../SongSlider/SongSlider'
import axios from 'axios'

const TopCharts = ({setCurrentSong}) => {

  const [charts, setCharts] = useState([]);
  
  useEffect(() => {
    const fetchTopCharts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/musync/top-charts"); // Replace with your actual route
        setCharts(res.data.topCharts || []);
      } catch (err) {
        console.error("Failed to fetch Top Charts:", err);
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