import PropTypes from 'prop-types';
import './Modal.css'; // Importa el archivo CSS aquí

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

// Validación de props
Modal.propTypes = {
  children: PropTypes.node.isRequired, // Asegúrate de que children sea requerido
  onClose: PropTypes.func.isRequired,   // Asegúrate de que onClose sea requerido
};
export default Modal;
