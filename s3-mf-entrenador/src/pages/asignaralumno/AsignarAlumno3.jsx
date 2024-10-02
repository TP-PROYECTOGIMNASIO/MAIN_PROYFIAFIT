import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importar el hook para la navegación

const AsignarAlumno3 = ({ isOpen, title }) => {
  const [view, setView] = useState("asignar");
  const [dni, setDni] = useState(""); // Para almacenar el DNI ingresado
  const [clienteData, setClienteData] = useState([]); // Inicializar como array
  const [modalVisible, setModalVisible] = useState(isOpen); // Control interno del modal
  const [clientId, setClientId] = useState(null); // Almacenar el ID del cliente
  const [staffId] = useState(4); // ID del personal, puedes cambiarlo según corresponda
  const navigate = useNavigate(); // Hook para la navegación

  // Abrir el modal automáticamente cuando se carga el componente
  useEffect(() => {
    setModalVisible(true); // Mostrar el modal cuando el componente se monta
  }, []);

  // Manejar el cierre del modal y redirigir a "/"
  const handleClose = () => {
    setModalVisible(false); // Cerrar el modal
    navigate("/"); // Redirigir a la página principal
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
        setClienteData(Array.isArray(data) ? data : [data]); // Asegurarse de que sea un array
        setClientId(data[0].client_id); // Suponiendo que el ID del cliente está en data[0].id
        setView("cliente"); // Cambiar a la vista de cliente
        console.log("Respuesta de la API:", data);
      } else {
        alert("Cliente no encontrado.");
        setClienteData([]); // Limpiar el estado si no se encuentra el cliente
      }
    } catch (error) {
      alert("Error al buscar el cliente: " + error.message);
    }
  };

  const handleAssign = async () => {
    if (!clientId) {
      alert("No se ha encontrado un cliente para asignar.");
      return;
    }

    try {
      const response = await fetch(`https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/empleados/hu-tp-25`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          staff_id: staffId,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.body.message); // Mensaje de éxito
        setView("terminada"); // Cambiar a la vista de terminada
      } else {
        alert(result.body.message); // Mensaje de error
      }
    } catch (error) {
      alert("Error al asignar el cliente: " + error.message);
    }
  };

  if (!modalVisible) {
    return null; // No renderizar nada si el modal no está visible
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={handleClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={handleClose} // Cerrar y redirigir al presionar "X"
          >
            ✖
          </button>
        </div>
        <div>
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
          ) : view === "cliente" && clienteData.length > 0 ? ( // Verificar que haya clientes
            <div className="bg-white p-8 rounded shadow-md">
              <div className="flex justify-center mb-4">
                <h3 className="text-3xl font-bold text-red-600">Clientes</h3>
              </div>
              {clienteData.map((cliente) => (
                <div key={cliente.document} className="flex justify-between mb-4">
                  <div className="w-1/2 pr-6">
                    <div className="flex flex-col space-y-2">
                      <p className="text-gray-700">DNI:</p>
                      <p className="text-gray-700 font-semibold">{cliente.document}</p>
                      <p className="text-gray-700">Nombre:</p>
                      <p className="text-gray-700 font-semibold">{cliente.names}</p>
                      <p className="text-gray-700">Apellido Paterno:</p>
                      <p className="text-gray-700 font-semibold">{cliente.father_last_name}</p>
                      <p className="text-gray-700">Apellido Materno:</p>
                      <p className="text-gray-700 font-semibold">{cliente.mother_last_name}</p>
                    </div>
                  </div>
                  <div className="w-1/2 pl-6 flex justify-center">
                    <img
                      src="/iconoP8.png" // Ruta correcta para imágenes estáticas
                      alt="Logo"
                      className="h-48 w-48 object-contain"
                    />
                  </div>
                </div>
              ))}
              <div className="flex justify-center mt-6">
                <button
                  className="bg-red-600 text-white px-8 py-3 rounded"
                  onClick={handleAssign} // Llamar a la función de asignación
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
                  src="/CheckLogo.png" // Ruta correcta para imágenes estáticas
                  alt="Logo"
                  className="h-19 w-auto"
                />
              </div>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded mt-4"
                onClick={handleClose} // Cerrar el modal cuando termina y redirigir
              >
                Ok
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AsignarAlumno3;