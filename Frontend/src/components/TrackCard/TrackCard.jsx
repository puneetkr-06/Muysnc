import React from "react";
import { FaPlay } from "react-icons/fa";
import { updateRecentlyPlayed } from "../../utils/updateRecentlyPlayed";


const TrackCard = ({ track , setCurrentSong }) => {

  if (!track) return null;

const truncateText = (input, maxLength = 25) => {
  if (!input) return "";

  const text = Array.isArray(input) ? input.join(", ") : input;

  const decoded = text.replace(/&amp;/g, "&");

  return decoded.length > maxLength
    ? decoded.slice(0, maxLength) + "..."
    : decoded;
};

  return (
    <div className="relative group bg-[#1e1e1e] rounded-xl p-3 text-white hover:scale-105 transition-transform duration-300 shadow-md cursor-pointer w-full">
    
                  <div className='relative'>
          <img
            src={track.image?.url || track.image}
            alt={track.name}
            className="w-full h-32 md:h-44 object-cover rounded-lg mb-3"
          />
    
            <div className="absolute inset-0 bg-opacity-30 rounded-lg flex items-center justify-center opacity-100 group-hover:opacity-100 sm:opacity-0 transition">
              <button className="bg-[#EB6C18] text-white p-3 rounded-full items-center hover:scale-110 transition"
                onClick={async () => {
    console.log('TrackCard: Play button clicked for track:', track);
    
    // Check if track has required fields for playback
    if (!track.preview_url) {
      alert('Sorry, this song is not available for preview.');
      console.error('Track missing preview_url:', track);
      return;
    }

    try {
      const storedUser = localStorage.getItem("musync-user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const userId = user?._id;
        if (userId) {
          await updateRecentlyPlayed(userId, track);
        }
      }
    } catch (err) {
      console.error("Failed to update recently played", err);
    }

    console.log('TrackCard: Setting current song...');
    setCurrentSong(track);
  }}>
                <FaPlay className="text-md text-white" />
                
              </button>
            </div>
    
    </div>
          <h3 className="text-sm md:text-base font-semibold md:font-bold truncate">{truncateText(track.name)}</h3>
          <p className="text-xs md:text-sm text-gray-400">{truncateText(track.artists)}</p>
        </div>
    
  );
};

export default TrackCard;
