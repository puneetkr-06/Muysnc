import React , {useState} from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import Banner from '../../components/Banner/Banner'
import RecentlyPlayed from '../../components/RecentlyPlayed/RecentlyPlayed'
import TopStreamedArtists from '../../components/TopStreamedArtists/TopStreamedArtists'
import TopCharts from '../../components/TopCharts/TopCharts'
import BiggestHits from '../../components/BiggestHits/BiggestHits'
import Playbar from '../../components/Playbar/Playbar'
import Temp from '../../components/Temp/Temp'

const Home = () => {
  const [currentSong, setCurrentSong] = useState(null);
  return (
    <div className='bg-[rgb(12,15,23)] min-h-screen bg-gradient-to-br from-[rgb(14,18,27)] via-[rgb(14,15,20)] to-[rgb(39,42,52)] pb-16'>

      {/* Left Part */}
      <div className='p-2'>
      <Sidebar></Sidebar>
      </div>

      {/* Right part */}
      <div className='ml-16 sm:ml-48 md:ml-64 min-h-screen flex-1 pt-20'>
        <Navbar></Navbar>
        <Banner setCurrentSong={setCurrentSong}></Banner>
        <RecentlyPlayed setCurrentSong={setCurrentSong}></RecentlyPlayed>
        <TopCharts></TopCharts>
        <TopStreamedArtists></TopStreamedArtists>
        <BiggestHits></BiggestHits>
        <Playbar song={currentSong}></Playbar>
        {/* <Temp></Temp> */}
      </div>


    </div>
  )
}

export default Home