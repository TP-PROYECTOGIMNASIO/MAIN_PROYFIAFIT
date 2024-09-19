import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './img/logo.png';
import './css/clienteregular.css';
import PasarellaPago from './pasarellaPago';

function ClienteRegular() {
  const [showPasarellaPago, setPasarellaPago] = useState(false);
  const navigate = useNavigate();

  const handleOpenPayment = () => {
    navigate('/clienteregular2'); 
  };

  const handleClosePayment = () => {
    setPasarellaPago(false);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <img src={logo} alt="FIA FIT" className="logo" />
      </header>
      <hr className="encabezado"></hr>       
      <div className='formulario-container scrollable-container'>  
        <form className="paseregular">
          <section className="primeralinea">
            <div>
              <label className='sele'>Selecciona tu plan de Membresía</label></div>
              <div>              
              <button type="button" className="boton" onClick={handleOpenPayment}>
                Siguiente
              </button>   
              {showPasarellaPago && <PasarellaPago onClose={handleClosePayment} />}
            </div>
          </section>
          <section>
            <div className="form-check">
                
                <div className='contenido'>
                    <input className="form-check-input" type="checkbox" id="planPremium" />
                    <label className="form-check-label" htmlFor="planPremium">Membresia Basica</label>
                    <label className=''>Inscripción</label>
                    <label className=''>Precio</label>
                </div>
            </div>
            <div className="form-check">
                
                <div className='contenido'>
                    <input className="form-check-input" type="checkbox" id="planPremium" />
                    <label className="form-check-label" htmlFor="planPremium">Membresia Pro</label>
                    <label className=''>Inscripción</label>
                    <label className=''>Precio</label>
                </div>
            </div>
           
          </section>
        </form>
      </div>
      <footer className="app-footer">
            <p>Copyright 2024</p>
        </footer>
    </div>
  );
}

export default ClienteRegular;
