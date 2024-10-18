import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ExerciseSidebar from "../../components/ExerciseSidebar";
import ExerciseList from "../../components/ExerciseList";

export default function tipoEjercicios() {
  const [selectedType, setSelectedType] = useState(1);

  return (
    <div className="flex">
      <div className="flex-1 p-4">
            <button
              onClick={() => window.history.back()}
              className="text-gray-500 hover:text-gray-700 flex items-center">
              <i className="fas fa-arrow-left mr-2"></i> Regresar
            </button>
            <br></br>
        <h1 className="text-xl font-bold mb-4">SELECCIONAR</h1>

        <ExerciseList selectedType={selectedType} />
      </div>
    </div>
  );
}
