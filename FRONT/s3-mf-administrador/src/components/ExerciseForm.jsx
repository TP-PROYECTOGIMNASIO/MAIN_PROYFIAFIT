import React, { useState } from 'react';

const ExerciseForm = ({ onSubmit, fetchExercises, closeModal }) => {
  const apiUrl30 = import.meta.env.VITE_APP_API_URL_30;

  
  const [exercise, setExercise] = useState({
    name: '',
    description: '',
    image: null,
    type: 'CUADRICEPS',
  });

  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setExercise({
      ...exercise,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!exercise.name || !exercise.description || !exercise.image) {
      setErrorMessage('Por favor, complete todos los campos.');
      return;
    }
    setShowModal(true);
  };

  const confirmSubmit = async () => {
    setShowModal(false);

    const formData = new FormData();
    formData.append('exercise_type_id', mapExerciseType(exercise.type));
    formData.append('name', exercise.name);
    formData.append('description', exercise.description);
    formData.append('image', exercise.image);

    try {
      const response = await fetch( apiUrl30,
        {
          method: 'POST',
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok && result.statusCode === 201) {
        console.log('El ejercicio se registró correctamente.');
        setErrorMessage(''); // Limpiar errores si el registro fue exitoso
        fetchExercises(); // Actualizar la lista
        closeModal(); // Cerrar el formulario
      } else if (response.ok && result.exercise) {
        console.log('El ejercicio se registró, pero con una respuesta diferente.');
        setErrorMessage('');
        fetchExercises(); // Actualizar la lista
        closeModal(); // Cerrar el formulario
      } else {
        setErrorMessage('Ocurrió un error al registrar el ejercicio.');
      }
    } catch (error) {
      setErrorMessage('Ocurrió un error al intentar registrar el ejercicio.');
    }
  };

  const mapExerciseType = (type) => {
    const types = {
      CUADRICEPS: 1,
      GLÚTEOS: 2,
      ESPALDA: 3,
      PECTORALES: 4,
      HOMBROS: 5,
      TRICEPS: 6,
      BICEPS: 7,
    };
    return types[type] || 1;
  };

  const muscleGroups = [
    'CUADRICEPS',
    'GLÚTEOS',
    'ESPALDA',
    'PECTORALES',
    'HOMBROS',
    'TRICEPS',
    'BICEPS',
  ];

  return (
    <div className="flex max-w-3xl mx-auto p-4 bg-white rounded shadow-md">
      {/* Menú lateral */}
      <div className="w-1/3 bg-[#b23a2c] text-white p-4 rounded-l">
        <h3 className="text-lg font-bold mb-4">Seleccionar</h3>
        <ul className="space-y-2">
          {muscleGroups.map((group) => (
            <li key={group}>
              <button
                onClick={() => setExercise({ ...exercise, type: group })}
                className={`w-full text-left py-2 px-4 rounded ${
                  exercise.type === group ? 'bg-white text-[#b23a2c]' : ''
                }`}
              >
                {group.charAt(0) + group.slice(1).toLowerCase()}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Formulario */}
      <div className="w-2/3 p-6">
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#6e211e' }}>
          Registrar Ejercicio
        </h2>

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>} {/* Mostrar error si lo hay */}

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

          <div className="text-center">
            <button
              type="submit"
              className="bg-[#b23a2c] text-white py-2 px-6 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>

      {/* Modal de confirmación */}
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

// Componente modal simple
const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md text-center">
        <p className="mb-4">{message}</p>
        <button
          onClick={onConfirm}
          className="bg-green-500 text-white py-2 px-4 rounded mr-2"
        >
          Confirmar
        </button>
        {onCancel && (
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
};

export default ExerciseForm;
