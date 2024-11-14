import React, { useState } from 'react';

const EventDetailModal = ({ event, onClose, user }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    try {

       // Asegúrate de que los valores se están enviando correctamente
       if (!user || !user.id) {
        setError("Usuario no autenticado. No se puede completar la inscripción.");
        return;
      }

      console.log("EventDetailModal client_id:", user.id);
      console.log("EventDetailModal event_id:", event.event_id);

      const response = await fetch(`https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/clientes/hu-tp-10`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: user.id, // Usa el ID del usuario logueado
          event_id: event.event_id // Cambia a event.event_id si esa es la clave en tus datos de eventos
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === "Inscripción realizada exitosamente") {
          setIsRegistered(true);
          setError(null);
        } else {
          setError("La inscripción no pudo completarse. Verifica los detalles.");
        }
      } else {
        console.error("Error en la respuesta de la API:", response.status);
        setError("Hubo un problema al procesar la inscripción.");
      }
    } catch (err) {
      console.error("Error al inscribirse en el evento:", err);
      setError("Hubo un error al realizar la inscripción. Inténtalo de nuevo.");
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
  <div className="bg-white max-w-xl w-full rounded-lg shadow-lg overflow-hidden">

    {/* Contenedor de la línea superior en rojo */}
    <div className="bg-red-600 text-white flex justify-between items-center p-2 rounded-t-lg">
      <span className="text-lg font-semibold">Detalles del Evento</span> {/* Puedes personalizar el texto o dejarlo vacío */}
      
      <button 
        onClick={onClose} 
        className="text-white bg-red-600 rounded-full p-1"
      >
        X
      </button>
    </div>
    
    <div className="flex p-4"> {/* Mueve el contenido principal de la modal hacia abajo */}
      <div className="w-1/2">
              <img 
                src={event.image_url || '/fondo.png'} 
                alt={event.name} 
                className="w-full h-auto rounded-lg" 
              />
            </div>

            <div className="w-1/2 pl-4">
              <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
              <p className="text-red-600 font-bold mb-2">Descripción:</p>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <p className="text-red-700 mb-2"><strong></strong>Sede {event.location_id}</p>
              <p className={`mb-2 ${event.capacity <= 5 ? 'text-red-600' : 'text-red-600'}`}><strong>Foro disponible:</strong> {event.capacity}</p>
              <p className="text-red-700 mb-4"><strong></strong> {event.event_date} 2:00 PM</p>

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




