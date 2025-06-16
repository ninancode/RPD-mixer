import background from './assets/images/gidle.jpg';
import PageContent from './components/PageContent/PageContent';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='background-image'>
        <div class="fade-overlay">
         <img src={background} alt='G-Idle'></img>
         </div>
      </div>
      <PageContent/>

    </div>
  );
}

export default App;
