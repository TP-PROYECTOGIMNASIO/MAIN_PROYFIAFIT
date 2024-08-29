import { useState } from 'react';
import logo from './img/logo.png';
import './css/clientelibre.css';
import PasarellaPago from './pasarellaPago';

function Clientelibre() {
    const [showPasarellaPago, setPasarellaPago] = useState(false);

  const handleOpenPayment = () => {
    setPasarellaPago(true);
  };

  const handleClosePayment = () => {
    setPasarellaPago(false);
  };
    return(
        <div className="app-container">
        <header className="app-header">
          <img src={logo} alt="FIA FIT" className="logo" />
        </header>
        <hr className="encabezado"></hr>       
        <div className='formulario-container scrollable-container'>  
           <form className="paselibre">
            <div className="formulariolibre">
                <section>
                    <h1 className='tit1'>Pase Libre</h1>
                    <h1 className='subtit2'>Descripción</h1>

                    <label className='textfecha'>Seleccionar fecha</label>
                    <input type="date" className="fechaSeleccionada" />
                </section>
                <section>
                    <h1 className='tit1'>Precio</h1>
                    <h1 className='subtit2'>S/.</h1>
                    <label>El precio cambiara según la opción seleccionada</label>
                    <label className='textsede'>Seleccionar sede</label>
                    <select className="selsede">                
                    </select>
                </section>
            </div>
           </form>
           <button type="button" className="boton" onClick={handleOpenPayment}>
                Siguiente
            </button>   
            {showPasarellaPago && <PasarellaPago onClose={handleClosePayment} />}
        </div>
        <footer className="app-footer">
            <p>Copyright 2024</p>
        </footer>
        </div>
    )
}
export default Clientelibre