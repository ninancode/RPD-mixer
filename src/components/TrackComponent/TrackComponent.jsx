import { useState } from 'react';
import PlayButton from '../buttons/PlayButton/PlayButton';
import './TrackComponent.css';

export default function TrackComponent({ track, onToggle, showPlayButton }){
    const handleClick = () => {
        onToggle(track.id);
    };
    return(
        <div onClick={handleClick} style={{ cursor: 'pointer' }}>
            <div className='track-container'>
                {showPlayButton?

                    <div className='play-button-container'>
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
        </div>
    )
}