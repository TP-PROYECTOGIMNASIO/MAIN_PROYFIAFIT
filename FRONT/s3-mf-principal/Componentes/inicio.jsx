import React from 'react';

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      {/* Título de bienvenida */}
      <h1 className="text-xl font-semibold mb-8 text-center">
        Bienvenido *********, Selecciona un Módulo para Iniciar
      </h1>

      {/* Contenedor de las tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Tarjeta 1 */}
        <div className="bg-gray-300 shadow-lg rounded-lg overflow-hidden">
          {/* Imagen */}
          <div className="bg-red-600 h-24 w-full"></div>
          <div className="p-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Interfaz Principal"
              className="h-32 w-full object-cover"
            />
            {/* Texto */}
            <h2 className="text-center text-lg font-semibold mt-4">
              Interfaz Principal
            </h2>
            {/* Botón */}
            <div className="flex justify-center mt-4">
              <button className="bg-red-600 text-white px-4 py-2 rounded">
                SELECCIONAR
              </button>
            </div>
          </div>
        </div>

        {/* Tarjeta 2 */}
        <div className="bg-gray-300 shadow-lg rounded-lg overflow-hidden">
          {/* Imagen */}
          <div className="bg-red-600 h-24 w-full"></div>
          <div className="p-4">
            {/* Texto */}
            <h2 className="text-center text-lg font-semibold mt-4">Check-in</h2>
            {/* Botón */}
            <div className="flex justify-center mt-4">
              <button className="bg-red-600 text-white px-4 py-2 rounded">
                SELECCIONAR
              </button>
            </div>
          </div>
        </div>

        {/* Tarjeta 3 */}
        <div className="bg-gray-300 shadow-lg rounded-lg overflow-hidden">
          {/* Imagen */}
          <div className="bg-red-600 h-24 w-full"></div>
          <div className="p-4">
            {/* Texto */}
            <h2 className="text-center text-lg font-semibold mt-4">
              Visualizar Perfil
            </h2>
            {/* Botón */}
            <div className="flex justify-center mt-4">
              <button className="bg-red-600 text-white px-4 py-2 rounded">
                SELECCIONAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;