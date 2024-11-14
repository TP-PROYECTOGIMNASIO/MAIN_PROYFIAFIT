import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NuevoEvento() {
  const [activeTab, setActiveTab] = useState("aprobados");
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl49 = import.meta.env.VITE_APP_API_URL_49;

  const params = new URLSearchParams(window.location.search);
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  
  const fetchEventos = async (method) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(apiUrl49, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ method })
      });

      if (!response.ok) {
        throw new Error('Error al cargar los eventos');
      }

      const data = await response.json();
      setEventos(data.events || []);
    } catch (err) {
      console.error('Error:', err);
      setError('Error al cargar los eventos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const methodMap = {
      aprobados: 'readApproved',
      pendientes: 'readPending',
      rechazados: 'readRejected'
    };
    
    fetchEventos(methodMap[activeTab]);
  }, [activeTab]);

  if (loading) return <div className="text-center p-4">Cargando...</div>;
  if (error) return <div className="text-center text-red-600 p-4">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Botones de navegación */}
      <div className="flex justify-between mb-8">
        <div className="flex gap-4">
          <button
            className={`px-6 py-2 rounded-md ${
              activeTab === "aprobados"
                ? "bg-red-600 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => setActiveTab("aprobados")}
          >
            EVENTOS APROBADOS
          </button>
          <button
            className={`px-6 py-2 rounded-md ${
              activeTab === "rechazados"
                ? "bg-red-600 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => setActiveTab("rechazados")}
          >
            EVENTOS RECHAZADOS
          </button>
          <button
            className={`px-6 py-2 rounded-md ${
              activeTab === "pendientes"
                ? "bg-red-600 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => setActiveTab("pendientes")}
          >
            EVENTOS PENDIENTES
          </button>
        </div>
        <Link
          to={`/registrar_evento?role=${role}&token=${token}&username=${username}`} // Redirige al formulario
          className="bg-red-600 text-white px-6 py-2 rounded-md flex items-center gap-2"
        >
          <span className="text-2xl">+</span> Solicitar Evento
        </Link>
      </div>

      {/* Grid de eventos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventos.map((evento) => (
          <div key={evento.event_id} className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={evento.image_url}
              alt={evento.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 bg-white">
              <h3 className="text-xl font-bold">Nombre: {evento.name}</h3>
              <p className="text-gray-600">Descripción: {evento.description}</p>
              <p className="text-red-600">Aforo: {evento.capacity}</p>
              <p className="text-gray-600">Sede: {evento.sede}</p>
              <p className="text-gray-500">Fecha: {new Date(evento.event_date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NuevoEvento;
