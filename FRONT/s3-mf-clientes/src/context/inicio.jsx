import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Imagen de fondo */}
      <img
        src="/assets/fondo.png"
        alt="Imagen de fondo"
        className="absolute top-0 left-0 w-full h-full object-cover z-0" // Imagen de fondo cubre toda la pantalla
      />

      {/* Contenido principal con un z-index superior a la imagen */}
      <main className="relative z-10 flex flex-col sm:flex-row items-center justify-center p-4 sm:p-6 flex-grow bg-gradient-to-b from-white to-red-100">
        <img
          src="/assets/wasa.png"
          alt="Imagen de fondo"
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1] pointer-events-none" // Esto permite que los clics pasen a través de la imagen
        />


        <section className="flex flex-col space-y-4 sm:w-1/3 items-center mt-8 sm:mt-0 w-full sm:ml-auto sm:mr-8">
          <Link
            to="/ver-planes"
            className="bg-white text-red-600 p-4 rounded-md shadow-md w-full sm:w-3/4 max-w-xs sm:max-w-md flex flex-col items-start text-left"
          >
            <span className="text-sm font-semibold">VER</span>
            <span className="text-lg sm:text-xl font-bold">MIS PLANES</span>
          </Link>
          <Link
            to="/"
            className="bg-white text-red-600 p-4 rounded-md shadow-md w-full sm:w-3/4 max-w-xs sm:max-w-md flex flex-col items-start text-left"
          >
            <span className="text-sm font-semibold">VER</span>
            <span className="text-lg sm:text-xl font-bold">MIS MÉTRICAS</span>
          </Link>
          <Link
            to="/"
            className="bg-white text-red-600 p-4 rounded-md shadow-md w-full sm:w-3/4 max-w-xs sm:max-w-md flex flex-col items-start text-left"
          >
            <span className="text-sm font-semibold">VER</span>
            <span className="text-lg sm:text-xl font-bold">MIS COMPRAS</span>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
