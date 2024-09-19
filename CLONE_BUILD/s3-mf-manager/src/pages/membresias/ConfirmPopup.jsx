import React from 'react';
import './ConfirmPopup.css'; // Asegúrate de que el archivo CSS exista

const ConfirmPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="confirm-popup">
      <div className="confirm-popup-content">
        <button className="close-button" onClick={onCancel}>X</button>
        <h2>¿Seguro que deseas agregar la membresía?</h2>
        <div className="confirm-popup-buttons">
          <button className="confirm-button" onClick={onConfirm}>Sí</button>
          <button className="cancel-button" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;


