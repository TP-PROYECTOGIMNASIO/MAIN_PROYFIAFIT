import { useState, useEffect } from 'react';

const PlanesEntrenamiento = () => {
  const [planes, setPlanes] = useState([]);
  const [mesesDisponibles, setMesesDisponibles] = useState([]); // Estado para almacenar los meses disponibles
  const [mesFiltro, setMesFiltro] = useState(''); // Estado para almacenar el mes seleccionado
  const apiUrl11 = import.meta.env.VITE_APP_API_URL_11;
  const apiUrlUSERNAME = import.meta.env.VITE_APP_API_URL_USERNAME;
  const [user, setUser] = useState({});

  const params = new URLSearchParams(window.location.search);
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");

  // Obtener el nombre del usuario
  useEffect(() => {
    if (token && username) {
      fetchUserName();
    }
  }, [role, token, username]);

  const fetchUserName = async () => {
    try {
      const response = await fetch(`${apiUrlUSERNAME}?username=${username}`);
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setUser(data[0]);
      } else {
        setUser({});
      }
    } catch (error) {
      console.error("Error al obtener la información del usuario", error);
    }
  };

  // Obtener los planes y extraer los meses disponibles
  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        if (!user.id) return;

        const response = await fetch(`${apiUrl11}?clientId=${user.id}`);
        if (!response.ok) {
          throw new Error('Error al obtener los planes');
        }
        const data = await response.json();
        setPlanes(data);

        // Extraer los meses disponibles a partir de las fechas de los planes
        const meses = Array.from(new Set(data.map(plan => {
          const date = new Date(plan.training_assignment_date);
          return date.getMonth() + 1; // Obtener el mes (0 es enero, entonces sumamos 1)
        })));

        setMesesDisponibles(meses.sort()); // Ordenar los meses
      } catch (error) {
        console.error('Error fetching planes:', error);
      }
    };

    fetchPlanes();
  }, [user.id]);

  // Actualizar el filtro de mes
  const handleMesChange = (e) => {
    setMesFiltro(e.target.value);
  };

  // Filtrar los planes según el mes seleccionado
  const planesFiltrados = planes.filter(plan => {
    if (!mesFiltro) return true; // Si no hay filtro, mostrar todos los planes
    const planMes = new Date(plan.training_assignment_date).getMonth() + 1;
    return planMes === parseInt(mesFiltro);
  });

  const handleNavigate = (planId) => {
    window.location.href = `/ver-plan/${planId}?role=${role}&token=${token}&username=${username}`;
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Contenedor para el título y el botón de retroceso */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {/* Botón de retroceso */}
            <button 
              className="mr-4 px-4 py-2 text-red-600 hover:underline transition duration-300 font-bold" 
              onClick={handleBack}
            >
              ←Retroceder
            </button>

            <h1 className="text-2xl font-bold text-gray-700">Planes de Entrenamiento</h1>
          </div>

          {/* Selector de meses dinámico */}
          <div className="ml-4">
            <label htmlFor="mes" className="mr-2 text-gray-700 font-bold">Mes:</label>
            <select
              id="mes"
              value={mesFiltro}
              onChange={handleMesChange}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="">Todos los meses</option>

              {/* Generar las opciones de meses dinámicamente */}
              {mesesDisponibles.map(mes => (
                <option key={mes} value={mes}>
                  {new Date(0, mes - 1).toLocaleString('es-ES', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Lista de planes filtrados */}
        {planesFiltrados.length > 0 ? (
          <ul className="space-y-4">
            {planesFiltrados.map((plan) => (
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