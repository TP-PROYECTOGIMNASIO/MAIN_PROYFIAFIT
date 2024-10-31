import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sedes() {
    const navigate = useNavigate();
    const [msjError, setMsjError] = useState("");
    const [sedes, setSedes] = useState([]);
    const [filter, setFilter] = useState('all'); // Filtro para sedes activas/inactivas
    const [isLoading, setIsLoading] = useState(false);

    const handleRegresar = () => {
        navigate(-1);

        
    };

    const handleRegistrarSede = () => {
        navigate('/registrar-sedes'); // Cambia '/ruta-registro-sede' a la ruta correcta
    };

    // Función para validar la respuesta de la API
    const validateApiResponse = (data) => {
        if (data.locations && Array.isArray(data.locations)) {
            return true;
        }
        return false;
    };

    const fetchSedes = async () => {
        setIsLoading(true);
        try {
            // API tp-77 para obtener las sedes
            const response = await fetch("https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/planilla-por-sedes/hu-tp-77");
            if (!response.ok) throw new Error("Error al obtener las sedes");

            const data = await response.json();
            console.log(data);

            // Validar respuesta de API tp-77
            if (validateApiResponse(data)) {
                setSedes(data.locations);
            } else {
                setMsjError("No se encontraron sedes.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMsjError("Error al cargar las sedes.");
        } finally {
            setIsLoading(false);
        }
    };

    // Función adicional para manejar la API tp-78
    const fetchSedesDetails = async () => {
        setIsLoading(true);
        try {
            // API tp-78 para obtener detalles adicionales de las sedes
            const response = await fetch("https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/planilla-por-sedes/hu-tp-78");
            if (!response.ok) throw new Error("Error al obtener detalles de las sedes");

            const data = await response.json();
            console.log("Detalles de Sedes (API tp-78):", data);
            // Procesar los datos adicionales de las sedes si es necesario
        } catch (error) {
            console.error("Error en API tp-78:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSedes();
        fetchSedesDetails(); // Obtener detalles adicionales desde la API tp-78
    }, []);

    // Filtra las sedes basado en el filtro seleccionado
    const filteredSedes = sedes.filter(sede => {
        if (filter === 'all') return true;
        if (filter === 'active') return sede.status === true; // Filtrar activas
        if (filter === 'inactive') return sede.status === false; // Filtrar inactivas
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

                    <button
                        className="bg-red-600 text-white text-[24px] py-2 px-4 rounded"
                        onClick={handleRegistrarSede} // Llama a la función de redirección
                    >
                        + Registrar Nueva Sede
                    </button>
                </div>

                {/* Contenedor para el filtro */}
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

                
                {isLoading ? (
    <div className="text-center text-blue-500">Cargando sedes...</div>
) : (
    <div className="flex flex-wrap justify-center gap-4 p-4 mt-4">
        {filteredSedes.length > 0 ? (
            filteredSedes.map((sede, index) => (
                <div
                    key={index}
                    className="border rounded-lg shadow-lg w-80 bg-gray-200 flex flex-col justify-between" // Usar flex-col para apilar el contenido en columna
                    style={{ width: '300px', height: '450px', minHeight: '450px' }} // Tamaño fijo para todas las tarjetas
                >
                    <img
                        src={sede.image_url || 'https://via.placeholder.com/300'} // Imagen predeterminada si no existe
                        alt={`Imagen de ${sede.name}`}
                        style={{ width: '300px', height: '250px', objectFit: 'cover' }} // Tamaño manual de la imagen
                        className="rounded-t-lg"
                    />

                    <div className="p-4 flex-grow flex flex-col justify-between text-center">
                        <h2 className="text-[24px] font-semibold text-[#62060b]">
                            Sede: {sede.name}
                        </h2>

                        {/* Combo box para el estado */}
                        <div className="mt-4 flex justify-center">
                            <select
                                className="block w-32 px-4 py-1 pr-8 rounded-[5px] bg-[#b5121c] text-white text-center appearance-none"
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
            <div className="text-red-500 text-center">{msjError || "No hay sedes disponibles"}</div>
        )}
    </div>
)}

                


            </div>
        </div>
    );
}
