import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistroEjerciciosTratamiento() {
  const [selectedOption, setSelectedOption] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [exerciseTypes, setExerciseTypes] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Para navegar entre rutas

  const apiUrl = 'https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/empleados/HU-TP-40';

  // Método GET para obtener los tipos de ejercicios
  useEffect(() => {
    const fetchExerciseTypes = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ method: 'readtype' }), // Envío del método en el cuerpo de la solicitud
        });
        const data = await response.json();

        // Verifica si la respuesta es correcta
        if (response.ok && data.statusCode === 200) {
          setExerciseTypes(data.body.exercises); // Almacena los tipos de ejercicios
        } else {
          throw new Error(data.body.message || 'Error al obtener los tipos de ejercicios');
        }
      } catch (error) {
        console.error('Error al obtener los tipos de ejercicios:', error);
        setError('Error al obtener tipos de ejercicios');
      }
    };

    fetchExerciseTypes();
  }, []);

  // Manejar el envío del formulario (POST)
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedOption || !nombre || !descripcion) {
      setError('Por favor, complete todos los campos');
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'create',
          treatment_exercise_type_id: selectedOption,
          name: nombre,
          description: descripcion,
        }),
      });

      const data = await response.json();

      if (response.ok && data.statusCode === 200) {
        alert('Ejercicio registrado con éxito');
        setNombre('');
        setDescripcion('');
        setSelectedOption('');
        navigate('/'); // Redirige a la página de inicio
      } else {
        throw new Error(data.body.message);
      }
    } catch (error) {
      console.error('Error al registrar el ejercicio:', error);
      setError('Error al registrar el ejercicio');
    }
  };

  // Maneja los cambios en el ComboBox
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Botón de regresar */}
      <div className="w-full max-w-4xl mb-6">
        <button
          className="text-gray-500 hover:text-gray-700 font-semibold flex items-center"
          onClick={() => navigate('/')}
        >
          <span className="mr-2">&lt;</span> Regresar
        </button>
      </div>

      {/* Contenedor principal */}
      <div className="bg-white shadow-md rounded-lg w-full max-w-4xl p-8 flex flex-col lg:flex-row justify-between items-center">
        {/* Combo box de selección */}
        <div className="mb-6 lg:mb-0 flex flex-col items-center">
          <select
            value={selectedOption}
            onChange={handleSelectChange}
            className="block w-64 bg-red-700 text-white p-3 rounded-lg text-center font-bold"
          >
            <option value="" disabled>
              SELECCIONAR
            </option>
            {exerciseTypes.length > 0 ? (
              exerciseTypes.map((exercise) => (
                <option key={exercise.treatment_exercise_type_id} value={exercise.treatment_exercise_type_id}>
                  {exercise.name}
                </option>
              ))
            ) : (
              <option disabled>No hay tipos de ejercicios disponibles</option>
            )}
          </select>
        </div>

        {/* Formulario de registro */}
        <div className="flex-1 lg:ml-12 w-full">
          <h1 className="text-2xl font-bold text-center text-red-700 mb-6">
            REGISTRO DE EJERCICIOS DE TRATAMIENTO
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && <p className="text-red-600">{error}</p>}
            {/* Campo de nombre */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="nombre">
                NOMBRE:
              </label>
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingrese el nombre"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-gray-200"
              />
            </div>

            {/* Campo de descripción */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="descripcion">
                DESCRIPCIÓN:
              </label>
              <input
                id="descripcion"
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Ingrese la descripción"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-gray-200"
              />
            </div>

            {/* Botón de guardar */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-red-700 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-800"
              >
                GUARDAR
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistroEjerciciosTratamiento;
