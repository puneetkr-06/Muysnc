import React , {useState, useEffect} from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import Banner from '../../components/Banner/Banner'
import RecentlyPlayed from '../../components/RecentlyPlayed/RecentlyPlayed'
import TopStreamedArtists from '../../components/TopStreamedArtists/TopStreamedArtists'
import TopCharts from '../../components/TopCharts/TopCharts'
import TodayBiggestHits from '../../components/TodayBiggestHits/TodayBiggestHits'
import Playbar from '../../components/Playbar/Playbar'
import TrackCard from '../../components/TrackCard/TrackCard'
import Footer from '../../components/Footer/Footer'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const [user,loading] = useAuthState(auth);

   if (loading) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500 border-opacity-60"></div>
    </div>
  );
}

  if (!user) {
    alert("Please login to continue");
    return <Navigate to="/login" replace />;
  }

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
    <div className='bg-[rgb(12,15,23)] min-h-screen bg-gradient-to-br from-[rgb(14,18,27)] via-[rgb(14,15,20)] to-[rgb(39,42,52)]'>

      {/* Left Part */}
       <div className="w-full md:w-64 fixed md:relative z-20">
      <Sidebar setSearchResults={setSearchResults} setQuery={setQuery}></Sidebar>
      </div>

      {/* Right part */}
      <div className='ml-16 sm:ml-40 md:ml-48 xl:ml-64 min-h-screen flex-1 pt-20'>
        <Navbar query={query} setQuery={setQuery} setSearchResults={setSearchResults} setCurrentSong={setCurrentSong} searchResults = {searchResults}></Navbar>

        <div > 
  {searchResults.length > 0 ? (
    <div className="pb-24 px-4">
      <h2 className="text-sm font-medium md:text-xl md:font-semibold mb-4 text-white">Search Results</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
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
        <TodayBiggestHits setCurrentSong={setCurrentSong}></TodayBiggestHits>
        <Footer></Footer>
    </>
  )}
</div>

        <Playbar song={currentSong}></Playbar>
      </div>


    </div>
  )
}

export default Home