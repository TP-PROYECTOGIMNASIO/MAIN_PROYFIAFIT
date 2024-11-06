import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Modal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full min-h-[400px] flex flex-col justify-between">
                <h3 className="text-center text-lg font-bold text-red-700 mb-4">
                    Se envió correctamente el Plan de Entrenamiento
                </h3>
                <div className="flex justify-center mb-4 flex-grow flex items-center">
                    <img
                        src="/icons8-comprobado-100.png"
                        alt="Checkmark"
                        className="w-30 h-18" // Ajusta el tamaño de la imagen según sea necesario
                    />
                </div>
                <button
                    onClick={onClose}
                    className="bg-red-600 text-white font-bold py-2 px-4 rounded mx-auto block"
                >
                    VOLVER
                </button>
            </div>
        </div>
    );
}

export default function PlanEntrenamientoDia() {
    const location = useLocation();
    const { clientId, trainingPlan } = location.state || {};
    const [diaSeleccionado, setDiaSeleccionado] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [studentName, setStudentName] = useState(''); // Estado para el nombre del alumno
    const navigate = useNavigate();

    const params = new URLSearchParams(window.location.search);
    console.log("Todos los parámetros en Plan Entrenamiento por dia:", window.location.search); // Verificar que todos los parámetros están presentes
  
    const role = params.get("role");
    const token = params.get("token");
    const username = params.get("username");
    console.log("role recibido en Plan Entrenamiento por dia:", role);
    console.log("token recibido en Plan Entrenamiento por dia:", token);
    console.log("username recibido en Plan Entrenamiento por dia:", username);

    const handleRegistrar = () => {
        navigate(`/registrar-entrenamiento?role=${role}&token=${token}&username=${username}`);
    };

    const handleRegresar = () => {
        navigate(-1);
    };

    useEffect(() => {
        const diaGuardado = localStorage.getItem('diaSeleccionado');
        const storedStudentName = localStorage.getItem('selectedStudentName'); // Recuperar el nombre del alumno
        setDiaSeleccionado(diaGuardado || '');
        setStudentName(storedStudentName || 'Nombre del Alumno'); // Asignar el nombre del alumno
    }, []);

    const dias = [
        'Día 1',
        'Día 2',
        'Día 3',
        'Día 4',
        'Día 5',
        'Día 6',
        'Día 7'
    ];

    const handleDiaSeleccionado = (dia) => {
        const diaNumero = dias.indexOf(dia) + 1;
        console.log(`Día seleccionado: ${diaNumero}`);
        localStorage.setItem('diaSeleccionado', dia);
        localStorage.setItem('NdiaSeleccionado', diaNumero);

        navigate(`/registrar-entrenamiento?role=${role}&token=${token}&username=${username}`);
        setDiaSeleccionado(dia);
    };

    const closeModal = () => {
        setModalOpen(false);
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
                    {studentName} {/* Mostrar el nombre del alumno */}
                </h3>
                <p className="text-left text-gray-700 mb-6">
                    Seleccionar los días y rutinas
                </p>
                <div className="grid grid-cols-3 gap-7">
                    {dias.map((dia, index) => (
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
            <Modal isOpen={modalOpen} onClose={closeModal} />
        </div>
    );
}
