import React from "react";
const ExerciseSidebar = ({ onSelectType }) => {
  const types = [
    { id: 1, name: "Espalda" },
    { id: 2, name: "Brazos" },
    { id: 3, name: "Piernas" },
    { id: 4, name: "Pecho" },
    { id: 5, name: "Abdomen" },
    { id: 6, name: "Hombros" },
    { id: 7, name: "Glúteos" },
    { id: 8, name: "Cardio" },
    { id: 9, name: "Flexibilidad" },
    { id: 10, name: "Core" },
  ];

  return (
    <nav className="w-1/4 bg-gray-100 p-4">

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
