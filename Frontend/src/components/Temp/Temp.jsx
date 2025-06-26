import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import banner_bg from '../../assets/banner_bg.jpg';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



const Banner = () => {

    const [trending, setTrending] = useState([]);
    const swiperRef = useRef(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get("http://localhost:4000/spotify/trending");
        setTrending(res.data.trending);
      } catch (err) {
        console.error("Failed to load trending songs", err);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div>
      <h1 className='font-ibm font-bold text-2xl text-white pl-6'>Trending Now !</h1>
    <div className="w-full px-4 py-4">
    <Swiper
  modules={[Navigation, Pagination, Autoplay]}
  spaceBetween={30}
  slidesPerView={1}
  navigation={{
    nextEl: '.custom-next',
    prevEl: '.custom-prev',
  }}
  pagination={{ clickable: true }}
  autoplay={{ delay: 5000 }}
  loop={trending.length > 2}
  onSwiper={(swiper) => {
    swiperRef.current = swiper;
    setTimeout(() => {
      if (swiper.params.navigation) {
        swiper.navigation.init();
        swiper.navigation.update();
      }
    }, 100);
  }}
  className="rounded-2xl overflow-hidden"
>

        {trending.map((item, index) => (
 <SwiperSlide key={index}>
  <div className="flex flex-col md:flex-row items-center justify-between bg-[#1e1e1e] p-6 md:p-10 rounded-2xl shadow-lg bg-center" style={{backgroundImage: `url(${banner_bg})`}}>

    {/* Left Side: Details */}
    <div className="flex-1 text-white space-y-4 ml-80
    ">
      <h2 className="text-3xl font-ibm font-semibold">{item.name}</h2>
      <p className="text-[#ffbb56] font-medium">By {item.artists}</p>
      <div className="flex gap-4 text-sm mt-8 text-black">
        <span className='font-ibm'>▶️ {item.plays} Plays</span>
        <span >❤️ {item.likes}</span>
        <span>🔁 {item.shares}</span>
      </div>
      <button className="mt-4 bg-[#EB6C18] px-5 py-2 rounded-full text-white hover:bg-orange-600 transition font-medium">
        Listen Now
      </button>
    </div>

    {/* Right Side: Image */}
    <div className="flex-shrink-0 w-full md:w-[300px] h-[300px] mt-6 md:mt-0 md:ml-10 rounded-xl overflow-hidden">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover rounded-xl"
      />
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
