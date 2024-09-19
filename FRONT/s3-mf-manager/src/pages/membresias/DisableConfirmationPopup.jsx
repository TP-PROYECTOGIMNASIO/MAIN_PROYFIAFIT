import React from 'react';
import './DisableConfirmationPopup.css'; // Asegúrate de tener este archivo CSS

const DisableConfirmationPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="disable-confirm-popup">
      <div className="disable-confirm-popup-content">
        <button className="close-button" onClick={onCancel}>X</button>
        <h2>¿Desea deshabilitar esta membresía?</h2>
        <div className="confirm-buttons">
          <button className="confirm-button" onClick={onConfirm}>Sí</button>
          <button className="cancel-button" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DisableConfirmationPopup;


