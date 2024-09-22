import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const TrainingPlanOk = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState('');
  const [trainingPlan, setTrainingPlan] = useState(null);
  const [clientId, setClientId] = useState(null); // Agrega un estado para el clientId

  // Función para hacer fetch de los datos
  const fetchData = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  // Fetch el plan de entrenamiento
  const fetchTrainingPlan = async (id) => {
    if (id) {
      const data = await fetchData(`https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/plan-de-entrenamiento/hu-tp-27?client_id=${id}`);
      setTrainingPlan(data);
      console.log('Training Plan:', data);
      localStorage.setItem('clientId', id);
      localStorage.setItem('diaSeleccionado', 'Día 1');
      navigate('/PlanEntrenamientoDia', { state: { clientId: id, trainingPlan: data } });
    } else {
      console.error('No hay clientId.');
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('client_id');
    setClientId(id); 
  }, []);

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 relative w-full max-w-md lg:max-w-lg flex flex-col justify-center min-h-[300px]">
        <Link
          to="/"
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl font-bold"
        >
          X
        </Link>

        <h2 className="text-2xl lg:text-3xl font-semibold text-center mb-4" style={{ color: '#8c1c13' }}>
          Plan de Entrenamiento
        </h2>

        <p className="text-lg text-gray-600 mb-4 text-center">
          Nombre del Alumno
        </p>

        <div className="flex justify-end">
          <select className="border rounded px-2 py-1" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            <option value="">Seleccionar mes</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center text-gray-600 bg-gray-100 p-4 rounded-lg mb-6">
          <p>Plan de Entrenamiento</p>
          <button 
            className="bg-gray-400 text-white px-4 py-2 rounded" 
            onClick={() => fetchTrainingPlan(clientId)} // Usa el clientId almacenado
          >
            Visualizar Ejercicios
          </button>
          <p className='text-left'>Fecha</p>
        </div>

        <button
          className="w-full text-white py-2 lg:py-3 rounded-lg hover:bg-red-800 transition-colors"
          style={{ backgroundColor: '#b5121c' }}
          onClick={() => navigate('/PlanEntrenamientoDia')}
        >
          GENERAR PLAN DE ENTRENAMIENTO
        </button>
      </div>
    </div>
  );
};

export default TrainingPlanOk;
