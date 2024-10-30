// Importaciones de librerías y componentes
import { useEffect, useState } from "react"; // Asegúrate de incluir React, useEffect y useState
import { Link, useNavigate  } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa"; // Importamos el ícono que usaremos


const HUVISUALLIZARINICIOSEGN = () => {
  const apiUrlUSERNAME = import.meta.env.VITE_APP_API_URL_USERNAME;
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState({ registrar_evento: false, gestionar_eventos: false, visualizar_empleados_sede: false, visualizar_clientes_sede: false }); // Estado de carga para cada botón


  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Visualizar inicio encargado:", role);
  console.log("token recibido en Visualizar inicio encargado:", token);
  console.log("username recibido en Visualizar inicio encargado:", username);

  

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


  const handleNavigation = async (path, type) => {
    setLoading((prev) => ({ ...prev, [type]: true })); // Cambia el estado a carga para el botón específico
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula un tiempo de carga
    navigate(path); // Navega a la nueva ruta
    setLoading((prev) => ({ ...prev, [type]: false })); // Restablece el estado de carga
  };

  const getWelcomeMessage = () => {
    switch (role) {
      case 'encargado_gimnasios':
        return "¡Bienvenido Encargado de Gimnasios!";
      case 'encargado_eventos':
        return "¡Bienvenido Encargado de Eventos!";
      default:
        return "¡Bienvenido Encargado!";
    }
  };

  const getBackgroundImage = () => {
    switch (role) {
      case 'encargado_gimnasios':
        return "/fondo_encargado_gimnasios.jpeg"; // Cambia por la URL de la imagen específica
      case 'encargado_eventos':
        return "/fondo.png"; // Cambia por la URL de la imagen específica
      default:
        return "/fondo.png"; // Imagen por defecto
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-end p-10 relative">
      <img
        src={getBackgroundImage()}
        alt="Imagen de fondo"
        className="absolute left-0 bottom-0 w-full h-full object-cover z-0"
      />
      

      <div className="w-full max-w-4xl relative z-10"> {/* Añado relative y z-10 */}
        
        <h1 className="text-4xl font-bold mb-12 text-red-600 text-center">
          {getWelcomeMessage()}
        </h1>

        <div className="grid grid-cols-2 gap-12">
          <div className="text-left">
          
          </div>

          <div className="text-left">
            {role === 'encargado_eventos' && (
              <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-b-lg max-w-xs mx-auto">
                <button className="bg-[#B5121C] text-white border border-[#B5121C] font-semibold py-2 px-4 rounded-lg flex justify-between items-center" onClick={() => handleNavigation(`/?role=${role}&token=${token}&username=${username}`, 'registrar_evento')}
                  disabled={loading.registrar_evento}>
                  <div className="text-left">
                    <h3 className="text-lg">REGISTRA UN</h3>
                    <h3 className="text-lg">NUEVO EVENTO</h3>
                  </div>
                  <FaChevronRight className="text-white text-3xl" />
                  {loading.registrar_evento && <div className="animate-spin border-2 border-white border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
                </button>
              </div>
            )}

            {role === 'encargado_gimnasios' && (
              <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-b-lg max-w-xs mx-auto">
                <button className="bg-[#B5121C] text-white border border-[#B5121C] font-semibold py-2 px-4 rounded-lg flex justify-between items-center" onClick={() => handleNavigation(`/eventos?role=${role}&token=${token}&username=${username}`, 'gestionar_eventos')}
                  disabled={loading.gestionar_eventos}>
                  <div className="text-left">
                    <h3 className="text-lg">GESTIONAR</h3>
                    <h3 className="text-lg">EVENTOS</h3>
                  </div>
                  <FaChevronRight className="text-white text-3xl" />
                  {loading.gestionar_eventos && <div className="animate-spin border-2 border-white border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
                </button>
                <button className="bg-[#B5121C] text-white border border-[#B5121C] font-semibold py-2 px-4 rounded-lg flex justify-between items-center" onClick={() => handleNavigation(`/?role=${role}&token=${token}&username=${username}`, 'visualizar_empleados_sede')}
                  disabled={loading.visualizar_empleados_sede}>
                  <div className="text-left">
                    <h3 className="text-lg">VISUALIZAR</h3>
                    <h3 className="text-lg">EMPLEADOS SEDE</h3>
                  </div>
                  <FaChevronRight className="text-white text-3xl" />
                  {loading.visualizar_empleados_sede && <div className="animate-spin border-2 border-white border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
                </button>
                <button className="bg-[#B5121C] text-white border border-[#B5121C] font-semibold py-2 px-4 rounded-lg flex justify-between items-center" onClick={() => handleNavigation(`/?role=${role}&token=${token}&username=${username}`, 'visualizar_clientes_sede')}
                  disabled={loading.visualizar_clientes_sede}>
                  <div className="text-left">
                    <h3 className="text-lg">VISUALIZAR</h3>
                    <h3 className="text-lg">CLIENTES SEDE</h3>
                  </div>
                  <FaChevronRight className="text-white text-3xl" />
                  {loading.visualizar_clientes_sede && <div className="animate-spin border-2 border-white border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HUVISUALLIZARINICIOSEGN;
