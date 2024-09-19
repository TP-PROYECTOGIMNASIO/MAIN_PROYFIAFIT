import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const MisResultados = () => {

    const navigate = useNavigate();

const handleClick = () => {
    navigate('/listar-alumnos'); 
};


    const altura = "175 cm";
    const imc = "23.5";
    const peso = "70 kg";
    const objetivos = "Ganar Masa Muscular";
    const nuevoIMC = "27"; 

    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    

    return (
        <div className="relative flex flex-col items-center w-full min-h-screen p-4 bg-gray-100">
            <div className="absolute top-4 left-0 right-0 flex justify-between px-4 z-10">
            <button
            className="bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={handleClick}
        
        >
            Regresar
        </button>
                <select
                    className="bg-red-600 text-white border border-red-600 rounded-md p-2"
                >
                    {months.map((month, index) => (
                        <option key={index} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>

            <main className="w-full max-w-4xl p-4 bg-white shadow-md mt-16 pt-12">
                <h2 className=" text-center text-red-600 text-2xl font-bold mb-4">Mis Resultados</h2>
                
                <div className="text-black text-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                    <div className="p-4 border border-gray-300 rounded-md shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Altura</h3>
                        <p className="text-gray-700">{altura}</p>
                    </div>
                    <div className="p-4 border border-gray-300 rounded-md shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">IMC</h3>
                        <p className="text-gray-700">{imc}</p>
                    </div>
                    <div className="p-4 border border-gray-300 rounded-md shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Peso</h3>
                        <p className="text-gray-700">{peso}</p>
                    </div>
                    <div className="p-4 border border-gray-300 rounded-md shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Objetivos</h3>
                        <p className="text-gray-700">{objetivos}</p>
                    </div>
                    <div className="p-4 border border-gray-300 rounded-md shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">IMC (Nuevo)</h3>
                        <p className="text-gray-700">{nuevoIMC}</p>
                    </div>
                </div>
                
                <div className="text-black p-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm">
                    <h3 className="text-center text-lg font-semibold mb-2">Consejo</h3>
                    <p className="text-gray-700">Tu IMC es {imc}. Asegúrate de mantener una dieta equilibrada y realizar ejercicio regularmente para alcanzar tus objetivos.</p>
                </div>
            </main>
        </div>
    );
};

export default MisResultados;
