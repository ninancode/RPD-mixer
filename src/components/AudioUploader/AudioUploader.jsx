import './AudioUploader.css';

export default function AudioUploarder(){
    return (
        <div className='upload-area'>
            <svg className='upload-icon' viewBox="0 0 24 24" >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className='upload-text'>Upload</p>
            <small>Supports MP3, WAV, M4A</small>
        </div>
    )
}