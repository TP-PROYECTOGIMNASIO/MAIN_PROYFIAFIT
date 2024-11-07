import { useState } from "react";
import { Link } from "react-router-dom"; // Importa Link para la navegación

function NuevoEvento() {
  const [activeTab, setActiveTab] = useState("aprobados");

  const params = new URLSearchParams(window.location.search);
  console.log(
    "Todos los parámetros en Registrar Evento encargado:",
    window.location.search
  ); // Verificar que todos los parámetros están presentes

  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Registrar Evento encargado:", role);
  console.log("token recibido en Registrar Evento encargado:", token);
  console.log("username recibido en Registrar Evento encargado:", username);

  const eventos = {
    aprobados: [
      {
        id: 1,
        nombre: "Reto Fitness Total",
        sede: "Sede Santa Anita",
        aforo: 15,
        imagen: "/image1.png",
      },
    ],
    pendientes: [
      {
        id: 2,
        nombre: "Maratón de Spinning",
        sede: "Sede La Molina",
        aforo: 20,
        imagen: "/image2.png",
      },
      {
        id: 3,
        nombre: "Clase Magistral de Yoga",
        sede: "Sede Santa Anita",
        aforo: 25,
        imagen: "/image3.png",
      },
    ],
    rechazados: [],
  };

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
        {eventos[activeTab].map((evento) => (
          <div key={evento.id} className="rounded-lg overflow-hidden shadow-lg">
            <img
              src={evento.imagen}
              alt={evento.nombre}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 bg-white">
              <h3 className="text-xl font-bold">{evento.nombre}</h3>
              <p className="text-gray-600">{evento.sede}</p>
              <p className="text-red-600">Aforo disponible: {evento.aforo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NuevoEvento;
