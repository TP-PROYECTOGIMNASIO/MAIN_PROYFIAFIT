import React from 'react';

const EventCard = ({ title, location, slots, img, date }) => {
  return (
    <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 max-w-xs mx-auto text-center border border-gray-200">
      <div className="relative w-full h-40 bg-cover bg-center rounded-t-lg overflow-hidden" style={{ backgroundImage: `url(${img})` }}>
        <div className="absolute top-2 left-0 right-0 flex justify-center">
          <p className="bg-white px-2 py-1 rounded-md text-red-500 text-lg font-semibold">{date}</p>
        </div>
      </div>
      
      <div className="flex flex-col items-center mt-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-500">{location}</p>
        <p className="text-red-700 font-medium mt-2">Foro disponible: {slots}</p>
      </div>
    </div>
  );
};

export default EventCard;







