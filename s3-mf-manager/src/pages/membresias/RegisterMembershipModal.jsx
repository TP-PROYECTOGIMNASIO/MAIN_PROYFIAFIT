import React, { useState } from 'react';
import ConfirmModal from './ConfirmModal';

const RegisterMembershipModal = ({ setMemberships, closeModal }) => {
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [price, setPrice] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false); // Mostrar el mensaje de confirmación
  const [errorMessage, setErrorMessage] = useState('');

  // Manejar el botón de "Agregar"
  const handleAddClick = () => {
    if (!name || !detail || !price) {
      setErrorMessage('Todos los campos son obligatorios.');
      return;
    }

    setErrorMessage(''); // Limpiar el mensaje de error si todo está bien
    setShowConfirmation(true); // Mostrar el mensaje de confirmación
  };

  // Confirmar el registro de la nueva membresía
  const handleConfirm = () => {
    const newMembership = {
      name,
      detail,
      price,
      enabled: true,
    };

    setMemberships(prevMemberships => [...prevMemberships, newMembership]);
    closeModal(); // Cerrar el modal después de agregar la membresía
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Crear Nueva Membresía</h2>

        {/* Campos de entrada */}
        <input
          className="border w-full p-2 mb-4"
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border w-full p-2 mb-4"
          type="text"
          placeholder="Detalle"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        />
        <input
          className="border w-full p-2 mb-4"
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* Mensaje de error */}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        {/* Botón de "Agregar" */}
        {!showConfirmation ? (
          <div className="flex justify-center">
            <button
              className="bg-red-600 text-white py-2 px-4 rounded"
              onClick={handleAddClick}
            >
              Agregar
            </button>
          </div>
        ) : (
          <ConfirmModal
            isOpen={showConfirmation}
            onConfirm={handleConfirm}
            onCancel={() => setShowConfirmation(false)} // Cancelar la confirmación
            message="¿Seguro que deseas registrar esta membresía?"
          />
        )}
      </div>
    </div>
  );
};

export default RegisterMembershipModal;