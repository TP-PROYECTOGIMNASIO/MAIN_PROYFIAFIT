import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../index.css';

const PlanNutricion = () => {
  const [studentName, setStudentName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedStudentName = localStorage.getItem('selectedStudentName');
    if (storedStudentName) {
      setStudentName(storedStudentName);
    }
  }, []);

  const handleGeneratePlan = () => {
    navigate('/Plan-Form');
  };

  return (
    
    <div className="flex justify-center items-center min-h-[82vh] bg-gray-100 px-4"> {/* Ajustar min-height */}
    
      <div className="bg-white shadow-md rounded-lg p-8 relative w-full max-w-md lg:max-w-lg flex flex-col justify-center">
        <Link to="/listar-alumnos" className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl font-bold">
          X
        </Link>

        <h2 className="text-2xl lg:text-3xl font-semibold text-center mb-4" style={{ color: '#8c1c13' }}>
          Plan Alimenticio
        </h2>

        <p className="text-lg text-gray-600 mb-6 text-center">
                Nombre del Alumno {/*  {studentName || 'Nombre del Alumno'} Mostrar nombre del alumno si está disponible */}
        </p>

        <div className="text-center text-4xl text-gray-600 bg-gray-100 p-4 rounded-lg mb-6">
          <p className="inline-block">Aun no se ha </p>
          <p className="inline-block">registrado Plan </p>
          <p className="inline-block">Alimenticio </p>
        </div>

        <button 
          className="w-full text-white py-2 lg:py-3 rounded-lg hover:bg-red-800 transition-colors"
          style={{ backgroundColor: '#b5121c' }}
          onClick={handleGeneratePlan}
        >
          GENERAR PLAN ALIMENTICIO
        </button>
      </div>
    </div>
  );
};

export default PlanNutricion;
