import { useEffect } from 'react';
import React, { useState  } from 'react';
import { FaArrowLeft as ArrowLeftIcon, FaSearch as SearchIcon, FaChevronDown as ChevronDownIcon, FaUser as UserIcon, FaInfoCircle as InfoIcon, FaSave as SaveIcon, FaTrash as TrashIcon, FaPrint as PrintIcon } from 'react-icons/fa';

const ListaAlumnos = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedAlumno, setSelectedAlumno] = useState(null);
    


    
    // Dummy data for demonstration
    const alumnos = [
        { nombre: "Juan Pérez", entrenador: "Carlos López", sede: "Sede A", membresia: "Platinum", rango: "Gold" },
        { nombre: "Ana García", entrenador: "Laura Morales", sede: "Sede B", membresia: "Gold", rango: "Silver" },
        { nombre: "Luis Fernández", entrenador: "Javier Martínez", sede: "Sede A", membresia: "Silver", rango: "Bronze" },
        // Add more sample data as needed
    ];

    const filteredAlumnos = alumnos.filter(alumno =>
        alumno.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleExpand = (index) => {
        setSelectedAlumno(filteredAlumnos[index]);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedAlumno(null);
    };


            // Fetch data from API
            useEffect(() => {
                
                const fetchAlumnos = async () => {
                    try {
                        const response = await fetch("https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/metricas-alumno/hu-tp-23/alumno?staff_id=3");
                        const data = await response.json();
                        setAlumnos(data);
                    } catch (error) {
                        console.error("Error fetching alumnos:", error);
                    }
                };
        
                fetchAlumnos();
            }, []);

            
    return (
        <div className="flex flex-col items-center w-full min-h-screen p-4 bg-gray-100">
            <main className="flex flex-col items-center w-full p-4 bg-white shadow-md mt-4">
                <h2 className="text-red-600 text-xl font-bold mb-4">Listado de Alumnos</h2>
                <div className="w-full p-4 mb-4 bg-gray-50">
                    <div className="flex justify-end mb-4">
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Buscar por nombre"
                                className="p-2 border border-gray-300 rounded-l-md w-40 sm:w-32 md:w-40 text-black"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="p-2 bg-red-600 text-black rounded-r-md">
                                <SearchIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white border border-gray-200 rounded-md shadow-md">
                            <thead className="bg-gray-100">
                                <tr className='text-black'>
                                    <th className="p-2 border-b text-center">Nombre</th>
                                    <th className="p-2 border-b text-center">Entrenador</th>
                                    <th className="p-2 border-b text-center">Sede</th>
                                    <th className="p-2 border-b text-center">Membresía</th>
                                    <th className="p-2 border-b text-center">Rango</th>
                                    <th className="p-2 border-b text-center">Detalles</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAlumnos.map((alumno, index) => (
                                    <React.Fragment key={index}>
                                        <tr className='text-black'>
                                            <td className="p-2 border-b text-center">{alumno.nombre}</td>
                                            <td className="p-2 border-b text-center">{alumno.entrenador}</td>
                                            <td className="p-2 border-b text-center">{alumno.sede}</td>
                                            <td className="p-2 border-b text-center">{alumno.membresia}</td>
                                            <td className="p-2 border-b text-center">{alumno.rango}</td>
                                            <td className="p-2 border-b text-center">
                                                <button
                                                    className="bg-gray-700 text-white px-3 py-1 rounded w-32"
                                                    onClick={() => handleExpand(index)}
                                                >
                                                    {expandedIndex === index ? "Colapsar" : "Expandir"}
                                                    <ChevronDownIcon className={`inline-block ml-2 transform ${expandedIndex === index ? 'rotate-180' : ''}`} />
                                                </button>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <p className="self-end mb-4 text-sm text-gray-600">Generado el 04-04-2024</p>
                <button className="bg-gray-700 text-white px-4 py-2 rounded">ACTUALIZAR MÉTRICAS</button>
            </main>

            {/* Modal */}

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-sm md:max-w-md lg:max-w-lg p-4 relative">
                        <button className="absolute top-2 right-2 text-gray-600" onClick={closeModal}>
                            <ChevronDownIcon className="w-6 h-6" />
                        </button>
                        <div className="flex flex-col md:flex-row mb-4">
                        <div className="flex flex-col md:flex-row mb-4">
                            <div className="flex-none w-full md:w-32 h-32 border-4 border-red-600 rounded-lg mb-4 md:mb-0 flex items-center justify-center">
                                <UserIcon className="text-red-600 w-16 h-16" />
                            </div>
                            <div className="text-black flex-1 md:ml-4">
                                <h3 className="text-lg font-bold mb-2">Detalles de {selectedAlumno?.nombre}</h3>
                                <p><strong>Nombre:</strong> {selectedAlumno?.nombre}</p>
                                <p><strong>Entrenador:</strong> {selectedAlumno?.entrenador}</p>
                                <p><strong>Sede:</strong> {selectedAlumno?.sede}</p>
                                <p><strong>Membresía:</strong> {selectedAlumno?.membresia}</p>
                                <p><strong>Rango:</strong> {selectedAlumno?.rango}</p>
                            </div>
                        </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 flex flex-col gap-2 mb-4 md:mb-0">
                                <button className="bg-red-600 text-white px-4 py-2 rounded text-sm">Horario</button>
                                <button className="bg-red-600 text-white px-4 py-2 rounded text-sm"><a href='http://localhost:5173/alumno-checkin'> Métricas</a></button>
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <button className="bg-gray-700 text-white px-4 py-2 rounded text-sm">PLAN ALIMENTICIO</button>
                                <button className="bg-gray-700 text-white px-4 py-2 rounded text-sm">PLAN DE ENTRENAMIENTO</button>
                                <button className="bg-gray-700 text-white px-4 py-2 rounded text-sm">REPORTE DE FISIOTERAPEUTA</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListaAlumnos;
