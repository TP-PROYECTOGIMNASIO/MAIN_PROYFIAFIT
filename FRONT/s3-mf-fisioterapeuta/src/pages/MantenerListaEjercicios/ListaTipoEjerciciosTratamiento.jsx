
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate


function ListaTipoEjerciciosTratamiento() {
  const [exerciseTypes, setExerciseTypes] = useState([]); // Estado para almacenar los tipos de ejercicios
  const [loading, setLoading] = useState(true); // Estado para saber si los datos están cargando
  const [error, setError] = useState(null); // Estado para manejar errores
  const [filter, setFilter] = useState('Todos'); // Cambié "Activos" por "Todos" aquí
  const [modalOpen, setModalOpen] = useState(false); // Estado para abrir/cerrar el modal
  const [exerciseToToggle, setExerciseToToggle] = useState(null); // El ejercicio que queremos habilitar/deshabilitar

  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en Lista Tipo de Ejercicios de Tratamiento:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Lista Tipo de Ejercicios de Tratamiento:", role);
  console.log("token recibido en Lista Tipo de Ejercicios de Tratamiento:", token);
  console.log("username recibido en Lista Tipo de Ejercicios de Tratamiento:", username);

  // Usamos useEffect para hacer la solicitud a la API al cargar el componente
  useEffect(() => {
    const fetchExerciseTypes = async () => {
      try {
        const response = await fetch(
          'https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/plan-de-tratamiento/HU-TP-40'
        );
        
        if (!response.ok) {
          throw new Error('Hubo un problema al obtener los datos');
        }

        const data = await response.json(); // Convertimos la respuesta en formato JSON
        setExerciseTypes(data.exerciseTypes); // Guardamos los tipos de ejercicios en el estado
        setLoading(false); // Indicamos que los datos han terminado de cargar
      } catch (error) {
        setError('Hubo un problema al obtener los datos.'); // Manejo de errores
        setLoading(false); // Terminamos la carga
      }
    };

    fetchExerciseTypes(); // Llamamos a la función para obtener los datos
  }, []);

  // Si estamos cargando, mostramos un indicador de carga
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si hubo un error, mostramos un mensaje de error
  if (error) {
    return <div>{error}</div>;
  }

   // Filtrar los ejercicios según el estado de "Activos", "Inactivos" o "Todos"
   const filteredExercises = exerciseTypes.filter((exercise) => {
    if (filter === 'Todos') {
      return true; // Si el filtro es "Todos", mostramos todos los ejercicios
    }
    const isActive = exercise.treatment_exercise_type_id % 2 !== 0; // Los ejercicios con id impar son activos
    return filter === 'Activos' ? isActive : !isActive; // Filtramos según el estado
  });

  // Función para abrir el modal y establecer el ejercicio que se va a habilitar/deshabilitar
  const handleToggle = (exercise) => {
    setExerciseToToggle(exercise);
    setModalOpen(true); // Abrir el modal
  };

  // Función para confirmar la acción de habilitar o deshabilitar
  const handleConfirmToggle = () => {
    // Aquí puedes hacer la llamada a la API para actualizar el estado del ejercicio
    // Por ejemplo, cambiar el estado activo/inactivo en la base de datos

    const updatedExercises = exerciseTypes.map((exercise) =>
      exercise.treatment_exercise_type_id === exerciseToToggle.treatment_exercise_type_id
        ? {
            ...exercise,
            active: !exerciseToToggle.active, // Cambiar el estado de activo/inactivo
          }
        : exercise
    );
    setExerciseTypes(updatedExercises); // Actualizamos el estado con los ejercicios modificados

    setModalOpen(false); // Cerrar el modal
    alert('La acción fue exitosa'); // Mensaje de éxito
  };

  // Función para cancelar la acción
  const handleCancelToggle = () => {
    setModalOpen(false); // Solo cerramos el modal sin hacer cambios
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <br></br>
      <header className="bg-white shadow w-full max-w-5xl">
        <div className="flex justify-between items-center py-4 px-6">
        <button
  className="flex items-center text-gray-700 font-medium"
  onClick={() => window.history.back()}
>
  <span className="mr-2">&lt;</span> Regresar
</button>

          <h1 className="text-2xl font-bold text-red-700 text-center w-full ml-[-50px]">
            LISTA DE TIPOS DE EJERCICIOS DE TRATAMIENTO
          </h1>
        </div>

        <div className="flex justify-between items-center px-6 py-4 bg-white">
        <select
            className="bg-red-700 text-white p-2 rounded-lg"
            value={filter} // El valor del select debe estar atado al estado `filter`
            onChange={(e) => setFilter(e.target.value)} // Cambia el estado cuando seleccionas una opción
          >
            <option>Todos</option>
            <option>Activos</option>
            <option>Inactivos</option>
          </select>

          <Link
            to={`/RegistroTipoEjerciciosTratamiento?role=${role}&token=${token}&username=${username}`}
            className="bg-red-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center"
          >
            <span className="mr-2 text-xl">+</span> Registrar Nuevo Tipo
          </Link>
        </div>
      </header>

      <div className="overflow-x-auto mt-6 w-full max-w-5xl">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-3 px-6 font-semibold text-gray-700">TIPO</th>
              <th className="text-left py-3 px-6 font-semibold text-gray-700">Descripción</th>
              <th className="text-left py-3 px-6 font-semibold text-gray-700">ACCIÓN</th>
            </tr>
          </thead>
          <tbody>
            {/* Mapeamos los tipos de ejercicios desde la respuesta de la API */}
            {filteredExercises.map((exercise) => (
              <tr key={exercise.treatment_exercise_type_id} className="border-t">
                <td className="py-3 px-6 text-gray-700">{exercise.name}</td>
                <td className="py-3 px-6 text-gray-500">{exercise.description}</td>
                <td className="py-3 px-6">
                  <button
                    className="bg-red-700 text-white py-2 px-4 rounded-lg"
                    onClick={() => handleToggle(exercise)}
                  >
                    {exercise.treatment_exercise_type_id % 2 !== 0 ? 'Deshabilitar' : 'Habilitar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
      </div>
         {/* Modal de confirmación */}
         {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">
              ¿Está seguro que desea {exerciseToToggle && (exerciseToToggle.treatment_exercise_type_id % 2 !== 0 ? 'deshabilitar' : 'habilitar')} este tipo de ejercicio?
            </h3>
            <div className="flex justify-center space-x-4">
            <button
              className="bg-red-700 text-white py-2 px-4 rounded-lg"
              onClick={handleConfirmToggle}
            >
              Sí
              </button>
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg"
                onClick={handleCancelToggle}
              >
                No
              </button>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListaTipoEjerciciosTratamiento;
