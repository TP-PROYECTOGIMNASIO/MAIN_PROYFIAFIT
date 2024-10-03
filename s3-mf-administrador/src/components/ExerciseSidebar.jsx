import React from "react";

const ExerciseSidebar = ({ onSelectType }) => {
  const types = [
    { id: 1, name: "CUÁDRICEPS" },
    { id: 2, name: "GLÚTEOS" },
    { id: 3, name: "ESPALDA" },
    { id: 4, name: "PECTORALES" },
    { id: 5, name: "HOMBROS" },
    { id: 6, name: "TRÍCEPS" },
    { id: 7, name: "BÍCEPS" },
  ];

  return (
    <nav className="w-1/4 bg-gray-100 p-4">
      <h2 className="font-semibold text-gray-600 mb-4">Seleccionar Tipo</h2>
      <div className="space-y-4">
        {types.map((type) => (
          <div key={type.id} className="flex items-center">
            <input
              type="checkbox"
              id={`filter-${type.id}`}
              className="mr-2"
              onClick={() => onSelectType(type.id)}
            />
            <label htmlFor={`filter-${type.id}`} className="text-gray-600">
              {type.name}
            </label>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default ExerciseSidebar;
