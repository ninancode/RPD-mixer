import TrackComponent from '../TrackComponent/TrackComponent';
import './ToggleTracks.css';

export default function ToggleTracks() {
    return(
        <div className='track-preview-container'>
                    {/* <p>Uploaded Tracks</p> */}
        
                    <TrackComponent toggled={true}/>
                    <TrackComponent toggled={true}/>
                    <TrackComponent toggled={true}/>
                    <TrackComponent toggled={true}/>
                    <TrackComponent toggled={true}/>
                    <TrackComponent toggled={true}/>
                    <TrackComponent toggled={true}/>
                    <TrackComponent toggled={true}/>
                    <TrackComponent toggled={true}/>
                    
        
        
                </div>
    )
}