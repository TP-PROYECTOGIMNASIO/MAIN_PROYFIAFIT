import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { FaSearch as SearchIcon } from 'react-icons/fa'; 
import { FaArrowLeft as ArrowLeftIcon } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';

const VisualizarMetricas = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/registrar-metricas'); 
    };
    
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="flex flex-col items-center w-full min-h-screen p-4 sm:p-6 bg-gray-100">
            <div className="flex justify-between w-full mb-4 items-center">
                <Link to="/listar-alumnos" className="flex items-center">
                    <ArrowLeftIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />
                </Link>
                
                {/* Barra de búsqueda */}
                <div className="flex items-center ml-auto">
                    <input
                        type="text"
                        placeholder="Buscar por nombre"
                        className="p-2 border border-gray-300 rounded-l-md w-40 sm:w-32 md:w-40 text-black"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="p-2 bg-red-600 text-white rounded-r-md">
                        <SearchIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>

        
            <main className="flex flex-col w-full p-6 sm:p-8 bg-white shadow-lg mt-6 max-w-4xl sm:max-w-5xl mx-auto rounded-lg">
                <div className="text-black w-full mb-4 sm:mb-5">
                    <p className="text-lg sm:text-2xl font-semibold text-left">Estas visualizando las métricas de ....</p>
                </div>
                <div className="flex flex-col items-center w-full p-4 bg-gray-100">
                    <div className="w-full max-w-md p-5 mb-6 bg-red-600 text-center rounded-md shadow-md">
                        <p className="text-white text-lg font-semibold">Aún no se han registrado métricas</p>
                    </div>
                    <button className="bg-gray-600 text-white px-6 py-2 rounded-md shadow-md"
                     onClick={handleClick}>
                       Registrar Métricas
                    </button>
                </div>
            </main>
        </div>
    );
};

export default VisualizarMetricas;
