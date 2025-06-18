import TrackComponent from '../TrackComponent/TrackComponent';
// import TrackPreview from '../TrackPreview/TrackPreview';
import './UploadedTracks.css';

export default function UploadedTracks({ tracks, onToggle, onMetadataUpdate, showPlayButton }){
    
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