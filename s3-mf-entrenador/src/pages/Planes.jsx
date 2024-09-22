import React, { useState } from 'react';
import TrainingPlan from "./PlanEntrenamientoDia/TrainingPlan";  // Asegúrate de que los nombres de archivo coincidan con el sistema operativo (TrainingPlan.jsx)

import "../styles/index.css";  

import PlanEntrenamientoDia from '../pages/PlanEntrenamientoDia/PlanEntrenamientoDia';

function Planes() {
  const [step, setStep] = useState('initial');

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
