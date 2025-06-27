import React, { useState, useRef, useEffect } from "react";
import "./Playbar.css";
import equalizerGif from "../../assets/sound_bar.gif";
import { MdPlayArrow, MdPause, MdSkipNext,MdSkipPrevious } from 'react-icons/md';

const Playbar = ({ song}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

    const truncateText = (input, maxLength = 25) => {
  if (!input) return "";

  // If input is an array (like artists), join it into a single string
  const text = Array.isArray(input) ? input.join(", ") : input;

  // Ensure it's a string and truncate
  return typeof text === 'string' && text.length > maxLength
    ? text.slice(0, maxLength) + "..."
    : text;
};

  useEffect(() => {
    if (song && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);

    }
  }, [song]);

  const handlePlayPause = () => {
    if (!song?.preview_url) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
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
<div className="flex items-center justify-center min-w-120 ">
      <img src={song.image || song.album?.images[0]?.url} alt="Song" className="playbar-song-img" />
      <div className="playbar-song-info">
        <div className="playbar-song-name">{truncateText(song.name)}</div>
        <div className="playbar-artist-name">  {truncateText(
    Array.isArray(song.artists)
      ? song.artists.map((a) => a.name).join(", ")
      : song.artists
  )}</div>
      </div>
</div>
      <div className="playbar-controls flex items-center justify-center gap-2">
        <button onClick={handleRewind} className="playbar-btn flex justify-center items-center">
          <MdSkipPrevious/>
        </button>
        <button onClick={handlePlayPause} className="playbar-btn flex justify-center items-center">
          {isPlaying ? <MdPause /> : <MdPlayArrow />}
        </button>
        <button className="playbar-btn flex justify-center items-center">
          <MdSkipNext/>
        </button>
      </div>

      <div className="playbar-gif flex items-center justify-center">
        <img className={`w-12 h-12 mr-2 ${isPlaying ? 'opacity-100' : 'opacity-0'}`} src={equalizerGif} alt="Playing" />
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
    </div>
  );
};

export default Playbar;