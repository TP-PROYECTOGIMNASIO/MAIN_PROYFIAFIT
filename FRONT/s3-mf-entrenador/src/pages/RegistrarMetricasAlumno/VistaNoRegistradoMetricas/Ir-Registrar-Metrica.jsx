import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft as ArrowLeftIcon } from "react-icons/fa";
import { BiLoaderAlt as LoaderIcon } from "react-icons/bi";

const VistaNoRegistrado = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const clientId = searchParams.get("client_id");
  const [studentName, setStudentName] = useState("");
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrlUSERNAME = import.meta.env.VITE_APP_API_URL_USERNAME;
  const apiUrl26 = import.meta.env.VITE_APP_API_URL_26;
  const apiUrl23 = import.meta.env.VITE_APP_API_URL_23;

  const [user, setUser] = useState({});

  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en Ir Registrar Metricas:", window.location.search); // Verificar que todos los parámetros están presentes

  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Ir Registrar Metricas:", role);
  console.log("token recibido en Ir Registrar Metricas:", token);
  console.log("username recibido en Ir Registrar Metricas:", username);

  useEffect(() => {
    if (token && username) {
      console.log("Datos recibidos:", { role, token, username });
      fetchUserName();
    }
  }, [role, token, username]); // Dependencias del useEffect // Dependencia de `navigate` // Dependencia de `token` y `username` para volver a ejecutar si estos cambian

  const fetchUserName = async () => {
    try {
      const response = await fetch(`${apiUrlUSERNAME}?username=${username}`);

      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }

      const data = await response.json();
      console.log("Respuesta de la API:", data);

      if (Array.isArray(data)) {
        if (data.length > 0) {
          setUser(data[0]);
        } else {
          console.error("El array está vacío");
          setUser({});
        }
      } else if (data && typeof data === "object") {
        setUser(data);
      } else {
        console.error("Formato inesperado en la respuesta de la API:", data);
        setUser({});
      }
    } catch (error) {
      console.error("Error al obtener la información del usuario", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!clientId) {
          setError("ID de estudiante no proporcionado");
          setLoading(false);
          return;
        }
  
        // Espera a que user.id esté definido antes de hacer la solicitud
        if (user.id) {
          // Obtener datos del estudiante
          const studentsResponse = await fetch(`${apiUrl26}?staff_id=${user.id}`);
          const studentsData = await studentsResponse.json();
          const student = studentsData.find(student => student.client_id === parseInt(clientId));
  
          if (student) {
            setStudentName(student.nombres);
            // Obtener métricas del estudiante
            const metricsResponse = await fetch(`${apiUrl23}?body_id=${clientId}`);
            console.log("URL utilizada:", `${apiUrl23}?body_id=${clientId}`);

            const metricsData = await metricsResponse.json();
  
            if (metricsData && metricsData.length > 0) {
              setMetrics(metricsData[0]);
            } else {
              setError("No se encontraron métricas para este estudiante.");
              setMetrics(null); // No se encontraron métricas, establecemos como null

            }
          } else {
            setError("Estudiante no encontrado");
          }
        } else {
          console.error("user.id no está definido");
          setError("Usuario no cargado");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };
  
    // Llama a fetchData solo si clientId y user.id están definidos
    if (clientId && user.id) {
      fetchData();
    }
  }, [clientId, user.id]);
  

  const handleClick = () => {
    if (clientId) {
      navigate(
        `/registrar-metricas?client_id=${clientId}&role=${role}&token=${token}&username=${username}`
      );
    } else {
      console.log("No se puede navegar: clientId no está definido");
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100">
        <LoaderIcon className="w-16 h-16 text-blue-500 animate-spin" />
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Cargando datos...
        </p>
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100">
        <p className="text-xl font-bold text-red-600">{error}</p>
        <Link
          to={`/listar-alumnos?role=${role}&token=${token}&username=${username}`}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Volver a la lista de alumnos
        </Link>
      </div>
    );

  return (
    <div className="flex flex-col items-center w-full min-h-screen p-4 sm:p-6 bg-gray-100">
      <div className="flex justify-between w-full mb-4 items-center max-w-4xl sm:max-w-5xl mx-auto">
        <Link
          to={`/listar-alumnos?role=${role}&token=${token}&username=${username}`}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeftIcon className="w-6 h-6 sm:w-8 sm:h-8 mr-2" />
          <span className="text-lg">Volver</span>
        </Link>
      </div>

      <main className="flex flex-col w-full p-6 sm:p-8 bg-white shadow-lg mt-6 max-w-4xl sm:max-w-5xl mx-auto rounded-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          Estas visualizando las métricas de {studentName}
        </h1>

        {metrics ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-lg shadow-inner">
            {Object.entries(metrics).map(
              ([key, value]) =>
                key !== "generado" && (
                  <div key={key} className="bg-white p-4 rounded-md shadow-sm">
                    <p className="text-sm text-gray-500 capitalize">
                      {key.replace("_", " ")}
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      {value}{" "}
                      {key === "altura" || key === "peso" || key.includes("cm")
                        ? "cm"
                        : ""}
                    </p>
                  </div>
                )
            )}
            <div className="bg-white p-4 rounded-md shadow-sm col-span-full">
              <p className="text-lg font-semibold text-gray-800">
                Generado el {new Date(metrics.generado).toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full p-6 bg-red-100 text-center rounded-lg shadow-inner">
            <p className="text-red-600 text-xl font-semibold mb-4">
              Aún no se han registrado métricas
            </p>
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md shadow-md transition-colors"
              onClick={handleClick}
            >
              Registrar Métricas
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default VistaNoRegistrado;
