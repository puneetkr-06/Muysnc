import React, {useState, useEffect} from 'react'
import SongSlider from '../SongSlider/SongSlider'
import axios from 'axios'
import {baseUrl} from "../../utils/config"


const RecentlyPlayed = ({setCurrentSong}) => {
  const [songs, setSongs] = useState([]);
  const user = JSON.parse(localStorage.getItem("musync-user"));

  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      if (!user?._id) {
      console.error("User ID is null or undefined");
      return;
    }
      try {
        const res = await axios.get(`${baseUrl}/user/recent/${user._id}`);
        console.log("Recently Played Songs:", res.data.recentlyPlayed);
        setSongs(res.data.recentlyPlayed);

      } catch (err) {
        console.error("Error fetching recently played:", err);
      }
    };

    fetchRecentlyPlayed();
  }, [user]);

  let title = "Recently Played Songs";

    if ( songs.length === 0) {
    return (
      <div className="px-6 py-2">
        <h2 className="text-white text-md md:text-xl font-semibold mb-2 font-ibm pl-2">{title}</h2>
        <p className="ml-4 text-sm text-gray-400">No Songs Played Yet</p>
      </div>
    );
  }

  return (
    <div className='md:mt-4'>
      
      <SongSlider title={title} songs={songs} setCurrentSong={setCurrentSong}/>
    </div>
  )
}

export default RecentlyPlayed