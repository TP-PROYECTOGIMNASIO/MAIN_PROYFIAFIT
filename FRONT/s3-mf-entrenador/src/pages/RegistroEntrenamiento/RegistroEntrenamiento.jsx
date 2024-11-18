import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistroEntrenamiento = () => {
  const [ejercicios, setEjercicios] = useState([]);
  const [NdiaSeleccionado, setDiaSeleccionado] = useState('');
  const [diaSeleccionado, setDiaSeleccionadoState] = useState('');
  const [grupoSeleccionadoNombre, setGrupoSeleccionadoNombre] = useState('');
  const [studentName, setStudentName] = useState('');
  const [clientId, setClientId] = useState('');
  const [trainingPlanId, setTrainingPlanId] = useState(null);
  const navigate = useNavigate();
  const apiUrl28 = import.meta.env.VITE_APP_API_URL_28;
  const params = new URLSearchParams(window.location.search);
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");

  useEffect(() => {
    // Cargar los datos de localStorage
    try {
      const diaGuardado = localStorage.getItem('NdiaSeleccionado');
      setDiaSeleccionado(diaGuardado);

      const diaSeleccionado = localStorage.getItem('diaSeleccionado');
      setDiaSeleccionadoState(diaSeleccionado);

      const storedEjercicios = localStorage.getItem('ejercicios');
      if (storedEjercicios) {
        setEjercicios(JSON.parse(storedEjercicios));
      }

      const storedGrupoMuscular = localStorage.getItem('gruposMusculares');
      if (storedGrupoMuscular) {
        setGrupoSeleccionadoNombre(storedGrupoMuscular);
      }

      const storedStudentName = localStorage.getItem('selectedStudentName');
      if (storedStudentName) {
        setStudentName(storedStudentName);
      }

      const storedClientId = localStorage.getItem('selectedClientId');
      if (storedClientId) {
        setClientId(parseInt(storedClientId, 10)); // Parse as integer
      }

      const storedTrainingPlanId = localStorage.getItem('trainingPlanId');
      setTrainingPlanId(storedTrainingPlanId ? parseInt(storedTrainingPlanId, 10) : null);
    } catch (error) {
      console.error('Error parsing JSON data from localStorage:', error);
    }
  }, []);

  const focus = grupoSeleccionadoNombre || 'Sin grupo muscular';

  const handleSave = async () => {
    // Validar si el ID del cliente es correcto
    const clientIdInt = parseInt(clientId, 10);
    if (isNaN(clientIdInt)) {
      alert('El ID del cliente no es válido.');
      return;
    }

    // Obtener los días previamente guardados en localStorage
    let diasGuardados = JSON.parse(localStorage.getItem('diasGuardados')) || []; // Definir o inicializar si no existe

    // Verificar si el día ya ha sido registrado
    if (diasGuardados.includes(NdiaSeleccionado)) {
      alert('Este día ya ha sido registrado.');
      return; // No continuar con el registro si el día ya está guardado
    }

    // Crear el payload con los datos
    const payload = {
      client_id: clientIdInt,
      name: "Plan de Entrenamiento 6",
      description: "Descripcion de la membresia",
      day: NdiaSeleccionado,
      focus: focus,
      exercises: ejercicios.map((ejercicio) => ({
        exercise_id: ejercicio.exercise_id,
        sets: ejercicio.series,
        reps: ejercicio.repeticiones,
      })),
      ...(trainingPlanId && { training_plan_id: trainingPlanId }),
    };

    // Imprimir el payload para verificar qué datos se están enviando
    console.log('Payload a enviar:', payload);

    try {
      const response = await fetch(`${apiUrl28}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    
      if (response.ok) {
        const result = await response.json();
        console.log('Plan de entrenamiento guardado con éxito:', result);
    
        // Agregar el día a la lista de días registrados en localStorage
        diasGuardados.push(NdiaSeleccionado);
        localStorage.setItem('diasGuardados', JSON.stringify(diasGuardados)); // Guardar los días actualizados en localStorage
    
        // Redirigir y mostrar mensaje
        alert('Plan de entrenamiento guardado con éxito!');
        navigate(`/PlanEntrenamientoDia?role=${role}&token=${token}&username=${username}`);
      } else {
        // Obtener detalles del error
        const errorDetails = await response.json();
        console.log('Detalles del error:', errorDetails);
    
        // Verificar si el error es debido a un conflicto
        if (response.status === 409 || (errorDetails.message && errorDetails.message.includes('plan already exists'))) {
          alert(`Ya existe un plan para el día ${NdiaSeleccionado} en este plan de entrenamiento.`);
        } else {
          alert('hola. Verifica la consola para más detalles.');
        }
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la solicitud al servidor.');
    }
  };
    

  const handleRegresar = () => {
    navigate(-1);
  };

  const eliminarEjercicio = (index) => {
    const nuevosEjercicios = ejercicios.filter((_, i) => i !== index);
    setEjercicios(nuevosEjercicios);
    localStorage.setItem('ejercicios', JSON.stringify(nuevosEjercicios));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center relative">
      <div className="w-full flex justify-between items-center p-4">
        <button
          onClick={handleRegresar}
          className="text-gray-700 text-lg flex gap-2 items-center"
        >
          <span>&lt;</span> Regresar
        </button>

        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700"
          onClick={handleSave}
        >
          GUARDAR
        </button>
      </div>

      <h1 className="text-red-600 text-xl font-bold mt-8">Registro de Entrenamiento</h1>

      <h2 className="text-gray-700 text-lg mb-4">{studentName || 'Nombre del Alumno'}</h2>

      <h3 className="text-red-600 text-lg font-semibold">{diaSeleccionado}</h3>

      <div className="w-full max-w-4xl bg-gray-400 shadow-md rounded-lg p-4 mt-4">
        <table className="w-full text-center text-white">
          <thead>
            <tr>
              <th className="p-2 text-gray-600">{focus}</th>
              <th className="p-2 text-gray-600">Ejercicio</th>
              <th className="p-2 text-gray-600">Repeticiones</th>
              <th className="p-2 text-gray-600">Series</th>
              <th className="p-2 text-gray-600">Acción</th>
            </tr>
          </thead>
          <tbody>
            {ejercicios.map((item, index) => (
              <tr key={index}>
                <td className="p-2 flex justify-center items-center">
                  <video
                    src={item.image_url}
                    alt="Ejercicio"
                    className="w-auto h-auto max-w-full max-h-16 object-cover"
                  />
                </td>
                <td className="p-2">
                  <div className="bg-white h-16 flex justify-center items-center p-2 rounded-lg">
                    <span className="text-gray-800">{item.name}</span>
                  </div>
                </td>
                <td className="p-2">
                  <div className="bg-white h-16 flex justify-center items-center p-2 rounded-lg">
                    <span className="text-gray-800">{item.repeticiones}</span>
                  </div>
                </td>
                <td className="p-2">
                  <div className="bg-white h-16 flex justify-center items-center p-2 rounded-lg">
                    <span className="text-gray-800">{item.series}</span>
                  </div>
                </td>
                <td className="p-2">
                  <div className="bg-white h-16 flex justify-center items-center p-2 rounded-lg">
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => eliminarEjercicio(index)}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegistroEntrenamiento;
