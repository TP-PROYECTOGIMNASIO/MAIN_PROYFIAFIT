import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PlanTratamientoSinRegistrar = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Botón de Regresar */}
      <header className="p-4">
        <button className="text-gray-600 font-semibold text-sm">{'< Regresar'}</button>
      </header>

      {/* Contenido Principal */}
      <main className="flex-grow flex justify-center items-center">
        {/* Contenedor Blanco */}
        <div className="bg-white p-10 rounded-lg shadow-lg text-center w-full max-w-lg space-y-4">
          <h1 className="text-red-700 font-semibold text-xl">PLAN DE TRATAMIENTO</h1>
          <p className="text-gray-500 text-lg">Nombre del Alumno</p>
          <p className="text-gray-500 text-base mt-8">
            Aún no se ha registrado Plan Tratamiento
          </p>

          <br>
          </br>         

          <Link to="/RegistroPlan" className="bg-red-700 text-white py-2 px-4 rounded-lg mt-6 hover:bg-red-800 transition duration-300"
         
          >
            GENERAR PLAN TRATAMIENTO
            
            </Link>
        </div>
      </main>
    </div>
  );
};

export default PlanTratamientoSinRegistrar;