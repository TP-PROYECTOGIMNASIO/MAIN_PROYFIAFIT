import { useState } from "react";
import Modal from "../../components/Modal";

export default function AsignarAlumno() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState("asignar");
  const [dni, setDni] = useState(""); // Para almacenar el DNI ingresado
  const [clienteData, setClienteData] = useState(null); // Para almacenar los datos del cliente

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setView("asignar");
    setDni("");
    setClienteData(null); // Corregido: usar coma en lugar de punto y coma
  };

  const handleSearch = async () => {
    if (!dni) {
      alert("Por favor, ingresa un DNI.");
      return;
    }

    try {
      const response = await fetch(`https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/empleados/hu-tp-25?document=${dni}`);
      const data = await response.json();

      if (response.ok) {
        setClienteData(data); // Almacenar los datos del cliente
        setView("cliente"); // Cambiar a la vista de cliente
      } else {
        alert("Cliente no encontrado.");
      }
    } catch (error) {
      alert("Error al buscar el cliente: " + error.message);
    }
  };

  const handleAssign = () => {
    setView("terminada");
  };

  return (
    <main className="min-h-[84vh]">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={toggleModal}
      >
        Asignar Alumno
      </button>

      <Modal isOpen={isModalOpen} onClose={toggleModal} title="Asignar Alumno">
        {view === "asignar" ? (
          <div className="bg-white p-6 rounded">
            <h3 className="text-3xl font-bold text-red-600 text-center mb-4">
              Asignar Alumno
            </h3>
            <p className="text-gray-700 mb-4 text-center">
              Por favor ingresar el DNI del cliente a asignar
            </p>
            <input
              type="text"
              placeholder="Ingrese el DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)} 
              className="border border-gray-300 bg-gray-100 text-black p-2 rounded w-full mb-4"
            />
            <div className="flex justify-center">
              <button
                className="bg-red-600 text-white px-6 py-2 rounded"
                onClick={handleSearch}
              >
                BUSCAR
              </button>
            </div>
          </div>
        ) : view === "cliente" && clienteData ? (
          <div className="bg-white p-8 rounded shadow-md">
            <div className="flex justify-center mb-4">
              <h3 className="text-3xl font-bold text-red-600">Cliente</h3>
            </div>
            <div className="flex justify-between">
              <div className="w-2/2 pr-6">
                <div className="flex flex-col space-y-2">
                  <p className="text-gray-700">DNI:</p>
                  <p className="text-gray-700 font-semibold">{clienteData.document}</p>
                  <p className="text-gray-700">Nombre:</p>
                  <p className="text-gray-700 font-semibold">{clienteData.names}</p>
                  <p className="text-gray-700">Apellido Paterno:</p>
                  <p className="text-gray-700 font-semibold">{clienteData.father_last_name}</p>
                  <p className="text-gray-700">Apellido Materno:</p>
                  <p className="text-gray-700 font-semibold">{clienteData.mother_last_name}</p>
                </div>
              </div>
              <div className="w-2/2 pl-6 flex justify-center">
                <img
                  src="./public/iconoP8.png"
                  alt="Logo"
                  className="h-auto w-auto"
                />
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                className="bg-red-600 text-white px-8 py-3 rounded"
                onClick={handleAssign}
              >
                ASIGNAR
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded text-center">
            <h3 className="text-2xl font-bold text-red-600 mb-4">
              Asignación Terminada
            </h3>
            <div className="flex justify-center">
              <img
                src="./public/CheckLogo.png"
                alt="Logo"
                className="h-19 w-auto"
              />
            </div>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded mt-4"
              onClick={toggleModal}
            >
              Ok
            </button>
          </div>
        )}
      </Modal>
    </main>
  );
}