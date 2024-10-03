import React, { useState } from 'react';

const ExerciseForm = ({ onSubmit }) => {
  const [exercise, setExercise] = useState({
    name: '',
    description: '',
    image: null,
    type: '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setExercise({
      ...exercise,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true); // Mostrar modal de confirmación
  };

  const confirmSubmit = () => {
    onSubmit(exercise); // Llamar a la función pasada por props
    setShowModal(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Registrar Ejercicio</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre:</label>
          <input
            type="text"
            name="name"
            value={exercise.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Descripción:</label>
          <input
            type="text"
            name="description"
            value={exercise.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Subir Imagen:</label>
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded">
          Guardar
        </button>
      </form>

      {showModal && (
        <ConfirmationModal
          message="¿Desea registrar este ejercicio?"
          onConfirm={confirmSubmit}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ExerciseForm;
