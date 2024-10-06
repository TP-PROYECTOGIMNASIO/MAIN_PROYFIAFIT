import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistroEntrenamiento = () => {
  const [ejercicios, setEjercicios] = useState([]);
  const [NdiaSeleccionado, setDiaSeleccionado] = useState('');
  const [diaSeleccionado, setDiaSeleccionadoState] = useState('');
  const [grupoSeleccionadoNombre, setGrupoSeleccionadoNombre] = useState(''); // Cambia el estado para el nombre del grupo muscular
  const [studentName, setStudentName] = useState(''); // Estado para el nombre del alumno
  const navigate = useNavigate();
  
  useEffect(() => {
    try {
        const diaGuardado = localStorage.getItem('NdiaSeleccionado');
        setDiaSeleccionado(diaGuardado);

        const diaSeleccionado = localStorage.getItem('diaSeleccionado');
        setDiaSeleccionadoState(diaSeleccionado);

        const storedEjercicios = localStorage.getItem('ejercicios');
        if (storedEjercicios) {
            setEjercicios(JSON.parse(storedEjercicios));  
        }
        
        // Recuperar el grupo muscular
        const storedGrupoMuscular = localStorage.getItem('gruposMusculares');
        if (storedGrupoMuscular) {
            setGrupoSeleccionadoNombre(storedGrupoMuscular); // Aquí se establece como cadena
        }

        // Recuperar el nombre del alumno
        const storedStudentName = localStorage.getItem('selectedStudentName'); // Recuperar el nombre del alumno
        if (storedStudentName) {
            setStudentName(storedStudentName); // Asignar el nombre del alumno
        }
    } catch (error) {
        console.error('Error parsing JSON data from localStorage:', error);
    }
  }, []);

  const trainingPlanId = 11; // ID del plan de entrenamiento
  const focus = grupoSeleccionadoNombre || 'Sin grupo muscular'; // Manejo de grupo muscular

  const handleSave = async () => {
    const payload = {
      training_plan_id: trainingPlanId,
      day: parseInt(NdiaSeleccionado, 10), 
      focus: focus,
      exercises: ejercicios.map(ejercicio => ({
        exercise_id: ejercicio.exercise_id,          
        sets: ejercicio.series,             
        reps: ejercicio.repeticiones        
      }))
    };
    
    console.log('Ejercicios:', payload);
    
    try {
      const response = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/plan-de-entrenamiento/hu-tp-28', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Plan de entrenamiento guardado con éxito:', result);
        alert('Plan de entrenamiento guardado con éxito!');
        localStorage.setItem('diaSeleccionado', NdiaSeleccionado);
        navigate('/');
      } else {
        console.error('Error al guardar el plan de entrenamiento:', response.statusText);
        alert('Error al guardar el plan de entrenamiento.');
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
      
      <h2 className="text-gray-700 text-lg mb-4">{studentName || 'Nombre del Alumno'}</h2> {/* Mostrar el nombre del alumno */}

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
                  <img
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
