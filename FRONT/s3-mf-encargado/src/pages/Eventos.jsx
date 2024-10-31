import React, { useState } from "react";
import EventoCard from "./Eventoscard";
import { FaMapMarkerAlt, FaUsers, FaCalendarAlt, FaCheckCircle, FaRegSadCry } from 'react-icons/fa';

import imagen1 from "../assets/image1.png";
import imagen2 from "../assets/image2.png";
import imagen3 from "../assets/image3.png";

const eventos = [
  {
    id: 1,
    titulo: "Reto Fitness Total",
    sede: "Santa Anita",
    foro: 15,
    imagen: imagen1,
  },
  {
    id: 2,
    titulo: "Maratón de Spinning",
    sede: "Santa Anita",
    foro: 20,
    imagen: imagen2,
  },
  {
    id: 3,
    titulo: "Clase Magistral de Yoga",
    sede: "Santa Anita",
    foro: 15,
    imagen: imagen3,
  },
];

function Modal({ evento, onClose, onAccept, onReject }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden w-[800px]">
        <div className="bg-[#B5121C] p-4 flex justify-between items-center">
          <span className="text-white text-lg font-bold"></span>
          <button onClick={onClose} className="text-white text-lg font-bold">X</button>
        </div>
        <div className="p-2">
          <div className="flex">
            <img src={evento.imagen} className="w-full h-46 w-1/3 mr-4" alt={evento.titulo} />
            <div className="w-2/3">
              <h2 className="text-xl font-bold">{evento.titulo}</h2>
              <p className="text-[#B5121C] mb-2"><strong>Descripción:</strong></p>
              <p>Un reto de varias semanas en el que los participantes tienen que superar diferentes desafíos de entrenamiento. Ideal para incrementar el compromiso y la motivación.</p>
              <p className="text-[#B5121C] mb-2"><strong>Requerimiento:</strong></p>
              <p>Se necesitará de 2 entrenadores y equipo de sonido.</p>
              <p className="flex items-center mb-2">
                <FaMapMarkerAlt className="mr-1 text-[#B5121C]" />
                <strong className="text-[#B5121C]">Sede:</strong> {evento.sede}
              </p>
              <p className="flex items-center mb-2">
                <FaUsers className="mr-1 text-[#B5121C]" />
                <strong className="text-[#B5121C]">Foro disponible:</strong> {evento.foro}
              </p>
              <p className="flex items-center mb-4">
                <FaCalendarAlt className="mr-1 text-[#B5121C]" />
                <strong className="text-[#B5121C]">Fecha:</strong> 20/10/2024 5:00 pm
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-4">
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

  const eventosAMostrar = tab === "solicitudes" ? eventos.slice(0, 2) : eventos;

  return (
    <div className="min-h-[81.8vh] p-4 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center mb-4">
        <div className="flex justify-end space-x-4" style={{ marginRight: "80px" }}>
          <TabButton label="aprobados" />
          <TabButton label="solicitudes" />
        </div>
        <div className="flex justify-end">
          <button className="bg-gray-200 px-4 py-2 rounded-lg flex items-center space-x-2" style={{ marginRight: "300px" }}>
            <span>Filtrar por Fecha</span>
            <FaCalendarAlt className="text-red-600" />
          </button>
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
          onAccept={() => {
            setShowConfirmation(true); 
            setSelectedEvento(null);
          }} 
          onReject={() => {
            setShowRejection(true);
            setSelectedEvento(null);
          }}
        />
      )}

      {showConfirmation && <ConfirmationModal onClose={() => setShowConfirmation(false)} />}
      {showRejection && <RejectionModal onClose={() => setShowRejection(false)} />}
    </div>
  );
}
