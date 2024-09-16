import React from 'react';
import { Link } from 'react-router-dom'; 
import { FaArrowLeft as ArrowLeftIcon } from 'react-icons/fa';

const VisualizarMetricas = () => {

  
  
    return (
      <div className="flex flex-col items-center w-full min-h-screen p-4 sm:p-6 bg-gray-100">
        <main className="flex flex-col w-full p-6 sm:p-8 bg-white shadow-lg mt-6 max-w-4xl sm:max-w-5xl mx-auto rounded-lg">
          <div className="flex items-center justify-between w-full mb-4 sm:mb-6">
            <Link to="/registrar-metricas"> {/*solo cambia por el valor que desea regresar, debes de agregar el path que esta en APP.JSX*/}
              <ArrowLeftIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />
            </Link>
            <h1 className="bg-red-600 text-white text-sm sm:text-base px-3 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-red-700 transition duration-300">MARZO</h1>
          </div>
          <div className="text-black w-full mb-4 sm:mb-6">
            <p className="text-lg sm:text-2xl font-semibold text-left">Estas visualizando las métricas de ....</p>
          </div>
          <div className="w-full p-4 sm:p-6 mb-4 sm:mb-6 bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="text-black space-y-1 sm:space-y-2">
              <p className="text-base sm:text-xl"><span className="font-semibold">Altura:</span> 178cm</p>
              <p className="text-base sm:text-xl"><span className="font-semibold">Peso:</span> 85kg</p>
              <p className="text-base sm:text-xl"><span className="font-semibold">Bicep derecho:</span> 45cm</p>
              <p className="text-base sm:text-xl"><span className="font-semibold">Bicep izquierdo:</span> 46cm</p>
            </div>
            <div className="text-black space-y-1 sm:space-y-2">
              <p className="text-base sm:text-xl"><span className="font-semibold">Cadera:</span> 68cm</p>
              <p className="text-base sm:text-xl"><span className="font-semibold">Cintura:</span> 65cm</p>
              <p className="text-base sm:text-xl"><span className="font-semibold">Muslo derecho:</span> 35cm</p>
              <p className="text-base sm:text-xl"><span className="font-semibold">Muslo izquierdo:</span> 36cm</p>
            </div>
          </div>
          <div className="text-black w-full p-4 sm:p-6 mb-4 sm:mb-6 bg-gray-50">
            <p className="text-base sm:text-xl text-left"><span className="font-semibold">Objetivo:</span> Tonificar</p>
            <p className="text-base sm:text-xl text-left"><span className="font-semibold">Peso Ideal:</span> 75Kg.</p>
          </div>
          <p className="text-xs sm:text-sm text-black text-right mb-4 sm:mb-6">Generado el 04-04-2024</p>
          <button className="bg-gray-700 text-white px-4 py-2 rounded"> 
            ACTUALIZAR MÉTRICAS
          </button>
        </main>
      </div>
    );
};

export default VisualizarMetricas;
