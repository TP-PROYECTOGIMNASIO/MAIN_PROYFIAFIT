// src/RegistroTipoEjerciciosTratamiento.jsx
import React from 'react';

function RegistroTipoEjerciciosTratamiento() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Botón de regresar */}
      <div className="w-full max-w-md mb-6">
        <button className="text-gray-500 hover:text-gray-700 font-semibold flex items-center">
          <span className="mr-2">&lt;</span> Regresar
        </button>
      </div>

      {/* Formulario de registro */}
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center text-red-700 mb-6">
          REGISTRO DE TIPO DE EJERCICIOS DE TRATAMIENTO
        </h1>

        <form className="space-y-4">
          {/* Campo de nombre */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="nombre">
              NOMBRE:
            </label>
            <input
              id="nombre"
              type="text"
              placeholder="Ingrese el nombre"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-gray-200"
            />
          </div>

          {/* Campo de descripción */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="descripcion">
              DESCRIPCIÓN:
            </label>
            <input
              id="descripcion"
              type="text"
              placeholder="Ingrese la descripción"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-gray-200"
            />
          </div>

          {/* Botón de guardar */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-red-700 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-800"
            >
              GUARDAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistroTipoEjerciciosTratamiento;
