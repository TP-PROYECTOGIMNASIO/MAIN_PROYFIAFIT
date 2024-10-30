import React from "react";

export default function EventosCard({ evento }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-110 h-102 relative"> {/* Cambia 'h-72' por el tamaño deseado */}
      <img src={evento.imagen} alt={evento.titulo} className="w-full h-48 object-cover" />
      {/* Cuadro rojo pegado al borde del card */}
      <div className="absolute bottom-0 left-0 w-[50px] h-[72px] bg-red-600 rounded-bl-[3px]"></div>
      <div className="p-4 pl-14 pb-1 mt-0.5"> {/* Ajuste de padding izquierdo para no solapar el cuadro rojo */}
        <h3 className="text-l font-semibold">{evento.titulo}</h3>
        <p className="text-gray-600">📍 Sede {evento.sede}</p>
        <p className="text-red-600 font-semibold">👥 Foro Disponible {evento.foro}</p>
      </div>
    </div>
  );
}
