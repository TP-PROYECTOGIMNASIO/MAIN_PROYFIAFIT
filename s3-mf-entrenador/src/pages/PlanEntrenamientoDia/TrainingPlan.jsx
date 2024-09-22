import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const TrainingPlan = () => {
  const navigate = useNavigate();

  const handleGeneratePlan = () => {
    //navigate('/PlanEntrenamientoDia');
    navigate('/TrainingPlanOk');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 relative w-full max-w-md lg:max-w-lg flex flex-col justify-center min-h-[300px]">
        {/* Botón de cerrar como un Link */}
        <Link 
          to="/" 
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl font-bold"
        >
          X
        </Link>

        {/* Título principal */}
        <h2 className="text-2xl lg:text-3xl font-semibold text-center mb-4" style={{ color: '#8c1c13' }}>
          Plan de Entrenamiento
        </h2>

        {/* Nombre del alumno */}
        <p className="text-lg text-gray-600 mb-4 text-center">
          Nombre del Alumno
        </p>

        {/* Mensaje principal */}
        <div className="text-center text-3xl text-gray-600 bg-gray-100 p-4 rounded-lg mb-6">
          No se encuentra plan de entrenamiento asignado
        </div>

        {/* Botón de acción */}
        <button 
          className="w-full text-white py-2 lg:py-3 rounded-lg hover:bg-red-800 transition-colors"
          style={{ backgroundColor: '#b5121c' }}
          onClick={handleGeneratePlan}
        >
          GENERAR PLAN DE ENTRENAMIENTO
        </button>
      </div>
    </div>
  );
};

export default TrainingPlan;
