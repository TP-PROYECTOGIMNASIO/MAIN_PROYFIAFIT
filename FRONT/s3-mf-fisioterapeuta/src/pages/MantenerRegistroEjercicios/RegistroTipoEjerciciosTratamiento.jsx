
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate

function RegistroTipoEjerciciosTratamiento() {
  const [name, setName] = useState(''); // Estado para el nombre
  const [description, setDescription] = useState(''); // Estado para la descripción
  const [loading, setLoading] = useState(false); // Estado para indicar si estamos esperando la respuesta
  const [message, setMessage] = useState(''); // Mensaje de confirmación o error
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros en Registro de Tipo de Ejercicios de Tratamiento:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Registro de Tipo de Ejercicios de Tratamiento:", role);
  console.log("token recibido en Registro de Tipo de Ejercicios de Tratamiento:", token);
  console.log("username recibido en Registro de Tipo de Ejercicios de Tratamiento:", username);


  // Manejo del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    if (!name || !description) {
      setMessage('Por favor, complete todos los campos.');
      setShowModal(true);
      return;
    }

    setLoading(true);

    const data = {
      name: name,
      description: description
    };

    try {
      // Realizamos la solicitud a la API
      const response = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/plan-de-tratamiento/HU-TP-40', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      // Verifica si la respuesta fue exitosa (código 2xx)
      if (response.ok) {
        const result = await response.json();
        // Si la respuesta es exitosa, muestra el mensaje de éxito
        console.log('Tipo de ejercicio registrado exitosamente:', result);
        setMessage(result.body?.message || 'Tipo de ejercicio registrado exitosamente.');
        setShowModal(true);
        setName('');
        setDescription('');
      } else {
        // Si la respuesta no es exitosa (por ejemplo, código 409 o cualquier error), muestra el error en la consola
        const errorResult = await response.json();
        console.error('Error al registrar el tipo de ejercicio:', errorResult);
        setMessage(errorResult?.error || 'Hubo un problema al registrar el tipo de ejercicio.');
        setShowModal(true);
      }
    } catch (error) {
      // Captura cualquier error relacionado con la red, como un fallo en la conexión con el servidor
      console.error('Error de red o de conexión con la API:', error);
      setMessage('Hubo un problema al conectar con el servidor.');
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  // Cerrar el modal
  const closeModal = () => {
    setShowModal(false);
    if (message.includes("exitosamente")) {
      navigate(`/tipos-ejercicio?role=${role}&token=${token}&username=${username}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Botón de regresar */}
      <div className="w-full max-w-md mb-6">
        <button
          className="text-gray-700 font-medium"
          onClick={() => window.history.back()}
        >
          &lt; Regresar
        </button>
      </div>

      {/* Formulario de registro */}
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center text-red-700 mb-6">
          REGISTRO DE TIPO DE EJERCICIOS DE TRATAMIENTO
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de nombre */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="nombre">
              NOMBRE:
            </label>
            <input
              id="nombre"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingrese el nombre"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-gray-200"
            />
          </div>

          {/* Campo de descripción */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="descripcion">
              DESCRIPCIÓN:
            </label>
            <input
              id="descripcion"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ingrese la descripción"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 bg-gray-200"
            />
          </div>

          {/* Botón de guardar */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-red-700 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-800"
              disabled={loading} // Deshabilitar el botón mientras se espera la respuesta
            >
              {loading ? 'Guardando...' : 'GUARDAR'}
            </button>
          </div>
        </form>
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">{message}</h2>
            <div className="text-center">
              <button
                className="bg-red-700 text-white py-2 px-4 rounded-lg hover:bg-red-800"
                onClick={closeModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistroTipoEjerciciosTratamiento;
