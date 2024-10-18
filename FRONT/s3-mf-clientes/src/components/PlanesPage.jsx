import { useNavigate } from 'react-router-dom';

const PlanesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Botón Regresar */}
      <div className="w-full flex justify-start p-8">
        <button
          className="text-gray-500 text-lg flex items-center"
          onClick={() => navigate(-1)} // Retrocede a la página anterior
        >
          <span className="mr-4 text-2xl">&lt;</span> {/* Aumentar tamaño de la flecha */}
          Regresar
        </button>
      </div>

      {/* Contenedor principal alineado a la izquierda y arriba */}
      <div className="flex flex-col items-start justify-start flex-grow p-16">
        {/* Título */}
        <div className="mb-16">
          <h1 className="text-red-500 font-bold text-2xl">VER</h1>
          <h2 className="text-red-500 font-bold text-4xl md:text-6xl">MIS PLANES</h2>
        </div>

        {/* Botones de los planes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-4xl">
          <button
            className="bg-gray-300 p-12 md:p-16 rounded-lg flex flex-col items-center justify-center hover:bg-gray-400 transition"
            onClick={() => navigate('/ver-planes')}
          >
            <img src="/logo-3.png" alt="Plan de Entrenamiento" className="h-24 mb-8" /> {/* Duplicar tamaño de imagen */}
            <span className="text-red-500 text-2xl text-center">PLAN DE ENTRENAMIENTO</span>
          </button>

          <button
            className="bg-gray-300 p-12 md:p-16 rounded-lg flex flex-col items-center justify-center hover:bg-gray-400 transition"
            onClick={() => navigate('/ver-nutricion')}
          >
            <img src="/logo-3.png" alt="Plan de Nutrición" className="h-24 mb-8" /> {/* Duplicar tamaño de imagen */}
            <span className="text-red-500 text-2xl text-center">PLAN DE NUTRICION</span>
          </button>

          <button
            className="bg-gray-300 p-12 md:p-16 rounded-lg flex flex-col items-center justify-center hover:bg-gray-400 transition"
            onClick={() => navigate('/cart')}
          >
            <img src="/logo-3.png" alt="Plan de Tratamiento" className="h-24 mb-8" /> {/* Duplicar tamaño de imagen */}
            <span className="text-red-500  text-2xl text-center">PLAN DE TRATAMIENTO</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanesPage;
