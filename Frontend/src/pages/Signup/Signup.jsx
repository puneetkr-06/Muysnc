import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaCompactDisc } from 'react-icons/fa';
import {Link} from 'react-router-dom'
import { createUserWithEmailAndPassword , GoogleAuthProvider, updateProfile} from "firebase/auth";
import { auth , provider } from "../../firebase/firebase";
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {BASE_URL} from "../../utils/config"

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  }

const handleSubmit = async (e) => {
  e.preventDefault();
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
        await updateProfile(userCredential.user, {
      displayName: formData.name,
    });
    alert("Signup Successful!");

    const userData = {
  firebaseUid: userCredential.user.uid,
  name: formData.name || userCredential.user.displayName,
  email: formData.email || userCredential.user.email,
  photoURL: userCredential.user.photoURL || "",
};

await axios.post(`${BASE_URL}/user/register`, userData)
  .then((res) => {
    const user = res.data.user; 
    localStorage.setItem("musync-user", JSON.stringify(user)); 
    navigate('/home')
  });
  } catch (error) {
    console.error("Signup Error:", error.message);
    alert("Error in Signup!");
  }
};

const handleGoogleSignup = async () => {
  try {
     const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!user) throw new Error("No user returned from Google");

    const userData = {
      firebaseUid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL || "",
    };

await axios.post(`${BASE_URL}/user/register`, userData)
  .then((res) => {
    const user = res.data.user; 
    localStorage.setItem("musync-user", JSON.stringify(user)); 
    navigate("/home");
  });
  } catch (error) {
    console.error("Google signup error:", error.message);
    alert("Error with Google Signup!");
  }
};

  return (

    <div className='min-h-screen bg-gradient-to-br from-[#0e121b] via-[#0e0f14] to-[#272a34] flex flex-col gap-8'>

            <div className='flex p-4 items-center'>
               < FaCompactDisc  className='text-[#EB6C18] bold text-3xl mr-2 animate-spin'/>
               <h1 className='text-[#EB6C18] text-3xl font-ibm font-bold justify-center items-center hidden sm:block'>Musync</h1>
              </div>

    <div className="flex items-center justify-center text-white px-4">

      <div className="w-full max-w-md bg-[#1e1e1e] p-8 rounded-2xl shadow-lg border border-gray-800">
        <h2 className="text-3xl font-bold text-[#EB6C18] text-center mb-6 font-ibm">Create your account</h2>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
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
            type="name"
            name="name"
            required
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl bg-[#2a2a2a] placeholder-gray-400 text-white outline-none focus:ring-2 focus:ring-[#EB6C18]"
          />
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
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl bg-[#2a2a2a] placeholder-gray-400 text-white outline-none focus:ring-2 focus:ring-[#EB6C18]"
          />

          <button
            type="submit"
            className="w-full mt-8 py-2 rounded-xl bg-[#EB6C18] hover:bg-[#ff7f2c] transition font-semibold"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account? <Link to='/login' className="text-[#EB6C18] cursor-pointer hover:underline">Login</Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Signup;
