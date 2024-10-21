import { Link, useNavigate  } from "react-router-dom";
import { useState  } from 'react';
const Inicio = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros:", window.location.search);  // Verificar que todos los parámetros están presentes

  const role = params.get('role');
  const token = params.get('token');
  const username = params.get('username');
  console.log("role recibido:", role);
  console.log("token recibido:", token);
  console.log("username recibido:", username);

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
              <button className="bg-white text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg" onClick={() => handleNavigation('/', 'calcular_metricas')}
                disabled={loading.calcular_metricas}>
                <h3 className="text-lg text-center">CALCULAR</h3>
		            <h3 className="text-lg text-center">MÉTRICAS</h3>
                {loading.calcular_metricas && (
                  <div className="flex justify-center items-center mt-2">
                    <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6"></div>
                  </div>
                )}
              </button>
              <button className="bg-white text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg" onClick={() => handleNavigation('/', 'editar_rango')}
                disabled={loading.editar_rango}>
                <h3 className="text-lg text-center">EDITAR RANGO</h3>
                {loading.editar_rango && (
                  <div className="flex justify-center items-center mt-2">
                    <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6"></div>
                  </div>
                )}
              </button>
              <button className="bg-white text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg" onClick={() => handleNavigation('/asignar-alumno', 'asignar_alumno')}
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