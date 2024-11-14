import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Importa el ícono de flecha hacia atrás

function RegistrarEvento() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    event_date: '',
    capacity: '',
    location_id: '',
    requirements: '',
    image_url: 'https://example.com/event-image.jpg' // URL por defecto
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationError, setLocationError] = useState(''); // Nuevo estado para error de sede
  const [capacityError, setCapacityError] = useState(''); // Nuevo estado para error de aforo

  // Lista de sedes con `location_id` y `name`
  const locations = [
    { location_id: 10, name: 'Gimnasio Central TEST' },
    { location_id: 19, name: 'Gimnasio Test' },
    { location_id: 1, name: 'Sucursal Principal' },
    { location_id: 2, name: 'Sucursal Sur' },
    { location_id: 3, name: 'Gimnasio Central' },
    { location_id: 20, name: 'Gimnasio Test2' },
    { location_id: 22, name: 'Gimnasio Test3' },
    { location_id: 25, name: 'Mal. Balta 740, Miraflores 15074, Perú' },
    { location_id: 26, name: 'Revett 165, Miraflores 15074, Perú' },
    { location_id: 29, name: 'Av. Angamos Oeste 120, Miraflores 15074, Perú' },
    { location_id: 9, name: 'Gimnasio Central TEST BORRAR' },
    { location_id: 23, name: 'Gimnasio de Ate' }
  ];


  const apiUrl49 = import.meta.env.VITE_APP_API_URL_49;

  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en Registrar Evento encargado de eventos:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Registrar Evento encargado de eventos:", role);
  console.log("token recibido en Registrar Evento encargado de eventos:", token);
  console.log("username recibido en Registrar Evento encargado de eventos:", username);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setLocationError(''); // Resetear el error de sede
    setCapacityError(''); // Resetear error de capacidad

    // Validar si se ha seleccionado una sede
    if (!formData.location_id) {
      setLocationError('Por favor, selecciona una sede');
      setLoading(false);
      return;
    }

    // Validar que el aforo no sea negativo
    if (parseInt(formData.capacity) <= 0) {
      setCapacityError('El aforo debe ser un número positivo');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(apiUrl49, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          method: 'create',
          ...formData,
          capacity: parseInt(formData.capacity)
        })
      });

      if (!response.ok) {
        throw new Error('Error al crear el evento');
      }

      const data = await response.json();
      console.log('Evento creado:', data);
      navigate(`/nuevo_evento?role=${role}&token=${token}&username=${username}`);
    } catch (err) {
      console.error('Error:', err);
      setError('Error al crear el evento');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'capacity') {
      // Validación para asegurarse de que el aforo no sea negativo
      if (value < 0) {
        setCapacityError('El aforo no puede ser negativo');
      } else {
        setCapacityError('');
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-8">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
        <div className="flex justify-start mb-6">
          <button
            onClick={() => window.history.back()}
            className="text-gray-500 hover:text-gray-700 flex items-center">
            <FaArrowLeft className="mr-2" /> Regresar
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center text-red-800 mb-8">REGISTRO DE NUEVO EVENTO</h2>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Nombre y Descripción en la misma fila */}
          <div className="flex space-x-6">
            <div className="w-[48%]">
              <label className="block text-gray-700 mb-2">Nombre del Evento:</label>
              <input 
                type="text" 
                name="name"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-[48%]">
              <label className="block text-gray-700 mb-2">Descripción:</label>
              <textarea 
                name="description"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Fecha y Aforo en la misma fila */}
          <div className="flex space-x-6">
            <div className="w-[48%]">
              <label className="block text-gray-700 mb-2">Fecha y Hora del Evento:</label>
              <input 
                type="datetime-local" 
                name="event_date"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600"
                value={formData.event_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-[48%]">
              <label className="block text-gray-700 mb-2">Aforo:</label>
              <input 
                type="number" 
                name="capacity"
                min="0"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600"
                value={formData.capacity}
                onChange={handleChange}
                required
              />
              {capacityError && <div className="text-red-600">{capacityError}</div>} {/* Mostrar el error de aforo */}

            </div>
          </div>

          {/* Sede y Requerimientos en la misma fila */}
          <div className="flex space-x-6">
            <div className="w-[48%]">
              <label className="block text-gray-700 mb-2">Sedes:</label>
              <select 
                name="location_id"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600"
                value={formData.location_id}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar sede</option>
              {locations.map((location) => (
                <option key={location.location_id} value={location.location_id}>
                  {location.name}
                </option>
              ))}
              </select>
              {locationError && <div className="text-red-600">{locationError}</div>} {/* Mostrar el error de sede */}

            </div>
            <div className="w-[48%]">
              <label className="block text-gray-700 mb-2">Requerimientos:</label>
              <textarea 
                name="requirements"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-600"
                value={formData.requirements}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {error && <div className="text-red-600">{error}</div>}

          <button 
            type="submit" 
            className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-600"
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'GUARDAR'}
          </button>
        </form>
      </div>
    </div>
  );
}
export default RegistrarEvento;


