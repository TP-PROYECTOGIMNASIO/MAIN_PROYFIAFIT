import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PlanTratamientoSinRegistrar = () => {
  const [planesTratamiento, setPlanesTratamiento] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [month, setMonth] = useState(''); // Estado para el filtro de mes
  const clientId = 1;

  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en Plan Tratamiento Sin Registrar:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Plan Tratamiento Sin Registrar:", role);
  console.log("token recibido en Plan Tratamiento Sin Registrar:", token);
  console.log("username recibido en Plan Tratamiento Sin Registrar:", username);

  useEffect(() => {
    const fetchPlanesTratamiento = async () => {
      setLoading(true);
      try {
        const url = month
          ? `https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/plan-de-tratamiento/HU-TP-39?client_id=${clientId}&month=${month}`
          : `https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/plan-de-tratamiento/HU-TP-39?client_id=${clientId}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Error en la respuesta de la API: ${response.status}`);
        }

        const data = await response.json();
        setPlanesTratamiento(data.treatmentPlans || []);
      } catch (error) {
        console.error("Error al obtener los planes de tratamiento:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanesTratamiento();
  }, [month]);

  const handleMonthChange = (e) => setMonth(e.target.value);
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPlan(null);
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'; // Desactiva el scroll en el fondo
    } else {
      document.body.style.overflow = 'auto'; // Restaura el scroll cuando el modal se cierra
    }
  }, [showModal]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="p-4">
        <button
          className="text-gray-700 font-medium"
          onClick={() => window.history.back()}
        >
          &lt; Regresar
        </button>
      </header>

      <main className="flex-grow flex justify-center items-center">
        <div className="bg-white p-10 rounded-lg shadow-lg text-center w-full max-w-lg space-y-4">
          <h1 className="text-red-700 font-semibold text-xl">PLAN DE TRATAMIENTO</h1>
          <h2 className="text-gray-500 font-medium">Nombre del Alumno</h2>

          <select
            value={month}
            onChange={handleMonthChange}
            className="w-full bg-gray-200 text-gray-600 py-2 px-4 rounded-lg mb-4"
          >
            <option value="">PLANES ANTERIORES</option>
            <option value="1">ENERO</option>
            <option value="2">FEBRERO</option>
            <option value="3">MARZO</option>
            <option value="4">ABRIL</option>
            <option value="5">MAYO</option>
            <option value="6">JUNIO</option>
            <option value="7">JULIO</option>
            <option value="8">AGOSTO</option>
            <option value="9">SEPTIEMBRE</option>
            <option value="10">OCTUBRE</option>
            <option value="11">NOVIEMBRE</option>
            <option value="12">DICIEMBRE</option>
          </select>

          {loading ? (
            <p className="text-gray-500 text-base mt-8">Cargando...</p>
          ) : planesTratamiento.length > 0 ? (
            planesTratamiento.map((plan) => (
              <div
                key={plan.treatment_plan_id}
                className="bg-gray-200 p-4 rounded-lg flex items-center justify-between mt-4"
              >
                <div className="flex-1 text-left">
                  <h2 className="text-gray-500 text-lg">Plan Tratamiento</h2>
                  <p className="text-gray-500 text-sm">{plan.session_date || 'Sin fecha'}</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedPlan(plan);
                    setShowModal(true);
                  }}
                  className="bg-[#3d4862] text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                  VISUALIZAR PLAN TRATAMIENTO
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-base mt-8">No hay plan de tratamiento para este mes.</p>
          )}

          {showModal && selectedPlan && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
                <button
                  onClick={handleCloseModal}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                >
                  &times;
                </button>
                <h2 className="font-semibold text-lg">Detalles del Plan:</h2>
                <div className="mt-4">
                  <div className="mb-4">
                    <h3 className="font-semibold">Diagnóstico:</h3>
                    <div className="bg-gray-200 p-4 rounded-lg">
                      <p>{selectedPlan.diagnosis}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold">Indicaciones:</h3>
                    <div className="bg-gray-200 p-4 rounded-lg">
                      <p>{selectedPlan.instructions}</p>
                    </div>
                  </div>
                  <table className="w-full mt-4">
                    <thead>
                      <tr>
                        <th className="border-b p-2">N SESSION</th>
                        <th className="border-b p-2">EJERCICIO</th>
                        <th className="border-b p-2">FECHA</th>
                        <th className="border-b p-2">HORA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Aquí se espera que la API proporcione las sesiones de tratamiento */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          <div className="mt-10">
            <Link
              to={`/RegistroPlan?role=${role}&token=${token}&username=${username}`}
              className="bg-red-700 text-white py-2 px-4 rounded-lg mt-4 hover:bg-red-800 transition duration-300"
            >
              GENERAR PLAN TRATAMIENTO
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlanTratamientoSinRegistrar;

