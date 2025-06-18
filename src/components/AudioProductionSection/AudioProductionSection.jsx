import { useState, useEffect } from "react";
import './AudioProductionSection.css';
import UploadedTracks from "../UploadedTracks/UploadedTracks";
import ToggleTracks from "../ToggleTracks/ToggleTracks";
import MixCreator from "../MixCreator/MixCreator";


export default function AudioProductionSection({ hasTracks, uploadedFiles, setUploadedFiles }){

    // const [tracks, setTracks] = useState(initialTracks);

     // Function to update track metadata
    const updateTrackMetadata = (trackId, newMetadata) => {
        setUploadedFiles(uploadedFiles.map(track => 
            track.id === trackId ? { ...track, ...newMetadata } : track
        ));
    };

    // Sort tracks alphabetically by artist then title
    const sortedTracks = [...uploadedFiles].sort((a, b) => {
        if (a.artist === b.artist) {
            return a.title.localeCompare(b.title);
        }
        return a.artist.localeCompare(b.artist);
    });

       // Function to toggle a track
    const toggleTrack = (trackId) => {
        setUploadedFiles(uploadedFiles.map(track => 
            track.id === trackId ? { ...track, toggled: !track.toggled } : track
        ));
    };
    // const toggledTracks = uploadedTracks.filter(track => track.isToggled);

useEffect(() => {
        return () => {
            uploadedFiles.forEach(file => {
                URL.revokeObjectURL(file.id);
            });
        };
    }, [uploadedFiles]);

    return(
        <div className="content-div">
            {hasTracks ? 
                <div className="audio-production-section">
                    <div className="column">
                        <UploadedTracks 
                            tracks={sortedTracks} 
                            onToggle={toggleTrack}
                            showPlayButton={true}
                        />
                    </div>
                    <div className="column">
                       <ToggleTracks 
                            tracks={sortedTracks.filter(track => track.toggled)} 
                            onToggle={toggleTrack}
                            showPlayButton={false}
                        />               
                    </div>
                    <div className="column">
                        <MixCreator/>
                    </div>                   
                </div> 
            : 
            <div className="no-track-container">
                <h1 className="no-track-text">Create Your Own RPD</h1>
            </div>
            }
        </div>
    )
}