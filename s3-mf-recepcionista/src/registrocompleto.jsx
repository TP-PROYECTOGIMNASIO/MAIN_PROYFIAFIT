
import './css/registrocompleto.css';
import logo from './img/logo.png';
import validacion from './img/validacion.png';
import { useNavigate } from 'react-router-dom';

function RegistroCompleto() {
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
                    <label className='men'>A continuación le adjuntamos los datos utilizados</label>
                    <div className="lista">
                        <ul>■ Telefono de contacto</ul>
                        <ul>■ Direccion Comercial:</ul>
                        <ul>■ Producto:</ul>
                        <ul>■ Número de Pedido:</ul>
                        <ul>■ Nombre del Comprador:</ul>
                        <ul>■ Nombre del Tarjeta:</ul>
                        <ul>■ Fecha y Hora del Pedido:</ul>
                        <ul>■ Importe de la Transacción:</ul>
                        <ul>■ Tipo de Moneda</ul>
                    </div>
                    <button type="submit" className='boton'onClick={() => handleButtonClick('Tipo cliente')}>Salir</button>
                </div>
            </div>
          </div>
          <footer className="app-footer">
            <p>Copyright 2024</p>
        </footer>
        </div>
    )
}
export default RegistroCompleto;