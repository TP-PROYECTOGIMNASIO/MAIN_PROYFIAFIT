import { Link, useNavigate, useLocation  } from "react-router-dom";
import { useEffect, useState  } from 'react';
const Inicio = () => {
  const apiUrlUSERNAME = import.meta.env.VITE_APP_API_URL_USERNAME;
  const navigate = useNavigate();

  const [user, setUser] = useState({});
 
  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en inicio entrenador:", role);
  console.log("token recibido en inicio entrenador:", token);
  console.log("username recibido en inicio entrenador:", username);

  

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

  const [loading, setLoading] = useState({ calcular_metricas: false, editar_rango: false, asignar_alumno: false }); // Estado de carga para cada botón

  const handleNavigation = async (path, type) => {
    setLoading((prev) => ({ ...prev, [type]: true })); // Cambia el estado a carga para el botón específico
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula un tiempo de carga
    navigate(path); // Navega a la nueva ruta
    setLoading((prev) => ({ ...prev, [type]: false })); // Restablece el estado de carga
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-end p-10 relative">
      <img
        src="/fondo.png"
        alt="Imagen de fondo"
        className="absolute left-0 bottom-0 w-full h-full object-cover z-0"
      />

      <div className="w-full max-w-4xl relative z-10"> {/* Añado relative y z-10 */}
        <h1 className="text-4xl font-bold mb-12 text-red-600 text-center">
          Bienvenido Entrenador
        </h1>

        <div className="grid grid-cols-2 gap-12">
          <div className="text-left">
          
          </div>

          <div className="text-left">
          <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-b-lg max-w-xs mx-auto">
              <button className="bg-white text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg" onClick={() => handleNavigation(`/?role=${role}&token=${token}&username=${username}`, 'calcular_metricas')}
                disabled={loading.calcular_metricas}>
                <h3 className="text-lg text-center">CALCULAR</h3>
		            <h3 className="text-lg text-center">MÉTRICAS</h3>
                {loading.calcular_metricas && (
                  <div className="flex justify-center items-center mt-2">
                    <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6"></div>
                  </div>
                )}
              </button>
              <button className="bg-white text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg" onClick={() => handleNavigation(`/?role=${role}&token=${token}&username=${username}`, 'editar_rango')}
                disabled={loading.editar_rango}>
                <h3 className="text-lg text-center">EDITAR RANGO</h3>
                {loading.editar_rango && (
                  <div className="flex justify-center items-center mt-2">
                    <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6"></div>
                  </div>
                )}
              </button>
              <button className="bg-white text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg" onClick={() => handleNavigation(`/asignar-alumno?role=${role}&token=${token}&username=${username}`, 'asignar_alumno')}
                disabled={loading.asignar_alumno}>
                <h3 className="text-lg text-center">ASIGNAR ALUMNO</h3>
                {loading.asignar_alumno && (
                  <div className="flex justify-center items-center mt-2">
                    <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6"></div>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Inicio;