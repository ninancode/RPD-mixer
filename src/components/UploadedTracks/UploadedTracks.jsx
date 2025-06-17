import TrackComponent from '../TrackComponent/TrackComponent';
// import TrackPreview from '../TrackPreview/TrackPreview';
import './UploadedTracks.css';

export default function UploadedTracks(){
    return(
        <div className='track-preview-container'>
            {/* <p>Uploaded Tracks</p> */}

            <TrackComponent toggled={false}/>
            <TrackComponent toggled={false}/>
            <TrackComponent toggled={false}/>
            <TrackComponent toggled={false}/>
            <TrackComponent toggled={false}/>
            <TrackComponent toggled={false}/>
            <TrackComponent toggled={false}/>
            <TrackComponent toggled={false}/>
            


        </div>
    )
}