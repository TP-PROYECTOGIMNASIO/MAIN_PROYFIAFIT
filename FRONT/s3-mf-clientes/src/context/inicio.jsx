import { Link, useNavigate  } from "react-router-dom";
import { useState  } from 'react';

const HomePage = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros:", window.location.search);  // Verificar que todos los parámetros están presentes

  const role = params.get('role');
  const token = params.get('token');
  const username = params.get('username');
  console.log("role recibido:", role);
  console.log("token recibido:", token);
  console.log("username recibido:", username);

  const [loading, setLoading] = useState({ mis_planes: false, mis_metricas: false, mis_compras: false, mi_suscripcion: false }); // Estado de carga para cada botón

  const handleNavigation = async (path, type) => {
    setLoading((prev) => ({ ...prev, [type]: true })); // Cambia el estado a carga para el botón específico
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula un tiempo de carga
    navigate(path); // Navega a la nueva ruta
    setLoading((prev) => ({ ...prev, [type]: false })); // Restablece el estado de carga
  };

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
       {/* <div>
          <h1>Datos recibidos: role: {role} token: {token} username: {username} </h1>
        </div>*/}


        <section className="flex flex-col space-y-4 sm:w-1/3 items-center mt-8 sm:mt-0 w-full sm:ml-auto sm:mr-8">
          <button
            className="bg-white text-red-600 p-4 rounded-md shadow-md w-full sm:w-3/4 max-w-xs sm:max-w-md flex flex-col items-start text-left relative"
            onClick={() => handleNavigation('/planes', 'mis_planes')}
            disabled={loading.mis_planes}>
            <span className="text-sm font-semibold">VER</span>
            <span className="text-lg sm:text-xl font-bold">MIS PLANES</span>
            {loading.mis_planes && (
              <div className="absolute inset-y-0 right-4 flex items-center">
                <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6"></div>
              </div>
            )} 
          </button>
          <button
            className="bg-white text-red-600 p-4 rounded-md shadow-md w-full sm:w-3/4 max-w-xs sm:max-w-md flex flex-col items-start text-left relative"
            onClick={() => handleNavigation('/ver-metricas', 'mis_metricas')}
            disabled={loading.mis_metricas}>
            <span className="text-sm font-semibold">VER</span>
            <span className="text-lg sm:text-xl font-bold">MIS MÉTRICAS</span>
            {loading.mis_metricas && (
              <div className="absolute inset-y-0 right-4 flex items-center">
                <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6"></div>
              </div>
            )}  
          </button>
          <button
            className="bg-white text-red-600 p-4 rounded-md shadow-md w-full sm:w-3/4 max-w-xs sm:max-w-md flex flex-col items-start text-left relative"
            onClick={() => handleNavigation('/', 'mis_compras')}
            disabled={loading.mis_compras}>
            <span className="text-sm font-semibold">VER</span>
            <span className="text-lg sm:text-xl font-bold">MIS COMPRAS</span>
            {loading.mis_compras && (
              <div className="absolute inset-y-0 right-4 flex items-center">
                <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6"></div>
              </div>
            )}            
            </button>

          <button
            className="bg-white text-red-600 p-4 rounded-md shadow-md w-full sm:w-3/4 max-w-xs sm:max-w-md flex flex-col items-start text-left relative"
            onClick={() => handleNavigation('/', 'mi_suscripcion')}
            disabled={loading.mi_suscripcion}>
            <span className="text-sm font-semibold">VER</span>
            <span className="text-lg sm:text-xl font-bold">MI SUSCRIPCIÓN</span>
            {loading.mi_suscripcion && (
              <div className="absolute inset-y-0 right-4 flex items-center">
                <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6"></div>
              </div>
            )}          
          </button>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
