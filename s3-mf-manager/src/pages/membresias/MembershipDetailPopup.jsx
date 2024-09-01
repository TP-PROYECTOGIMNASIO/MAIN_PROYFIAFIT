import React, { useState } from 'react';
import './MembershipDetailPopup.css';

const MembershipDetailPopup = ({ membership, onClose, onToggleStatus, onUpdateMembership }) => {
  // Estados locales para los campos editables
  const [editablePrice, setEditablePrice] = useState(membership.price);
  const [editableDetails, setEditableDetails] = useState(membership.details);

  const handleUpdate = () => {
    // Crear un nuevo objeto de membresía con los datos actualizados
    const updatedMembership = {
      ...membership,
      price: editablePrice,
      details: editableDetails,
    };
    onUpdateMembership(updatedMembership); // Llama a la función para actualizar la membresía
  };

  return (
    <div className="membership-detail-popup">
      <div className="membership-detail-popup-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Membresía: {membership.name}</h2>
        <label>Precio:</label>
        <input
          type="text"
          value={editablePrice}
          onChange={(e) => setEditablePrice(e.target.value)}
          className="editable-input"
        />
        <label>Detalle:</label>
        <textarea
          value={editableDetails}
          onChange={(e) => setEditableDetails(e.target.value)}
          className="editable-textarea"
        />
        <button className="toggle-button" onClick={() => onToggleStatus(membership)}>
          {membership.active ? 'Deshabilitado' : 'Habilitado'}
        </button>
      </div>
    </div>
  );
};

export default MembershipDetailPopup;

