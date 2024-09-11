import { useState } from 'react';
import logo from './img/logo.png';
import './css/clienteregular.css';
import PasarellaPago from './pasarellaPago';

function ClienteRegular2() {
  const [showPasarellaPago, setPasarellaPago] = useState(false);

  const handleOpenPayment = () => {
    setPasarellaPago(true);
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
          
          <section>
            <div className="form-check">
              <div className='contenido'>
                <label className=''>Membresia</label>
                <label className=''>Inscripcion</label>
                <label className=''>Precio</label>
              </div>
            </div>
            <div className="form-check">
              <div className='contenido'>
                <label className=''>Descripcion</label>
                <label className=''>S/.</label>
                <label className=''>S/.</label>
              </div>
            </div>
          </section>
          <section>
            <div className='tres'>
                <div>
                <label className='textsede'>Tipo de membresia</label>
                    <select className="selsede">                
                    </select>
                </div>
                <div>
                <label className='textsede'>Forma de pago</label>
                    <select className="selsede">                
                    </select>
                </div>
                <div>
                <label className='textsede'>Seleccionar sede</label>
                    <select className="selsede">                
                    </select>
                </div>
            </div>
          </section>
          <div>              
              <button type="button" className="boton" onClick={handleOpenPayment}>
                Siguiente
              </button>   
              {showPasarellaPago && <PasarellaPago onClose={handleClosePayment} />}
            </div>
        </form>
      </div>
      <footer className="app-footer">
        <p>Copyright 2024</p>
      </footer>
    </div>
  );
}

export default ClienteRegular2;
