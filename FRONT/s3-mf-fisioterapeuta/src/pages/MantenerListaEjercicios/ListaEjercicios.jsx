import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate

const ejerciciosData = [
  { tipo: 'Fortalecimiento', nombre: 'Isométrico', descripcion: 'Ejercicio de fuerza', activo: true },
  { tipo: 'Estiramiento', nombre: 'De gemelos', descripcion: 'Estiramiento de piernas', activo: true },
  { tipo: 'Equilibrio', nombre: 'En bosu', descripcion: 'Ejercicio de balance', activo: true },
  { tipo: 'Movilidad', nombre: 'Rotación de Tobillo', descripcion: 'Ejercicio de articulación', activo: true },
];

const ListaEjercicios = () => {
  const [filtroTipo, setFiltroTipo] = useState('Todas');
  const [mostrarActivos, setMostrarActivos] = useState(true);
  const [ejercicios, setEjercicios] = useState(ejerciciosData);

  const navigate = useNavigate(); // Define el hook useNavigate

  const filtrarEjercicios = () => {
    return ejercicios.filter(
      (ejercicio) =>
        (filtroTipo === 'Todas' || ejercicio.tipo === filtroTipo) &&
        ejercicio.activo === mostrarActivos
    );
  };

  const toggleEstadoEjercicio = (nombre) => {
    const updatedEjercicios = ejercicios.map((ejercicio) => {
      if (ejercicio.nombre === nombre) {
        return { ...ejercicio, activo: !ejercicio.activo };
      }
      return ejercicio;
    });
    setEjercicios(updatedEjercicios);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="p-4 bg-white shadow-md flex justify-between items-center">
      <button
      className="text-gray-700 font-medium"
      onClick={() => window.history.back()}
    >
      &lt; Regresar
    </button>        
        <h1 className="text-red-600 text-xl font-bold">LISTA DE EJERCICIOS DE TRATAMIENTO</h1>
        <div className="flex flex-col items-end space-y-2">
          
        </div>
      </header>

      <main className="flex-grow p-6">
        <div className="flex">
          {/* Filtros de selección */}
          <aside className="w-1/4">
            <h2 className="font-bold text-lg mb-4">SELECCIONAR</h2>
            <div className="space-y-2">
              {['Todas', 'Fortalecimiento', 'Estiramiento', 'Equilibrio', 'Movilidad'].map((tipo) => (
                <button
                  key={tipo}
                  className={`block w-full text-left px-4 py-2 rounded-md font-medium ${
                    filtroTipo === tipo
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
                  onClick={() => setFiltroTipo(tipo)}
                >
                  {tipo}
                </button>
              ))}
            </div>
          </aside>

          {/* Lista de ejercicios */}
          <div className="w-3/4 ml-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <select
                  value={mostrarActivos ? 'Activos' : 'Desactivados'}
                  onChange={(e) => setMostrarActivos(e.target.value === 'Activos')}
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  <option value="Activos">Activos</option>
                  <option value="Desactivados">Desactivados</option>
                </select>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <Link to="/RegistroEjerciciosTratamiento"  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                  + Registrar Nuevo EJERCICIO
                </Link>
                <Link to="/tipos-ejercicio" className="text-red-600 flex items-center">
                  <FaEye className="mr-2" />
                  Ver Tipos Ejercicio Tratamiento
                </Link>
              </div>
            </div>

            {/* Tabla de ejercicios */}
            <table className="min-w-full bg-white shadow-md rounded-md">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="py-2 px-4">TIPO</th>
                  <th className="py-2 px-4">Nombre</th>
                  <th className="py-2 px-4">Descripción</th>
                  <th className="py-2 px-4">ACCIÓN</th>
                </tr>
              </thead>
              <tbody>
                {filtrarEjercicios().map((ejercicio) => (
                  <tr key={ejercicio.nombre} className="border-t">
                    <td className="py-2 px-4">{ejercicio.tipo}</td>
                    <td className="py-2 px-4">{ejercicio.nombre}</td>
                    <td className="py-2 px-4">{ejercicio.descripcion}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => toggleEstadoEjercicio(ejercicio.nombre)}
                        className={`bg-${
                          ejercicio.activo ? 'red' : 'green'
                        }-600 text-white px-4 py-2 rounded-md hover:bg-${
                          ejercicio.activo ? 'red' : 'green'
                        }-700`}
                      >
                        {ejercicio.activo ? 'DESACTIVAR' : 'HABILITAR'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListaEjercicios;
