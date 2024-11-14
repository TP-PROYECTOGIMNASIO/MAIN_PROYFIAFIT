import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sedes() {
    const navigate = useNavigate();
    const [msjError, setMsjError] = useState("");
    const [sedes, setSedes] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedSede, setSelectedSede] = useState(null);
    const [newStatus, setNewStatus] = useState(null);
    const apiUrl77 = import.meta.env.VITE_APP_API_URL_77;
    const apiUrl78 = import.meta.env.VITE_APP_API_URL_78;

    const params = new URLSearchParams(window.location.search);
    console.log("Todos los parámetros en Sedes Manager:", window.location.search); // Verificar que todos los parámetros están presentes
    
    const role = params.get("role");
    const token = params.get("token");
    const username = params.get("username");
    console.log("role recibido en Sedes Manager:", role);
    console.log("token recibido en Sedes Manager:", token);
    console.log("username recibido en Sedes Manager:", username);

    const handleRegresar = () => {
        navigate(-1);
    };

    const handleRegistrarSede = () => {
        navigate(`/registrar-sedes?role=${role}&token=${token}&username=${username}`);
    };

    const validateApiResponse = (data) => {
        return data.locations && Array.isArray(data.locations);
    };

    const fetchSedes = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(apiUrl77);
            if (!response.ok) throw new Error("Error al obtener las sedes");

            const data = await response.json();
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

    const fetchSedesDetails = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(apiUrl78);
            if (!response.ok) throw new Error("Error al obtener detalles de las sedes");

            const data = await response.json();
            console.log("Detalles de Sedes (API tp-78):", data);
        } catch (error) {
            console.error("Error en API tp-78:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSedes();
        fetchSedesDetails();
    }, []);

    const filteredSedes = sedes.filter(sede => {
        if (filter === 'all') return true;
        if (filter === 'active') return sede.active === true;
        if (filter === 'inactive') return sede.active === false;
        return false;
    });

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSedeStatusChange = (index, newStatus) => {
        setSelectedSede(index);
        setNewStatus(newStatus);
        setShowModal(true);
    };

    const confirmStatusChange = () => {
        setSedes(prevSedes => {
            const updatedSedes = [...prevSedes];
            updatedSedes[selectedSede].active = newStatus === "Activo";
            return updatedSedes;
        });
        setShowModal(false);
        setSelectedSede(null);
        setNewStatus(null);
    };

    const cancelStatusChange = () => {
        setShowModal(false);
        setSelectedSede(null);
        setNewStatus(null);
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
                        onClick={handleRegistrarSede}
                    >
                        + Registrar Nueva Sede
                    </button>
                </div>

                <div className="relative flex items-center mb-6 ml-4">
                    <div className="bg-gray-200 p-2 rounded">
                        <span className="text-lg text-gray-700">Ordenado por:</span>
                    </div>

                    <div className="bg-white w-4"></div>

                    <div className="p-2 rounded">
                        <select 
                            className="p-2 rounded text-gray-700 bg-gray-200 text-lg text-center"
                            value={filter} 
                            onChange={handleFilterChange}
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
                                    className="border rounded-lg shadow-lg w-80 bg-gray-200 flex flex-col justify-between"
                                    style={{ width: '300px', height: '450px', minHeight: '450px' }}
                                >
                                    <img
                                        src={sede.image_url || 'https://via.placeholder.com/300'}
                                        alt={`Imagen de ${sede.name}`}
                                        style={{ width: '300px', height: '250px', objectFit: 'cover' }}
                                        className="rounded-t-lg"
                                    />

                                    <div className="p-4 flex-grow flex flex-col justify-between text-center">
                                        <h2 className="text-[24px] font-semibold text-[#62060b]">
                                            Sede: {sede.name}
                                        </h2>

                                        <div className="mt-4 flex justify-center">
                                            <select
                                                className="block w-32 px-4 py-1 pr-8 rounded-[5px] bg-[#b5121c] text-white text-center appearance-none"
                                                value={sede.active ? "Activo" : "Inactivo"}
                                                onChange={(e) => handleSedeStatusChange(index, e.target.value)}
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

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-semibold mb-4">Confirmar cambio de estado</h2>
                        <p>¿Estás seguro de que deseas cambiar el estado de esta sede a <strong>{newStatus}</strong>?</p>
                        <div className="mt-6 flex justify-center gap-4">
                            <button
                                className="bg-[#b5121c] text-white py-2 px-4 rounded"
                                onClick={confirmStatusChange}
                            >
                                Confirmar
                            </button>
                            <button
                                className="bg-gray-400 text-white py-2 px-4 rounded"
                                onClick={cancelStatusChange}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
