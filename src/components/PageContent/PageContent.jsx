import AudioUploaderButton from '../buttons/AudioUploaderButton/AudioUploaderButton.jsx'
import './PageContent.css';
import AudioProductionSection from '../AudioProductionSection/AudioProductionSection';
import { useState } from 'react';

export default function PageContent(){
    const [hasTracks, setHasTracks] = useState(false);
     const [uploadedFiles, setUploadedFiles] = useState([]);

     const handleFilesUpload = (files) => {
        const newFiles = files.map(file => ({
            id: URL.createObjectURL(file), // Using object URL as unique ID
            file: file,
            artist: file.name.split('.')[0], // Default artist name from filename
            title: file.name, // Default title to filename
            toggled: false
        }));
        
        setUploadedFiles(prevFiles => [...prevFiles, ...newFiles]);
    };
    return(
        <div className='page-content'>
            <AudioUploaderButton 
                setHasTracks={setHasTracks}
                onFilesUpload={handleFilesUpload}
            />
           <AudioProductionSection 
                hasTracks={hasTracks}
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
            />    
        </div>
    )
}