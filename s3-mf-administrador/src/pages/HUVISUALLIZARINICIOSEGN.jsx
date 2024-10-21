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

  const [loading, setLoading] = useState({ empleados: false, t_productos: false, productos: false, clientes: false, t_ejercicios: false, otro: false }); // Estado de carga para cada botón

  const handleNavigation = async (path, type) => {
    setLoading((prev) => ({ ...prev, [type]: true })); // Cambia el estado a carga para el botón específico
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula un tiempo de carga
    navigate(path); // Navega a la nueva ruta
    setLoading((prev) => ({ ...prev, [type]: false })); // Restablece el estado de carga
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-end p-10 relative">
      <img
        src="/assets/fondo.png"
        alt="Imagen de fondo"
        className="absolute left-0 bottom-0 w-full h-full object-cover z-0"
      />

      <div className="w-full max-w-4xl relative z-10">
        <h1 className="text-4xl font-bold mb-12 text-red-600 text-center">
          Bienvenido Admin
        </h1>
        <div>
          {/* Resto de la estructura del componente */}
          <h1>Datos recibidos: role: {role} token: {token} username: {username} </h1>
        </div>

        <div className="grid grid-cols-2 gap-0">
          <div className="text-left">
            <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-b-lg max-w-xs mx-auto">
              <button className="bg-white text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center" onClick={() => handleNavigation('/', 'empleados')}
                disabled={loading.empleados}>
                <div className="text-left">
                  <h3 className="text-lg">Administrar</h3>
                  <h1 className="text-3xl">EMPLEADOS</h1>
                </div>
                <FaChevronRight className="text-red-600 text-3xl" /> {/* Ícono de flecha */}
                {loading.empleados && <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
              </button>
              <button className="bg-white text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center" onClick={() => handleNavigation('/Lista_Tipo_Productos', 't_productos')}
                disabled={loading.t_productos}>
                <div className="text-left">
                  <h3 className="text-lg">Administrar</h3>
                  <h1 className="text-3xl">T.PRODUCTOS</h1>
                </div>
                <FaChevronRight className="text-red-600 text-3xl" />
                {loading.t_productos && <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
              </button>
              <button className="bg-white text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center" onClick={() => handleNavigation('/Lista_Productos', 'productos')} 
                disabled={loading.productos}>
                <div className="text-left">
                  <h3 className="text-lg">Administrar</h3>
                  <h1 className="text-3xl">PRODUCTOS</h1>
                </div>
                <FaChevronRight className="text-red-600 text-3xl" />
                {loading.productos && <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
              </button>
            </div>
          </div>

          <div className="text-left">
            <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-b-lg max-w-xs mx-auto">
              <button className="bg-white text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center" onClick={() => handleNavigation('/', 'clientes')}
                disabled={loading.clientes}>
                <div className="text-left">
                  <h3 className="text-lg">Administrar</h3>
                  <h1 className="text-3xl">CLIENTES</h1>
                </div>
                <FaChevronRight className="text-red-600 text-3xl" />
                {loading.clientes && <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
              </button>
              <button className="bg-white text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center" onClick={() => handleNavigation('/tejercicios', 't_ejercicios')}
                disabled={loading.t_ejercicios}>
                <div className="text-left">
                  <h3 className="text-lg">Administrar</h3>
                  <h1 className="text-3xl">T.EJERCICIOS</h1>
                </div>
                <FaChevronRight className="text-red-600 text-3xl" />
                {loading.t_ejercicios && <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
              </button>
              <button to={"/"} className="bg-white text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center" onClick={() => handleNavigation('/', 'otro')}
                disabled={loading.otro}>
                <div className="text-left">
                  <h3 className="text-lg">Administrar</h3>
                  <h1 className="text-3xl">OTRO</h1>
                </div>
                <FaChevronRight className="text-red-600 text-3xl" />
                {loading.otro && <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HUVISUALLIZARINICIOSEGN;
