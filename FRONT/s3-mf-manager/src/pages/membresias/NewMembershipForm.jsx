// src/components/NewMembershipForm.jsx
import React, { useState } from 'react';
import ConfirmPopup from './ConfirmPopup';
import './NewMembershipForm.css';

const NewMembershipForm = ({ onAddMembership }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    details: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  const handleConfirm = () => {
    onAddMembership(formData); // Llama a la función para agregar la membresía
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className="new-membership-form">
      <h2>Crear Nueva Membresía</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <label>Precio:</label>
        <input
          type="text"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />

        <label>Detalle:</label>
        <textarea
          value={formData.details}
          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
          required
        ></textarea>

        <button type="submit" className="add-button">Agregar</button>
      </form>

      {showPopup && <ConfirmPopup onConfirm={handleConfirm} onCancel={handleCancel} />}
    </div>
  );
};

export default NewMembershipForm;



