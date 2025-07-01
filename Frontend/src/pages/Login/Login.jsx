import React, { useState } from 'react';
import axios from 'axios'
import { FcGoogle } from 'react-icons/fc';
import {FaCompactDisc} from 'react-icons/fa';
import {Link} from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth ,provider } from '../../firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import {BASE_URL} from "../../utils/config"



const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log("User logged in:", userCredential.user);
         
 const firebaseUser = userCredential.user;
const userData = {
  firebaseUid: firebaseUser.uid,
  name: firebaseUser.displayName || '',
  email: firebaseUser.email,
  photoURL: firebaseUser.photoURL || '',
};

    axios.post(`${BASE_URL}/user/login`, userData)
      .then((res) => {
        const user = res.data.user;
        localStorage.setItem("musync-user", JSON.stringify(user));
      })
      .catch((err) => console.error("Register Error", err));


      navigate("/home");
    } catch (error) {
      console.error("Login error:", error.message);
    }
  }

  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!user) throw new Error("No user returned from Google");

const firebaseUser = user;
const userData = {
  firebaseUid: firebaseUser.uid,
  name: firebaseUser.displayName || '',
  email: firebaseUser.email,
  photoURL: firebaseUser.photoURL || '',
};

    
    const res = await axios.post(`${BASE_URL}/user/login`, userData);

    
    localStorage.setItem("musync-user", JSON.stringify(res.data.user));

    console.log("Logged in with Google:", res.data.user);
  } catch (err) {
    console.error("Google login error:", err);
  }
  navigate('/home');
};

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0e121b] via-[#0e0f14] to-[#272a34] flex flex-col gap-8'>

      {/* Logo Top */}
      <div className='flex p-4 items-center'>
        < FaCompactDisc  className='text-[#EB6C18] bold text-3xl mr-2 animate-spin'/>
        <h1 className='text-[#EB6C18] text-3xl font-ibm font-bold hidden sm:block'>Musync</h1>
      </div>

      <div className="flex items-center justify-center text-white px-4">
        <div className="w-full max-w-md bg-[#1e1e1e] p-8 rounded-2xl shadow-lg border border-gray-800">
          <h2 className="text-3xl font-bold text-[#EB6C18] text-center mb-6 font-ibm">Login to Musync</h2>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white text-black font-semibold py-2 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-200 transition mb-6"
          >
            <FcGoogle size={20} /> Continue with Google
          </button>

          <div className="flex items-center mb-6">
            <hr className="flex-grow border-gray-600" />
            <span className="mx-2 text-gray-400 text-sm">or</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-[#2a2a2a] placeholder-gray-400 text-white outline-none focus:ring-2 focus:ring-[#EB6C18]"
            />
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-[#2a2a2a] placeholder-gray-400 text-white outline-none focus:ring-2 focus:ring-[#EB6C18]"
            />

            <button
              type="submit"
              className="w-full mt-8 py-2 rounded-xl bg-[#EB6C18] hover:bg-[#ff7f2c] transition font-semibold"
            >
              Log In
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-4">
            Don't have an account? <Link to='/signup' className="text-[#EB6C18] cursor-pointer hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
