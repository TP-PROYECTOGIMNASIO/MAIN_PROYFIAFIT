import React from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ message, onConfirm, onClose }) => {
  return (
    <div className="confirmation-modal-container">
      <div className="confirmation-modal-content">
        <h2>{message}</h2>
        <div className="confirmation-buttons">
          <button className="confirm-btn" onClick={onConfirm}>Volver a la lista</button>
          <button className="cancel-btn" onClick={onClose}>Volver al formulario</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
