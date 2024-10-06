import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegistroEntrenamientoDia() {
    const navigate = useNavigate();
    
    const [gruposMusculares, setGruposMusculares] = useState([]);
    const [ejercicios, setEjercicios] = useState([]);
    const [diaSeleccionado, setDiaSeleccionado] = useState('');
    const [NdiaSeleccionado, NsetDiaSeleccionado] = useState('');
    const [NombreMuscular, setNombreMusuclar] = useState('');
    const [studentName, setStudentName] = useState(''); // Estado para el nombre del alumno

    useEffect(() => {
        const NdiaGuardado = localStorage.getItem('NdiaSeleccionado');
        const diaGuardado = localStorage.getItem('diaSeleccionado');
        const storedStudentName = localStorage.getItem('selectedStudentName'); // Recuperar el nombre del alumno
        if (NdiaGuardado) {
            NsetDiaSeleccionado(NdiaGuardado);
        }
        if (diaGuardado) {
            setDiaSeleccionado(diaGuardado);
        }
        if (storedStudentName) {
            setStudentName(storedStudentName); // Asignar el nombre del alumno
        }
    }, []);

    useEffect(() => {
        const obtenerGruposMusculares = async () => {
            try {
                const response = await fetch(
                    'https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/plan-de-entrenamiento/hu-tp-28?exerciseTypes=1'
                );
                const data = await response.json();
                setGruposMusculares(data);
            } catch (error) {
                console.error("Error al obtener los grupos musculares:", error);
            }
        };

        obtenerGruposMusculares();
    }, []);

    const obtenerEjerciciosPorGrupoMuscular = async (grupoId) => {
        try {
            const response = await fetch(
                `https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/plan-de-entrenamiento/hu-tp-28?exercise_type_id=${grupoId}`
            );
            const data = await response.json();
            setEjercicios(data.map(ejercicio => ({
                ...ejercicio,
                repeticiones: 0,  
                series: 0      
            })));
        } catch (error) {
            console.error("Error al obtener los ejercicios:", error);
        }
    };

    const handleRegresar = () => {
        navigate(-1);
    };

    const handleGuardar = () => {
        const ejerciciosFiltrados = ejercicios.filter(ejercicio => ejercicio.repeticiones > 0 && ejercicio.series > 0);
        
        if (ejerciciosFiltrados.length > 0) {
            localStorage.setItem('ejercicios', JSON.stringify(ejerciciosFiltrados));
            localStorage.setItem('NdiaSeleccionado', NdiaSeleccionado);
            localStorage.setItem('diaSeleccionado', diaSeleccionado);
            localStorage.setItem('gruposMusculares', NombreMuscular);
            console.log("llegue ", NombreMuscular);
            navigate('/registro-entrenamiento');
        } else {
            alert('Por favor, asegúrate de ingresar repeticiones y series mayores a cero.');
        }
    };

    const handleGrupoMuscular = (e) => {
        const grupoId = e.target.value;
        const grupoSeleccionado = gruposMusculares.find(grupo => grupo.exercise_type_id === parseInt(grupoId, 10));
        
        if (grupoSeleccionado) {
            localStorage.setItem('gruposMusculares', grupoSeleccionado.name);
            setNombreMusuclar(grupoSeleccionado.name);
            console.log(`Grupo muscular seleccionado: ${grupoSeleccionado.name}`);
            obtenerEjerciciosPorGrupoMuscular(grupoId);
        }
    };

    const updateEjercicio = (index, tipo, cambio) => { 
        setEjercicios(prevEjercicios =>
            prevEjercicios.map((ejercicio, i) =>
                i === index
                    ? { ...ejercicio, [tipo]: Math.max(0, ejercicio[tipo] + cambio) }
                    : ejercicio
            )
        );
    };

    return (
        <div className="min-h-screen bg-[#f3f4f7] p-4 flex flex-col">
            <div className="flex flex-col mb-4">
                <div className="flex justify-between w-full mb-4">
                    <button
                        onClick={handleRegresar}
                        className="text-gray-700 text-lg flex items-center gap-2">
                        <span>&lt;</span> Regresar
                    </button>

                    <button
                        onClick={handleGuardar}
                        className="bg-red-600 text-white font-bold py-2 px-4 rounded">
                        GUARDAR
                    </button>
                </div>

                {/* Contenedor para el combo box y el título */}
                <div className="relative flex items-center justify-between mb-6">
                    {/* Combo Box a la izquierda */}
                    <select
                        onChange={handleGrupoMuscular}
                        className="p-2 rounded text-gray-700 bg-gray-200 text-lg border border-black-thin"
                    >
                        <option value="">Selecciona un grupo muscular</option>
                        {gruposMusculares.map((grupo) => (
                            <option key={grupo.exercise_type_id} value={grupo.exercise_type_id}>
                                {grupo.name}
                            </option>
                        ))}
                    </select>

                    {/* Título centrado y a la misma altura */}
                    <h2 className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold text-red-700">
                        Registro de Entrenamiento
                    </h2>
                </div>
            </div>

            <div className="w-full max-w-3xl mx-auto mt-[-20px]">
                <h3 className="text-lg text-center text-gray-700 mb-2">
                    {studentName} {/* Mostrar el nombre del alumno */}
                </h3>
                <p className="text-center text-red-700 font-bold mb-4">
                    {diaSeleccionado}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {Array.isArray(ejercicios) && ejercicios.map((ejercicio, index) => (
                    <div key={index} className="border p-4 rounded-lg bg-white shadow-md">
                        <div className="flex flex-col items-center">
                            <img
                                src={ejercicio.image_url}
                                alt={ejercicio.name}
                                className="w-full h-36 rounded mb-4"
                            />


                            <h4 className="text-lg font-bold text-red-700 mb-2">
                                {ejercicio.name}
                            </h4>
                            <div className="flex flex-col mb-4 text-[#4b4f57]">
                                <div className="flex items-center mb-2">
                                    <span className="w-24 text-left text-sm">Repeticiones:</span>
                                    <div className="flex items-center border border-black-thin rounded">
                                        <button
                                            onClick={() => updateEjercicio(index, 'repeticiones', -1)}
                                            className="bg-gray-300 text-xs font-bold h-6 w-6 flex items-center justify-center border border-black-thin">
                                            &minus;
                                        </button>
                                        <input
                                            type="text"
                                            value={ejercicio.repeticiones}
                                            readOnly
                                            className="w-6 h-6 text-center bg-gray-300 border border-black-thin text-xs" />
                                        <button
                                            onClick={() => updateEjercicio(index, 'repeticiones', 1)}
                                            className="bg-gray-300 text-xs font-bold h-6 w-6 flex items-center justify-center border border-black-thin">
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <span className="w-24 text-left text-sm">Series:</span>
                                    <div className="flex items-center border border-black-thin rounded">
                                        <button
                                            onClick={() => updateEjercicio(index, 'series', -1)}
                                            className="bg-gray-300 text-xs font-bold h-6 w-6 flex items-center justify-center border border-black-thin">
                                            &minus;
                                        </button>
                                        <input
                                            type="text"
                                            value={ejercicio.series}
                                            readOnly
                                            className="w-6 h-6 text-center bg-gray-300 border border-black-thin text-xs" />
                                        <button
                                            onClick={() => updateEjercicio(index, 'series', 1)}
                                            className="bg-gray-300 text-xs font-bold h-6 w-6 flex items-center justify-center border border-black-thin">
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
