import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Solo si estás utilizando react-router-dom

const DietPlanList = () => {
  const [dietPlans, setDietPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate(); // Hook de react-router-dom para navegación
  const apiUrl36 = import.meta.env.VITE_APP_API_URL_36;

  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en DietPlanList:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en DietPlanList:", role);
  console.log("token recibido en DietPlanList:", token);
  console.log("username recibido en DietPlanList:", username);


  useEffect(() => {
    fetch(`${apiUrl36}?showAll=true`)
      .then(response => response.json())
      .then(data => setDietPlans(data))
      .catch(error => console.error('Error fetching diet plans:', error));
  }, []);

  const handlePlanChange = (event) => {
    const planId = event.target.value;
    setSelectedPlan(planId);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Contenedor principal más grande */}
      <div className="w-full max-w-2xl p-10 bg-white rounded-lg shadow-lg relative">
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

        {/* Título */}
        <h1 className="text-4xl font-bold text-center mb-6 text-red-600">PLAN ALIMENTICIO</h1>
        <p className="text-center text-xl text-gray-700 mb-6">Nombre del Alumno</p>

        {/* Selector de planes */}
        <div className="mb-6">
          <select 
            className="w-full p-4 border border-gray-300 rounded-md text-lg"
            onChange={handlePlanChange}
          >
            <option value="">Planes Anteriores</option>
            {dietPlans.map(plan => (
              <option key={plan.diet_plan_id} value={plan.diet_plan_id}>
                {plan.name_plan}
              </option>
            ))}
          </select>
        </div>

        {/* Botón para visualizar plan */}
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm mb-6">
          <p className="text-gray-700 text-lg">Plan Alimenticio</p>
          <button 
            className="bg-blue-900 text-white py-2 px-6 rounded-md text-lg" 
            onClick={() => {
              if (selectedPlan) {
                window.location.href = `/plan/${selectedPlan}?role=${role}&token=${token}&username=${username}`;
              }
            }}
          >
            VISUALIZAR PLAN ALIMENTICIO
          </button>
        </div>

        {/* Botón para generar plan */}
        <button 
          className="w-full bg-red-600 text-white py-3 px-4 rounded-md text-lg hover:bg-red-700 transition-colors"
        >
          GENERAR PLAN ALIMENTICIO
        </button>
      </div>
    </div>
  );
};

export default DietPlanList;