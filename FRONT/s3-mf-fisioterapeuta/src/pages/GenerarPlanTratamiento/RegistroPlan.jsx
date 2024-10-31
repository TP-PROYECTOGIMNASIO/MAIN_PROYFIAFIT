import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegistroPlan = () => {
  const [showModal, setShowModal] = useState(false);
  const [sesiones, setSesiones] = useState([]); // Estado para almacenar las sesiones.
  const [ejercicio, setEjercicio] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  // Función para mostrar la modal.
  const handleShowModal = () => {
    setShowModal(true);
  };

  // Función para cerrar la modal.
  const handleCloseModal = () => {
    setShowModal(false);
    setEjercicio(''); // Limpiar los campos.
    setFecha('');
    setHora('');
  };

  // Función para registrar la sesión
  const handleRegistrarSesion = () => {
    if (ejercicio && fecha && hora) {
      const nuevaSesion = {
        id: sesiones.length + 1, // Incrementa el número de sesión
        ejercicio,
        fecha,
        hora,
      };
      setSesiones([...sesiones, nuevaSesion]); // Agrega la nueva sesión al estado
      handleCloseModal(); // Cierra el modal y limpia los campos
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Botón de Regresar */}
      <header className="p-4">
      <button
      className="text-gray-700 font-medium"
      onClick={() => window.history.back()}
    >
      &lt; Regresar
    </button>
      </header>

      {/* Contenido Principal */}
      <main className="flex-grow flex flex-col justify-center items-center">
        {/* Contenedor Blanco */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl space-y-6">
          {/* Registrar Button */}
          <div className="flex justify-end">
            <button className="bg-red-700 text-white py-2 px-4 rounded-lg hover:bg-red-800 transition duration-300">
              REGISTRAR
            </button>
          </div>

          {/* Diagnóstico Input */}
          <div className="space-y-2">
            <label className="text-red-700 font-semibold text-lg block">
              DIAGNÓSTICO:
            </label>
            <textarea
              className="w-full h-24 p-3 bg-gray-200 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              placeholder="Escribe el diagnóstico..."
            />
          </div>

          {/* Indicaciones Input */}
          <div className="space-y-2">
            <label className="text-red-700 font-semibold text-lg block">
              INDICACIONES:
            </label>
            <textarea
              className="w-full h-24 p-3 bg-gray-200 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              placeholder="Escribe las indicaciones..."
            />
          </div>

          {/* Botón Agregar */}
          <div className="flex justify-end">
            <button
              className="text-red-700 font-semibold hover:underline"
              onClick={handleShowModal}
            >
              + AGREGAR
            </button>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    N° SESSION
                  </th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    EJERCICIO
                  </th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    FECHA
                  </th>
                  <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    HORA
                  </th>
                </tr>
              </thead>
              <tbody>
                {sesiones.map((sesion) => (
                  <tr key={sesion.id}>
                    <td className="py-2 px-4 text-sm text-gray-700">{sesion.id}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">{sesion.ejercicio}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">{sesion.fecha}</td>
                    <td className="py-2 px-4 text-sm text-gray-700">{sesion.hora}</td>
                  </tr>
                ))}
                {sesiones.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-2 px-4 text-center text-sm text-gray-500">
                      No hay sesiones registradas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md mx-4 space-y-4">
            <h2 className="text-center text-xl font-semibold text-gray-700">Registrar Sesión</h2>

            {/* Formulario del Modal */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Ejercicio</label>
                <select
                  className="w-full p-3 bg-gray-200 rounded-lg border border-gray-300 focus:outline-none"
                  value={ejercicio}
                  onChange={(e) => setEjercicio(e.target.value)}
                >
                  <option value="">Seleccionar Ejercicio</option>
                  <option value="Ejercicio 1">Ejercicio 1</option>
                  <option value="Ejercicio 2">Ejercicio 2</option>
                  <option value="Ejercicio 3">Ejercicio 3</option>
                  {/* Agregar más opciones aquí */}
                </select>
              </div>

              <div>
                <label className="block text-gray-700">Fecha Disponible</label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full p-3 bg-gray-200 rounded-lg border border-gray-300 focus:outline-none"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                  />
                  <span className="absolute right-3 top-3 text-gray-500">
                    <i className="fas fa-calendar"></i>
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-gray-700">Hora Disponible</label>
                <select
                  className="w-full p-3 bg-gray-200 rounded-lg border border-gray-300 focus:outline-none"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                >
                  <option value="">Seleccionar Hora</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  {/* Agregar más opciones aquí */}
                </select>
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-between mt-6">
              <button
                className="bg-red-700 text-white py-2 px-4 rounded-lg hover:bg-red-800 transition duration-300"
                onClick={handleRegistrarSesion}
              >
                REGISTRAR
              </button>
              <button
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
                onClick={handleCloseModal}
              >
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistroPlan;
