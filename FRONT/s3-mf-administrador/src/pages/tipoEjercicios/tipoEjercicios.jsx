import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ExerciseSidebar from "../../components/ExerciseSidebar";
import ExerciseList from "../../components/ExerciseList";

export default function tipoEjercicios() {
  const [selectedType, setSelectedType] = useState(1);

  return (
    <div className="flex">
      <div className="flex-1 p-4">
      <Link to="/" className="bg-[#aa1f1d] text-white py-2 px-4 rounded mb-4 inline-block">
          Regresar
        </Link>
        <h1 className="text-xl font-bold mb-4">SELECCIONAR</h1>

        <ExerciseList selectedType={selectedType} />
      </div>
    </div>
  );
}
