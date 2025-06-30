import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import banner_bg from "../../assets/banner_bg.jpg";
import Playbar from "../Playbar/Playbar";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const baseUrl = import.meta.env.VITE_BACKEND_URL;

const truncateText = (input, maxLength = 25) => {
  if (!input) return "";

  // If input is an array (like artists), join it into a single string
  const text = Array.isArray(input) ? input.join(", ") : input;

  // Ensure it's a string and truncate
  return typeof text === 'string' && text.length > maxLength
    ? text.slice(0, maxLength) + "..."
    : text;
};

const Banner = ({setCurrentSong}) => {
  const user = JSON.parse(localStorage.getItem("musync-user"));
  const [trending, setTrending] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(`${baseUrl}/musync/trending`);
        setTrending(res.data.trending);
        
      } catch (err) {
        console.error("Failed to load trending songs", err);

            try {
      const fallbackRes = await axios.get("https://raw.githubusercontent.com/puneetkr-06/MUSYNC-API/main/trending/trendingSongs.json");

      setTrending(fallbackRes.data);

    } catch (fallbackError) {
      console.error("🔥 GitHub fallback failed too:", fallbackError.message);
    }
      }
    };
    fetchTrending();
  }, []);

  return (
    <div>
      <h1 className="font-ibm font-bold text-xl md:text-2xl text-white pl-6">Trending Now !</h1>
      <div className="w-full px-4 py-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={trending.length > 2}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            // Avoid manual init, let Swiper handle it after DOM is ready
          }}
          onAfterInit={(swiper) => {
            if (swiper.params.navigation) {
              swiper.navigation.update(); // Update navigation after initialization
            }
          }}
          className="rounded-2xl overflow-hidden"
        >
          {trending.slice(0, 10).map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="flex flex-col md:flex-row items-center justify-between bg-[#1e1e1e] xl:pl-80 p-6 md:p-10 rounded-2xl shadow-lg bg-center "
                style={{ backgroundImage: `url(${banner_bg})` }}
              >
                {/* Left Side: Details */}
                <div className="flex-1 text-white space-y-2 md:space-y-4 w-full md:w-1/2">
                  <h2 className="text-xl md:text-3xl font-ibm font-semibold">{truncateText(item.name)}</h2>
                  <p className="text-[#ffbb56] font-xs md:font-medium">By {truncateText(item.artists)}</p>


                </div>
 <div className="flex flex-col items-center justify-center w-full md:w-1/2">
                {/* Right Side: Image */}
                <div className="flex h-full md:w-[300px] md:h-[300px] mt-4 md:mt-0 md:ml-10 rounded-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full md:h-full object-cover rounded-xl "
                  />
                </div>
                                  <button
                    className="mt-2 md:mt-6  sm:ml-6 
                   sm:mt-6 sm:mb-2 xl:px-8 xl:text-xl bg-[#EB6C18] px-4 py-2 rounded-full text-white hover:bg-orange-600 transition font-medium "
                    onClick={() => {
                      if (item.preview_url) {              
                        setCurrentSong(item);
                      }
                      else alert("Preview not available");
                    }}
                  >
                    Listen Now
                  </button>
                
                  </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="custom-prev swiper-button-prev !text-white" />
          <div className="custom-next swiper-button-next !text-white" />
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;