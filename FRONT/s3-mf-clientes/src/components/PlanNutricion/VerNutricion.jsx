import { useState, useEffect } from 'react';

const NutritionPlan = () => {
  const [plan, setPlan] = useState(null);

  // Función para obtener los datos de la API
  useEffect(() => {
    fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/plan-de-nutricion/hu-tp-13?clientId=1')
      .then(response => response.json())
      .then(data => setPlan(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Función para convertir el número de día en el nombre del día de la semana
  const getDayName = (dayNumber) => {
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    return days[dayNumber - 1]; 
  };

  if (!plan) return <div>Loading...</div>;

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

        {/* Tabla del plan de nutrición */}
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
      </div>
    </div>
  );
};

export default NutritionPlan;