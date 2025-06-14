import './App.css';
import DisplayFiles from './components/DisplayFiles/DisplayFiles';
// import { AudioProvider } from './components/AudioProvider/AudioContext';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <p>Create your RPD Mix</p>
        <DisplayFiles/>

      </header>
      {/* <AudioProvider> */}
        {/* <DisplayFiles/> */}
        {/* </AudioProvider> */}
      
    </div>
  );
}

export default App;
