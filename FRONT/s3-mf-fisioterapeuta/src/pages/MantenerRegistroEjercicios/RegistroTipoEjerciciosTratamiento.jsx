
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate

function RegistroTipoEjerciciosTratamiento() {

  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en Registro de Tipo de Ejercicios de Tratamiento:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Registro de Tipo de Ejercicios de Tratamiento:", role);
  console.log("token recibido en Registro de Tipo de Ejercicios de Tratamiento:", token);
  console.log("username recibido en Registro de Tipo de Ejercicios de Tratamiento:", username);


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Botón de regresar */}
      <div className="w-full max-w-md mb-6">
      <button
      className="text-gray-700 font-medium"
      onClick={() => window.history.back()}
    >
      &lt; Regresar
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
