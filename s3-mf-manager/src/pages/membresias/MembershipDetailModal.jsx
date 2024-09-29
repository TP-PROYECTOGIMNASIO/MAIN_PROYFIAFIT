import React, { useState } from 'react';

const MembershipDetailModal = ({ isOpen, onClose, membership, setMemberships }) => {
  const [detail, setDetail] = useState(membership ? membership.detail : '');
  const [price, setPrice] = useState(membership ? membership.price : '');
  const [isEnabled, setIsEnabled] = useState(membership ? membership.isEnabled : true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!isOpen || !membership) return null;

  const toggleEnabled = () => {
    setShowConfirmation(true);
  };

  const handleConfirmToggle = () => {
    const updatedMembership = { ...membership, isEnabled: false }; // Marca como inactiva
    setMemberships((prev) => prev.map(m => m.id === membership.id ? updatedMembership : m));
    setShowConfirmation(false);
    onClose(); // Cierra el modal
  };

  const handleCancelToggle = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded shadow-lg w-96">
        {/* Botón de cierre con "X" */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">MEMBRESÍA: {membership.name}</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Detalle:</label>
          <textarea value={detail} onChange={(e) => setDetail(e.target.value)} className="w-full border border-gray-300 rounded p-2" rows={3} />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Precio:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border border-gray-300 rounded p-2" />
        </div>

        <button
          onClick={toggleEnabled}
          className={`w-full py-2 rounded text-black font-bold ${isEnabled ? 'bg-green-600 hover:bg-green-500' : 'bg-gray-600 hover:bg-gray-500'}`}
        >
          {isEnabled ? 'Deshabilitar' : 'Habilitar'}
        </button>

        {/* Mensaje de Confirmación */}
        {showConfirmation && (
          <div className="mt-4">
            <p>¿Seguro que deseas deshabilitar esta membresía?</p>
            <div className="flex justify-center mt-2">
              <button onClick={handleConfirmToggle} className="bg-green-600 text-black py-2 px-4 rounded">Sí</button>
              <button onClick={handleCancelToggle} className="bg-gray-600 text-black py-2 px-4 rounded">No</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembershipDetailModal;
















