import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoTreatmentModal from "../modal/NoTreatmentModal"; // Asegúrate de importar el modal

const PlanesPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState({
    training: false,
    nutrition: false,
    treatment: false,
  });
  const [tratamientos, setTratamientos] = useState([]);
  const [showNoTreatmentModal, setShowNoTreatmentModal] = useState(false); // Estado para mostrar el modal
  const apiUrlUSERNAME = import.meta.env.VITE_APP_API_URL_USERNAME;
  const apiUrlTratamiento = import.meta.env.VITE_APP_API_URL_90;

  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en VER MIS PLANES:", window.location.search); // Verificar que todos los parámetros están presentes
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en VER MIS PLANES clientes:", role);
  console.log("token recibido en VER MIS PLANES clientes:", token);
  console.log("username recibido en VER MIS PLANES clientes:", username);
  const clientId = params.get("clientId");

  useEffect(() => {
    if (token && username) {
      fetchUserName();
    }
  }, [token, username]);

  const fetchUserName = async () => {
    try {
      const url = `${apiUrlUSERNAME}?username=${encodeURIComponent(username)}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setUser(Array.isArray(data) && data.length > 0 ? data[0] : data);
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  };

  useEffect(() => {
    if (user.id) {
      fetchTratamiento(user.id);
    }
  }, [user.id]);

  const fetchTratamiento = async (clientId, planType) => {
    try {
      setLoading((prev) => ({ ...prev, [planType]: true }));
      const apiURL = `${apiUrlTratamiento}?clientId=${encodeURIComponent(
        clientId
      )}&view=${encodeURIComponent(planType)}`;
      const response = await fetch(apiURL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setTratamientos(planType === "last_plan" ? [data] : data);
    } catch (error) {
      console.error("Error al obtener el tratamiento:", error);
      setTratamientos([]);
    } finally {
      setLoading((prev) => ({ ...prev, [planType]: false }));
    }
  };

  const handleNavigation = async (path, type) => {
    setLoading((prev) => ({ ...prev, [type]: true })); // Cambia el estado a carga para el botón específico
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula un tiempo de carga
    navigate(path); // Navega a la nueva ruta
    setLoading((prev) => ({ ...prev, [type]: false })); // Restablece el estado de carga
  };

  const handleTratamientosClick = () => {
    setLoading((prev) => ({ ...prev, ["treatment"]: true }));

    setLoading((prev) => ({ ...prev, ["treatment"]: false }));
    console.log("Tratamientos:", tratamientos);

    if (tratamientos.length === 0) {
      setShowNoTreatmentModal(true); // Muestra el modal si no hay tratamientos
    } else {
      navigate(`/ver-tratamiento?role=${role}&token=${token}&username=${username}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Botón Regresar */}
      <br />
      <div className="w-full flex justify-start p-2 ml-16">
        <button
          className="text-gray-500 text-lg flex items-center"
          onClick={() => navigate(-1)}
        >
          <span className="mr-4 text-2xl">&lt;</span>
          Regresar
        </button>
      </div>

      {/* Contenedor principal alineado a la izquierda y arriba */}
      <div className="flex flex-col items-start justify-start flex-grow p-2 ml-16">
        {/* Título */}
        <div className="mb-4">
          <h1 className="text-red-500 font-bold text-2xl">VER</h1>
          <h2 className="text-red-500 font-bold text-3xl md:text-5xl">MIS PLANES</h2>
        </div>

        {/* Botones de los planes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-4xl">
          <button
            style={{ backgroundColor: "#BFB6B8" }}
            className="p-12 md:p-16 rounded-lg flex flex-col items-center justify-center hover:bg-gray-400 transition"
            onClick={() =>
              handleNavigation(`/ver-planes?role=${role}&token=${token}&username=${username}`, "training")
            }
            disabled={loading.training}
          >
            <img src="/plan_entrenamiento.png" alt="Plan de Entrenamiento" className="h-24 mb-8" />
            <span style={{ color: "#8C1C13" }} className="text-2xl text-center">
              PLAN DE ENTRENAMIENTO
            </span>
            {loading.training && <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
          </button>

          <button
            style={{ backgroundColor: "#BFB6B8" }}
            className="p-12 md:p-16 rounded-lg flex flex-col items-center justify-center hover:bg-gray-400 transition"
            onClick={() =>
              handleNavigation(`/ver-nutricion?role=${role}&token=${token}&username=${username}`, "nutrition")
            }
            disabled={loading.nutrition}
          >
            <img src="/plan_nutricion.png" alt="Plan de Nutrición" className="h-24 mb-8" />
            <span style={{ color: "#8C1C13" }} className="text-2xl text-center">
              PLAN DE NUTRICIÓN
            </span>
            {loading.nutrition && <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
          </button>

          <button
            style={{ backgroundColor: "#BFB6B8" }}
            className="p-12 md:p-16 rounded-lg flex flex-col items-center justify-center hover:bg-gray-400 transition"
            onClick={handleTratamientosClick}
            disabled={loading.treatment}
          >
            <img src="/plan_tratamiento.png" alt="Plan de Tratamiento" className="h-24 mb-8" />
            <span style={{ color: "#8C1C13" }} className="text-2xl text-center">
              PLAN DE TRATAMIENTO
            </span>
            {loading.treatment && <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>}
          </button>
        </div>
      </div>

      {/* Mostrar el modal si no hay planes de tratamiento */}
      {showNoTreatmentModal && <NoTreatmentModal onClose={() => setShowNoTreatmentModal(false)} />}
    </div>
  );
};

export default PlanesPage;
