import React from "react";
import { FaPlay } from "react-icons/fa";
import { updateRecentlyPlayed } from "../../utils/updateRecentlyPlayed";


const TrackCard = ({ track , setCurrentSong }) => {

  if (!track) return null;

  const truncateText = (input, maxLength = 25) => {
  if (!input) return "";

  // If input is an array (like artists), join it into a single string
  const text = Array.isArray(input) ? input.join(", ") : input;

  // Ensure it's a string and truncate
  return typeof text === 'string' && text.length > maxLength
    ? text.slice(0, maxLength) + "..."
    : text;
};
  return (
    <div className="relative group bg-[#1e1e1e] rounded-xl p-3 text-white hover:scale-105 transition-transform duration-300 shadow-md cursor-pointer w-full">
    
                  <div className='relative'>
          <img
            src={track.album?.images[0]?.url}
            alt={track.name}
            className="w-full h-48 object-cover rounded-lg mb-3"
          />
    
            <div className="absolute inset-0 bg-opacity-30 rounded-lg hidden group-hover:flex items-center justify-center transition">
              <button className="bg-[#EB6C18] text-white p-3 rounded-full hover:scale-110 transition"
                onClick={async () => {
    const storedUser = JSON.parse(localStorage.getItem("musync-user"));
    const userId = storedUser?._id;
    if (!userId) return;

    setCurrentSong(track);
    try {
      await updateRecentlyPlayed(userId, track);
    } catch (err) {
      console.error("Failed to update recently played", err);
    }
  }}>
                <FaPlay className="text-md text-white" />
                
              </button>
            </div>
    
    </div>
          <h3 className="text-md font-bold truncate">{truncateText(track.name)}</h3>
          <p className="text-sm text-gray-400">{truncateText(track.artists.map((a) => a.name))}</p>
        </div>
    
  );
};

export default TrackCard;
