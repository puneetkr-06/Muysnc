import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import AiPageNavbar from '../../components/AiPageNavbar/AiPageNavbar'
import TrackCard from '../../components/TrackCard/TrackCard'
import Playbar from '../../components/Playbar/Playbar'

const Moodsync = ({ query, setQuery, searchResults, setSearchResults, setCurrentSong, currentSong }) => {

  // Debug logging
  useEffect(() => {
    console.log('Moodsync props:', { 
      query, 
      searchResults: searchResults?.length, 
      currentSong: currentSong?.name,
      firstTrack: searchResults?.[0]
    });
    
    // Log each track's preview_url to check if they're valid
    if (searchResults && searchResults.length > 0) {
      searchResults.forEach((track, index) => {
        console.log(`Track ${index + 1}:`, {
          name: track.name,
          artists: track.artists,
          preview_url: track.preview_url,
          image: track.image
        });
      });
    }
  }, [query, searchResults, currentSong]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0e121b] via-[#0e0f14] to-[#272a34] flex flex-col gap-8'>

     {/* Left Part */}
       <div className="w-full md:w-64 fixed md:relative z-20">
      <Sidebar />
      </div>

      <div className='ml-16 sm:ml-40 md:ml-48 xl:ml-64 min-h-screen flex-1 pt-20'>
        <AiPageNavbar query={query} setQuery={setQuery} setSearchResults={setSearchResults}/>
      <div className="pb-24 px-4">
      <h2 className="text-sm font-medium md:text-xl md:font-semibold mb-4 text-white">
        {searchResults && searchResults.length > 0 ? 'AI Music Suggestions' : 'Describe your mood to get music suggestions'}
      </h2>
      {searchResults && searchResults.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {searchResults.map((track, index) => (
            <TrackCard track={track} key={track.id || index} setCurrentSong={setCurrentSong} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-8">
          <p>Use the search bar above to describe your current mood or feeling.</p>
          <p className="text-sm mt-2">Example: "I'm feeling happy and energetic" or "I want something calm and relaxing"</p>
        </div>
      )}
    </div>
    
    {/* Add Playbar component */}
    <Playbar song={currentSong} />
    </div>
      
    </div>
  )
}

export default Moodsync
