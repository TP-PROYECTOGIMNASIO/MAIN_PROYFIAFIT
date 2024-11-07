import React, { useEffect, useState } from 'react';
import { Link, useNavigate  } from "react-router-dom";
import EventCard from './EventCard';
import EventDetailModal from './EventDetailModal';
import Banner from './Banner'; // Importa el componente Banner

const events = [
  {
    title: "Reto Fitness Total",
    location: "Sede Santa Anita",
    slots: "15",
    img: "/fondo_evento_1.jpeg"
  },
  {
    title: "Maratón de Spinning",
    location: "Sede La Molina",
    slots: "20",
    img: "/fondo_evento_2.jpeg"
  },
  {
    title: "Clase Magistral de Yoga",
    location: "Sede Santa Anita",
    slots: "15",
    img: "/fondo_evento_3.jpeg"
  },
  {
    title: "Entrenamiento Funcional",
    location: "Sede San Isidro",
    slots: "10",
    img: "/fondo_evento_1.jpeg"
  },
  {
    title: "Zumba Party",
    location: "Sede Barranco",
    slots: "25",
    img: "/fondo_evento_2.jpeg"
  },
  {
    title: "Pilates Avanzado",
    location: "Sede Miraflores",
    slots: "12",
    img: "/fondo_evento_3.jpeg"
  }
];

const EventList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null); // Nuevo estado para manejar el modal
  
  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Lista de Eventos clientes:", role);
  console.log("token recibido en Lista de Eventos clientes:", token);
  console.log("username recibido en Lista de Eventos clientes:", username);

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
    setSelectedEvent(event); // Abrir el modal con el evento seleccionado
  };

  const closeModal = () => {
    setSelectedEvent(null); // Cerrar el modal
  };

  // Obtener los eventos a mostrar según el índice actual
  const displayedEvents = events.slice(currentIndex, currentIndex + 3);

  return (
    <section className="relative p-4">
      {/* Agrega el Banner al inicio de la sección */}
      <Banner />

      <div className="flex items-center justify-between mt-4">
        {/* Botón para ir al evento anterior */}
        <button 
          onClick={prevEvent} 
          className="text-red-600 text-5xl font-bold focus:outline-none"
        >
          {"<"}
        </button>

        {/* Eventos actuales mostrados */}
        <div className="flex justify-center items-center space-x-4">
          {displayedEvents.map((event, index) => (
            <div key={index} onClick={() => openModal(event)}>
              <EventCard 
                title={event.title} 
                location={event.location} 
                slots={event.slots} 
                img={event.img} 
              />
            </div>
          ))}
        </div>

        {/* Botón para ir al siguiente evento */}
        <button 
          onClick={nextEvent} 
          className="text-red-600 text-5xl font-bold focus:outline-none"
        >
          {">"}
        </button>
      </div>

      {/* Modal de Detalles del Evento */}
      <EventDetailModal event={selectedEvent} onClose={closeModal} />
    </section>
  );
};

export default EventList;
