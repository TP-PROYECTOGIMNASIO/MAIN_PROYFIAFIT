import { useState, useEffect } from 'react';
 
const PlanesEntrenamiento = () => {
  const [planes, setPlanes] = useState([]);
  const apiUrl11 = import.meta.env.VITE_APP_API_URL_11;
  const apiUrlUSERNAME = import.meta.env.VITE_APP_API_URL_USERNAME;
  const [user, setUser] = useState({});

  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en Planes de Entrenamiento:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Planes de Entrenamiento clientes:", role);
  console.log("token recibido en Planes de Entrenamiento clientes:", token);
  console.log("username recibido en Planes de Entrenamiento clientes:", username);

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
    const fetchPlanes = async () => {
      try {
        if (!user.id) return; // Evita la llamada si user.id no está disponible

        const response = await fetch(`${apiUrl11}?clientId=${user.id}`);
        if (!response.ok) {
          throw new Error('Error al obtener los planes');
        }
        const data = await response.json();
        setPlanes(data);
      } catch (error) {
        console.error('Error fetching planes:', error);
      }
    };
 
    fetchPlanes();
  }, [user.id]);
 
  const handleNavigate = (planId) => {
    window.location.href = `/ver-plan/${planId}?role=${role}&token=${token}&username=${username}`;
  };
 
  // Función para retroceder a la página anterior
  const handleBack = () => {
    window.history.back();
  };
 
  return (
<div className="bg-gray-100 min-h-screen p-6">
<div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Contenedor para el título y el botón */}
<div className="flex items-center mb-4">
          {/* Botón de retroceso */}
<button 
            className="mr-4 px-4 py-2 text-red-600 hover:underline transition duration-300 font-bold" 
            onClick={handleBack}
>
            ←Retroceder
</button>
<h1 className="text-2xl font-bold text-gray-700 text-center">Planes de Entrenamiento</h1>
</div>
        {planes.length > 0 ? (
<ul className="space-y-4">
            {planes.map((plan) => (
<li
                key={plan.training_plan_id}
                className="cursor-pointer p-4 bg-gray-700 text-white rounded-md hover:bg-red-800 transition duration-300"
                onClick={() => handleNavigate(plan.training_plan_id)}
>
                {plan.name}
</li>
            ))}
</ul>
        ) : (
<p className="text-gray-600">No se encontraron planes</p>
        )}
</div>
</div>
  );
};
 
export default PlanesEntrenamiento;
