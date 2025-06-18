import TrackComponent from '../TrackComponent/TrackComponent';
import './ToggleTracks.css';

export default function ToggleTracks({ tracks, onToggle, showPlayButton }) {
    return(
         <div className='track-preview-container'>
            {tracks.map(track => (
                <TrackComponent 
                    key={track.id}
                    track={track}
                    onToggle={onToggle}
                    showPlayButton={showPlayButton}
                />
            ))}
        </div>
    )
}