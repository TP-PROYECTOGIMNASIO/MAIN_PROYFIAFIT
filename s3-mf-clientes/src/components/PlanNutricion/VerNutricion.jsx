import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const NutritionPlan = () => {
  const [plan, setPlan] = useState(null);
  const apiUrl13 = import.meta.env.VITE_APP_API_URL_13;
  const apiUrlUSERNAME = import.meta.env.VITE_APP_API_URL_USERNAME;
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en Ver nutricion:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Ver nutricion clientes:", role);
  console.log("token recibido en Ver nutricion clientes:", token);
  console.log("username recibido en Ver nutricion clientes:", username);

  useEffect(() => {
    if (token && username) {
      console.log("Datos recibidos en Ver nutricion :", { role, token, username });
      fetchUserName();
    }
  }, [role, token, username]); // Dependencias del useEffect

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

  // Función para obtener los datos del plan de nutrición
  useEffect(() => {
    if (!user.id) return; // Solo procede si user.id está disponible

    const fetchPlan = async () => {
      try {
        const url = `${apiUrl13}?clientId=${user.id}`;
        console.log("URL completa:", url); // Para verificar la URL completa
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Error al obtener el plan de nutrición");
        }

        const data = await response.json();
        console.log("Respuesta de la API de error:", data); // Verifica el contenido de la respuesta

        setPlan(data.message === "Usted no cuenta con un plan de nutrición." ? { message: data.message } : data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPlan();
  }, [user.id]);

  // Función para convertir el número de día en el nombre del día de la semana
  const getDayName = (dayNumber) => {
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    return days[dayNumber - 1];
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-6 py-10">
      <div className="w-full max-w-4xl bg-white p-10 rounded-lg shadow-lg relative">
        {/* Botón "Regresar" */}
        <button 
          onClick={() => window.history.back()} 
          className="absolute top-4 left-4 text-sm text-gray-600 flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
          </svg>
          Regresar
        </button>

        {/* Título */}
        <h2 className="text-center text-4xl font-bold mb-6 text-red-600">Cronograma</h2>

        {/* Mostrar contenido según el estado del plan */}
        {!plan ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : plan.message ? (
          <div className="text-center text-gray-600 text-lg">
            {plan.message}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-center border border-collapse border-red-600 rounded-lg shadow-md">
              <thead>
                <tr className="bg-red-600 text-white text-lg">
                  <th className="p-3 border border-red-600">Día</th>
                  <th className="p-3 border border-red-600">Desayuno</th>
                  <th className="p-3 border border-red-600">Almuerzo</th>
                  <th className="p-3 border border-red-600">Cena</th>
                  <th className="p-3 border border-red-600">Notas</th>
                </tr>
              </thead>
              <tbody>
                {plan.days.map(day => (
                  <tr key={day.diet_plan_day_id} className="border-t">
                    <td className="p-3 border border-red-600 bg-gray-100 font-bold text-red-600">{getDayName(day.day_number)}</td>
                    <td className="p-3 border border-red-600">{day.breakfast}</td>
                    <td className="p-3 border border-red-600">{day.lunch}</td>
                    <td className="p-3 border border-red-600">{day.dinner}</td>
                    <td className="p-3 border border-red-600">{day.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionPlan;
