import React , {useEffect , useState} from 'react'
import ArtistSlider from '../ArtistSlider/ArtistSilder';
import axios from 'axios' 
import {BASE_URL} from "../../utils/config"



const TopStreamedArtists = () => {

const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/musync/artists`);
        setArtists(res.data.artists);
      } catch (error) {
        console.error("Error fetching artist spotlight data:", error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div>
      <ArtistSlider title="Artist Spotlight"
        artists={artists}
  >
      </ArtistSlider>

    </div>
  )
}

export default TopStreamedArtists