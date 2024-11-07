import React from 'react';

const DetalleTratamiento = () => {

  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en Detalle Tratamiento:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Detalle Tratamiento clientes:", role);
  console.log("token recibido en Detalle Tratamiento clientes:", token);
  console.log("username recibido en Detalle Tratamiento clientes:", username);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
       {/* Botón de Regresar */}
       <header className="w-full max-w-2xl p-4">
        <button
          className="text-gray-700 font-medium"
          onClick={() => window.history.back()}
        >
          &lt; Regresar
        </button>
      </header>

      <div className="w-full max-w-3xl bg-white p-6 mt-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-700">PLAN DE TRATAMIENTO</h2>
          <span className="text-sm text-red-600">Fecha Elaborada: 20/10/2024</span>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold text-red-600">Diagnóstico:</h3>
          <div className="mt-2 p-4 bg-gray-200 rounded-md"></div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold text-red-600">Indicaciones:</h3>
          <div className="mt-2 p-4 bg-gray-200 rounded-md"></div>
        </div>

        <div className="mt-6">
          <table className="w-full bg-gray-100 rounded-md overflow-hidden shadow-md">
            <thead>
              <tr className="bg-gray-300">
                <th className="p-2 text-left">N° Sesión</th>
                <th className="p-2 text-left">Ejercicio</th>
                <th className="p-2 text-left">Fecha</th>
                <th className="p-2 text-left">Hora</th>
              </tr>
            </thead>
            <tbody>
              {/* Aquí puedes mapear las sesiones para mostrarlas */}
              <tr>
                <td className="p-2">1</td>
                <td className="p-2">Ejercicio 1</td>
                <td className="p-2">20/10/2024</td>
                <td className="p-2">10:00 AM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetalleTratamiento;
