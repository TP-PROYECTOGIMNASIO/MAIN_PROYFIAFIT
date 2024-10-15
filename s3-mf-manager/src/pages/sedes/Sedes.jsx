import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sedes() {
    const navigate = useNavigate();
    const [msjError, setMsjError] = useState("");
    const [sedes, setSedes] = useState([]);
    const [filter, setFilter] = useState('all'); // Estado para manejar el filtro

    const handleRegresar = () => {
        navigate(-1);
    };

    const fetchSedes = () => {
        fetch("https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/planilla-por-sedes/hu-tp-77")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener las sedes");
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                // Verifica si 'locations' existe y no está vacío
                if (data.locations && data.locations.length > 0) {
                    setSedes(data.locations); // Cambié de location a locations
                } else {
                    setMsjError("No se encontraron sedes.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                setMsjError("Error al cargar las sedes");
            });
    };

    useEffect(() => {
        fetchSedes();
    }, []);

    // Filtra las sedes basado en el filtro seleccionado
    const filteredSedes = sedes.filter(sede => {
        if (filter === 'all') return true;
        if (filter === 'active') return sede.status === true; // Filtra las sedes activas
        if (filter === 'inactive') return sede.status === false; // Filtra las sedes inactivas
        return false;
    });

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    return (
        <div className="min-h-[82.23vh] bg-[#f3f4f7] p-4 flex flex-col">
            <div className="flex flex-col mb-4">
                <div className="flex justify-between w-full mb-4">
                    <button
                        onClick={handleRegresar}
                        className="text-gray-700 text-[24px] flex items-center gap-2">
                        <span>&lt;</span> Regresar
                    </button>

                    <button className="bg-red-600 text-white text-[24px] py-2 px-4 rounded">
                        + Registrar Nueva Sede
                    </button>
                </div>

                {/* Contenedor para el texto "Ordenado por:" y el combo box */}
                <div className="relative flex items-center mb-6 ml-4">
                    <div className="bg-gray-200 p-2 rounded">
                        <span className="text-lg text-gray-700">Ordenado por:</span>
                    </div>

                    <div className="bg-white w-4"></div>

                    <div className="p-2 rounded">
                        <select 
                            className="p-2 rounded text-gray-700 bg-gray-200 text-lg text-center"
                            value={filter} 
                            onChange={handleFilterChange} // Manejador de cambio
                        >
                            <option value="all">Todas</option>
                            <option value="active">Activas</option>
                            <option value="inactive">Inactivas</option>
                        </select>
                    </div>
                </div>

                {/* Tarjetas de Sedes */}
                <div className="flex justify-center gap-6">
                    {filteredSedes.length > 0 ? (
                        filteredSedes.map((sede, index) => (
                            <div key={index} className="border rounded-lg shadow-lg w-80 bg-gray-200">
                                <img
                                    src={sede.imgSrc || 'https://via.placeholder.com/300'} // Imagen predeterminada si no existe
                                    alt={`Sede ${sede.sede}`}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <div className="p-4 text-center">
                                    <h2 className="text-[24px] font-semibold text-[#62060b]">
                                        Sede: {sede.sede}
                                    </h2>
                                    {/* Combo box para el estado */}
                                    <div className="mt-4 flex justify-center relative">
                                        <select
                                            className="block w-32 px-4 py-1 pr-8 rounded bg-[#b5121c] text-white text-center appearance-none"
                                            defaultValue={sede.estado}
                                        >
                                            <option value="Activo" className="text-center">Activo</option>
                                            <option value="Inactivo" className="text-center">Inactivo</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-red-500 text-center">No hay sedes disponibles</div>
                    )}
                </div>
                
                {msjError && <div className="text-red-500 mt-4">{msjError}</div>} {/* Mensaje de error */}
            </div>
        </div>
    );
}
