import { useState } from 'react';
import PlayButton from '../buttons/PlayButton/PlayButton';
import './TrackComponent.css';

export default function TrackComponent({toggled}){
    // const [toggled, setToggled] = useState(false);
    return(
        <div>
            <div className='track-container'>
                {!toggled?
                    <div className='play-button-container'>
                        <PlayButton circleColor="#9496E5" triangleColor="#EDEDED" />
                    </div> 
                    :
                    <div className='no-play-button'></div>
                }
                <p>Artist</p>
                <p> - </p>
                <p>Song Title</p>
            </div>
            <hr className='track-seperator'/>
        </div>
    )
}