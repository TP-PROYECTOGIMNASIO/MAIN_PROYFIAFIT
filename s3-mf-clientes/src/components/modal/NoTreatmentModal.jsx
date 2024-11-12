import React from "react"; 

const NoTreatmentModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto relative">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl font-bold text-gray-600 hover:text-gray-800"
        >
          ✖
        </button>

        {/* Mensaje del modal */}
        <h2 className="text-2xl font-bold text-center text-red-500">
          Usted no cuenta con plan de tratamiento Activo
        </h2>

        {/* Botón de OK */}
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoTreatmentModal;
