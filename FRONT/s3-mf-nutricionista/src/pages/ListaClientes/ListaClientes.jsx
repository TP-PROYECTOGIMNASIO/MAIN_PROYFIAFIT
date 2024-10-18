import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";

const API_URL = 'https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/empleados/hu-tp-35'

const ListaClientes = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembership, setSelectedMembership] = useState('');
  const [isRegisterMetricsModalOpen, setIsRegisterMetricsModalOpen] = useState(false);
  const [isMetricsRegistered, setMetricsRegistered] = useState(false); // Estado para manejar el mensaje de éxito

  const [metrics, setMetrics] = useState({
    weight: '',
    height: '',
    goals: '',
    imc: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
      
        const uniqueClients = {};
        
        data.users.forEach(user => {
          if (!uniqueClients[user.client_id]) {
            uniqueClients[user.client_id] = {
              client_id: user.client_id,
              nombres: user.names,
              document: user.document || '',
              genero: user.gender,
              membresia: user.membership_name,
              estadoPlan: user.plan_diet_status,
            };
          }
        });

       
        const formattedClients = Object.values(uniqueClients);
        setClients(formattedClients);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const openModal = async (client) => {
    setSelectedClient(null);
    setIsModalOpen(true);
    

    try {
      const response = await fetch(`${API_URL}?client_id=${client.client_id}`);
      const data = await response.json();
      const clientDetails = {
        ...client,
        ...data.client,
        body_metrics: data.body_metrics,
      };
      setSelectedClient(clientDetails);
    } catch (error) {
      console.error('Error fetching client details:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
  };

  const openRegisterMetricsModal = () => {
    setMetrics({ weight: '', height: '', goals: '', imc: '' }); // Resetea las métricas al abrir el modal
    setIsRegisterMetricsModalOpen(true);
    setMetricsRegistered(false); // Reinicia el estado de éxito
  };

  const openExitModal = () => {
    setMetricsRegistered(true); // Reinicia el estado de éxito
  };

  const closeExitModal = () => {
    closeModal();
    setMetricsRegistered(false);
  };

  const closeRegisterMetricsModal = () => {
    setIsRegisterMetricsModalOpen(false);
    setMetrics({ weight: '', height: '', goals: '', imc: '' });
    setMetricsRegistered(false); // Reinicia el estado de éxito al cerrar el modal
  };

  // Handle metric input changes
  const handleMetricsChange = (e) => {
    const { name, value } = e.target;
    setMetrics(prevMetrics => ({ ...prevMetrics, [name]: value }));
  };

  // Función para validar los campos
const validateMetrics = () => {
  const { weight, height, goals, imc } = metrics;
  if (!weight || isNaN(weight)) {
    alert("Por favor, ingrese un peso válido.");
    return false;
  }
  if (!height || isNaN(height)) {
    alert("Por favor, ingrese una altura válida.");
    return false;
  }
  if (!goals) {
    alert("Por favor, ingrese sus objetivos nutricionales.");
    return false;
  }
  if (!imc || isNaN(imc)) {
    alert("Por favor, ingrese un IMC válido.");
    return false;
  }
  return true;
};

// Actualizar la función de guardado de métricas
const registerMetrics = async () => {
  // Validar los campos antes de enviar
  if (!validateMetrics()) {
    return; // Salir si la validación falla
  }

  // Crea el objeto de datos para enviar
  const metricData = {
    weight: parseFloat(metrics.weight), // Peso convertido a número
    height: parseFloat(metrics.height), // Altura convertida a número
    name: metrics.goals, // Objetivos del cliente
    imc: parseFloat(metrics.imc) // IMC convertido a número
  };

  // ID DEL CLIENTE
  const bm_client = selectedClient.client_id // ID del cliente

   // Verifica que bm_client no sea undefined o null
   if (!bm_client) {
    console.error("El bm_client es obligatorio y no se está enviando.");
    alert("El bm_client es obligatorio y no se está enviando.");
    return;
  }

  try {
    const response = await fetch(`https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/metricas-alumno/hu-tp-89?bm_client=${selectedClient.client_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...metricData, bm_client }), // Envía metricData y bm_client como parte del JSON
    });

    if (!response.ok) {
      const errorDetails = await response.text(); // Captura el error detallado
      throw new Error(`Error al registrar métricas: ${response.status} - ${errorDetails}`);
    }

    const result = await response.json(); // Obtener la respuesta en formato JSON
    console.log("Métricas registradas:", result);
    
    // Actualiza el estado para mostrar el mensaje de éxito
    

    // Cerrar el modal y limpiar los datos después de registrar las métricas
     // Cerrar modal
    alert('Métricas registradas con éxito'); // Mensaje de éxito
    closeRegisterMetricsModal();
    closeModal();
    openExitModal();

  
    // Actualizar el cliente seleccionado en el estado (opcional)
    const updatedClient = {
      ...selectedClient,
      weight: metricData.weight,
      height: metricData.height,
      imc: metricData.imc,
      goals: metricData.name,
      hasMetrics: true, // Indica que el cliente tiene métricas registradas
    };

    setSelectedClient(updatedClient); // Actualiza el cliente seleccionado
  } catch (error) {
    console.error('Error al registrar métricas:', error); // Muestra el error en consola
    alert('Hubo un problema al registrar las métricas.'); // Mensaje de error
  }
};



  const handlePlanAlimenticio = () => {
    if (selectedClient && selectedClient.client_id) {
      console.log("Client ID:", selectedClient.client_id); // Verifica el valor aquí
      navigate(`/Plan-Nutricion?client_id=${selectedClient.client_id}`);
    }
  };
  
  

  const getBackgroundColor = (estadoPlan) => {
    switch (estadoPlan) {
      case 'No Generado':
        return '#3C4862';
      case 'Vigente':
        return '#1DAD20';
      case 'Vencido':
        return '#DE7D1B';
      default:
        return '#FFFFFF';
    }
  };

  const handleMembershipChange = (e) => {
    setSelectedMembership(e.target.value);
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearchTerm = 
      client.nombres.toLowerCase().includes(searchTerm.toLowerCase()) || 
      client.document.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMembership = selectedMembership ? client.membresia === selectedMembership : true;
    return matchesSearchTerm && matchesMembership;
  });

  const uniqueMemberships = [...new Set(clients.map(client => client.membresia))];

  return (
    <div className="bg-white shadow-md rounded p-8 m-8">
      
      <div className="mb-6 text-center">
        <h2 className="text-4xl font-semibold" style={{ color: '#834044' }}>Lista de Clientes</h2>
        <button
            onClick={() => window.history.back()}  className="text-gray-500 hover:text-gray-700 flex items-center" >
          <FaChevronLeft className="text-gray-500 text-sm mr-2" /> {/* Icono de flecha izquierda en color gris */}
          Regresar
        </button>

      </div>
      <div className="flex mb-6 items-center">
        <label 
          htmlFor="membershipSelect" 
          className="mr-2 text-black p-2 rounded bg-gray-200"
        >
          Membresía:
        </label>
        <select
          id="membershipSelect"
          className="p-2 border border-gray-300 rounded bg-gray-200 text-black"
          value={selectedMembership}
          onChange={handleMembershipChange}
        >
          <option value="">Todas</option>
          {uniqueMemberships.map((membership) => (
            <option key={membership} value={membership}>{membership}</option>
          ))}
        </select>
      </div>

      <div className="flex justify-end mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar..."
            className="p-3 pl-10 w-96 bg-gray-200 border border-gray-300 rounded-none text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 111.35-1.35 7.5 7.5 0 01-1.35 1.35z"
            />
          </svg>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="py-2 px-4 text-left text-black">Nombre Completo</th>
              <th className="py-2 px-4 text-left text-black">Estado de Plan</th>
           
              <th className="py-2 px-4 text-left text-black">Detalles</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.client_id}>
                <td className="border-t py-2 px-4 text-black">{client.nombres}</td>
                <td className="border-t py-2 px-4">
                  <span 
                    className="text-white" 
                    style={{ backgroundColor: getBackgroundColor(client.estadoPlan), padding: '2px 5px', borderRadius: '5px' }}
                  >
                    {client.estadoPlan}
                  </span>
                </td>
                
                <td className="border-t py-2 px-4">
                  <button
                    className="text-white py-2 px-6 rounded-md"
                    style={{ backgroundColor: '#b31b20' }}
                    onClick={() => openModal(client)}
                  >
                    Expandir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedClient && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-[600px] h-auto p-6 relative flex flex-col">
            <button
              className="absolute top-2 right-4 text-black text-2xl"
              style={{ backgroundColor: 'transparent', border: 'none' }}
              onClick={closeModal} >
              &times;
            </button>
            <div className="flex flex-col items-center mb-4">
              <div className="flex items-center justify-center mt-2 mb-4">
                <div className="w-32 h-32 bg-white flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-32 h-32 text-red-600"
                    fill="none"
                    viewBox="0 0 32 24"
                  >
                    <circle cx="16" cy="10" r="6" stroke="currentColor" strokeWidth="2" />
                    <path d="M6 26a10 10 0 0 1 20 0" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              </div>



              <div className="text-center w-full">
              <p><strong>Nombre Completo:</strong> {selectedClient.names} {selectedClient.father_last_name} {selectedClient.mother_last_name}</p>

              {/* Verificación de métricas corporales */}
              {typeof selectedClient.body_metrics === "object" ? (
                <>
                  <div className="flex justify-around items-center mt-2 space-x-2">
                    <p><strong>Género:</strong> {selectedClient.gender}</p>
                    <p><strong>Peso:</strong> {selectedClient.body_metrics.weight} kg</p>
                  </div>
                  <div className="flex justify-around items-center mt-2 space-x-2">
                    <p><strong>Objetivos Nutricionales:</strong> {selectedClient.body_metrics.goals}</p>
                    <p><strong>Altura:</strong> {selectedClient.body_metrics.height} cm</p>
                  </div>
                  <div className="flex justify-around items-center mt-2 space-x-2">
                    <p><strong>IMC:</strong> {selectedClient.body_metrics.imc}</p>
                  </div>
                  <div className="flex justify-center mt-6">
                    <button 
                      className="bg-red-600 text-white py-2 px-6 rounded-md"
                      onClick={handlePlanAlimenticio}
                    >
                      PLAN ALIMENTICIO
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/*<p className="mt-4 text-gray-600">{selectedClient.body_metrics}</p>*/}
                  {/* Mensaje alternativo si no hay métricas */}
                  <p className="mt-4 text-gray-600">Aun no cuenta con métricas registradas</p>
                  <div className="flex justify-center mt-6">
                  <button 
                                  className="bg-red-600 text-white py-2 px-6 rounded-md"
                                  onClick={openRegisterMetricsModal}
                                >
                                  REGISTRAR MÉTRICAS
                                </button>
                  </div>
                </>
              )}
            </div>



                        </div>
                      </div>
                    </div>
                  )}

{/* Modal para registrar métricas */}
{isRegisterMetricsModalOpen && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg w-[600px] h-auto p-6 relative flex flex-col">
      <button
        className="absolute top-2 right-4 text-black text-2xl"
        style={{ backgroundColor: 'transparent', border: 'none' }}
        onClick={closeRegisterMetricsModal}
      >
        &times;
      </button>
      <h2 className="text-red-700 text-xl font-bold text-center">REGISTRAR MÉTRICAS</h2>
      <div className="flex items-center justify-center mt-2 mb-4">
                <div className="w-32 h-32 bg-white flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-32 h-32 text-red-600"
                    fill="none"
                    viewBox="0 0 32 24"
                  >
                    <circle cx="16" cy="10" r="6" stroke="currentColor" strokeWidth="2" />
                    <path d="M6 26a10 10 0 0 1 20 0" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              </div>
      <div className="flex flex-col gap-4">
      <p><strong>Nombre Completo:</strong> {selectedClient.names} {selectedClient.father_last_name} {selectedClient.mother_last_name}</p>
      <p><strong>Género:</strong> {selectedClient.gender}</p>

        
        {/* Fila para Peso y Altura */}
        <div className="flex gap-4">
          <div className="flex items-center flex-1">
            <label className="font-medium w-1/3">Peso (kg):</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={metrics.weight}
              onChange={handleMetricsChange}
              placeholder="Peso"
              className="p-2 border border-gray-300 rounded flex-1" 
            />
          </div>
          <div className="flex items-center flex-1">
            <label className="font-medium w-1/3">Altura (cm):</label>
            <input
              type="number"
              id="height"
              name="height"
              value={metrics.height}
              step="0.01"
              onChange={handleMetricsChange}
              placeholder="Altura"
              className="p-2 border border-gray-300 rounded flex-1" 
            />
          </div>
        </div>
        
        {/* Fila para Objetivos Nutricionales y IMC */}
        <div className="flex gap-4">
          <div className="flex items-center flex-1">
            <label className="font-medium w-1/3">Objetivos Nutricionales:</label>
            <input
              type="text"
              id="goals"
              name="goals"
              value={metrics.goals}
              step="0.01"
              onChange={handleMetricsChange}
              placeholder="Objetivos"
              className="p-2 border border-gray-300 rounded flex-1" 
            />
          </div>
          <div className="flex items-center flex-1">
            <label className="font-medium w-1/3">IMC:</label>
            <input
              type="number"
              id="imc"
              name="imc"
              value={metrics.imc}
              step="0.01"
              onChange={handleMetricsChange}
              placeholder="IMC"
              className="p-2 border border-gray-300 rounded flex-1" 
            />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          {/* Botón para registrar métricas */}
          <button
            className="bg-red-600 text-white py-2 px-6 rounded-md"
            onClick={registerMetrics}
          >
            REGISTRAR MÉTRICAS
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      {isMetricsRegistered && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs w-full"> {/* Cambiado max-w-sm a max-w-xs */}
            <p className="text-red-600 font-bold text-center">Métricas Registradas Correctamente!</p>
            <div className="flex justify-center mt-4"> {/* Flexbox para centrar el botón */}
              <button 
                className="bg-red-600 text-white py-2 px-4 rounded-md" // Cambiado px-6 a px-4
                onClick={closeExitModal}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}





    </div>
  );
};

export default ListaClientes;

