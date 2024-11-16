import React, { useState } from "react";
import defaultImage from '../assets/image_default.png'; // Ruta de la imagen por defecto

export default function EventosCard({ evento }) {
  const [imageSrc, setImageSrc] = useState(evento.image_url); // Establecemos la imagen inicial con la URL del evento

  const handleImageError = () => {
    if (imageSrc !== defaultImage) {
      setImageSrc(defaultImage); // Solo cambiamos a la imagen predeterminada si no está ya configurada
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-110 h-102 relative">
      {/* Imagen del evento */}
      <img 
        src={evento.image_url} 
        alt={evento.titulo} 
        className="w-full h-48 object-cover" 
        onError={handleImageError} // Llamamos a handleImageError si la imagen falla
      />
      
      {/* Cuadro rojo en el borde inferior izquierdo */}
      <div className="absolute bottom-0 left-0 w-[50px] h-[82px] bg-red-600 rounded-bl-[3px]"></div>
      
      {/* Contenido del card */}
      <div className="p-4 pl-14 pb-1 mt-0.5">
        <h3 className="text-l font-semibold">{evento.name}</h3>
        <p className="text-gray-600 mr-2">📍 Sede: {evento.location_id}</p>
        <p className="text-red-600 font-semibold mr-2">👥 Foro Disponible: {evento.capacity}</p>
      </div>
    </div>
  );
}
