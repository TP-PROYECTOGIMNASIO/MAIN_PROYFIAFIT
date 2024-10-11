import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DietPlanDetail = () => {
  const { dietPlanId } = useParams();
  const [dietPlan, setDietPlan] = useState(null);

  useEffect(() => {
    fetch(`https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/plan-de-nutricion/hu-tp-36?dietPlanId=${dietPlanId}`)
      .then(response => response.json())
      .then(data => setDietPlan(data))
      .catch(error => console.error('Error fetching diet plan details:', error));
  }, [dietPlanId]);

  if (!dietPlan) {
    return <p>Cargando detalles del plan...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{dietPlan.name_plan}</h1>
      <p><strong>Fecha de Asignación:</strong> {new Date(dietPlan.diet_assignment_date).toLocaleDateString()}</p>
      <p><strong>Fecha de Inicio:</strong> {new Date(dietPlan.start_date).toLocaleDateString()}</p>
      <p><strong>Fecha de Finalización:</strong> {new Date(dietPlan.end_date).toLocaleDateString()}</p>
      <p><strong>Proteínas:</strong> {dietPlan.protein_gr}g</p>
      <p><strong>Carbohidratos:</strong> {dietPlan.carbohydrates_gr}g</p>
      <p><strong>Calorías Diarias:</strong> {dietPlan.daily_calories_kcal} kcal</p>

      <h2 className="text-2xl font-semibold mt-6">Comidas por Día</h2>
      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr>
            <th className="py-2">Día</th>
            <th className="py-2">Desayuno</th>
            <th className="py-2">Almuerzo</th>
            <th className="py-2">Cena</th>
            <th className="py-2">Notas</th>
          </tr>
        </thead>
        <tbody>
          {dietPlan.days.map(day => (
            <tr key={day.diet_plan_day_id}>
              <td className="border px-4 py-2">{day.day_number}</td>
              <td className="border px-4 py-2">{day.breakfast}</td>
              <td className="border px-4 py-2">{day.lunch}</td>
              <td className="border px-4 py-2">{day.dinner}</td>
              <td className="border px-4 py-2">{day.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DietPlanDetail;
