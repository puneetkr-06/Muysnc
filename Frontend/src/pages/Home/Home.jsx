import React , {useState, useEffect} from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import Banner from '../../components/Banner/Banner'
import RecentlyPlayed from '../../components/RecentlyPlayed/RecentlyPlayed'
import TopStreamedArtists from '../../components/TopStreamedArtists/TopStreamedArtists'
import TopCharts from '../../components/TopCharts/TopCharts'
import BiggestHits from '../../components/BiggestHits/BiggestHits'
import Playbar from '../../components/Playbar/Playbar'
import TrackCard from '../../components/TrackCard/TrackCard'

const Home = () => {

  useEffect(() => {
  const handleBackButton = () => {
    // Back button dabaya gaya
    setQuery("");
    setSearchResults([]);
    window.history.replaceState({}, '', window.location.pathname);
  };

  window.addEventListener("popstate", handleBackButton);

  return () => {
    window.removeEventListener("popstate", handleBackButton);
  };
}, []);

  const [currentSong, setCurrentSong] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  return (
    <div className='bg-[rgb(12,15,23)] min-h-screen bg-gradient-to-br from-[rgb(14,18,27)] via-[rgb(14,15,20)] to-[rgb(39,42,52)] pb-16'>

      {/* Left Part */}
      <div className='p-2'>
      <Sidebar setSearchResults={setSearchResults} setQuery={setQuery}></Sidebar>
      </div>

      {/* Right part */}
      <div className='ml-16 sm:ml-48 md:ml-64 min-h-screen flex-1 pt-20'>
        <Navbar query={query} setQuery={setQuery} setSearchResults={setSearchResults}></Navbar>

        <div > 
  {searchResults.length > 0 ? (
    <div className="pb-24 px-4">
      <h2 className="text-xl font-semibold mb-4 text-white">Search Results</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {searchResults.map((track) => (
          <TrackCard track={track} key={track.id} setCurrentSong={setCurrentSong} />
        ))}
      </div>
    </div>
  ) : (
    <>
        <Banner setCurrentSong={setCurrentSong}></Banner>
        <RecentlyPlayed setCurrentSong={setCurrentSong}></RecentlyPlayed>
        <TopCharts setCurrentSong={setCurrentSong}></TopCharts>
        <TopStreamedArtists></TopStreamedArtists>
        <BiggestHits></BiggestHits>
    </>
  )}
</div>

        <Playbar song={currentSong}></Playbar>
        {/* <Temp></Temp> */}
      </div>


    </div>
  )
}

export default Home