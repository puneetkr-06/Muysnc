import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMusic, FaStar, FaDownload, FaHeadphones, FaCompactDisc } from 'react-icons/fa';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0c10] via-[#10131c] to-[#1a1c28] text-white p-6 flex flex-col justify-between">
      {/* Navbar */}
      <div className="flex justify-between items-center">
        <div className='flex gap-2 items-center'>
          < FaCompactDisc  className='text-[#EB6C18] bold text-3xl mr-2 animate-spin'/>
        <h1 className="text-xl md:text-3xl font-bold text-[#EB6C18]">Musync</h1>
        </div>
        <div className="flex items-center gap-1 md:gap-2 text-[#EB6C18] font-bold text-sm animate-pulse">
  <span className="w-1 md:w-2 h-4 bg-[#EB6C18] rounded-sm"></span>
  <span className="w-1 md:w-2 h-6 bg-[#EB6C18] rounded-sm"></span>
  <span className="w-1 md:w-2 h-3 bg-[#EB6C18] rounded-sm"></span>
  <span className="w-1 md:w-2 h-5 bg-[#EB6C18] rounded-sm"></span>
</div>
  
      </div>

      {/* Hero Section */}
      <div className="text-center mt-16">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Your Music, Your Mood, Your Musync</h2>
        <p className="text-gray-300 max-w-xl mx-auto mb-8">
          Discover, stream, and enjoy millions of songs from your favorite artists. All in one place.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="bg-[#EB6C18] hover:bg-pink-700 text-white px-6 py-3 text-lg rounded-full font-semibold shadow-lg"
        >
          Start Listening
        </button>
      </div>

      {/* Premium Features */}
      <div className="mt-24">
        <h3 className="text-2xl font-bold text-center mb-6">Why Go Premium?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-[#1f2233] p-4 rounded-xl shadow-md">
            <FaHeadphones className="text-3xl text-[#EB6C18] mx-auto mb-3" />
            <h4 className="font-semibold mb-1">Ad-Free Music</h4>
            <p className="text-sm text-gray-400">Enjoy uninterrupted streaming with no ads.</p>
          </div>
          <div className="bg-[#1f2233] p-4 rounded-xl shadow-md">
            <FaDownload className="text-3xl text-[#EB6C18] mx-auto mb-3" />
            <h4 className="font-semibold mb-1">Offline Downloads</h4>
            <p className="text-sm text-gray-400">Download songs and listen without internet.</p>
          </div>
          <div className="bg-[#1f2233] p-4 rounded-xl shadow-md">
            <FaMusic className="text-3xl text-[#EB6C18] mx-auto mb-3" />
            <h4 className="font-semibold mb-1">HD Quality</h4>
            <p className="text-sm text-gray-400">Experience crystal clear sound quality.</p>
          </div>
          <div className="bg-[#1f2233] p-4 rounded-xl shadow-md">
            <FaStar className="text-3xl text-[#EB6C18] mx-auto mb-3" />
            <h4 className="font-semibold mb-1">Exclusive Content</h4>
            <p className="text-sm text-gray-400">Get early access to new releases.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-20 mb-4">
        © 2025 Musync. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
