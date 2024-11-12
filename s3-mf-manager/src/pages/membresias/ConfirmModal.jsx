import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmModal = ({ isOpen, onConfirm, onCancel }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCancel = () => {
    onCancel(); // Llama a la función pasada por props (opcional)
    navigate('/membresias'); // Redirige a la vista principal de membresías
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Confirmación</h2>
        <p className="mb-4">¿Seguro que deseas registrar esta membresía?</p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
            onClick={onConfirm} // Asegúrate de que esta función también maneje la lógica que necesitas
          >
            Sí
          </button>
          <button
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
            onClick={handleCancel} // Aquí redirigimos
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;





