import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation

const AsignarAlumno3 = ({ isOpen, title }) => {
  const [view, setView] = useState("asignar");
  const [dni, setDni] = useState(""); // Store the entered DNI
  const [clienteData, setClienteData] = useState([]); // Initialize as an array
  const [modalVisible, setModalVisible] = useState(isOpen); // Internal control of the modal
  const [clientId, setClientId] = useState(null); // Store the client ID
  const [staffId] = useState(4); // Staff ID, you can change it as needed
  const navigate = useNavigate(); // Hook for navigation

  const apiUrlUSERNAME = import.meta.env.VITE_APP_API_URL_USERNAME;
  const apiUrl25 = import.meta.env.VITE_APP_API_URL_25;

  const [user, setUser] = useState({});
 
  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Asignar Alumno 3:", role);
  console.log("token recibido en Asignar Alumno 3:", token);
  console.log("username recibido en Asignar Alumno 3:", username);

  

  useEffect(() => {
    if (token && username) {
      console.log("Datos recibidos:", { role, token, username });
      fetchUserName();
    }
  }, [role, token, username]); // Dependencias del useEffect // Dependencia de `navigate` // Dependencia de `token` y `username` para volver a ejecutar si estos cambian

  const fetchUserName = async () => {
    try {
      const response = await fetch(`${apiUrlUSERNAME}?username=${username}`);

      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }

      const data = await response.json();
      console.log("Respuesta de la API:", data);

      if (Array.isArray(data)) {
        if (data.length > 0) {
          setUser(data[0]);
        } else {
          console.error("El array está vacío");
          setUser({});
        }
      } else if (data && typeof data === "object") {
        setUser(data);
      } else {
        console.error("Formato inesperado en la respuesta de la API:", data);
        setUser({});
      }
    } catch (error) {
      console.error("Error al obtener la información del usuario", error);
    }
  };


  // Open the modal automatically when the component loads
  useEffect(() => {
    setModalVisible(true); // Show the modal when the component mounts
  }, []);

  // Handle modal closing and redirect to "/"
  const handleClose = () => {
    setModalVisible(false); // Close the modal
    navigate(`/?role=${role}&token=${token}&username=${username}`); // Redirect to the main page
  };

  const handleSearch = async () => {
    if (!dni) {
      alert("Por favor, ingresa un DNI.");
      return;
    }

    try {
      const response = await fetch(
        `${apiUrl25}?document=${dni}`
      );
      const data = await response.json();

      if (response.ok) {
        setClienteData(Array.isArray(data) ? data : [data]); // Ensure it's an array
        setClientId(data[0].client_id); // Assuming client ID is in data[0].client_id
        setView("cliente"); // Change to the client view
        console.log("API Response:", data);
      } else {
        alert("Cliente no encontrado.");
        setClienteData([]); // Clear the state if the client is not found
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
      const response = await fetch(
        `${apiUrl25}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: clientId,
            staff_id: staffId,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert(result.body.message); // Success message
        setView("terminada"); // Change to the "completed" view
      } else {
        alert(result.body.message); // Error message
      }
    } catch (error) {
      alert("Error al asignar el cliente: " + error.message);
    }
  };

  if (!modalVisible) {
    return null; // Don't render anything if the modal is not visible
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={handleClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={handleClose} // Close and redirect when "X" is clicked
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
          ) : view === "cliente" && clienteData.length > 0 ? (
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
                      src="/iconoP8.png"
                      alt="Logo"
                      className="h-48 w-48 object-contain"
                    />
                  </div>
                </div>
              ))}
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
                  src="/CheckLogo.png"
                  alt="Logo"
                  className="h-19 w-auto"
                />
              </div>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded mt-4"
                onClick={handleClose}
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
