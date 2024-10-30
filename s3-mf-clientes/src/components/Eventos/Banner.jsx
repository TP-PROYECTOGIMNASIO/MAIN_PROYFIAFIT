import React from 'react';

const Banner = () => {
  return (
    <section className="relative w-full h-[400px]">
      <img 
        src="ruta/de/tu/imagen-de-fondo.png" 
        alt="Fondo" 
        className="w-full h-full object-cover" 
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-end p-8">
        <div className="text-right space-y-4">
          <h1 className="text-red-700 text-5xl font-extrabold">BUILD YOUR BODY STRONG</h1> {/* Cambiado a text-red-700 */}
          <p className="text-white text-lg">INSCRÍBETE EN NUESTROS EVENTOS HECHOS PARA TI</p>
        </div>
      </div>
    </section>
  );
};

export default Banner;






