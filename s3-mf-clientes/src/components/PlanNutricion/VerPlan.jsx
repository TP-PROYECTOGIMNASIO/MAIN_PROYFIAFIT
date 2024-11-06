import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
 
const VerPlan = () => {

  const { planId } = useParams();

  const [dias, setDias] = useState([]);
  const apiUrl11 = import.meta.env.VITE_APP_API_URL_11;

  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en Ver Plan:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Ver Plan clientes:", role);
  console.log("token recibido en Ver Plan clientes:", token);
  console.log("username recibido en Ver Plan clientes:", username);

  useEffect(() => {

    const fetchDias = async () => {

      try {

        const response = await fetch(`${apiUrl11}?planId=${planId}`);

        if (!response.ok) {

          throw new Error('Error al obtener los días del plan');

        }

        const data = await response.json();

        setDias(data);

      } catch (error) {

        console.error(error);

      }

    };
 
    fetchDias();

  }, [planId]);
 
  // Función para retroceder a la página anterior

  const handleBack = () => {

    window.history.back();

  };
 
  return (
<div className="min-h-screen bg-gray-100 py-10 flex flex-col items-center">

      {/* Contenedor para el título y el botón */}
<div className="flex items-center mb-8">

        {/* Botón de retroceso */}
<button 

          className="mr-6 px-4 py-2 text-red-600 hover:underline transition duration-300 font-bold" 

          onClick={handleBack}
>

          ←Retroceder
</button>
<h1 className="text-4xl font-extrabold text-red-800">Plan de Entrenamiento {planId}</h1>
</div>
 
      {dias.length > 0 ? (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">

          {dias.map((dia) => (
<button

              key={dia.day}

              className="bg-gradient-to-r from-gray-700 to-gray-500 text-white text-lg font-semibold px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1"

              onClick={() => window.location.href = `/ver-ejercicios/${dia.day}?role=${role}&token=${token}&username=${username}`}
>

              Día {dia.day}
</button>

          ))}
</div>

      ) : (
<p className="text-gray-700 text-lg">No se encontraron días en el plan</p>

      )}
</div>

  );

};
 
export default VerPlan;

 