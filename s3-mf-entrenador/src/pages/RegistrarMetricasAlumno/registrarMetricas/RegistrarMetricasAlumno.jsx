import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { FaArrowLeft as ArrowLeftIcon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const ListaAlumnos = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/visualizar'); 
    };




    const [altura, setAltura] = useState("");
    const [peso, setPeso] = useState("");
    const [medidas, setMedidas] = useState({
        pecho: "",
        cintura: "",
        cadera: "",
        brazo: "",
        muslo: "",
        hombros: "",
        grasaCorporal: ""
    });
    const [objetivo, setObjetivo] = useState("");
    const [pesoIdeal, setPesoIdeal] = useState("");

    const handleSubmit = () => {
        console.log({
            altura,
            peso,
            medidas,
            objetivo,
            pesoIdeal
        });
    };

    return (
        <div className="flex flex-col items-center w-full min-h-screen p-4 bg-gray-100">
           <div className="flex items-center justify-between w-full mb-4 sm:mb-6">
            <Link to="/vista-no-registrado">
              <ArrowLeftIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />
            </Link> 
             </div>
            <main className="flex flex-col md:flex-row w-full p-4 bg-white shadow-md mt-4 space-y-4 md:space-y-0">
                <section className="text-black w-full md:w-1/3 p-4 bg-gray-50 ">
                    <h3 className="text-lg font-bold mb-2 border-b-2 border-red-600 pb-2">Ingresar Datos Básicos</h3>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="block mb-2">
                                <span className="text-gray-700">Altura (cm)</span>
                                <input
                                    type="number"
                                    value={altura}
                                    onChange={(e) => setAltura(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                    placeholder="Ingrese la altura"
                                />
                            </label>
                        </div>
                        <div>
                            <label className="block mb-2">
                                <span className="text-gray-700">Peso (kg)</span>
                                <input
                                    type="number"
                                    value={peso}
                                    onChange={(e) => setPeso(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                    placeholder="Ingrese el peso"
                                />
                            </label>
                        </div>
                    </div>
                </section>
                <section className="text-black w-full md:w-1/3 p-4 bg-gray-50 border-l-4">
                    <h3 className="text-lg font-bold mb-2 border-b-2 border-red-600 pb-2">Ingresar Medidas</h3>
                    <div className="flex flex-col gap-4">
                        {Object.keys(medidas).map(key => (
                            <label key={key} className="block mb-2">
                                <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                <input
                                    type="number"
                                    value={medidas[key]}
                                    onChange={(e) => setMedidas(prev => ({ ...prev, [key]: e.target.value }))}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                                    placeholder={`Ingrese ${key}`}
                                />
                            </label>
                        ))}
                    </div>
                </section>
                <section className="text-black w-full md:w-1/3 p-4 bg-gray-50 border-l-4 ">
                    <h3 className="text-lg font-bold mb-2 border-b-2 border-red-600 pb-2">Objetivos</h3>
                    <div className="mb-4">
                        <select
                            value={objetivo}
                            onChange={(e) => setObjetivo(e.target.value)}
                            className="block w-full text-white bg-red-600 border border-gray-300 rounded-md shadow-sm"
                        >
                            <option value="">Seleccionar Objetivo</option>
                            <option value="ganar_masa_muscular">Ganar Masa Muscular</option>
                            <option value="perdida_peso_grasa">Pérdida de Peso o Grasa</option>
                            <option value="mejorar_flexibilidad">Mejorar la Flexibilidad</option>
                            <option value="mejorar_resistencia">Mejorar la Resistencia</option>
                        </select>
                    </div>
                    <br/>
                    <label className="block mb-6">
                        <span className="text-gray-700">Peso Ideal (kg)</span>
                        <input
                            type="number"
                            value={pesoIdeal}
                            onChange={(e) => setPesoIdeal(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            placeholder="Ingrese el peso ideal"
                        />
                    </label>visualizar

                    <button
                        onClick={handleClick}
                        className="bg-red-600 text-white px-4 py-2 rounded-md">
                        Aceptar
                    </button>
                </section>
            </main>
        </div>
    );
};

export default ListaAlumnos;
