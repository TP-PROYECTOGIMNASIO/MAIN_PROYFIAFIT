import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlanesEntrenamiento = () => {
  const [planes, setPlanes] = useState([]);
  const clienteId = 1; // Debes obtener este ID dinámicamente según el cliente

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const response = await axios.get(`https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/plan-de-entrenamiento/hu-tp-11?clientId=${clienteId}`);
        setPlanes(response.data);
      } catch (error) {
        console.error('Error fetching planes:', error);
      }
    };

    fetchPlanes();
  }, [clienteId]);

  const handleNavigate = (planId) => {
    window.location.href = `/ver-plan/${planId}`;
  };

  // Función para retroceder a la página anterior
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Contenedor para el título y el botón */}
        <div className="flex items-center mb-4">
          {/* Botón de retroceso */}
          <button 
            className="mr-4 px-4 py-2 text-red-600 hover:underline transition duration-300 font-bold" 
            onClick={handleBack}
          >
            ←Retroceder
          </button>
          
          <h1 className="text-2xl font-bold text-gray-700 text-center">Planes de Entrenamiento</h1>
        </div>
        
        {planes.length > 0 ? (
          <ul className="space-y-4">
            {planes.map((plan) => (
              <li
                key={plan.training_plan_id}
                className="cursor-pointer p-4 bg-gray-700 text-white rounded-md hover:bg-red-800 transition duration-300"
                onClick={() => handleNavigate(plan.training_plan_id)}
              >
                {plan.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No se encontraron planes</p>
        )}
      </div>
    </div>
  );
};

export default PlanesEntrenamiento;
