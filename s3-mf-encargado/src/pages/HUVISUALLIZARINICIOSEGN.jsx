import { Link, useNavigate  } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa"; // Importamos el ícono que usaremos
import { useState  } from 'react';

const HUVISUALLIZARINICIOSEGN = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros:", window.location.search);  // Verificar que todos los parámetros están presentes

  const role = params.get('role');
  const token = params.get('token');
  const username = params.get('username');
  console.log("role recibido:", role);
  console.log("token recibido:", token);
  console.log("username recibido:", username);

  const [loading, setLoading] = useState({ gestionar_eventos: false, visualizar_empleados_sede: false, visualizar_clientes_sede: false }); // Estado de carga para cada botón

  const handleNavigation = async (path, type) => {
    setLoading((prev) => ({ ...prev, [type]: true })); // Cambia el estado a carga para el botón específico
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula un tiempo de carga
    navigate(path); // Navega a la nueva ruta
    setLoading((prev) => ({ ...prev, [type]: false })); // Restablece el estado de carga
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-end p-10 relative">
      <img
        src="/fondo_encargado.jpeg"
        alt="Imagen de fondo"
        className="absolute left-0 bottom-0 w-full h-full object-cover z-0"
      />
      

      <div className="w-full max-w-4xl relative z-10"> {/* Añado relative y z-10 */}
        <h1 className="text-4xl font-bold mb-12 text-red-600 text-center">
          Bienvenido Encargado!
        </h1>

        <div className="grid grid-cols-2 gap-12">
          <div className="text-left">
          
          </div>

          <div className="text-left">
            <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-b-lg max-w-xs mx-auto">
              <button className="bg-[#B5121C] text-white border border-[#B5121C] font-semibold py-2 px-4 rounded-lg flex justify-between items-center" onClick={() => handleNavigation('/', 'gestionar_eventos')}
                disabled={loading.gestionar_eventos}>
                <div className="text-left">
                  <h3 className="text-lg">GESTIONAR</h3>
                  <h3 className="text-lg">EVENTOS</h3>
                </div>
                <FaChevronRight className="text-white text-3xl" />
                {loading.gestionar_eventos && <div className="animate-spin border-2 border-white border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
              </button>
              <button className="bg-[#B5121C] text-white border border-[#B5121C] font-semibold py-2 px-4 rounded-lg flex justify-between items-center" onClick={() => handleNavigation('/', 'visualizar_empleados_sede')}
                disabled={loading.visualizar_empleados_sede}>
                <div className="text-left">
                  <h3 className="text-lg">VISUALIZAR</h3>
                  <h3 className="text-lg">EMPLEADOS SEDE</h3>
                </div>
                <FaChevronRight className="text-white text-3xl" />
                {loading.visualizar_empleados_sede && <div className="animate-spin border-2 border-white border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
              </button>
              <button className="bg-[#B5121C] text-white border border-[#B5121C] font-semibold py-2 px-4 rounded-lg flex justify-between items-center" onClick={() => handleNavigation('/', 'visualizar_clientes_sede')}
                disabled={loading.visualizar_clientes_sede}>
                <div className="text-left">
                  <h3 className="text-lg">VISUALIZAR</h3>
                  <h3 className="text-lg">CLIENTES SEDE</h3>
                </div>
                <FaChevronRight className="text-white text-3xl" />
                {loading.visualizar_clientes_sede && <div className="animate-spin border-2 border-white border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HUVISUALLIZARINICIOSEGN;
