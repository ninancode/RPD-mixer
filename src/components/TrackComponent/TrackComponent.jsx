import { useState, useEffect, useRef } from 'react';
import PlayButton from '../buttons/PlayButton/PlayButton';
import './TrackComponent.css';

export default function TrackComponent({ track, onToggle, showPlayButton }){
     const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    
    const handleClick = () => {
        onToggle(track.id);
    };

     const handlePlayPause = (e) => {
        e.stopPropagation(); // Prevent triggering the toggle when clicking play
        
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            // Pause all other audio elements first
            document.querySelectorAll('audio').forEach(audio => {
                if (audio !== audioRef.current) audio.pause();
            });
            audioRef.current.play();
        }
        audioRef.current.volume = 0.3;
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        // Clean up audio when component unmounts
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
            }
        };
    }, []);
    return(
        <div onClick={handleClick} style={{ cursor: 'pointer' }}>
            <div className='track-container'>
                {showPlayButton?

                    <div className='play-button-container' onClick={handlePlayPause}>
                        <PlayButton circleColor={track.toggled? "#65B370" : "#9496E5"} triangleColor="#EDEDED" />
                    </div> 
                    :
                    <div className='no-play-button'></div>
                }
                <p>{track.artist}</p>
                <p> - </p>
                <p>{track.title}</p>
            </div>
            <hr className='track-seperator'/>
            <audio
                ref={audioRef}
                src={track.id}
                onEnded={() => setIsPlaying(false)}
                preload="metadata"
            />
        </div>
    )
}