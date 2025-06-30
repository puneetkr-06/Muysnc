import React from 'react';
import { FaPlay } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const SongSlider = ({ title, songs , setCurrentSong}) => {
            if (!songs) return null;
     
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
    <div className="px-6 py-4">
      <h2 className="text-white text-md md:text-xl font-semibold mb-4 font-ibm pl-2">{title}</h2>

      <Swiper
        spaceBetween={20}
        slidesPerView="auto"
        navigation
        modules={[Navigation]}
      >
        {songs.map((song, idx) => (
          
          <SwiperSlide key={idx} className="!w-[200px] md:!w-[220px] xl:!w-[240px]">
            
             <div className="relative group bg-[#1e1e1e] rounded-xl p-3 text-white hover:scale-105 transition-transform duration-300 shadow-md cursor-pointer">

              <div className='relative'>
      <img
        src={song?.image || song?.album?.images[0]?.url}
        alt={song.name}
        className="w-full h-32 md:h-44 object-cover rounded-lg mb-3"
      />

        <div className="absolute inset-0 bg-opacity-30 rounded-lg flex items-center justify-center  opacity-100 group-hover:opacity-100 sm:opacity-0 transition">
          <button className="bg-[#EB6C18] text-white p-3 rounded-full hover:scale-110 transition"
          onClick={() => {
            setCurrentSong(song);
          }}>
            <FaPlay className="text-md text-white" />
            
          </button>
        </div>

</div>
      <h3 className="text-sm md:text-base font-semibold md:font-bold truncate">{truncateText(song.name)}</h3>
      <p className="text-xs md:text-sm text-gray-400">  {truncateText(
    Array.isArray(song.artists)
      ? song.artists.join(", ")
      : song.artists
  )} </p>
    </div>

          </SwiperSlide>
))}
      
      </Swiper>
    </div>
  );
};

export default SongSlider;
