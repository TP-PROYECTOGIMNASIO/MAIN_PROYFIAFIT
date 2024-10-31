import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";

const HUVISUALLIZARINICIOSEGN = () => {
  const [clients, setClients] = useState([]);
  const [loadingPlan, setLoadingPlan] = useState(false); // Para el botón Empezar Plan
  const [loadingRegister, setLoadingRegister] = useState(false); // Para el botón Registrar Ejercicios
  
  const apiUrlUSERNAME = import.meta.env.VITE_APP_API_URL_USERNAME;
  const apiUrl35 = import.meta.env.VITE_APP_API_URL_35;

  const navigate = useNavigate();

  const [user, setUser] = useState({});
 
  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Visualizar inicio fisioterapeuta:", role);
  console.log("token recibido en Visualizar inicio fisioterapeuta:", token);
  console.log("username recibido en Visualizar inicio fisioterapeuta:", username);

  

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

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(apiUrl35);
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
        setClients([]);
      }
    };

    fetchClients();
  }, []);

  const handlePlanClick = async () => {
    if (clients.length === 0) {
      alert('No hay clientes disponibles.');
    } else {
      setLoadingPlan(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula un tiempo de carga
      navigate(`/listar-clientes?role=${role}&token=${token}&username=${username}`);
    }
  };

  const handleRegisterClick = async () => {
    setLoadingRegister(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula un tiempo de carga
    navigate(`/ListaEjercicios?role=${role}&token=${token}&username=${username}`); // Cambia la ruta según sea necesario
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-end p-10 relative">
      <img
        src="/wasa.jpeg"
        alt="Imagen de fondo"
        className="absolute left-0 bottom-0 w-full h-full object-cover z-0"
      />

      <div className="w-full max-w-4xl relative z-10">
        <h1 className="text-4xl font-bold mb-12 text-red-600 text-center">
          ¡Bienvenido Fisioterapeuta!
        </h1>

        <div className="grid grid-cols-2 gap-12">
          <div className="text-left"></div>
          <div className="text-left">
            <div className="flex flex-col gap-4 p-4 rounded-b-lg">
              <button
                onClick={handlePlanClick}
                className={`bg-gray-100 text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center ${loadingPlan ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loadingPlan}
              >
                <div className="flex flex-col items-start">
                  <h3 className="text-3xl text-red-600">EMPEZAR PLAN</h3>
                  <h1 className="text-3xl text-red-600">TRATAMIENTO</h1>
                </div>
                {loadingPlan ? (
                  <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 ml-4"></div>
                ) : (
                  <FaChevronRight className="text-red-600 text-3xl ml-4" />
                )}
              </button>

              <button
                onClick={handleRegisterClick}
                className={`bg-gray-100 text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center ${loadingRegister ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loadingRegister}
              >
                <div className="flex flex-col items-start">
                  <h3 className="text-3xl text-red-600">REGISTRAR</h3>
                  <h1 className="text-3xl text-red-600">EJERCICIOS</h1>
                </div>
                {loadingRegister ? (
                  <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 ml-4"></div>
                ) : (
                  <FaChevronRight className="text-red-600 text-3xl ml-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HUVISUALLIZARINICIOSEGN;




