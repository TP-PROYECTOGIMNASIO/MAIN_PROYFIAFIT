import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SeleccionarSede = () => {
  const [sedes, setSedes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSedes();
  }, []);

  const fetchSedes = async () => {
    try {
      setLoading(true);
      setError(null);

      // Realiza la llamada a la API para obtener las sedes
      const response = await fetch("https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/productos/hu-tp-67/locations");

      if (!response.ok) {
        throw new Error(`Error al obtener sedes: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setSedes(data);
    } catch (error) {
      console.error("Error al obtener sedes:", error);
      setError("Hubo un problema al cargar las sedes. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSede = (locationId) => {
    // Navegar a la página de productos con el locationId en la URL
    navigate(`/Inventario-Sede/Producto-Sede/${locationId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Botón Regresar */}
      <div className="flex justify-start pl-8 pt-4">
        <Link
          className="flex items-center justify-center gap-1 text-black"
          to={"/"}
        >
          <strong className="h-full flex items-center text-center text-[24px] font-bold">
            &lt;
          </strong>
          <span className="h-full flex items-center text-center mt-1">
            Regresar
          </span>
        </Link>
      </div>

      {/* Contenido principal */}
      <main className="py-8 px-8 text-center">
        <h1 className="text-3xl font-bold text-red-700 mb-12">
          Primero debes seleccionar una Sede
        </h1>

        {/* Mensaje de carga */}
        {loading && <p>Cargando sedes...</p>}

        {/* Mensaje de error */}
        {error && <p className="text-red-600">{error}</p>}

        {/* Mostrar las sedes obtenidas de la API */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {sedes.length > 0 ? (
              sedes.map((sede) => (
                <div
                  key={sede.location_id}
                  className="bg-gray-200 p-8 rounded-lg shadow-lg"
                >
                  <h2 className="text-xl font-bold text-gray-700">Sede</h2>
                  <h2 className="text-xl font-bold text-gray-700">{sede.name}</h2>
                  <button
                    onClick={() => handleSelectSede(sede.location_id)}
                    className="mt-6 bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 transition duration-300"
                  >
                    Ingresar
                  </button>
                </div>
              ))
            ) : (
              <p>No hay sedes disponibles.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default SeleccionarSede;
