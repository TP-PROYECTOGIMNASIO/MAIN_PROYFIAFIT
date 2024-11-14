import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrarEvento() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    event_date: '',
    capacity: '',
    location_id: 1,
    requirements: '',
    image_url: 'https://example.com/event-image.jpg' // URL por defecto
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl49 = import.meta.env.VITE_APP_API_URL_49;

  const params = new URLSearchParams(window.location.search);
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
          <label className="block text-gray-700 mb-2">Nombre:</label>
          <input 
            type="text" 
            name="name"
            className="w-full p-2 border rounded-md"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Descripción:</label>
          <textarea 
            name="description"
            className="w-full p-2 border rounded-md"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Fecha y Hora:</label>
          <input 
            type="datetime-local" 
            name="event_date"
            className="w-full p-2 border rounded-md"
            value={formData.event_date}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Aforo:</label>
          <input 
            type="number" 
            name="capacity"
            className="w-full p-2 border rounded-md"
            value={formData.capacity}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Sedes:</label>
          <select 
            name="sede"
            className="w-full p-2 border rounded-md"
            value={formData.sede}
            onChange={handleChange}
            required
          >
            <option>Seleccionar sede</option>
            <option>Sede Santa Anita</option>
            <option>Sede La Molina</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Requerimientos:</label>
          <textarea 
            name="requirements"
            className="w-full p-2 border rounded-md"
            value={formData.requirements}
            onChange={handleChange}
            required
          />
        </div>
        
        {error && <div className="text-red-600">{error}</div>}
        
        <button 
          type="submit" 
          className="w-full bg-red-600 text-white py-2 rounded-md"
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'GUARDAR'}
        </button>
      </form>
    </div>
  );
}

export default RegistrarEvento;
