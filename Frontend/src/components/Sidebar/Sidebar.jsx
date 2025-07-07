import React , {useState} from 'react'
import { MdDashboard, MdLibraryMusic, MdPerson, MdAlbum, MdSettings,  MdSupport } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaCompactDisc } from "react-icons/fa";


export const sidebarLinksTop = [
  { name: "Dashboard", icon: <MdDashboard />},
  { name: "Your Playlists", icon: <MdLibraryMusic />},
  { name: "Albums", icon:<MdAlbum/> },
  { name: "Artists", icon:<MdPerson/> },

];

export const sidebarLinksBottom = [
  { name: "Settings", icon: <MdSettings /> },
  { name: "Support", icon:<MdSupport/> },
];

const Sidebar = ({setSearchResults , setQuery}) => {
  return (

    <div className='bg-[rgb(24,27,33)] w-16 sm:w-40 md:w-48 xl:w-64 h-screen fixed top-0 left-0 rounded-r-4xl flex flex-col items-center'>
       <div className='flex p-4 justify-center items-center mt-2'>
        < FaCompactDisc  className='text-[#EB6C18] bold text-3xl mr-2 animate-spin'/>
        <h1 className='text-[#EB6C18] text-3xl font-ibm font-bold justify-center items-center hidden sm:block'>Musync</h1>
       </div>
       
       <div className='flex flex-col justify-between h-full'>
               <ul className="space-y-6 mt-10 pr-2 rounded-md text-white font-ibm font-medium flex flex-col justify-center items-center">
        {sidebarLinksTop.map((item, index) => (
          <li key={index} className="flex items-center gap-4 hover:text-purple-400 cursor-pointer text-lg sm:text-md md:text-xl font-semibold w-full"
          onClick={() => {setSearchResults([]);
            setQuery('');
          }}>
            <span className="text-2xl">{item.icon}</span>
            <span className="hidden sm:block">{item.name}</span>
          </li>
        ))}
      </ul>
 
               <ul className="space-y-6 mb-5 pr-2 rounded-md text-white font-ibm font-medium flex flex-col justify-center items-center pb-16">
        {sidebarLinksBottom.map((item, index) => (
        
          <li key={index} className="flex items-center gap-4 hover:text-purple-400 cursor-pointer text-lg sm:text-md md:text-xl font-semibold w-full"
          onClick={() => {setSearchResults([]);
            setQuery('');
          }}>
            <span className="text-2xl">{item.icon}</span>
            <span className="hidden sm:block">{item.name}</span>
          </li>
         
        ))}
      </ul>
       </div>
    </div>
 
  )
}

export default Sidebar