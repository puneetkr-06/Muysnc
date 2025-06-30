import React , {useEffect , useState} from 'react'
import ArtistSlider from '../ArtistSlider/ArtistSilder';
import axios from 'axios' 
const baseUrl = import.meta.env.VITE_BACKEND_URL;



const TopStreamedArtists = () => {

const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await axios.get(`${baseUrl}/musync/artists`);
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