import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import HeroImage from '../../assets/fondo.jpeg';

const HomePage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Imagen a la izquierda */}
            <h1 className='bg-gradient-to-b from-white to-red-100 text-center text-red-600 p-4 text-lg sm:text-xl font-bold'>BIENVENIDO ENTRENADOR</h1>
            <main className="flex flex-col sm:flex-row items-center justify-center p-4 sm:p-6 flex-grow bg-gradient-to-b from-white to-red-100">
                <section className="flex flex-col items-center sm:w-1/2 mb-8 sm:mb-0 relative sm:mr-4">
                    {/* Texto "ESTAR FUERTE" centrado arriba del div rojo con espaciado entre letras */}
                    <p className="text-black text-base font-normal absolute top-0 left-1/2 transform -translate-x-1/2 mt-2 tracking-wider sm:text-lg">
                        ESTAR FUERTE
                    </p>
                    <div className="text-center relative bg-red-600 text-white py-6 px-8 rounded-md shadow-md max-w-md w-full mt-8">
                        <h1 className="text-3xl sm:text-5xl font-extrabold mb-4">TOMA CUIDADO DE TU CUERPO</h1>
                        <div className="bg-red-800 text-white py-1 px-4 rounded-md inline-block absolute right-4 bottom-4">
                            <p className="text-xs sm:text-sm font-semibold">BE HEALTHY</p>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col space-y-4 sm:w-1/3 items-center mt-8 sm:mt-0 w-full sm:ml-auto sm:mr-8">
                    <Link to="/" className="bg-white text-red-600 p-4 rounded-md shadow-md w-full sm:w-3/4 max-w-xs sm:max-w-md flex flex-col items-start text-left">
                        <span className="text-sm font-semibold">VER</span>
                        <span className="text-lg sm:text-xl font-bold">CALCULAR METRICAS</span>
                    </Link>
                    <Link to="/" className="bg-white text-red-600 p-4 rounded-md shadow-md w-full sm:w-3/4 max-w-xs sm:max-w-md flex flex-col items-start text-left">
                        <span className="text-sm font-semibold">VER</span>
                        <span className="text-lg sm:text-xl font-bold">ALUMNOS CHECKIN</span>
                    </Link>
                    <Link to="/" className="bg-white text-red-600 p-4 rounded-md shadow-md w-full sm:w-3/4 max-w-xs sm:max-w-md flex flex-col items-start text-left">
                        <span className="text-sm font-semibold">VER</span>
                        <span className="text-lg sm:text-xl font-bold">EDITAR RANGO</span>
                    </Link>
                    <Link to="/asignar-alumno" className="bg-white text-red-600 p-4 rounded-md shadow-md w-full sm:w-3/4 max-w-xs sm:max-w-md flex flex-col items-start text-left">
                        <span className="text-sm font-semibold">VER</span>
                        <span className="text-lg sm:text-xl font-bold">ASIGNAR ALUMNO</span>
                    </Link>
                </section>
            </main>
        </div>
    );
};



export default HomePage;