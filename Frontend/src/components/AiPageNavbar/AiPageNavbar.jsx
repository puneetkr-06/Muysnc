import React, {useState, useEffect, useRef} from 'react'
import { Link } from "react-router-dom";
import { FiSearch } from 'react-icons/fi';
import { MdArrowDropDown, MdLogout, MdAccountCircle } from 'react-icons/md';
import { FaCrown } from 'react-icons/fa';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import {signOut} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {BASE_URL} from "../../utils/config";
import { getSongsByMood } from '../../utils/openapi';



const AiPageNavbar = ({ query, setQuery, setSearchResults }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
   useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(null);
    }
  });

  return () => unsubscribe();
}, []);


  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dummy = {
    accountType: "Basic", // or "Premium"
    photo: "https://i.pravatar.cc/300",
  };

    useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleLogout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("musync-user");
    navigate("/login");
  } catch (error) {
    console.error("Logout Error:", error.message);
    alert("Error logging out!");
  }
};

const [apiLoading, setApiLoading] = useState(false); 

const handleSearch = async () => {
  if (!query.trim()) {
    alert('Please enter a mood or feeling to search for music');
    return;
  }
  
  setApiLoading(true);
  console.log('=== Starting AI Music Search ===');
  console.log('Query:', query);
  
  try {
    // First test the backend directly
    console.log('Testing backend connection...');
    const testRes = await axios.get(`${BASE_URL}/musync/aisearch?query=test`);
    console.log('Backend test response:', testRes.data);
    
    console.log('Calling getSongsByMood with Gemini API...');
    const results = await getSongsByMood(query);
    console.log('Final AI search results:', results);
    
    if (results.length === 0) {
      alert('No songs found for this mood. The service might be temporarily unavailable. Please try again later or try a different mood description.');
    } else {
      console.log(`Found ${results.length} songs, setting search results...`);
      setSearchResults(results);
    }
  } catch (err) {
    console.error("Search failed:", err);
    
    // More detailed error message
    if (err.response) {
      console.error('Backend error:', err.response.data);
      alert(`Search failed: ${err.response.data.error || 'Backend error'}. Please try again.`);
    } else if (err.request) {
      console.error('Network error - no response received');
      alert('Network error: Could not connect to the server. Please check if the backend is running on http://localhost:4000');
    } else {
      console.error('Unexpected error:', err.message);
      alert(`Unexpected error: ${err.message}. Please try again.`);
    }
  } finally {
    setApiLoading(false);
  }
};



  return (
    <div className='fixed top-4 left-16 sm:left-40 md:left-64 right-0 px-6 pt-2 z-50 flex justify-between' ref={dropdownRef}>
      <div className=' w-full search flex-1 md:max-w-xl relative'>
          <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">
          <FiSearch size={18} />
        </span>
        <input
          type="text"
          placeholder="Describe the moment... we’ll match the music"
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#1e1e1e] text-white ring-2 ring-[#EB6C18] outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
       {apiLoading && (
       <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
       <div className="h-5 w-5 border-2 border-t-orange-500 border-white rounded-full animate-spin"></div>
       </div>
)}
      </div>


  <div className="relative ml-6 -mt-2 flex items-center gap-5">

        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src={dummy.photo}
            alt="Profile"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="text-md leading-tight hidden sm:block">
            <p className="font-semibold text-[#EB6C18]">{user?.displayName || "User name"}</p>
            <p className="text-sm text-gray-400">{dummy.accountType} Account</p>
          </div>
          <MdArrowDropDown className="text-xl text-white" />
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-[#1e1e1e] rounded-lg shadow-lg border border-gray-700 z-20">
            <ul className="text-sm text-white py-2">
              <li className="px-4 py-2 hover:bg-[#2c2c2c] flex items-center gap-2 cursor-pointer">
                <MdAccountCircle className="text-lg" />
                Profile
              </li>
              <li className="px-4 py-2 hover:bg-[#2c2c2c] flex items-center gap-2 cursor-pointer">
                <FaCrown className="text-yellow-400 text-base" />
                Upgrade to Premium
              </li>
              <li  onClick={handleLogout} className="px-4 py-2 hover:bg-[#2c2c2c] flex items-center gap-2 cursor-pointer">
                <MdLogout className="text-red-400 text-lg" />
                <button>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>



    </div>
  )
}

export default AiPageNavbar