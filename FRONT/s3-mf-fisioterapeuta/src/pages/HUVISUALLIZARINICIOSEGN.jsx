import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const HUVISUALLIZARINICIOSEGN = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/empleados/hu-tp-35');
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
        setClients([]); // Establecer array vacío en caso de error
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handlePlanClick = () => {
    if (clients.length === 0) {
      alert('No hay clientes disponibles.');
    } else {
      navigate('/listar-clientes');
    }
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
            <div className="flex flex-col gap-4 bg-white p-4 rounded-b-lg shadow-lg">
<button 
                onClick={handlePlanClick}
                className="bg-white text-gray-600 border border-red-600 font-semibold py-2 px-4 rounded-lg"
              >
                <h3 className="text-lg text-center">EMPEZAR PLAN</h3>
                <h1 className="text-3xl text-center">TRATAMIENTO →</h1>
              </button>
              <Link to={"/ListaEjercicios"} className="bg-white text-gray-600 border border-red-600 font-semibold py-2 px-4 rounded-lg">
                <h3 className="text-lg text-center">REGISTRAR</h3>
                <h1 className="text-3xl text-center">EJERCICIOS →</h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HUVISUALLIZARINICIOSEGN;

