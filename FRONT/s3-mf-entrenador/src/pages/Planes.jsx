import React, { useState } from 'react';
import TrainingPlan from "./PlanEntrenamientoDia/TrainingPlan";  // Asegúrate de que los nombres de archivo coincidan con el sistema operativo (TrainingPlan.jsx)

import "../styles/index.css";  

import PlanEntrenamientoDia from '../pages/PlanEntrenamientoDia/PlanEntrenamientoDia';

function Planes() {
  const [step, setStep] = useState('initial');
  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en Planes:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Planes:", role);
  console.log("token recibido en Planes:", token);
  console.log("username recibido en Planes:", username);

  const handleGeneratePlan = () => {
    setStep('selection');
  };

  const handleBack = () => {
    setStep('initial');
  };

  return (
    <div>
      <main className="flex justify-center items-center h-[84vh]">
        {step === 'initial' && <TrainingPlan onGeneratePlan={handleGeneratePlan} />}
        {step === 'selection' && <PlanEntrenamientoDia onBack={handleBack} />}
      </main>
      
    </div>
  );
}

export default Planes;
