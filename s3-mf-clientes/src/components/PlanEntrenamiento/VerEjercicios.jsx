import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const VerEjercicios = () => {
  const { diaId } = useParams();
  const [ejercicios, setEjercicios] = useState([]);
  const apiUrl11 = import.meta.env.VITE_APP_API_URL_11;

  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en Ver Ejercicios:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Ver Ejercicios clientes:", role);
  console.log("token recibido en Ver Ejercicios clientes:", token);
  console.log("username recibido en Ver Ejercicios clientes:", username);

  useEffect(() => {
    const fetchEjercicios = async () => {
      try {
        const response = await fetch(`${apiUrl11}?diaId=${diaId}`);
        if (!response.ok) {
          throw new Error('Error al obtener los ejercicios');
        }
        const data = await response.json();
        setEjercicios(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEjercicios();
  }, [diaId]);

  // Función para retroceder a la página anterior
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex flex-col items-center">
      {/* Contenedor para el título y el botón */}
      <div className="flex items-center mb-6">
        {/* Botón de retroceso con margen derecho aumentado */}
        <button 
          className="mr-6 px-4 py-2 text-red-600 hover:underline transition duration-300 font-bold" 
          onClick={handleBack}
        >
          ←Retroceder
        </button>
        
        <h1 className="text-3xl font-bold text-red-800">Ejercicios del Día {diaId}</h1>
      </div>

      {ejercicios.length > 0 ? (
        <div className="w-full max-w-lg space-y-6">
          {ejercicios.map((ejercicio) => (
            <div key={ejercicio.day_exercise_id} className="bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">{ejercicio.exercise_name}</h2>
              <p className="text-gray-600 mb-1"><span className="font-medium">Series:</span> {ejercicio.sets}</p>
              <p className="text-gray-600"><span className="font-medium">Repeticiones:</span> {ejercicio.reps}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 text-lg">No se encontraron ejercicios para este día</p>
      )}
    </div>
  );
};

export default VerEjercicios;