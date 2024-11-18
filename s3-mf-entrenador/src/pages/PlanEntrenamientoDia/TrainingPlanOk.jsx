import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const TrainingPlanOk = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState('');
  const [trainingPlan, setTrainingPlan] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [studentName, setStudentName] = useState(''); // Estado para el nombre del alumno

  const apiUrl27 = import.meta.env.VITE_APP_API_URL_27;

  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en TrainingPlanOk de entrenador:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en TrainingPlanOk de entrenador:", role);
  console.log("token recibido en TrainingPlanOk de entrenador:", token);
  console.log("username recibido en TrainingPlanOk de entrenador:", username);

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
      const data = await fetchData(`${apiUrl27}?client_id=${id}`);
      setTrainingPlan(data);
      console.log('Training Plan:', data);
      localStorage.setItem('clientId', id);
      localStorage.setItem('diaSeleccionado', 'Día 1');
      navigate(`/PlanEntrenamientoDia?role=${role}&token=${token}&username=${username}`, { state: { clientId: id, trainingPlan: data } });
    } else {
      console.error('No hay clientId.');
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('client_id');
    setClientId(id);
    
    // Recuperar el nombre del alumno desde localStorage
    const storedStudentName = localStorage.getItem('selectedStudentName');
    if (storedStudentName) {
      setStudentName(storedStudentName);
    }
  }, []);

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 relative w-full max-w-md lg:max-w-lg flex flex-col justify-center min-h-[300px]">
        <Link to={`/listar-alumnos?role=${role}&token=${token}&username=${username}`} className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl font-bold">
        X
                  
        </Link>

        <h2 className="text-2xl lg:text-3xl font-semibold text-center mb-4" style={{ color: '#8c1c13' }}>
          Plan de Entrenamiento
        </h2>

        {/* Mostrar el nombre del alumno almacenado */}
        <p className="text-lg text-gray-600 mb-4 text-center">
          {studentName || 'Nombre del Alumno'}
        </p>

        {/* Espacio adicional entre el combo box y el contenedor */}
        <div className="flex justify-end mb-4 ">
          <select className=" rounded px-2 py-1 bg-gray-100 text-center" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            <option value="">Mes</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* Contenedor que muestra el plan de entrenamiento y el botón en la misma línea */}
        <div className="flex justify-between items-center text-gray-600 bg-gray-100 p-4 rounded-lg mb-6">
          <div className="flex flex-col">
            <p>Plan de Entrenamiento</p>
            {/* Fecha colocada debajo del plan de entrenamiento */}
            <p className='text-left mt-2'>Fecha</p>
          </div>
          {/* Botón "Visualizar Ejercicios" a la misma altura */}
          <button 
    style={{ backgroundColor: '#3c4862' }} // Estilo en línea para aplicar el color
    className="text-white px-4 py-2 rounded ml-4" 
    onClick={() => fetchTrainingPlan(clientId)} // Usa el clientId almacenado
>
    Visualizar Ejercicios
</button>

        </div>

        <button
          className="w-full text-white py-2 lg:py-3 rounded-lg hover:bg-red-800 transition-colors"
          style={{ backgroundColor: '#b5121c' }}
          onClick={() => navigate(`/PlanEntrenamientoDia?role=${role}&token=${token}&username=${username}`)}
        >
          GENERAR PLAN DE ENTRENAMIENTO
        </button>
      </div>
    </div>
  );
};

export default TrainingPlanOk;
