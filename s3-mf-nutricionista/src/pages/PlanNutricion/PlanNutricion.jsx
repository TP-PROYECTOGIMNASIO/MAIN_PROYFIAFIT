import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import '../../index.css';

const PlanNutricion = () => {
  const [studentData, setStudentData] = useState(null);
  const [dietPlans, setDietPlans] = useState([]);
  const [currentDietPlan, setCurrentDietPlan] = useState(null);
  const [selectedDietPlan, setSelectedDietPlan] = useState(null);
  const navigate = useNavigate();
  const apiUrl35 = import.meta.env.VITE_APP_API_URL_35;
  const apiUrl36 = import.meta.env.VITE_APP_API_URL_36;

  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en Plan de Nutricion nutricionista:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Plan de Nutricion nutricionista:", role);
  console.log("token recibido en Plan de Nutricion nutricionista:", token);
  console.log("username recibido en Plan de Nutricion nutricionista:", username);

  const clientId = params.get('client_id');

  useEffect(() => {
    if (clientId) {
      fetch(`${apiUrl35}?client_id=${clientId}`)
        .then(response => response.json())
        .then(data => {
          if (data.client) {
            setStudentData(data.client);
          }
        })
        .catch(error => console.error('Error al obtener los datos del cliente:', error));

      fetch(`${apiUrl36}?showAll=true`)
        .then(response => response.json())
        .then(plans => {
          const clientPlans = plans.filter(plan => plan.client_id === parseInt(clientId));
          setDietPlans(clientPlans);

          const today = new Date();
          const activePlan = clientPlans.find(plan => {
            const startDate = new Date(plan.start_date);
            const endDate = new Date(plan.end_date);
            return startDate <= today && endDate >= today;
          });
          setCurrentDietPlan(activePlan);
        })
        .catch(error => console.error('Error al obtener el plan de nutrición:', error));
    }
  }, [clientId]);

  const handlePlanChange = (event) => {
    const selectedPlan = dietPlans.find(plan => plan.diet_plan_id === parseInt(event.target.value));
    setSelectedDietPlan(selectedPlan);
  };

  const handleGeneratePlan = () => {
    navigate(`/Plan-Form?client_id=${clientId}&role=${role}&token=${token}&username=${username}`);
  };

  const handleVisualizarPlan = () => {
    if (selectedDietPlan) {
      navigate(`/visualizar-plan?client_id=${clientId}&plan_id=${selectedDietPlan.diet_plan_id}&role=${role}&token=${token}&username=${username}`);
    } else {
      alert("Por favor, selecciona un plan alimenticio.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[82vh] bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 relative w-full max-w-md lg:max-w-lg flex flex-col justify-center">
        <Link to={`/listar-clientes?role=${role}&token=${token}&username=${username}`} className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl font-bold">
          X
        </Link>

        <h2 className="text-2xl lg:text-3xl font-semibold text-center mb-4" style={{ color: '#8c1c13' }}>
          PLAN ALIMENTICIO
        </h2>

        <p className="text-lg text-gray-600 mb-6 text-center">
          Nombre del Alumno: {`${studentData?.names || ''} ${studentData?.father_last_name || ''} ${studentData?.mother_last_name || ''}`}
        </p>

        <div className="flex justify-end mb-6">
          <select 
            className="p-1 border border-gray-300 rounded-lg text-black"
            style={{ backgroundColor: '#D9D9D9', width: '200px' }}
            onChange={handlePlanChange}
            defaultValue=""
          >
            <option value="" disabled>Planes Anteriores</option>
            {dietPlans.map(plan => (
              <option key={plan.diet_plan_id} value={plan.diet_plan_id}>
                {plan.name_plan}
              </option>
            ))}
          </select>
        </div>

        {currentDietPlan ? (
          <div className="flex justify-between items-center" style={{ backgroundColor: '#D9D9D9', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
            <p className="text-lg text-gray-700">Plan Alimenticio Fecha: {new Date(currentDietPlan.start_date).toLocaleDateString()}</p>

            <button 
              className="text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors w-32 font-bold"
              style={{ backgroundColor: '#3C4862', width: '190px' }}
              onClick={handleVisualizarPlan}
            >
              VISUALIZAR PLAN ALIMENTICIO
            </button>
          </div>
        ) : (
          <div className="text-center text-4xl text-gray-600" style={{ backgroundColor: '#D9D9D9', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
            <p className="inline-block">Aun no se ha </p>
            <p className="inline-block">registrado Plan </p>
            <p className="inline-block">Alimenticio </p>
          </div>
        )}

        <button 
          className="w-full text-white py-2 lg:py-3 rounded-lg hover:bg-red-800 transition-colors w-32 font-bold"
          style={{ backgroundColor: '#b5121c' }}
          onClick={handleGeneratePlan}
        >
          GENERAR PLAN ALIMENTICIO
        </button>
      </div>
    </div>
  );
};

export default PlanNutricion;
