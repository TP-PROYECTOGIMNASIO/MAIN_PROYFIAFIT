import './css/h-44.css';
import logo from './img/logo.png';
import clienteregular from './img/clire.png';
import clientelibre from './img/clili.png';
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();

  const handleButtonClick = (route) => {
    navigate(route);
  };

  return (
      <div className="app-container">
        <header className="app-header">
          <img src={logo} alt="FIA FIT" className="logo" />
        </header>
        <div className="button-container">
        <button className="image-button" onClick={() => handleButtonClick('/clienteregular')}>
            <div className="franjaroja"></div>
            <img src={clienteregular} alt="Cliente Regular" />
            <div className="cont-label">
              <div className="button-label">CLIENTE</div>
              <div className="button-label">REGULAR</div>
            </div>
          </button>
          <button className="image-button" onClick={() => handleButtonClick('/clientelibre')}>
            <div className="franjaroja"></div>
            <img src={clientelibre} alt="Cliente Libre" />
            <div className="cont-label">
              <div className="button-label">CLIENTE</div>
              <div className="button-label">LIBRE</div>
            </div>
            
          </button>
        </div>
        <footer className="app-footer">
          <p>Copyright 2024</p>
        </footer>
      </div>
    );
  }
  
  export default App;