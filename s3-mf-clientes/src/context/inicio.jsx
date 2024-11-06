import { Link, useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react"; // Asegúrate de incluir React, useEffect y useState
const HomePage = () => {
  const apiUrlUSERNAME = import.meta.env.VITE_APP_API_URL_USERNAME;
  const navigate = useNavigate();

  const [user, setUser] = useState({});
 
  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Visualizar inicio clientes:", role);
  console.log("token recibido en Visualizar inicio clientes:", token);
  console.log("username recibido en Visualizar inicio clientes:", username);

  

  useEffect(() => {
    if (token && username) {
      console.log("Datos recibidos:", { role, token, username });
      fetchUserName();
    }
  }, [role, token, username]); // Dependencias del useEffect // Dependencia de `navigate` // Dependencia de `token` y `username` para volver a ejecutar si estos cambian

  const fetchUserName = async () => {
    try {
      const response = await fetch(`${apiUrlUSERNAME}?username=${username}`);

      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }

      const data = await response.json();
      console.log("Respuesta de la API:", data);

      if (Array.isArray(data)) {
        if (data.length > 0) {
          setUser(data[0]);
        } else {
          console.error("El array está vacío");
          setUser({});
        }
      } else if (data && typeof data === "object") {
        setUser(data);
      } else {
        console.error("Formato inesperado en la respuesta de la API:", data);
        setUser({});
      }
    } catch (error) {
      console.error("Error al obtener la información del usuario", error);
    }
  };


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

        <section className="flex flex-col space-y-4 sm:w-1/3 items-center mt-8 sm:mt-0 w-full sm:ml-auto sm:mr-8">
          <button
            className="bg-white text-red-600 p-4 rounded-md shadow-md w-full sm:w-3/4 max-w-xs sm:max-w-md flex flex-col items-start text-left relative"
            onClick={() => handleNavigation(`/planes?role=${role}&token=${token}&username=${username}`, 'mis_planes')}
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
            onClick={() => handleNavigation(`/ver-metricas?role=${role}&token=${token}&username=${username}&clienteId=${user.id}`, 'mis_metricas')}
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
            onClick={() => handleNavigation(`/?role=${role}&token=${token}&username=${username}`, 'mis_compras')}
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
            onClick={() => handleNavigation(`/sub-list?role=${role}&token=${token}&username=${username}&clienteId=${user.id}`, 'mi_suscripcion')}
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
