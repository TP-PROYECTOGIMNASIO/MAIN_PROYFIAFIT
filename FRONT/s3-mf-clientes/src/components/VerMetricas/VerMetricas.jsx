import { useState, useEffect } from 'react';
function VerMetricas() {
  const [metricas, setMetricas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mesActual, setMesActual] = useState(new Date().getMonth() + 1);
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const apiUrl14 = import.meta.env.VITE_APP_API_URL_14;

  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  const clienteId = params.get("clienteId");
  console.log("role recibido en Ver Metricas clientes:", role);
  console.log("token recibido en Ver Metricas clientes:", token);
  console.log("username recibido en Ver Metricas clientes:", username);
  console.log("clienteId recibido en Ver Metricas clientes:", clienteId);

  useEffect(() => {
    const fetchMetricas = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${apiUrl14}?client_id=${clienteId}&month=${mesActual}`);
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        const data = await response.json();
        setMetricas(data);
      } catch (err) {
        // Mostrar el error en la consola
        console.error("Error:", err);
        
        setError('No cuenta con métricas registradas');
        setMetricas(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMetricas();
  }, [mesActual]);
  const handleMesChange = (event) => {
    event.preventDefault(); // Previene la recarga de la página
    setMesActual(parseInt(event.target.value));
  };
  const handleBack = () => {
    window.history.back();
  };
  return (
    <div className="min-h-screen bg-gray-100 py-10 flex flex-col items-center">
      <div className="flex flex-col items-start mb-8 w-full max-w-4xl">
        <button 
          className="mb-4 px-4 py-2 text-red-600 hover:underline transition duration-300 font-bold"
          onClick={handleBack}
        >
          Regresar
        </button>
        <h1 className="text-4xl font-extrabold text-red-800 mb-4">Mis resultados</h1>
        <select 
          value={mesActual}
          onChange={handleMesChange}
          className="px-4 py-2 bg-red-600 text-white rounded-md"
        >
          {meses.map((mes, index) => (
            <option key={index} value={index + 1}>{mes}</option>
          ))}
        </select>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl">
        {loading ? (
          <p className="text-center text-gray-700 text-lg">Cargando...</p>
        ) : error ? (
          <p className="text-center text-red-600 text-lg">{error}</p>
        ) : metricas && metricas.metrics ? (
          <>
            <div className="space-y-2 mb-4">
              <p className="text-lg"><span className="font-semibold">Altura:</span> {metricas.metrics.height} cm</p>
              <p className="text-lg"><span className="font-semibold">Peso:</span> {metricas.metrics.weight} kg</p>
              <p className="text-lg"><span className="font-semibold">IMC:</span> {metricas.metrics.imc}</p>
              <p className="text-lg"><span className="font-semibold">Objetivos:</span> {metricas.metrics.ideal_weight || 'No especificado'} kg</p>
            </div>
            <p className="text-gray-700 text-lg">{metricas.message}</p>
          </>
        ) : (
          <p className="text-center text-gray-700 text-lg">No hay métricas registradas para {meses[mesActual - 1]}.</p>
        )}
      </div>
    </div>
  );
}
export default VerMetricas;