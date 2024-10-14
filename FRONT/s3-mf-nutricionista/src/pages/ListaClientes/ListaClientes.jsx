import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ListaClientes = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembership, setSelectedMembership] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/empleados/hu-tp-35');
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
      const response = await fetch(`https://3zn8rhvzul.execute-api.us-east-2.amazonaws.com/api/empleados/hu-tp-35?client_id=${client.client_id}`);
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
            onClick={() => window.history.back()}
            className="absolute top-32 left-5 text-gray-600 text-2xl hover:text-black"
            >
          <span>&lt; Regresar</span>
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
              onClick={closeModal}
            >
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
                <p><strong>Nombre Completo:</strong> {selectedClient.nombres}</p>
                <div className="flex justify-around items-center mt-2 space-x-2">

                  <p><strong>Género:</strong> {selectedClient.genero}</p>
                  <p><strong>Peso:</strong> {selectedClient.body_metrics.weight} kg</p>
                </div>
                <div className="flex justify-around items-center mt-2 space-x-2">
                <p><strong>Objetivos Nutricionales:</strong> {selectedClient.body_metrics.goal}</p>

                  <p><strong>Altura:</strong> {selectedClient.body_metrics.height} m</p>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaClientes;

