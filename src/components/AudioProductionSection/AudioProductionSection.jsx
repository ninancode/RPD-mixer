import { useState } from "react";
import './AudioProductionSection.css';
import UploadedTracks from "../UploadedTracks/UploadedTracks";
import ToggleTracks from "../ToggleTracks/ToggleTracks";
import MixCreator from "../MixCreator/MixCreator";

export default function AudioProductionSection({hasTracks}){
        const initialTracks = [
        { id: 1, artist: "Radiohead", title: "Paranoid Android", toggled: false },
        { id: 2, artist: "The Beatles", title: "Yesterday", toggled: false },
        { id: 3, artist: "Radiohead", title: "Karma Police", toggled: false },
        { id: 4, artist: "Nirvana", title: "Smells Like Teen Spirit", toggled: false },
        { id: 5, artist: "The Beatles", title: "Hey Jude", toggled: false },
    ];

    const [tracks, setTracks] = useState(initialTracks);

    // Sort tracks alphabetically by artist then title
    const sortedTracks = [...tracks].sort((a, b) => {
        if (a.artist === b.artist) {
            return a.title.localeCompare(b.title);
        }
        return a.artist.localeCompare(b.artist);
    });

    // Function to toggle a track
    const toggleTrack = (trackId) => {
        setTracks(tracks.map(track => 
            track.id === trackId ? { ...track, toggled: !track.toggled } : track
        ));
    };
    // const toggledTracks = uploadedTracks.filter(track => track.isToggled);


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