import 'react';

const PaymentModal = ({ isOpen, onClose, message }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white p-4 rounded shadow-lg">
          <h2 className="text-xl mb-2">Resultado del Pago</h2>
          <p>{message}</p>
          <button onClick={onClose} className="mt-4 bg-red-500 text-white p-2 rounded">Cerrar</button>
        </div>
      </div>
    )
  );
};

export default PaymentModal;