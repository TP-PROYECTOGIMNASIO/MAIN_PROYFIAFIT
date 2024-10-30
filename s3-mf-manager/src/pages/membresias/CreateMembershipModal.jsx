import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';

const CreateMembershipModal = ({ onClose, onAddMembership }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleAddClick = () => {
    if (!name || !description || !price) {
      setErrorMessage('Todos los campos son obligatorios.');
      return;
    }
    setErrorMessage(''); // Limpiar mensaje de error
    setShowConfirmation(true); // Mostrar el modal de confirmación
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;

    // Verificar si el precio es negativo
    if (value < 0) {
      setErrorMessage('El precio no puede ser negativo.');
    } else {
      setErrorMessage('');
      setPrice(value);
    }
  };

  const handleConfirm = () => {
    const newMembership = {
      id: Date.now(),
      name,
      price,
      description,
      isEnabled: true,
    };

    onAddMembership(newMembership);
    resetFields(); // Limpiar los campos
    onClose(); // Cerrar el modal después de agregar
  };

  const resetFields = () => {
    setName('');
    setDescription('');
    setPrice('');
    setErrorMessage('');
    setShowConfirmation(false); // Cerrar el modal de confirmación
  };

  const handleCancel = () => {
    resetFields(); // Limpiar los campos
    navigate('/membresias'); // Redirige a la vista principal de membresías
    onClose(); // Asegúrate de cerrar el modal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg relative w-96">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
          X
        </button>

        <h2 className="text-2xl mb-4">Registrar Nueva Membresía</h2>

        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Nombre</label>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Detalle</label>
          <textarea
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Precio</label>
          <input
            className="w-full p-2 border rounded"
            type="number"
            value={price}
            onChange={handlePriceChange} // Usar la función de validación
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleAddClick}
            className="bg-red-600 text-white py-2 px-4 rounded"
          >
            Agregar
          </button>
        </div>

        <ConfirmModal
          isOpen={showConfirmation}
          onConfirm={handleConfirm}
          onCancel={handleCancel} // Usa la nueva función para cancelar
        />
      </div>
    </div>
  );
};

export default CreateMembershipModal;




