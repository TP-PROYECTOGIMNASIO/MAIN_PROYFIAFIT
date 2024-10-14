import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import '../../index.css';

const PlanNutricion = () => {
  const [studentData, setStudentData] = useState(null);
  const [dietPlans, setDietPlans] = useState([]);
  const [currentDietPlan, setCurrentDietPlan] = useState(null);
  const [selectedDietPlan, setSelectedDietPlan] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const clientId = params.get('client_id');

  // Configura la fecha de prueba
  //const manualDate = new Date('2024-10-14'); // Cambia esta fecha a la deseada, para hacer las pruebas puse esta fecha y comente el return de la niea 40 

  useEffect(() => {
    if (clientId) {
      fetch(`https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/empleados/hu-tp-35?client_id=${clientId}`)
        .then(response => response.json())
        .then(data => {
          if (data.client) {
            setStudentData(data.client);
          }
        })
        .catch(error => console.error('Error al obtener los datos del cliente:', error));

      fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/plan-de-nutricion/hu-tp-36?showAll=true')
        .then(response => response.json())
        .then(plans => {
          const clientPlans = plans.filter(plan => plan.client_id === parseInt(clientId));
          setDietPlans(clientPlans);

          const today = new Date();
          const activePlan = clientPlans.find(plan => {
            const startDate = new Date(plan.start_date);
            const endDate = new Date(plan.end_date);
            return (
              startDate.toDateString() === today.toDateString() && // Inicio en el día actual
              startDate <= today && 
              endDate >= today
            );
            /*return (
              startDate.toDateString() === manualDate.toDateString() && 
              startDate <= manualDate && 
              endDate >= manualDate
            );*/
          });
          setCurrentDietPlan(activePlan);
        })
        .catch(error => console.error('Error al obtener el plan de nutrición:', error));
    }
  }, [clientId]);

  const handlePlanChange = (event) => {
    const selectedPlan = dietPlans.find(plan => plan.diet_plan_id === parseInt(event.target.value));
    setSelectedDietPlan(selectedPlan);
    navigate(`/PlanNutricion?client_id=${clientId}&plan_id=${selectedPlan.diet_plan_id}`);
  };

  const handleGeneratePlan = () => {
    navigate(`/Plan-Form?client_id=${clientId}`);
  };
  

  return (
    <div className="flex justify-center items-center min-h-[82vh] bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 relative w-full max-w-md lg:max-w-lg flex flex-col justify-center">
        <Link to="/listar-clientes" className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl font-bold">
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
      onClick={() => navigate(`/visualizar-plan?client_id=${clientId}&plan_id=${currentDietPlan.diet_plan_id}`)}
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
