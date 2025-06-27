import React , {useEffect , useState} from 'react'
import ArtistSlider from '../ArtistSlider/ArtistSilder';
import axios from 'axios' 


const TopStreamedArtists = () => {

const artistNames = [
  "Arijit Singh",
  "Shreya Ghoshal",
  "Talwiinder",
  "Ed Sheeran",
  "Justin Bieber",
  "Raga",
  "Raftaar",
  "Honey Singh",
  "Dua Lipa",
  "Eminem"
];


const [artists, setArtists] = useState([]);

  useEffect(() => {
        const fetchArtists = async () => {
      try {
        const responses = await Promise.all(
          artistNames.map(name =>
            axios.get(`https://v1.nocodeapi.com/puneetweb/spotify/TObpKWitGOipDTEB/search?q=${encodeURIComponent(name)}&type=artist`)
          )
        );


   const formatted = responses.map(res => {
   const artist = res.data.artists.items[0]; 
  return {
    id: artist.id,
    name: artist.name,
    image: artist.images?.[0]?.url || ""
  };
   });

        setArtists(formatted);
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