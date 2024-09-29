import React, { useState } from 'react';

const RegisterProductModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, description });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-red-700 text-xl font-bold">REGISTRAR TIPO DE PRODUCTO</h2>
          <button onClick={onClose} className="text-black">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre:</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full py-2 px-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descripción:</label>
            <textarea
              className="border border-gray-300 rounded w-full py-2 px-3 h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="bg-red-700 text-white w-full py-2 rounded hover:bg-red-800">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterProductModal;
