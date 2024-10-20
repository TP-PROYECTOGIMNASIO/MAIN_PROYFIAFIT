import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown as ChevronDownIcon, FaUser as UserIcon, FaTimes as CloseIcon } from 'react-icons/fa';

const ListaAlumnos = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedAlumno, setSelectedAlumno] = useState(null);
    const [alumnos, setAlumnos] = useState([]);
    const navigate = useNavigate();
    // Fetch data from API
    useEffect(() => {
        const fetchAlumnos = async () => {
            try {
                const response = await fetch("https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/metricas-alumno/hu-tp-23/alumno?staff_id=1");
                const data = await response.json();
                setAlumnos(data.alumnos || []); // Ajusta 'alumnos' según la estructura real de la respuesta
            } catch (error) {
                console.error("Error fetching alumnos:", error);
            }
        };

        fetchAlumnos();
    }, []);

    const handleMetricasClick = (clientId, staffId) => {
        console.log('clientId:', clientId);
        console.log('staffId:', staffId);
        navigate(`/alumno-checkin?client_id=${clientId}&staff_id=${staffId}`);
    };

    const filteredAlumnos = alumnos.filter(alumno =>
        alumno.alumno.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleExpand = (index) => {
        setSelectedAlumno(filteredAlumnos[index]);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedAlumno(null);
    };

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
                                    <th className="p-2 border-b text-center">Detalles</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAlumnos.map((alumno, index) => (
                                    <tr key={alumno.idusuario} className='text-black'>
                                        <td className="p-2 border-b text-center">{alumno.alumno}</td>
                                        <td className="p-2 border-b text-center">{alumno.entrenador}</td>
                                        <td className="p-2 border-b text-center">{alumno.sede}</td>
                                        <td className="p-2 border-b text-center">{alumno.membership}</td>
                                        <td className="p-2 border-b text-center">
                                            <button
                                                className="bg-gray-700 text-white px-3 py-1 rounded w-32"
                                                onClick={() => handleExpand(index)}
                                            >
                                                Expandir
                                                <ChevronDownIcon className="inline-block ml-2" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Modal */}
            {showModal && selectedAlumno && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-sm md:max-w-md lg:max-w-lg p-4 relative">
                        <button className="absolute top-2 right-2 text-gray-600" onClick={closeModal}>
                            <CloseIcon className="w-6 h-6" />
                        </button>
                        <div className="flex flex-col md:flex-row mb-4">
                            <div className="flex-none w-full md:w-32 h-32 border-4 border-red-600 rounded-lg mb-4 md:mb-0 flex items-center justify-center">
                                <UserIcon className="text-red-600 w-16 h-16" />
                            </div>
                            <div className="text-black flex-1 md:ml-4">
                                <h3 className="text-lg font-bold mb-2">Detalles de {selectedAlumno.alumno}</h3>
                                <p><strong>Nombre:</strong> {selectedAlumno.alumno}</p>
                                <p><strong>Entrenador:</strong> {selectedAlumno.entrenador}</p>
                                <p><strong>Sede:</strong> {selectedAlumno.sede}</p>
                                <p><strong>Membresía:</strong> {selectedAlumno.membership}</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 flex flex-col gap-2 mb-4 md:mb-0">
                                <button className="bg-red-600 text-white px-4 py-2 rounded text-sm">Horario</button>
                                <button className="bg-red-600 text-white px-4 py-2 rounded text-sm" onClick={() => handleMetricasClick(selectedAlumno.client_id, selectedAlumno.staff_id)}> Métricas</button>
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
