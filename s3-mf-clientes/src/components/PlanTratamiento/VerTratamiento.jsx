import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerTratamiento = () => {
  const [tratamientos, setTratamientos] = useState([]); // Lista de tratamientos
  const apiUrlUSERNAME = import.meta.env.VITE_APP_API_URL_USERNAME;
  const navigate = useNavigate();
  const clientId = 1; // ID del cliente (puedes ajustar según el cliente autenticado)

  const [user, setUser] = useState({});

  const apiUrl90 = import.meta.env.VITE_APP_API_URL_90;

  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en Ver Tratamiento:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Ver Tratamiento clientes:", role);
  console.log("token recibido en Ver Tratamiento clientes:", token);
  console.log("username recibido en Ver Tratamiento clientes:", username);
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
    // Obtener todos los planes del cliente
    fetch(`${apiUrl90}?clientId=${clientId}&view=all_previous_plans`)
      .then((res) => res.json())
      .then((data) => setTratamientos(data))
      .catch((err) => console.error(err));
  }, [clientId]);
  
  

  const handleVisualizarPlan = (treatmentId) => {
    navigate(`/ver-tratamiento/detalle-tratamiento?role=${role}&token=${token}&username=${username}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      {/* Botón de Regresar */}
      <header className="w-full max-w-2xl p-4">
        <button
          className="text-gray-700 font-medium"
          onClick={() => window.history.back()}
        >
          &lt; Regresar
        </button>
      </header>

      <div className="w-full max-w-2xl bg-white p-6 mt-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-red-600 mb-4">
          PLANES DE TRATAMIENTO
        </h1>
        <p className="text-center text-gray-700">Nombre del Alumno</p>

        <div className="mt-6">
          {tratamientos.length === 0 ? (
            <p className="text-center text-gray-700">No hay planes de tratamiento disponibles.</p>
          ) : (
            tratamientos.map((tratamiento) => (
              <div key={tratamiento.treatment_plan_id} className="mt-4 bg-gray-200 p-4 rounded-md flex justify-between items-center">
                <p className="font-semibold">Plan: {new Date(tratamiento.created_at).toLocaleDateString()}</p>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  onClick={() => handleVisualizarPlan(tratamiento.treatment_plan_id)}
                >
                  Visualizar Tratamiento
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VerTratamiento;
