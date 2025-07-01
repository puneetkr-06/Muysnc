import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import './App.css'

const App = () => {
  return (
    <div>
     <Routes>
      <Route path='/' element={<Landing></Landing>} />
      <Route path='/home' element={<Home></Home>} />
      <Route path='/signup' element={<Signup></Signup>}/>
      <Route path='/login' element={<Login></Login>}/>
     </Routes>

    </div>
  )
}

export default App