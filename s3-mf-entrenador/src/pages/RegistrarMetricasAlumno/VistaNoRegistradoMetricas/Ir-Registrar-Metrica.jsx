import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import { FaArrowLeft as ArrowLeftIcon } from 'react-icons/fa';
import { BiLoaderAlt as LoaderIcon } from 'react-icons/bi';

const VistaNoRegistrado = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const clientId = searchParams.get('client_id');
    const [studentName, setStudentName] = useState('');
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!clientId) {
                    setError('ID de estudiante no proporcionado');
                    setLoading(false);
                    return;
                }
                
                // Obtener datos del estudiante
                const studentsResponse = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/alumnos?staff_id=1');
                const studentsData = await studentsResponse.json();
                const student = studentsData.find(student => student.client_id === parseInt(clientId));
                
                if (student) {
                    setStudentName(student.nombres);
                    //https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/metricas-alumno/hu-tp-23/alumno/bodymetric?body_id=1 
                    // Obtener métricas del estudiante
                    // const metricsResponse = await fetch(`https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/metricas-alumno/hu-tp-22?client_id=${clientId}`);
                    const metricsResponse = await fetch(`https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/metricas-alumno/hu-tp-23/alumno/bodymetric?body_id=${clientId}`);
                    const metricsData = await metricsResponse.json();
                    
                    if (metricsData && metricsData.length > 0) {
                        setMetrics(metricsData[0]);
                    }
                } else {
                    setError('Estudiante no encontrado');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error al cargar los datos');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [clientId]);

    const handleClick = () => {
        if (clientId) {
            navigate(`/registrar-metricas?client_id=${clientId}`);
        } else {
            console.log('No se puede navegar: clientId no está definido');
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100">
            <LoaderIcon className="w-16 h-16 text-blue-500 animate-spin" />
            <p className="mt-4 text-lg font-semibold text-gray-700">Cargando datos...</p>
        </div>
    );
    if (error) return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100">
            <p className="text-xl font-bold text-red-600">{error}</p>
            <Link to="/listar-alumnos" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                Volver a la lista de alumnos
            </Link>
        </div>
    );

    return (
        <div className="flex flex-col items-center w-full min-h-screen p-4 sm:p-6 bg-gray-100">
            <div className="flex justify-between w-full mb-4 items-center max-w-4xl sm:max-w-5xl mx-auto">
                <Link to="/listar-alumnos" className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
                    <ArrowLeftIcon className="w-6 h-6 sm:w-8 sm:h-8 mr-2" />
                    <span className="text-lg">Volver</span>
                </Link>
            </div>
    
            <main className="flex flex-col w-full p-6 sm:p-8 bg-white shadow-lg mt-6 max-w-4xl sm:max-w-5xl mx-auto rounded-lg">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Estas visualizando las métricas de {studentName}</h1>
                
                {metrics ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-lg shadow-inner">
                        {Object.entries(metrics).map(([key, value]) => (
                            key !== 'generado' && (
                                <div key={key} className="bg-white p-4 rounded-md shadow-sm">
                                    <p className="text-sm text-gray-500 capitalize">{key.replace('_', ' ')}</p>
                                    <p className="text-lg font-semibold text-gray-800">{value} {key === 'altura' || key === 'peso' || key.includes('cm') ? 'cm' : ''}</p>
                                </div>
                            )
                        ))}
                        <div className="bg-white p-4 rounded-md shadow-sm col-span-full">
                            <p className="text-lg font-semibold text-gray-800">Generado el {new Date(metrics.generado).toLocaleDateString()}</p>
                        </div>
                    </div>
                ) : (
                    <div className="w-full p-6 bg-red-100 text-center rounded-lg shadow-inner">
                        <p className="text-red-600 text-xl font-semibold mb-4">Aún no se han registrado métricas</p>
                        <button 
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md shadow-md transition-colors"
                            onClick={handleClick}
                        >
                            Registrar Métricas
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default VistaNoRegistrado;