import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import EventDetailModal from './EventDetailModal';
import Banner from './Banner';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const apiUrlUSERNAME = import.meta.env.VITE_APP_API_URL_USERNAME;
  const [user, setUser] = useState({});

  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Lista de Eventos clientes:", role);
  console.log("token recibido en Lista de Eventos clientes:", token);
  console.log("username recibido en Lista de Eventos clientes:", username);

  useEffect(() => {
    if (token && username) {
      console.log("Datos recibidos:", { role, token, username });
      fetchUserName();
    }
  }, [role, token, username]); // Dependencias del useEffect // Dependencia de `navigate` // Dependencia de `token` y `username` para volver a ejecutar si estos cambian

  const fetchUserName = async () => {
    try {
      const response = await fetch(`${apiUrlUSERNAME}?username=${username}`);

      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }

      const data = await response.json();
      console.log("Respuesta de la API:", data);

      if (Array.isArray(data)) {
        if (data.length > 0) {
          setUser(data[0]);
        } else {
          console.error("El array está vacío");
          setUser({});
        }
      } else if (data && typeof data === "object") {
        setUser(data);
      } else {
        console.error("Formato inesperado en la respuesta de la API:", data);
        setUser({});
      }
    } catch (error) {
      console.error("Error al obtener la información del usuario", error);
    }
  };


  useEffect(() => {
    // Cargar los eventos desde el archivo JSON
    fetch('/events.json')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error("Error al cargar los eventos:", error));
  }, []);

  const nextEvent = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= events.length ? 0 : prevIndex + 3
    );
  };

  const prevEvent = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 3 < 0 ? Math.max(events.length - 3, 0) : prevIndex - 3
    );
  };

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const displayedEvents = events.slice(currentIndex, currentIndex + 3);

  return (
    <section className="relative p-4">
      <Banner />

      <div className="flex items-center justify-between mt-4">
        <button 
          onClick={prevEvent} 
          className="text-red-600 text-5xl font-bold focus:outline-none"
        >
          {"<"}
        </button>

        <div className="flex justify-center items-center space-x-4">
          {displayedEvents.map((event) => (
            <div key={event.event_id} onClick={() => openModal(event)}>
              <EventCard 
                title={event.name} 
                location={`Sede ${event.location_id}`} 
                slots={event.capacity} 
                img={event.image_url || '/fondo.png'} 
              />
            </div>
          ))}
        </div>

        <button 
          onClick={nextEvent} 
          className="text-red-600 text-5xl font-bold focus:outline-none"
        >
          {">"}
        </button>
      </div>

      <EventDetailModal event={selectedEvent} onClose={closeModal} user={user} />
      </section>
  );
};

export default EventList;
