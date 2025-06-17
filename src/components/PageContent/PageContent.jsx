import AudioUploader from '../AudioUploader/AudioUploader';
import './PageContent.css';
import AudioProductionSection from '../AudioProductionSection/AudioProductionSection';
import { useState } from 'react';

export default function PageContent(){
    const [hasTracks, setHasTracks] = useState(false);
    return(
        <div className='page-content'>
            <AudioUploader setHasTracks={setHasTracks}/>
            <AudioProductionSection hasTracks={hasTracks}/>    
        </div>
    )
}