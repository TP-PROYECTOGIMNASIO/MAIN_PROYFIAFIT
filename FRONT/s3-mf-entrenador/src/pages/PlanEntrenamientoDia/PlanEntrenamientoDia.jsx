import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PlanEntrenamientoDia() {
    const [diaSeleccionado, setDiaSeleccionado] = useState(null);
    const navigate = useNavigate();

    const handleRegistrar = () => {
        navigate('/registrar-entrenamiento');
    };

    const handleRegresar = () => {
        navigate(-1);
    };

    const handleDiaSeleccionado = (dia) => {
        console.log(`Día seleccionado: ${dia}`);
        setDiaSeleccionado(dia);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex flex-col">
            <div className="flex justify-between w-full mb-4">
                <button 
                    onClick={handleRegresar} 
                    className="text-gray-700 text-lg flex items-center gap-2">
                    <span>&lt;</span> Regresar
                </button>
                <button 
                    onClick={handleRegistrar} 
                    className="bg-red-600 text-white font-bold py-2 px-4 rounded">
                    REGISTRAR
                </button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto mt-4">
                <h2 className="text-2xl font-bold text-center text-red-700 mb-2">
                    Eligiendo Plan de Entrenamiento
                </h2>
                <h3 className="text-lg text-center text-gray-700 mb-6">
                    Nombre del Alumno
                </h3>
                <p className="text-left text-gray-700 mb-6">
                    Seleccionar los días y rutinas
                </p>
                <div className="grid grid-cols-3 gap-7">
                    {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((dia, index) => (
                        <button
                            key={index}
                            onClick={() => handleDiaSeleccionado(dia)}
                            className={`font-bold py-2 px-4 rounded transition-colors my-4 ${
                                diaSeleccionado === dia 
                                ? 'bg-red-600 text-white' 
                                : 'bg-gray-700 text-white hover:bg-gray-800'
                            }`}
                        >
                            {dia}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
