import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './css/pasarellaPago.css'; 

const PasarellaPago = ({ onClose }) => {
  const navigate = useNavigate();

  const handleAccept = () => {
    // Perform any required actions here (e.g., form validation, payment processing)
    navigate('/registrocompleto'); // Redirect to registrocompleto page
  };

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <h2>Pasarela de Pagos</h2>
        <form>
            <label className="pasarella">Número de Tarjeta</label>
            <input type="text" className="pas-in" />
            <section className="grupo">
                <div>
                <label className="pasarella">Fecha de caducidad</label>
                <input type="text" className="pas-in" />
                </div>
                <div>
                <label className="pasarella">CVV</label>
                <input type="text" className="pas-in" />
                </div>
            </section>
            <section className="grupo">
                <div>
                <label className="pasarella">Nombres</label>
                <input type="text" className="pas-in" />
                </div>
                <div>
                <label className="pasarella">Apellidos</label>
                <input type="text" className="pas-in" />
                </div>
            </section>
            <div>
                <label className="pasarella">Correo</label>
                <input type="text" className="pas-in" />
            </div>
        </form>
        <label className="pasarella">Total a pagar:</label>
        <label className="pasarella">S/.</label>
        <button onClick={handleAccept} className="close-button-pas">Aceptar</button>
        <button onClick={onClose} className="close-button-re">Rechazar</button>
        {/* Add your payment form here */}
      </div>
    </div>
  );
};

PasarellaPago.propTypes = {
  onClose: PropTypes.func.isRequired, // Validates that onClose is a function and required
};

export default PasarellaPago;
