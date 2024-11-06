import { useState, useEffect } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';

// Función para convertir el número de día en nombre de día
const getDayName = (dayNumber) => {
  const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const date = new Date();
  date.setDate(date.getDate() + (dayNumber - 1)); // Ajusta la fecha
  return daysOfWeek[date.getDay()]; // Devuelve el nombre del día correspondiente
};

const DietPlanDetail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dietPlanId = queryParams.get('plan_id'); // Extrae dietPlanId de la query
  const clientId = queryParams.get('client_id');
  const [dietPlan, setDietPlan] = useState(null);
  const navigate = useNavigate(); // Para manejar la navegación del botón "Regresar"
  const apiUrl36 = import.meta.env.VITE_APP_API_URL_36;
  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en DietPlanDetail:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en DietPlanDetail:", role);
  console.log("token recibido en DietPlanDetail:", token);
  console.log("username recibido en DietPlanDetail:", username);

  useEffect(() => {
    fetch(`${apiUrl36}?dietPlanId=${dietPlanId}`)
      .then(response => response.json())
      .then(data => setDietPlan(data))
      .catch(error => console.error('Error fetching diet plan details:', error));
  }, [dietPlanId]);

  if (!dietPlan) {
    return <p>Cargando detalles del plan...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-6 py-10">
      {/* Contenedor principal más grande */}
      <div className="w-full max-w-4xl bg-white p-10 rounded-lg shadow-lg relative">
        {/* Botón "Regresar" en la esquina superior izquierda */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-gray-600 text-sm mb-4 flex items-center"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
          </svg>
          Regresar
        </button>

        {/* Información del Plan */}
        <h1 className="text-4xl font-bold mb-6 text-center text-red-600">SOBRE EL PLAN</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg mb-8">
          <div>
            <p><strong>Nombre del Plan:</strong> {dietPlan.name_plan}</p>
          </div>
          <div>
            <p><strong>Fecha de Inicio:</strong> {new Date(dietPlan.start_date).toLocaleDateString()}</p>
          </div>
          <div>
            <p><strong>Fecha de Fin:</strong> {new Date(dietPlan.end_date).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Distribución de Macronutrientes */}
        <h2 className="text-2xl font-bold mb-4 text-red-600">Distribución de Macronutrientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-200 p-6 rounded-lg text-center">
            <p className="font-bold">Proteínas</p>
            <p>{dietPlan.protein_gr}g</p>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg text-center">
            <p className="font-bold">Carbohidratos</p>
            <p>{dietPlan.carbohydrates_gr}g</p>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg text-center">
            <p className="font-bold">Grasas</p>
            <p>{dietPlan.fat_gr}g</p>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg text-center">
            <p className="font-bold">Calorías Diarias</p>
            <p>{dietPlan.daily_calories_kcal} kcal</p>
          </div>
        </div>

        {/* Cronograma */}
        <h2 className="text-2xl font-bold mb-4">CRONOGRAMA</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-red-600 text-white text-lg">
                <th className="py-3 px-4">Día</th>
                <th className="py-3 px-4">Desayuno</th>
                <th className="py-3 px-4">Almuerzo</th>
                <th className="py-3 px-4">Cena</th>
                <th className="py-3 px-4">Notas</th>
              </tr>
            </thead>
            <tbody>
              {dietPlan.days.map((day) => (
                <tr key={day.diet_plan_day_id} className="text-center border-t">
                  {/* Llamada a getDayName para convertir el número de día en nombre de día */}
                  <td className="border px-4 py-2 bg-gray-100 font-semibold text-red-600">
                    {getDayName(day.day_number)}
                  </td>
                  <td className="border px-4 py-2">{day.breakfast}</td>
                  <td className="border px-4 py-2">{day.lunch}</td>
                  <td className="border px-4 py-2">{day.dinner}</td>
                  <td className="border px-4 py-2">{day.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DietPlanDetail;