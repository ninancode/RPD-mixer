import { useState } from 'react';
import MixButton from '../buttons/MixButton/MixButton';
import './MixCreator.css';

export default function MixCreator(){
    const [mixAvailable,setMixAvailable] = useState(false);
    return(
        <div className='mix-creator-container'>
            {mixAvailable? 
                <div>
                    <div>
                        <p>AudioPlayer</p>
                    </div>
                    <div className='button-container'>
                        
                        <svg className='download-icon' viewBox="0 0 32 32">
                            <circle cx="16" cy="16" r="14" fill="none" />
                            <path d="M23 19v4a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2v-4" />
                            <polyline points="13 18 16 22 19 18" />
                            <line x1="16" y1="8" x2="16" y2="22" />
                        </svg>
                        <MixButton setMixAvailable={setMixAvailable} mixAvailable={mixAvailable}/>
                     </div>
                     

                </div>
                :
                 <MixButton setMixAvailable={setMixAvailable} mixAvailable={mixAvailable}/>
            }
           
        </div>
    )
}