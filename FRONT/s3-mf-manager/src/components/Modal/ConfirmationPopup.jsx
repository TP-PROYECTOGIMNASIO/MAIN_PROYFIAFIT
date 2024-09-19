// src/components/Modal/ConfirmationPopup.jsx
import React from 'react';
import './PopupStyles.css';

const ConfirmationPopup = ({ message, onConfirm, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <p className="popup-message">{message}</p>
        <div className="popup-buttons">
          <button className="popup-button confirm" onClick={onConfirm}>
            Sí
          </button>
          <button className="popup-button cancel" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
