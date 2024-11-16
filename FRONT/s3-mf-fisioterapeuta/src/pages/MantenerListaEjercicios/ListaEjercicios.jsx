import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate

const ListaEjercicios = () => {
  const [filtroTipo, setFiltroTipo] = useState("Todas");
  const [mostrarActivos, setMostrarActivos] = useState(true);
  const [ejercicios, setEjercicios] = useState([]);
  const [tiposEjercicio, setTiposEjercicio] = useState([]); // Estado para almacenar los tipos de ejercicios
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Define el hook useNavigate

  const params = new URLSearchParams(window.location.search);
  console.log(
    "Todos los parámetros en Lista de Ejercicios:",
    window.location.search
  ); // Verificar que todos los parámetros están presentes

  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Lista de Ejercicios:", role);
  console.log("token recibido en Lista de Ejercicios:", token);
  console.log("username recibido en Lista de Ejercicios:", username);

  useEffect(() => {
    const fetchTiposEjercicio = async () => {
      try {
        const response = await fetch(
          "https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/plan-de-tratamiento/HU-TP-40"
        );
        const data = await response.json();
        setTiposEjercicio(data.exerciseTypes || []);
      } catch (error) {
        console.error("Error al cargar los tipos de ejercicio:", error);
      }
    };
    fetchTiposEjercicio();
  }, []);

  useEffect(() => {
    const fetchEjercicios = async () => {
      try {
        const response = await fetch(
          "https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/empleados/HU-TP-40",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ method: "read" }),
          }
        );

        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }

        const data = await response.json();

        if (data.exercises) {
          setEjercicios(data.exercises);
        } else {
          throw new Error("No se encontraron ejercicios");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEjercicios();
  }, []);

  const obtenerNombreTipo = (typeId) => {
    const tipo = tiposEjercicio.find(
      (tipo) => tipo.treatment_exercise_type_id === typeId
    );
    return tipo ? tipo.name : "Sin tipo";
  };

  const filtrarEjercicios = () => {
    return ejercicios.filter(
      (ejercicio) =>
        (filtroTipo === 'Todas' || obtenerNombreTipo(ejercicio.treatment_exercise_type_id) === filtroTipo) &&
        (mostrarActivos === null || ejercicio.active === mostrarActivos) // muestra todos si mostrarActivos es null
    );
  };

  const ejerciciosFiltrados = filtrarEjercicios();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="p-4 bg-white shadow-md flex justify-between items-center">
      <button
  className="flex items-center text-gray-700 font-medium"
  onClick={() => window.history.back()}
>
  <span className="mr-2">&lt;</span> Regresar
</button>

        <h1 className="text-red-600 text-xl font-bold">
          LISTA DE EJERCICIOS DE TRATAMIENTO
        </h1>
        <div className="flex flex-col items-end space-y-2"></div>
      </header>

      <main className="flex-grow p-6">
        <div className="flex">
          {/* Filtros de selección */}
          <aside className="w-1/4">
            <h2 className="font-bold text-lg mb-4">SELECCIONAR</h2>
            <div className="space-y-2">
              <button
                className={`block w-full text-left px-4 py-2 rounded-md font-medium ${
                  filtroTipo === "Todas"
                    ? "bg-red-600 text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
                onClick={() => setFiltroTipo("Todas")}
              >
                Todas
              </button>
              {tiposEjercicio.map((tipo) => (
                <button
                  key={tipo.treatment_exercise_type_id}
                  className={`block w-full text-left px-4 py-2 rounded-md font-medium ${
                    filtroTipo === tipo.name
                      ? "bg-red-600 text-white"
                      : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                  }`}
                  onClick={() => setFiltroTipo(tipo.name)}
                >
                  {tipo.name}
                </button>
              ))}
            </div>
          </aside>

          {/* Lista de ejercicios */}
          <div className="w-3/4 ml-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <select
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "Todos") {
                      setMostrarActivos(null); // null representa "mostrar todos" los ejercicios
                    } else {
                      setMostrarActivos(value === "Activos");
                    }
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  <option value="Todos">Todos</option>
                  <option value="Activos">Activos</option>
                  <option value="Desactivados">Desactivados</option>
                </select>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <Link
                  to={`/RegistroEjerciciosTratamiento?role=${role}&token=${token}&username=${username}`}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  + Registrar Nuevo EJERCICIO
                </Link>
                <Link
                  to={`/tipos-ejercicio?role=${role}&token=${token}&username=${username}`}
                  className="text-red-600 flex items-center"
                >
                  <FaEye className="mr-2" />
                  Ver Tipos Ejercicio Tratamiento
                </Link>
              </div>
            </div>

            {/* Tabla de ejercicios */}
            <table className="min-w-full bg-white shadow-md rounded-md">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="py-2 px-4">TIPO</th>
                  <th className="py-2 px-4">Nombre</th>
                  <th className="py-2 px-4">Descripción</th>
                  <th className="py-2 px-4">ACCIÓN</th>
                </tr>
              </thead>
              <tbody>
                {/* Tabla de ejercicios */}
            {ejerciciosFiltrados.length === 0 ? (
              <>
              <br />
              <p className="text-center text-red-500">
                No hay ejercicios en estos momentos. Por favor, intenta más tarde.
              </p>
              <br />
            </>
            ) : (
                ejerciciosFiltrados.map((ejercicio) => (
                  <tr
                    key={ejercicio.treatment_exercise_id}
                    className="border-t"
                  >
                    <td className="py-2 px-4">
                    {obtenerNombreTipo(ejercicio.treatment_exercise_type_id)}
                    </td>
                    <td className="py-2 px-4">{ejercicio.name}</td>
                    <td className="py-2 px-4">{ejercicio.description}</td>
                    <td className="py-2 px-4">
                      {ejercicio.active ? "Activo" : "Inactivo"}
                    </td>
                  </tr>
                ))
              )}
              </tbody>
            </table>
            <br></br>
          </div>
        </div>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      </main>
    </div>
  );
};

export default ListaEjercicios;
