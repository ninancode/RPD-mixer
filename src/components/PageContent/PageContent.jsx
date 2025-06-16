import AudioUploader from '../AudioUploader/AudioUploader';
import './PageContent.css';
import AudioProductionSection from '../AudioProductionSection/AudioProductionSection';

export default function PageContent(){
    return(
        <div className='page-content'>
            <AudioUploader/>
            <AudioProductionSection/>    
        </div>
    )
}