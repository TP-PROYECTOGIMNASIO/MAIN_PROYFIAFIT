import React, { useState, useEffect } from "react";
import EventoCard from "./Eventoscard";
import { FaMapMarkerAlt, FaUsers, FaCalendarAlt, FaCheckCircle, FaRegSadCry } from 'react-icons/fa';
import defaultImage from '../assets/image_default.png';
import { useNavigate } from 'react-router-dom';

function Modal({ evento, onClose, onAccept, onReject }) {
  const [imageSrc, setImageSrc] = useState(evento.image_url);

  const handleImageError = () => {
    setImageSrc(defaultImage);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden w-[600px]">
        <div className="bg-[#B5121C] p-4 flex justify-between items-center">
          <span className="text-white text-lg font-bold"></span>
          <button onClick={onClose} className="text-white text-lg font-bold">X</button>
        </div>
        <div className="p-2">
          <div className="flex">
            <img
              src={evento.image_url}
              onError={handleImageError}
              className="w-full h-46 w-1/2 mr-4"
              alt={evento.titulo}
            />
            <div className="w-2/3">
              <h2 className="text-xl font-bold">{evento.name}</h2>
              <p className="text-[#B5121C] mb-2">
                <strong>Descripción:</strong> <span className="text-black">{evento.description}</span>
              </p>
              <p className="text-[#B5121C] mb-2">
                <strong>Requerimiento:</strong> <span className="text-black">{evento.requirements}</span>
              </p>
              <p className="flex items-center mb-2">
                <FaMapMarkerAlt className="mr-1 text-[#B5121C]" />
                <strong className="text-[#B5121C] mr-2">Sede:</strong> <span className="text-black">{evento.location_id}</span>
              </p>
              <p className="flex items-center mb-2">
                <FaUsers className="mr-1 text-[#B5121C]" />
                <strong className="text-[#B5121C] mr-2">Foro disponible:</strong> <span className="text-black">{evento.capacity}</span>
              </p>
              <p className="flex items-center mb-4">
                <FaCalendarAlt className="mr-1 text-[#B5121C]" />
                <strong className="text-[#B5121C] mr-2">Fecha:</strong> <span className="text-black">{evento.event_date}</span>
              </p>
            </div>
          </div>
          <div className="flex mt-4" style={{ marginLeft: "360px" }}>
            <button className="bg-[#B5121C] text-white px-4 py-2 rounded-lg mr-2" onClick={onAccept}>
              Aceptar
            </button>
            <button className="bg-[#4B4F57] text-white px-4 py-2 rounded-lg" onClick={onReject}>
              Rechazar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfirmationModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full flex flex-col items-center">
        <FaCheckCircle className="text-[#B5121C] text-4xl mb-4" />
        <h2 className="text-[32px] text-[#B5121C] font-bold mb-4">Solicitud Aceptada</h2>
        <button onClick={onClose} className="bg-[#B5121C] text-white px-4 py-2 rounded-lg">
          Cerrar
        </button>
      </div>
    </div>
  );
}

function RejectionModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full flex flex-col items-center">
        <FaRegSadCry className="text-[#B5121C] text-4xl mb-4" />
        <h2 className="text-[32px] text-[#B5121C] font-bold mb-4">Solicitud Rechazada</h2>
        <button onClick={onClose} className="bg-[#B5121C] text-white px-4 py-2 rounded-lg">
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default function Eventos() {
  const [tab, setTab] = useState("aprobados");
  const [selectedEvento, setSelectedEvento] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showRejection, setShowRejection] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [eventos, setEventos] = useState([]);

  // Define navigate using useNavigate hook
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en Evento encargado de gimnasios:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Evento encargado de gimnasios:", role);
  console.log("token recibido en Evento encargado de gimnasios:", token);
  console.log("username recibido en Evento encargado de gimnasios:", username);

  useEffect(() => {
    fetchEventos();
  }, []);

  useEffect(() => {
    fetchEventos(startDate);
  }, [tab]);

  const fetchEventos = async (date = "") => {
    try {
      const url = date
        ? `https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/eventos/hu-tp-50?date=${date}`
        : "https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/eventos/hu-tp-50";
      const response = await fetch(url);
      const data = await response.json();
      setEventos(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const updateEventStatus = async (event_id, approved) => {
    try {
      const response = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/eventos/hu-tp-50', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_id: event_id,
          approved: approved,
        }),
      });
      
      if (response.ok) {
        setEventos((prevEventos) =>
          prevEventos.map((evento) =>
            evento.event_id === event_id ? { ...evento, approved } : evento
          )
        );
      } else {
        const errorDetails = await response.json();
        console.error("Error en el servidor:", errorDetails);
      }
    } catch (error) {
      console.error("Error de red o en la solicitud:", error);
    }
  };

  const handleAccept = () => {
    if (selectedEvento) {
      updateEventStatus(selectedEvento.event_id, true);
      setShowConfirmation(true);
      setSelectedEvento(null);
    }
  };

  const handleReject = () => {
    if (selectedEvento) {
      updateEventStatus(selectedEvento.event_id, false);
      setShowRejection(true);
      setSelectedEvento(null);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setStartDate(selectedDate);
    fetchEventos(selectedDate);
  };

  const TabButton = ({ label }) => (
    <button
      onClick={() => setTab(label)}
      className={`px-4 py-2 rounded-lg ${tab === label ? "bg-red-600 text-white" : "bg-gray-200 text-gray-600"}`}
    >
      {label === "aprobados" ? "EVENTOS APROBADOS" : "SOLICITUDES DE EVENTOS"}
    </button>
  );

  const handleCardClick = (evento) => {
    if (tab === "solicitudes") {
      setSelectedEvento(evento);
    }
  };

  const eventosAMostrar = tab === "solicitudes" ? eventos.filter(e => !e.approved) : eventos.filter(e => e.approved);

  // Define the handleRegresar function to navigate back
  const handleRegresar = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-[82.8vh] p-4 bg-gray-100">
       <button
          onClick={handleRegresar}
          className="text-gray-700 text-lg flex gap-2 items-center"
        >
          <span>&lt;</span> Regresar
        </button>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center mb-4">

        <div className="flex justify-end space-x-4" style={{ marginRight: "80px" }}>
          <TabButton label="aprobados" />
          <TabButton label="solicitudes" />
        </div>
        <div className="col-span-3 md:col-span-1 flex items-center space-x-4" style={{ marginLeft: "187px" }}>
          <label className="bg-gray-200 px-4 py-2 rounded-lg">Filtrar por fecha:</label>
          <input
            type="date"
            value={startDate}
            onChange={handleDateChange}
            className="px-3 py-2 border rounded-lg bg-gray-200 text-black focus:outline-none"
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eventosAMostrar.map((evento) => (
            <div key={evento.id} onClick={() => handleCardClick(evento)}>
              <EventoCard evento={evento} />
            </div>
          ))}
        </div>
      </div>

      {selectedEvento && (
        <Modal 
          evento={selectedEvento} 
          onClose={() => setSelectedEvento(null)} 
          onAccept={handleAccept} 
          onReject={handleReject}
        />
      )}

      {showConfirmation && <ConfirmationModal onClose={() => setShowConfirmation(false)} />}
      {showRejection && <RejectionModal onClose={() => setShowRejection(false)} />}
    </div>
  );
}
