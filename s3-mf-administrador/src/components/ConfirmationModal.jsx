import React from 'react';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <p className="mb-4 text-lg">{message}</p>
        <button
          onClick={onConfirm}
          className="bg-green-500 text-white py-2 px-4 rounded mr-4"
        >
          Sí
        </button>
        <button
          onClick={onCancel}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
