import './MixButton.css';

export default function MixButton({setMixAvailable, mixAvailable}){
    return(
        <div className={`${!mixAvailable ? 'create-mix' : 'mix-again'}-button`} onClick={() => setMixAvailable(true)}>
            <h2 className='button-text'>
                {mixAvailable ? 
                'Mix Again'
                :
                'Create RPD Track'
            }    
                </h2>
        </div>
    )
}