import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ExerciseSidebar from "../../components/ExerciseSidebar";
import ExerciseList from "../../components/ExerciseList";

export default function TipoEjercicios() {
  const [selectedType, setSelectedType] = useState(1);

  return (
    <div className="flex">
      <ExerciseSidebar onSelectType={setSelectedType} />
      <div className="flex-1 p-4">
        <h1 className="text-xl font-bold mb-4">TIPOS DE EJERCICIOS</h1>
        <Link to="/add-ejercicio" className="bg-red-500 text-white py-2 px-4 rounded mb-4 inline-block">
          + Registrar Nuevo Ejercicio
        </Link>
        <ExerciseList selectedType={selectedType} />
      </div>
    </div>
  );
}
