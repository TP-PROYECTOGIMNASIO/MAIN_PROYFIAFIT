import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const TrainingPlan = () => {
  const [studentName, setStudentName] = useState('');
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en Training Plan de Entrenador:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Training Plan de Entrenador:", role);
  console.log("token recibido en Training Plan de Entrenador:", token);
  console.log("username recibido en Training Plan de Entrenador:", username);

  useEffect(() => {
    // Recuperar el nombre del alumno desde localStorage
    const storedStudentName = localStorage.getItem('selectedStudentName');
    if (storedStudentName) {
      setStudentName(storedStudentName);
    }
  }, []);

  const handleGeneratePlan = () => {
    navigate(`/PlanEntrenamientoDia?role=${role}&token=${token}&username=${username}`);
  };

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
        <p className="text-lg text-gray-600 mb-6 text-center"> {/* Aumentar el margen inferior */}
          {studentName || 'Nombre del Alumno'}
        </p>

        <div className="text-center text-3xl text-gray-600 bg-gray-100 p-4 rounded-lg mb-6">
          <p className="inline-block">No se encuentra plan </p>
          <p className="inline-block">de entrenamiento </p>
          <p className="inline-block"> asignado </p>
        </div>

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
