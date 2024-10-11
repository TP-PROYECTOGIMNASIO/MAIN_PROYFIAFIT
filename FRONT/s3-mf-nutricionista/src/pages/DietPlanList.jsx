import React, { useState, useEffect } from 'react';

const DietPlanList = () => {
  const [dietPlans, setDietPlans] = useState([]);

  useEffect(() => {
    fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/plan-de-nutricion/hu-tp-36?showAll=true')
      .then(response => response.json())
      .then(data => setDietPlans(data))
      .catch(error => console.error('Error fetching diet plans:', error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Planes de Alimentación</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dietPlans.map(plan => (
          <div key={plan.diet_plan_id} className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">{plan.name_plan}</h2>
            <p>Cliente ID: {plan.client_id}</p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" 
                    onClick={() => window.location.href = `/plan/${plan.diet_plan_id}`}>
              Visualizar Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DietPlanList;
