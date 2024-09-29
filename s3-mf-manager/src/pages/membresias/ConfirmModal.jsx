import React from 'react';

const ConfirmModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Confirmación</h2>
        <p className="mb-4">¿Seguro que deseas registrar esta membresía?</p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-green-600 text-black py-2 px-4 rounded"
            onClick={onConfirm}
          >
            Sí
          </button>
          <button
            className="bg-gray-600 text-black py-2 px-4 rounded"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;


