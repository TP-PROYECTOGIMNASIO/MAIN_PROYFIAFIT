import { useState } from 'react';
import { Link } from 'react-router-dom'; // Para navegar hacia atrás

function RegistrarEvento() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaHora, setFechaHora] = useState('');
  const [aforo, setAforo] = useState('');
  const [sede, setSede] = useState('');
  const [requerimientos, setRequerimientos] = useState('');


  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en Registrar Evento encargado:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Registrar Evento encargado:", role);
  console.log("token recibido en Registrar Evento encargado:", token);
  console.log("username recibido en Registrar Evento encargado:", username);


  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario
    console.log({
      nombre,
      descripcion,
      fechaHora,
      aforo,
      sede,
      requerimientos
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
      <button
              onClick={() => window.history.back()}
              className="text-gray-500 hover:text-gray-700 flex items-center">
              <i className="fas fa-arrow-left mr-2"></i> Regresar
            </button>
        <h2 className="text-2xl font-bold text-center text-red-800">REGISTRO DE NUEVO EVENTO</h2>
      </div>
      
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 mb-2">NOMBRE:</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">DESCRIPCIÓN:</label>
          <textarea 
            className="w-full p-2 border rounded-md"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Fecha y Hora:</label>
          <input 
            type="datetime-local" 
            className="w-full p-2 border rounded-md"
            value={fechaHora}
            onChange={(e) => setFechaHora(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Aforo:</label>
          <input 
            type="number" 
            className="w-full p-2 border rounded-md"
            value={aforo}
            onChange={(e) => setAforo(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Sedes:</label>
          <select 
            className="w-full p-2 border rounded-md"
            value={sede}
            onChange={(e) => setSede(e.target.value)}
          >
            <option>Seleccionar sede</option>
            <option>Sede Santa Anita</option>
            <option>Sede La Molina</option>
          </select>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Requerimientos:</label>
          <textarea 
            className="w-full p-2 border rounded-md"
            value={requerimientos}
            onChange={(e) => setRequerimientos(e.target.value)}
          />
        </div>
        
        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-md">
          GUARDAR
        </button>
      </form>
    </div>
  );
}

export default RegistrarEvento;
