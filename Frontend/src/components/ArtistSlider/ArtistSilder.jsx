import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const ArtistSlider = ({ title, artists }) => {
  if (!artists) return null;

  const truncateText = (input, maxLength = 25) => {
    if (!input) return "";
    const text = typeof input === 'string' ? input : input.toString();
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
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
        {artists.map((artist, idx) => (
          <SwiperSlide key={idx} className="!w-[200px] md:!w-[220px] xl:!w-[240px]">
            <div
              className="relative group bg-[#1e1e1e] rounded-xl p-6 text-white hover:scale-105 transition-transform duration-300 shadow-md cursor-pointer w-full z-100"
              onClick={() => onArtistClick(artist)}
            >
              <div className='relative'>
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-32 md:h-44 object-cover rounded-lg mb-3"
                />
              </div>
              <h3 className="text-sm md:text-base font-semibold md:font-bold truncate text-center">
                {truncateText(artist.name)}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ArtistSlider;
