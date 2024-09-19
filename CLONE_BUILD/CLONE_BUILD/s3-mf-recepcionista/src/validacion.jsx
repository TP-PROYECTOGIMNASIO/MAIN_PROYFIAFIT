
import './css/validacion.css';
import logo from './img/logo.png';
import validacion from './img/validacion.png';
import { useNavigate } from 'react-router-dom';

function Validacion() {
    const navigate = useNavigate(); 
    const handleButtonClick = (clienteTipo) => {
        navigate('/H_44', { state: { tipo: clienteTipo } }); 
    };
    return(
        <div className="app-container">
          <div>
            <header className="app-header">
            <img src={logo} alt="FIA FIT" className="logo" />
            </header>
          </div>
          <div className="cuerpo-container">
            <div className="imagen">
                <img src={validacion} alt="FIA FIT" className="val"/>
            </div>
            <div className="formulario">
                <div className="form">
                    <h1 className='tit'>REGISTRO DEL CLIENTE</h1>
                    <label className='cuerpo'>Hemos enviado un codigo de 6 digitos a tu correo y teléfono, introduce el codigo para validarlo</label>
                 
                    <div className='numeros'>
                    <input type='caracter' className='cuadro'></input>
                    <input type='caracter' className='cuadro'></input>
                    <input type='caracter' className='cuadro'></input>
                    <input type='caracter' className='cuadro'></input>
                    <input type='caracter' className='cuadro'></input>
                    <input type='caracter' className='cuadro'></input>
                    </div>
                    
                    <label className='cuerpo'>Reenviar código</label>
                    <button type="submit" className='boton'onClick={() => handleButtonClick('Tipo cliente')}>Siguiente</button>
                </div>
            </div>
          </div>
          <footer className="app-footer">
            <p>Copyright 2024</p>
        </footer>
        </div>
    )
}
export default Validacion;