import TrackComponent from '../TrackComponent/TrackComponent';
import './ToggleTracks.css';

export default function ToggleTracks({ tracks, onToggle, showPlayButton }) {
    return(
        <div className='track-preview-container'>
            {tracks.length > 0 ? (
                tracks.map(track => (
                    <TrackComponent 
                        key={track.id}
                        track={track}
                        onToggle={onToggle}
                        showPlayButton={showPlayButton}
                    />
                ))
            ) : (
                <div className="no-tracks-message">
                    <h2 className='button-text'>No tracks selected</h2>
                </div>
            )}
        </div>
    )
}