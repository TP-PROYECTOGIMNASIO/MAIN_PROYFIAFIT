import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const PlanesPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState({ training: false, nutrition: false, treatment: false }); // Estado de carga para cada botón

  const handleNavigation = async (path, type) => {
    setLoading((prev) => ({ ...prev, [type]: true })); // Cambia el estado a carga para el botón específico
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula un tiempo de carga
    navigate(path); // Navega a la nueva ruta
    setLoading((prev) => ({ ...prev, [type]: false })); // Restablece el estado de carga
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Botón Regresar */}
      <br />
      <div className="w-full flex justify-start p-2 ml-16">
        <button
          className="text-gray-500 text-lg flex items-center"
          onClick={() => navigate(-1)} // Retrocede a la página anterior
        >
          <span className="mr-4 text-2xl">&lt;</span> {/* Aumentar tamaño de la flecha */}
          Regresar
        </button>
      </div>

      {/* Contenedor principal alineado a la izquierda y arriba */}
      <div className="flex flex-col items-start justify-start flex-grow p-2 ml-16">
        {/* Título */}
        <div className="mb-4">
          <h1 className="text-red-500 font-bold text-2xl">VER</h1>
          <h2 className="text-red-500 font-bold text-3xl md:text-5xl">MIS PLANES</h2>
        </div>

        {/* Botones de los planes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-4xl">
          <button
            style={{ backgroundColor: '#BFB6B8' }} // Estilo en línea para el color de fondo
            className="p-12 md:p-16 rounded-lg flex flex-col items-center justify-center hover:bg-gray-400 transition"
            onClick={() => handleNavigation('/ver-planes', 'training')}
            disabled={loading.training}
          >
            <img src="/plan_entrenamiento.png" alt="Plan de Entrenamiento" className="h-24 mb-8" />
            <span style={{ color: '#8C1C13' }} className="text-2xl text-center">PLAN DE ENTRENAMIENTO</span>
            {loading.training && <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
          </button>

          <button
            style={{ backgroundColor: '#BFB6B8' }} // Estilo en línea para el color de fondo
            className="p-12 md:p-16 rounded-lg flex flex-col items-center justify-center hover:bg-gray-400 transition"
            onClick={() => handleNavigation('/ver-nutricion', 'nutrition')}
            disabled={loading.nutrition}
          >
            <img src="/plan_nutricion.png" alt="Plan de Nutrición" className="h-24 mb-8" />
            <span style={{ color: '#8C1C13' }} className="text-2xl text-center">PLAN DE NUTRICIÓN</span>
            {loading.nutrition && <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
          </button>

          <button
            style={{ backgroundColor: '#BFB6B8' }} // Estilo en línea para el color de fondo
            className="p-12 md:p-16 rounded-lg flex flex-col items-center justify-center hover:bg-gray-400 transition"
            onClick={() => handleNavigation('/', 'treatment')}
            disabled={loading.treatment}
          >
            <img src="/plan_tratamiento.png" alt="Plan de Tratamiento" className="h-24 mb-8" />
            <span style={{ color: '#8C1C13' }} className="text-2xl text-center">PLAN DE TRATAMIENTO</span>
            {loading.treatment && <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanesPage;

