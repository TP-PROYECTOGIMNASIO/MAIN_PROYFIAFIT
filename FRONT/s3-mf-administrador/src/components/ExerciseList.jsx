import { useState, useEffect } from "react";
import ExerciseForm from "./ExerciseForm";
import ExerciseSidebar from "./ExerciseSidebar";
import Modal from "./Modal"; // Modal reutilizable

function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("todos");
  const [selectedExercise, setSelectedExercise] = useState(null); // Ejercicio seleccionado para habilitar/deshabilitar
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false); // Modal de confirmación

  useEffect(() => {
    fetchExercises();
  }, [selectedFilters, filterStatus]);

  const fetchExercises = async () => {
    try {
      const filterQuery = selectedFilters.length
        ? selectedFilters.map(id => `exercise_type_id=${id}`).join("&")
        : "";

      const statusQuery = filterStatus === "habilitados" 
        ? "active=true" 
        : filterStatus === "deshabilitados" 
        ? "active=false" 
        : "";

      const response = await fetch(
        `https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/plan-de-entrenamiento/hu-tp-30?${filterQuery}${statusQuery ? '&' + statusQuery : ''}`
      );

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const result = await response.json();
      const data = result.ejercicios || [];
      setExercises(data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  const handleFilterClick = (typeId) => {
    setSelectedFilters(prevFilters =>
      prevFilters.includes(typeId)
        ? prevFilters.filter(id => id !== typeId)
        : [...prevFilters, typeId]
    );
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Abrir modal de confirmación para habilitar/deshabilitar
  const confirmToggleExercise = (exercise) => {
    console.log('Ejercicio seleccionado para habilitar/deshabilitar:', exercise); // Log para ver el ejercicio
    setSelectedExercise(exercise);
    setConfirmationModalOpen(true); // Abre el modal de confirmación
  };

  // Habilitar o deshabilitar el ejercicio seleccionado
  const toggleExerciseStatus = async () => {
    if (!selectedExercise) return;

    const updatedStatus = !selectedExercise.active; // Cambiamos el estado actual
    const requestBody = {
      exercise_id: selectedExercise.id, // Asegurarse de que este campo esté correctamente mapeado
      active: updatedStatus // Valor booleano (true o false)
    };

    console.log("Enviando solicitud PUT con los siguientes datos:", requestBody); // Log para verificar los datos

    try {
      const response = await fetch(
        `https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/plan-de-entrenamiento/hu-tp-30`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody) // Convertimos el objeto a JSON
        }
      );

      const data = await response.json();
      console.log("Respuesta de la API:", data);

      if (response.ok) {
        console.log("Estado del ejercicio actualizado correctamente:", data);
        fetchExercises(); // Refrescar la lista
      } else {
        console.log("Error en la solicitud:", data); // Manejar el error devuelto por la API
      }

      setConfirmationModalOpen(false); // Cerrar el modal de confirmación
      setSelectedExercise(null); // Limpiar selección

    } catch (error) {
      console.error("Error updating exercise status:", error);
    }
  };

  return (
    <div className="container mx-auto flex">
      <ExerciseSidebar onSelectType={handleFilterClick} />

      <div className="flex-1 ml-4">
        <h1 className="text-[#aa1f1d] text-3xl font-bold text-center mb-4">EJERCICIOS REGISTRADOS</h1>

        <div className="flex justify-end items-center mb-4 space-x-2">
          <button onClick={toggleModal} className="bg-[#aa1f1d] text-white px-4 py-2 rounded">
            + Registrar nuevo ejercicio
          </button>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#aa1f1d] text-white px-4 py-2 rounded"
          >
            <option value="todos">Todos</option>
            <option value="habilitados">Habilitados</option>
            <option value="deshabilitados">Deshabilitados</option>
          </select>
        </div>

        {isModalOpen && (
          <Modal onClose={toggleModal}>
            <ExerciseForm fetchExercises={fetchExercises} closeModal={toggleModal} />
          </Modal>
        )}

        {/* Modal de confirmación */}
        {confirmationModalOpen && (
          <Modal onClose={() => setConfirmationModalOpen(false)}>
            <div className="p-6 text-center">
              <p>¿Está seguro de que desea {selectedExercise?.active ? 'deshabilitar' : 'habilitar'} este ejercicio?</p>
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  onClick={toggleExerciseStatus}
                  className="bg-[#ac3c34] text-white py-2 px-4 rounded"
                >
                  Confirmar
                </button>
                <button
                  onClick={() => setConfirmationModalOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </Modal>
        )}

        {/* Renderiza los ejercicios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {exercises.length > 0 ? (
            exercises.map((exercise) => (
              <div key={exercise.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
                <img src={exercise.image_url} alt={exercise.name} className="w-full h-36 object-cover rounded-md mb-4" />
                <div>
                  <h3 className="text-xl font-bold mb-2">{exercise.name}</h3>
                  <p className="text-gray-700 mb-4">{exercise.description}</p>
                </div>
                <button
                  onClick={() => confirmToggleExercise(exercise)} // Llama al modal de confirmación
                  className="mt-auto bg-[#ac3c34] text-white px-4 py-2 rounded"
                >
                  {exercise.active ? 'Deshabilitar' : 'Habilitar'} {/* Cambia el texto según el estado */}
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-700">No hay ejercicios disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExerciseList;
