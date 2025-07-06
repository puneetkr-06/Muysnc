import React, { useState, useRef, useEffect } from "react";
import "./Playbar.css";
import equalizerGif from "../../assets/sound_bar.gif";
import { MdPlayArrow, MdPause, MdSkipNext, MdSkipPrevious, MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { updateRecentlyPlayed } from "../../utils/updateRecentlyPlayed";

// ✅ Custom Hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

const Playbar = ({ song }) => {
  const user = JSON.parse(localStorage.getItem("musync-user"));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
      const isMobile = useIsMobile(); 

  const [liked, setLiked] = useState(false);

  const truncateText = (input, maxLength = 25) => {
    if (!input) return "";
    const text = Array.isArray(input) ? input.join(", ") : input;

 const decoded = text.replace(/&amp;/g, "&");

  return decoded.length > maxLength
    ? decoded.slice(0, maxLength) + "..."
    : decoded;
  };

  useEffect(() => {
    if (song && audioRef.current) {
      audioRef.current.currentTime = 0;

           const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobileDevice) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Autoplay blocked on desktop:", err);
      });
    }

      audioRef.current.play();
      setIsPlaying(true);

      if (user && song) {
        updateRecentlyPlayed(user._id, song);
      }
    }
  }, [song]);

 const handlePlayPause = () => {
  if (!song?.preview_url || !audioRef.current) return;

  if (isPlaying) {
    audioRef.current.pause();
  } else {
    audioRef.current.play().catch((err) => {
      console.warn("Audio play failed:", err);
    });
  }

  setIsPlaying(!isPlaying);
};

  const handleRewind = () => {
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  if (!song) return null;

  return (
    <div className="playbar-container shadow-lg flex items-center justify-between">
      <audio
        ref={audioRef}
        src={song.preview_url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      {isMobile ? (
      
        <div className="flex items-center justify-between w-full ">
          <div className="flex items-center gap-3">
            <img src={song.image || song.album?.images?.[0]?.url} alt="Song" className="w-10 h-10 rounded-lg" />
            <div>
              <p className="text-sm text-white font-medium">{truncateText(song.name, 20)}</p>
              <p className="text-xs text-gray-400"> {truncateText(Array.isArray(song.artists) ? song.artists.map((a) => a.name).join(", ") : song.artists)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={handlePlayPause} className="text-white text-2xl">
              {isPlaying ? <MdPause /> : <MdPlayArrow />}
            </button>
            <button 
            onClick={() => setLiked(!liked)}
            className={`text-xl ${liked ? "text-pink-600" : "text-gray-300"}`}>
              {liked ? <MdFavorite /> : <MdFavoriteBorder />}
            </button>
          </div>
          </div>
        
      ) : (
        <>
          <div className="flex items-center justify-center  md:min-w-60  xl:min-w-120">
            <img src={song.image || song.album?.images[0]?.url} alt="Song" className="playbar-song-img" />
            <div className="playbar-song-info">
              <div className="playbar-song-name">{truncateText(song.name)}</div  >
              <div className="playbar-artist-name">
                {truncateText(Array.isArray(song.artists) ? song.artists.map((a) => a.name).join(", ") : song.artists)}
              </div>
            </div>
          </div>

          <div className="playbar-controls flex items-center justify-center gap-2">
            <button onClick={handleRewind} className="playbar-btn flex items-center justify-center">
              <MdSkipPrevious />
            </button>
            <button onClick={handlePlayPause} className="playbar-btn flex items-center justify-center">
              {isPlaying ? <MdPause /> : <MdPlayArrow />}
            </button>
            <button className="playbar-btn flex items-center justify-center">
              <MdSkipNext />
            </button>
          </div>

          <div className="playbar-gif flex flex-col md:flex-row items-center justify-center">
            <img className={`w-12 h-12 mr-2 ${isPlaying ? "opacity-100" : "opacity-0"}`} src={equalizerGif} alt="Playing" />
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleProgressChange}
              className="playbar-progress"
            />
            <div className="playbar-time">
              {Math.floor(currentTime / 60)}:{("0" + Math.floor(currentTime % 60)).slice(-2)} / {Math.floor(duration / 60)}:{("0" + Math.floor(duration % 60)).slice(-2)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Playbar;
