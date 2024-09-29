import React, { useState } from 'react';
import ConfirmModal from './ConfirmModal';

const MembershipModal = ({ isOpen, onClose, addMembership }) => {
  const [formData, setFormData] = useState({
    name: '',
    details: '',
    price: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true); // Muestra el modal de confirmación
  };

  const handleConfirm = () => {
    addMembership(formData); // Agrega la nueva membresía
    setFormData({ name: '', details: '', price: '' }); // Resetea el formulario
    setShowConfirmation(false); // Cierra el modal de confirmación
    onClose(); // Cierra el modal
  };

  const handleCancel = () => {
    setShowConfirmation(false); // Cierra el modal de confirmación
  };

  if (!isOpen) return null; // No renderiza si el modal no está abierto

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg relative w-96">
        <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>
          X
        </button>
        {showConfirmation ? (
          <div className="text-center">
            <h2 className="text-red-600 font-bold mb-4">¿Seguro que deseas registrar esta membresía?</h2>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-green-600 text-white py-2 px-4 rounded"
                onClick={handleConfirm}
              >
                Sí
              </button>
              <button
                className="bg-gray-600 text-white py-2 px-4 rounded"
                onClick={handleCancel}
              >
                No
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">Registrar Nueva Membresía</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Detalle</label>
                <input
                  type="text"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Precio</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-red-600 text-white py-2 px-4 rounded"
                >
                  Agregar
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default MembershipModal;

