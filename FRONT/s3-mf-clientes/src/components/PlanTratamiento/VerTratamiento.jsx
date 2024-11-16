import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const VerTratamiento = () => {
  const apiUrlUSERNAME = import.meta.env.VITE_APP_API_URL_USERNAME;
  const apiUrlTratamiento = import.meta.env.VITE_APP_API_URL_90;

  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({});
  const [tratamiento, setTratamiento] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlanType, setSelectedPlanType] = useState("last_plan");

  const params = new URLSearchParams(location.search);
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");

  useEffect(() => {
    if (token && username) {
      fetchUserName();
    }
  }, [token, username]);

  const fetchUserName = async () => {
    try {
      const url = `${apiUrlUSERNAME}?username=${encodeURIComponent(username)}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      setUser(Array.isArray(data) && data.length > 0 ? data[0] : data);
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  };

  useEffect(() => {
    if (user.id) {
      fetchTratamiento(user.id, selectedPlanType);
    }
  }, [user.id, selectedPlanType]);

  const fetchTratamiento = async (clientId, planType) => {
    try {
      setLoading(true);
      
      const apiURL = `${apiUrlTratamiento}?clientId=${encodeURIComponent(clientId)}&view=${encodeURIComponent(planType)}`;
      const response = await fetch(apiURL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      setTratamiento(planType === "last_plan" ? [data] : data);
    } catch (error) {
      console.error("Error al obtener el tratamiento:", error);
      setTratamiento([]);
    } finally {
      setLoading(false);
    }
  };

  const handleVisualizarPlan = (plan) => {
    navigate(`/ver-tratamiento/detalle-tratamiento?role=${role}&token=${token}&username=${username}`, {
      state: { plan, role, token, username }
    });
  };

  const handlePlanTypeChange = (event) => {
    setSelectedPlanType(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Botón Regresar */}
      <div className="w-full flex justify-start p-2">
        <button
          className="text-gray-500 text-lg flex items-center ml-4"
          onClick={() => navigate(-1)}
        >
          <span className="mr-4 text-2xl">&lt;</span>
          Regresar
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white p-6 mt-6 rounded-lg shadow-md mx-auto">
        <h1 className="text-2xl font-bold text-center text-red-600 mb-4">
          PLAN DE TRATAMIENTO
        </h1>
        <p className="text-center text-gray-700">
          {`${user.names || ''} ${user.father_last_name || ''} ${user.mother_last_name || ''}`}
        </p>

        {/* Combo box alineado a la derecha */}
        <div className="flex justify-end mt-2">
          <select
            className="border border-gray-300 rounded-md p-2 text-gray-700"
            style={{ background: '#D9D9D9' }}
            value={selectedPlanType}
            onChange={handlePlanTypeChange}
          >
            <option value="last_plan">Último Plan</option>
            <option value="all_previous_plans">Planes Anteriores</option>
          </select>
        </div>

        <div className="mt-6">
          {loading ? (
            <p className="text-center text-gray-700">Cargando plan de tratamiento...</p>
          ) : tratamiento.length > 0 ? (
            tratamiento.map((plan) => (
              <div key={plan.treatment_plan_id} className="mt-4 bg-gray-200 p-4 rounded-md flex justify-between items-center" style={{ background: '#D9D9D9' }}>
                <p className="text-gray-700">Plan Tratamiento - {new Date(plan.created_at).toLocaleDateString()}</p>
                <button
                  className="text-white py-2 px-4 rounded-md"
                  style={{ background: '#3C4862' }}
                  onClick={() => handleVisualizarPlan(plan)}
                >
                  Visualizar Plan Tratamiento
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-700">No hay planes de tratamiento disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerTratamiento;
