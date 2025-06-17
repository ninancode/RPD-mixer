import { useState } from "react";
import './AudioProductionSection.css';
import UploadedTracks from "../UploadedTracks/UploadedTracks";
import ToggleTracks from "../ToggleTracks/ToggleTracks";
import MixCreator from "../MixCreator/MixCreator";

export default function AudioProductionSection({hasTracks}){
    return(
        <div className="content-div">
            {hasTracks ? 
                <div className="audio-production-section">
                    <div className="column">
                        <UploadedTracks/>
                    </div>
                    <div className="column">
                        <ToggleTracks/>               
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