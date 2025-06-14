// AudioContext.js
import { createContext, useContext, useRef, useState } from 'react';

const AudioContext = createContext();

export function AudioProvider({ children }) {
  const audioRef = useRef(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [volume, setVolume] = useState(0.3);

  const play = (url) => {
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Create new audio instance
    const audio = new Audio(url);
    audio.volume = volume;
    audio.play();
    
    audioRef.current = audio;
    setCurrentlyPlaying(url);

    audio.onended = () => {
      setCurrentlyPlaying(null);
    };
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentlyPlaying(null);
    }
  };

  const setGlobalVolume = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <AudioContext.Provider value={{ play, stop, currentlyPlaying, volume, setGlobalVolume }}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);