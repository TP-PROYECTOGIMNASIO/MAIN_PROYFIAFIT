import React from "react";
import { Link } from "react-router-dom";

const SeleccionarSede = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {["La Molina", "La Victoria", "Santa Anita", "San Miguel"].map(
            (sede) => (
              <div key={sede} className="bg-gray-200 p-8 rounded-lg shadow-lg">
                {/* Texto "SEDE" y nombre de la sede con el mismo estilo */}
                <h2 className="text-xl font-bold text-gray-700">Sede</h2>
                <h2 className="text-xl font-bold text-gray-700">{sede}</h2>
                <Link to={"/Inventario-Sede/Producto-Sede"}>
                <button className="mt-6 bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 transition duration-300">
                  Ingresar
                </button>
                </Link>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default SeleccionarSede;
