import React from 'react';
import './styles/Modal.css'; // Asegúrate de que la ruta sea correcta

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay ">
      <div className="modal-content max-h-[500px]">
        <button className="modal-close text-black" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
