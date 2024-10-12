import React from "react";
import { Link } from "react-router-dom";

const Productos = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Botón Regresar */}
      <div className="flex justify-start pl-8 pt-4">
        <Link
          className="flex items-center justify-center gap-1 text-black"
          to={"/Inventario-Sede"}
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
      <main className="py-8 px-8">
        {/* Filtros y Ordenar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4 items-center">
            <span className="text-gray-700 font-semibold">Ordenar por:</span>
            <select className="border border-gray-300 rounded-lg py-2 px-4">
              <option>Tipo de Producto</option>
              <option>Equipo de Ejercicios</option>
              <option>Máquina</option>
              <option>Ropa Deportiva</option>
            </select>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar producto"
              className="border border-gray-300 rounded-lg py-2 px-4"
            />
            <button className="absolute top-1/2 right-3 transform -translate-y-1/2">
              🔍
            </button>
          </div>
        </div>

        {/* Tabla de productos */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-auto max-w-6xl p-6">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2">Imagen del producto</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Cantidad</th>
                <th className="px-4 py-2">Precio de Venta</th>
                <th className="px-4 py-2">Tipo de Producto</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {/* Producto 1 */}
              <tr className="border-b">
                <td className="px-4 py-4">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Mancuernas 3kg"
                    className="mx-auto"
                  />
                </td>
                <td className="px-4 py-4">Mancuernas 3kg</td>
                <td className="px-4 py-4">2</td>
                <td className="px-4 py-4">40 soles</td>
                <td className="px-4 py-4">Equipo de Ejercicios</td>
              </tr>

              {/* Producto 2 */}
              <tr className="border-b">
                <td className="px-4 py-4">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Mancuerna 20kg"
                    className="mx-auto"
                  />
                </td>
                <td className="px-4 py-4">Mancuerna 20kg</td>
                <td className="px-4 py-4">3</td>
                <td className="px-4 py-4">80 soles</td>
                <td className="px-4 py-4">Equipo de Ejercicios</td>
              </tr>

              {/* Producto 3 */}
              <tr className="border-b">
                <td className="px-4 py-4">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Pack gimnasio en casa"
                    className="mx-auto"
                  />
                </td>
                <td className="px-4 py-4">Pack gimnasio en casa</td>
                <td className="px-4 py-4">5</td>
                <td className="px-4 py-4">135 soles</td>
                <td className="px-4 py-4">Máquina</td>
              </tr>

              {/* Producto 4 */}
              <tr>
                <td className="px-4 py-4">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Rueda abdominal"
                    className="mx-auto"
                  />
                </td>
                <td className="px-4 py-4">Rueda abdominal</td>
                <td className="px-4 py-4">8</td>
                <td className="px-4 py-4">25 soles</td>
                <td className="px-4 py-4">Equipo de Ejercicios</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Productos;
