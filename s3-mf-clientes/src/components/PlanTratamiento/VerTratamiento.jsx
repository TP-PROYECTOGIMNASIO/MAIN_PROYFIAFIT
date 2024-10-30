import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerTratamiento = () => {
  const [tratamientos, setTratamientos] = useState([]); // Lista de tratamientos
  const navigate = useNavigate();
  const clientId = 1; // ID del cliente (puedes ajustar según el cliente autenticado)

  useEffect(() => {
    // Obtener todos los planes del cliente
    fetch(`https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/plan-de-tratamiento/HU-TP-90?clientId=${clientId}&view=all_previous_plans`)
      .then((res) => res.json())
      .then((data) => setTratamientos(data))
      .catch((err) => console.error(err));
  }, [clientId]);

  const handleVisualizarPlan = (treatmentId) => {
    navigate(`/ver-tratamiento/detalle-tratamiento`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      {/* Botón de Regresar */}
      <header className="w-full max-w-2xl p-4">
        <button
          className="text-gray-700 font-medium"
          onClick={() => window.history.back()}
        >
          &lt; Regresar
        </button>
      </header>

      <div className="w-full max-w-2xl bg-white p-6 mt-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-red-600 mb-4">
          PLANES DE TRATAMIENTO
        </h1>
        <p className="text-center text-gray-700">Nombre del Alumno</p>

        <div className="mt-6">
          {tratamientos.length === 0 ? (
            <p className="text-center text-gray-700">No hay planes de tratamiento disponibles.</p>
          ) : (
            tratamientos.map((tratamiento) => (
              <div key={tratamiento.treatment_plan_id} className="mt-4 bg-gray-200 p-4 rounded-md flex justify-between items-center">
                <p className="font-semibold">Plan: {new Date(tratamiento.created_at).toLocaleDateString()}</p>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  onClick={() => handleVisualizarPlan(tratamiento.treatment_plan_id)}
                >
                  Visualizar Tratamiento
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VerTratamiento;
