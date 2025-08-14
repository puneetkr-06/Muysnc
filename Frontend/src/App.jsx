import React, { useState } from 'react'
import { Routes , Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Moodsync from './pages/Moodsync/Moodsync'
import './App.css'

const App = () => {
  // Global state for music app
  const [currentSong, setCurrentSong] = useState(null);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div>
     <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/home' element={<Home />} />
      <Route path='/signup' element={<Signup />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/aimusicsuggestion' element={
        <Moodsync 
          query={query}
          setQuery={setQuery}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
        />
      }/>
      {/* Catch-all route for 404 pages */}
      <Route path='*' element={<Navigate to="/" replace />} />
     </Routes>
    </div>
  )
}

export default App