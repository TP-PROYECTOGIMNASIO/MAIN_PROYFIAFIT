import { useState, useEffect } from "react";
import ExerciseForm from "./ExerciseForm";
import ExerciseSidebar from "./ExerciseSidebar";

function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("todos");

  useEffect(() => {
    fetchExercises();
  }, [selectedFilters, filterStatus]);

  const fetchExercises = async () => {
    try {
      const filterQuery = selectedFilters.length
        ? selectedFilters.map(id => `exercise_type_id=${id}`).join("&")
        : "";

      const statusQuery = filterStatus === "habilitados" ? "enabled=true" : "";

      const response = await fetch(
        `https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/plan-de-entrenamiento/hu-tp-30?${filterQuery}${statusQuery ? '&' + statusQuery : ''}`
      );
      const data = await response.json();
      console.log("Fetched exercises:", data);
      setExercises(data.exercises || []);
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

  const deleteExercise = async (id) => {
    try {
      const response = await fetch(
        `https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/plan-de-entrenamiento/hu-tp-30?exercise_id=${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log("Exercise deleted:", data);
      fetchExercises();
    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  };

  return (
    <div className="container mx-auto flex">
      <ExerciseSidebar onSelectType={handleFilterClick} />

      <div className="flex-1 ml-4">
        {/* Contenedor para el título centrado */}
        <h1 className="text-[#aa1f1d] text-3xl font-bold text-center mb-4">EJERCICIOS REGISTRADOS</h1>

        {/* Contenedor para el botón y el ComboBox alineados a la derecha */}
        <div className="flex justify-end items-center mb-4 space-x-2">
          {/* Botón de registrar */}
          <button  className="bg-[#aa1f1d] text-white px-4 py-2 rounded">
            + Registrar nuevo ejercicio
          </button>

          {/* ComboBox de estado con mismo estilo que el botón */}
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

        {/* Modal para el Formulario */}
        {isModalOpen && (
          <Modal onClose={toggleModal}>
            <ExerciseForm fetchExercises={fetchExercises} />
          </Modal>
        )}

        {/* Lista de ejercicios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
              <img src={exercise.image_url} alt={exercise.name} className="w-full h-36 object-cover rounded-md mb-4" />
              <div>
                <h3 className="text-xl font-bold mb-2">{exercise.name}</h3>
                <p className="text-gray-700 mb-4">{exercise.description}</p>
              </div>
              <button onClick={() => deleteExercise(exercise.id)} className="mt-auto bg-red-500 text-white px-4 py-2 rounded">
                Deshabilitar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExerciseList;

