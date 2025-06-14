import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { WaveSurfer } from 'wavesurfer.js';
import './AudioUploader.css';

export default function AudioUploader({ onFilesAdded }) {
  const [uploadStatus, setUploadStatus] = useState('Drag/drop chorus snippets here');
  const [fileRejections, setFileRejections] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const normalizeAudio = async (file, targetMinDb = -18, targetMaxDb = -12) => {
    return new Promise((resolve) => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const fileReader = new FileReader();

      fileReader.onload = async (e) => {
        try {
          const audioData = await audioContext.decodeAudioData(e.target.result);
          const peaks = [];
          
          // Analyze volume
          for (let i = 0; i < audioData.numberOfChannels; i++) {
            const channelData = audioData.getChannelData(i);
            for (let j = 0; j < channelData.length; j += 1000) {
              peaks.push(Math.abs(channelData[j]));
            }
          }

          const maxPeak = Math.max(...peaks);
          const currentDb = 20 * Math.log10(maxPeak);
          
          // Calculate needed gain adjustment
          let targetDb = Math.min(targetMaxDb, Math.max(targetMinDb, currentDb));
          const gainValue = Math.pow(10, (targetDb - currentDb) / 20);

          // Apply gain
          const offlineCtx = new OfflineAudioContext(
            audioData.numberOfChannels,
            audioData.length,
            audioData.sampleRate
          );
          
          const source = offlineCtx.createBufferSource();
          source.buffer = audioData;
          
          const gainNode = offlineCtx.createGain();
          gainNode.gain.value = gainValue;
          
          source.connect(gainNode);
          gainNode.connect(offlineCtx.destination);
          source.start();
          
          const normalizedAudio = await offlineCtx.startRendering();
          
          // Convert back to blob
          const audioBlob = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            offlineCtx.encodeAudioData(normalizedAudio, (buffer) => {
              const wavBlob = bufferToWave(buffer, normalizedAudio.length);
              reader.readAsDataURL(wavBlob);
            });
          });
          
          resolve(audioBlob);
        } catch (error) {
          console.error('Normalization error:', error);
          resolve(URL.createObjectURL(file)); // Fallback to original if error
        }
      };
      
      fileReader.readAsArrayBuffer(file);
    });
  };

  const bufferToWave = (buffer, length) => {
    // Implementation to convert buffer to WAV blob
    // (This would be a separate utility function)
    return new Blob([buffer], { type: 'audio/wav' });
  };

  const onDrop = useCallback(async (acceptedFiles, rejectedFiles) => {
    setFileRejections(rejectedFiles);
    setUploadStatus(`Processing ${acceptedFiles.length} files...`);
    setIsProcessing(true);
    
    try {
      const processedFiles = await Promise.all(
        acceptedFiles.map(async (file) => {
          try {
            // Normalize audio first
            const normalizedUrl = await normalizeAudio(file);
            
            // Metadata extraction
            const fileName = file.name.replace(/\.[^/.]+$/, "");
            const [artist, ...titleParts] = fileName.split(' - ');
            
            return {
              name: file.name,
              url: normalizedUrl,
              artist: artist?.trim() || 'Unknown Artist',
              title: titleParts.join(' - ').trim() || fileName,
              raw: file,
              normalized: true
            };
          } catch (error) {
            console.error(`Error processing ${file.name}:`, error);
            return {
              name: file.name,
              url: URL.createObjectURL(file),
              artist: 'Unknown Artist',
              title: file.name.replace(/\.[^/.]+$/, ""),
              raw: file,
              normalized: false,
              error: error.message
            };
          }
        })
      );

      setUploadStatus(`Ready to mix! (${processedFiles.length} snippets loaded)`);
      onFilesAdded(processedFiles);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('Error processing files');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'audio/*': ['.mp3', '.wav', '.m4a'] },
    maxFiles: 20,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  return (
    <div className="upload-container">
      <div 
        {...getRootProps()}
        className={`upload-zone ${isDragActive ? 'active' : ''} ${isProcessing ? 'processing' : ''}`}
        disabled={isProcessing}
      >
        <input {...getInputProps()} disabled={isProcessing} />
        <div className="upload-content">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p>{isProcessing ? 'Normalizing audio...' : isDragActive ? 'Drop the files!' : uploadStatus}</p>
          <small>Supports MP3, WAV, M4A (Max 20 files)</small>
          {isProcessing && <div className="processing-bar" />}
        </div>
      </div>

      {fileRejections.length > 0 && (
        <div className="error-message">
          <h4>Couldn't add {fileRejections.length} file(s):</h4>
          <ul>
            {fileRejections.map(({ file, errors }, i) => (
              <li key={i}>
                <strong>{file.name}</strong> - {errors[0].message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}