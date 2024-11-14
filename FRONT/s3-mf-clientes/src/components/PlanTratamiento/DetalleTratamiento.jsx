import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DetalleTratamiento = () => {
  const location = useLocation();
  const { plan, token } = location.state || {};

  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en Detalle Tratamiento clientes:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");

  const username = params.get("username");
  console.log("role recibido en Detalle Tratamiento clientes:", role);
  console.log("username recibido en Detalle Tratamiento clientes:", username);

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (plan && token) {
      setSessions(plan.sessions || []);
      setLoading(false);
    }
  }, [plan, token]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <div className="w-full flex justify-start p-2">
      <button className="text-gray-500 text-lg flex items-center ml-4" onClick={() => window.history.back()}>
          &lt; Regresar
        </button>
        </div>

      <div className="w-full max-w-3xl bg-white p-6 mt-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-700">PLAN DE TRATAMIENTO</h2>
          <span className="text-sm text-red-600">Fecha de Elaboración: {new Date(plan?.created_at).toLocaleDateString()}</span>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold text-red-600">Diagnóstico:</h3>
          <div className="mt-2 p-4 bg-gray-200 rounded-md">
            {plan?.diagnosis || 'No disponible'}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold text-red-600">Instrucciones:</h3>
          <div className="mt-2 p-4 bg-gray-200 rounded-md">
            {plan?.instructions || 'No disponible'}
          </div>
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
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center p-4">Cargando detalles...</td>
                </tr>
              ) : sessions.length > 0 ? (
                sessions.map((session, index) => (
                  <tr key={index}>
                    <td className="p-2">{session.sessions_number}</td>
                    <td className="p-2">{session.exercise?.name || 'No disponible'}</td>
                    <td className="p-2">{new Date(session.session_date).toLocaleDateString()}</td>
                    <td className="p-2">{session.session_time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4">No hay sesiones disponibles.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetalleTratamiento;
  