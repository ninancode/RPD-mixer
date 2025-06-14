import { useState } from 'react';
import AudioUploader from '../AudioUploader/AudioUploader';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import './DisplayFiles.css';

export default function DisplayFiles() {
  const [snippets, setSnippets] = useState([]);

  return (
    <div>
      <AudioUploader onFilesAdded={setSnippets} />
      
      {snippets.length > 0 && (
        <div>
          <h3>Loaded Snippets:</h3>
          <ul>
           {snippets.map((file) => (
                <div key={file.name} className="file-preview">
                    <div className="file-info">
                    <strong>{file.artist}</strong> - {file.title}
                    {/* {file.normalized === false && (
        <span className="warning-badge">(Original - Not Normalized)</span>
      )} */}
                    </div>
                    <AudioPlayer url={file.url} />
                </div>
            ))}
          </ul>
          
        </div>
      )}
    </div>
  );
}