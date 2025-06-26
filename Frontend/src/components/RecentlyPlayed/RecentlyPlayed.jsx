import React, {useState, useEffect} from 'react'
import SongSlider from '../SongSlider/SongSlider'
import axios from 'axios'

const RecentlyPlayed = ({setCurrentSong}) => {
  const [songs, setSongs] = useState([]);
  const user = JSON.parse(localStorage.getItem("musync-user"));

  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/user/recent/${user._id}`);
        setSongs(res.data.recentlyPlayed);

      } catch (err) {
        console.error("Error fetching recently played:", err);
      }
    };

    if (user._id) fetchRecentlyPlayed();
  }, [user]);

  let title = "No Songs Played Yet";
  if(songs.length > 0) title = "Recently Played";

  return (
    <div className='mt-4'>
      
      <SongSlider title={title} songs={songs} setCurrentSong={setCurrentSong}/>
    </div>
  )
}

export default RecentlyPlayed