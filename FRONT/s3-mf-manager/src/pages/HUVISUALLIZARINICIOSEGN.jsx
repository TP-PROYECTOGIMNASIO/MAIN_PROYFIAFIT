import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa"; // Importamos el ícono

const ManagerPage = () => {

  const apiUrlUSERNAME = import.meta.env.VITE_APP_API_URL_USERNAME;
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState({
    informacion_inventarios: false,
    sedes: false,
    inventario: false,
    visitantes: false,
    informacion_compras: false,
    membresias: false,
    promociones: false,
    empleados: false,
    informacion_ventas: false,
    rangos: false,
    clientes: false,
    pagos: false,
  }); // Estado de carga para cada botón
 
  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en Visualizar inicio manager:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Visualizar inicio manager:", role);
  console.log("token recibido en Visualizar inicio manager:", token);
  console.log("username recibido en Visualizar inicio manager:", username);

  

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
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-end p-10 relative">
      {/* Imagen a la izquierda */}
      <img
        src="/assets/fondo.png"
        alt="Imagen de fondo"
        className="absolute left-0 bottom-0 w-full h-full object-cover z-0" // Ajustar z-index aquí
      />

      <div className="w-full max-w-4xl relative z-10">
        {/* Asegurarse de que el contenedor esté encima */}
        <h1 className="text-4xl font-bold mb-12 text-red-600 text-center">
          Bienvenido Manager!
        </h1>

        <div className="grid grid-cols-3 gap-12">
          {/* Columna 1 - Información de Inventarios */}
          <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-b-lg">
            <button className="text-xl font-semibold bg-red-600 text-white py-2 px-4 rounded-t-lg" onClick={() => handleNavigation(`/Inventario-Sede?role=${role}&token=${token}&username=${username}`, 'informacion_inventarios')}
                disabled={loading.informacion_inventarios}>
              Información de Inventarios
              {loading.informacion_inventarios && <div className="animate-spin border-2 border-white-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>}

            </button>
            <button className="bg-white text-red-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center w-full" onClick={() => handleNavigation(`/sedes?role=${role}&token=${token}&username=${username}`, 'sedes')}
                disabled={loading.sedes}>
              Sedes <FaChevronRight className="text-red-600 text-lg" />
              {loading.sedes && <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
            </button>
            <button className="bg-white text-red-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center w-full" onClick={() => handleNavigation(`/ActualizarInventarioSedes?role=${role}&token=${token}&username=${username}`, 'inventario')}
                disabled={loading.inventario}>
              Inventario <FaChevronRight className="text-red-600 text-lg" />
              {loading.inventario && <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
            </button>
            <button className="bg-white text-red-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center w-full" onClick={() => handleNavigation(`/?role=${role}&token=${token}&username=${username}`, 'visitantes')}
                disabled={loading.visitantes}>
              Visitantes <FaChevronRight className="text-red-600 text-lg" />
              {loading.visitantes && <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
            </button>
          </div>

          {/* Columna 2 - Información de Compras */}
          <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-b-lg">
            <button className="text-xl font-semibold bg-red-600 text-white py-2 px-4 rounded-t-lg" onClick={() => handleNavigation(`/Informe-Compra?role=${role}&token=${token}&username=${username}`, 'informacion_compras')}
                disabled={loading.informacion_compras}>
              Información de Compras
              {loading.informacion_compras && <div className="animate-spin border-2 border-white-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
            </button>
            <button className="bg-white text-red-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center w-full" onClick={() => handleNavigation(`/membresias?role=${role}&token=${token}&username=${username}`, 'membresias')}
                disabled={loading.membresias}>
              Membresías <FaChevronRight className="text-red-600 text-lg" />
              {loading.membresias && <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
            </button>
            <button className="bg-white text-red-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center w-full" onClick={() => handleNavigation(`/?role=${role}&token=${token}&username=${username}`, 'promociones')}
                disabled={loading.promociones}>
              Promociones <FaChevronRight className="text-red-600 text-lg" />
              {loading.promociones && <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
            </button>
            <button className="bg-white text-red-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center w-full" onClick={() => handleNavigation(`/empleados?role=${role}&token=${token}&username=${username}`, 'empleados')}
                disabled={loading.empleados}>
              Empleados <FaChevronRight className="text-red-600 text-lg" />
              {loading.empleados && <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
            </button>
          </div>

          {/* Columna 3 - Información de Ventas */}
          <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-b-lg">
            <h2 className="text-xl font-semibold bg-red-600 text-white py-2 px-4 rounded-t-lg">
              Información de Ventas
            </h2>
            <button className="bg-white text-red-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center w-full" onClick={() => handleNavigation(`/?role=${role}&token=${token}&username=${username}`, 'rangos')}
                disabled={loading.rangos}>
              Rangos <FaChevronRight className="text-red-600 text-lg" />
              {loading.rangos && <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
            </button>
            <button className="bg-white text-red-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center w-full" onClick={() => handleNavigation(`/?role=${role}&token=${token}&username=${username}`, 'clientes')}
                disabled={loading.clientes}>
              Clientes <FaChevronRight className="text-red-600 text-lg" />
              {loading.clientes && <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
            </button>
            <button className="bg-white text-red-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center w-full"  onClick={() => handleNavigation(`/?role=${role}&token=${token}&username=${username}`, 'pagos')}
                disabled={loading.pagos}>
              Pagos <FaChevronRight className="text-red-600 text-lg" />
              {loading.pagos && <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerPage;
