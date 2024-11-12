import React, { useState } from 'react';
import axios from 'axios';

const EventDetailModal = ({ event, onClose }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState(null); // Para manejar errores

  const handleRegister = async () => {
    try {
      // Usa la variable de entorno para la URL de la API
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}`,
        {
          event_Id: event.id,       // Ajusta estos campos según los requerimientos de la API
          eventName: event.title,   // Ajusta según sea necesario
        },
        {
          headers: {
            'Content-Type': 'application/json', // Asegúrate de que el tipo de contenido sea correcto
          },
        }
      );

      if (response.status === 200) {
        setIsRegistered(true); // Indica que la inscripción fue exitosa
        setError(null); // Reinicia el error en caso de éxito
      } else {
        console.error("Respuesta inesperada de la API:", response);
        setError("La inscripción no pudo completarse. Verifica los detalles.");
      }
    } catch (err) {
      console.error("Error al inscribirse en el evento:", err);
      setError("Hubo un error al realizar la inscripción. Inténtalo de nuevo."); // Configura un mensaje de error
    }
  };

  const handleClose = () => {
    setIsRegistered(false);
    onClose();
  };

  if (!event) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-xl w-full relative shadow-lg">
          <button 
            onClick={onClose} 
            className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-1"
          >
            X
          </button>

          <div className="flex">
            <div className="w-1/2">
              <img 
                src={event.img} 
                alt={event.title} 
                className="w-full h-auto rounded-lg" 
              />
            </div>

            <div className="w-1/2 pl-4">
              <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
              <p className="text-red-600 font-bold mb-2">Descripción:</p>
              <p className="text-gray-700 mb-4">Un reto de varias semanas en el que los participantes tienen que superar diferentes desafíos de entrenamiento. Ideal para incrementar el compromiso y la motivación.</p>
              <p className="text-red-700 mb-2"><strong></strong> {event.location}</p>
              <p className={`mb-2 ${event.slots <= 5 ? 'text-red-600' : 'text-red-600'}`}><strong>Foro disponible:</strong> {event.slots}</p>
              <p className="text-red-700 mb-4"><strong></strong> 26/10/2024 2:00 PM</p>

              <button 
                onClick={handleRegister} 
                className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold w-full hover:bg-red-700 transition duration-200"
              >
                INSCRIBIRSE
              </button>
            </div>
          </div>
        </div>
      </div>

      {isRegistered && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full text-center shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-red-600">¡INSCRIPCIÓN REALIZADA!</h2>
            <button 
              onClick={handleClose} 
              className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full text-center shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-red-600">Error</h2>
            <p>{error}</p>
            <button 
              onClick={() => setError(null)} 
              className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EventDetailModal;



