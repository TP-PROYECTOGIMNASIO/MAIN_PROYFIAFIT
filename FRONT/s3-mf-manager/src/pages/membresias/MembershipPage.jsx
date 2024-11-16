import React, { useEffect, useState } from 'react';
import MembershipTable from './MembershipTable';
import CreateMembershipModal from './CreateMembershipModal';

const MembershipPage = () => {
  const [memberships, setMemberships] = useState([]); // Estado para guardar las membresías
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filter, setFilter] = useState('actives'); // Filtro por estado
  const [selectedMembership, setSelectedMembership] = useState(null); // Estado para la membresía seleccionada

  // Llamada a la API para obtener las membresías al cargar el componente
  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL_GET); // Usar la variable de entorno para obtener las membresías
        const data = await response.json();

        if (response.ok) {
          setMemberships(data.memberships || []); // Asume que la API devuelve un objeto con un array de membresías
        } else {
          console.error('Error fetching memberships:', data.message);
        }
      } catch (error) {
        console.error('Error fetching memberships:', error);
      }
    };

    fetchMemberships();
  }, []);

  const handleAddMembership = async (newMembership) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL_POST, {
        method: 'POST', // Usar el enlace de la variable de entorno para agregar una nueva membresía
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMembership),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error adding membership');
      }

      const addedMembership = await response.json();
      setMemberships((prevMemberships) => [...prevMemberships, addedMembership]); // Actualiza la lista de membresías con la nueva
    } catch (error) {
      console.error('Error adding membership:', error);
    }
  };

  const handleUpdateMembership = async (id, action) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL_GET, {
        method: 'PUT', // Usar el enlace de la variable de entorno para actualizar una membresía
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error updating membership');
      }

      const updatedMembership = await response.json();
      setMemberships((prevMemberships) => prevMemberships.map(membership =>
        membership.membership_id === updatedMembership.membership.membership_id ? updatedMembership.membership : membership
      ));
    } catch (error) {
      console.error('Error updating membership:', error);
    }
  };

  const handleViewDetails = (membership) => {
    setSelectedMembership(membership); // Establece la membresía seleccionada
  };

  const handleDisableMembership = (id, action) => {
    handleUpdateMembership(id, action); // Actualiza el estado de la membresía a inactiva
  };

  const filteredMemberships = memberships.filter((membership) =>
    filter === 'actives' ? membership.active : !membership.active
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => window.history.back()}
          className="text-black-500 hover:text-gray-700 flex items-center">
          <i className="fas fa-arrow-left mr-2"></i> Regresar
        </button>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-red-600 text-white py-2 px-4 rounded flex items-center"
        >
          <span className="mr-2 text-lg">+</span> Registrar Nueva Membresía
        </button>
      </div>

      {/* Filtros */}
      <div className="flex items-center mb-4">
        <span className="mr-2">Ordenar por:</span>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-2"
        >
          <option value="actives">Activas</option>
          <option value="inactives">Inactivas</option>
        </select>
      </div>

      <MembershipTable 
        memberships={filteredMemberships} 
        onViewDetails={handleViewDetails} // Función para ver detalles
        onDisableMembership={handleDisableMembership} // Pasar la función para deshabilitar
      />

      {isCreateModalOpen && (
        <CreateMembershipModal
          onClose={() => setIsCreateModalOpen(false)}
          onAddMembership={handleAddMembership}
        />
      )}

      {/* Detalles de la membresía seleccionada */}
      {selectedMembership && (
        <div className="mt-8 p-4 border rounded">
          <h2 className="text-lg font-bold">Detalles de la Membresía</h2>
          <p><strong>Nombre:</strong> {selectedMembership.name}</p>
          <p><strong>Precio:</strong> {selectedMembership.price}</p>
          <p><strong>Estado:</strong> {selectedMembership.active ? 'Activa' : 'Inactiva'}</p>
          <button
            onClick={() => handleDisableMembership(selectedMembership.membership_id, selectedMembership.active)}
            className="bg-red-600 text-white py-2 px-4 mt-4 rounded"
          >
            Deshabilitar
          </button>
          <button
            onClick={() => setSelectedMembership(null)}
            className="bg-gray-300 text-black py-2 px-4 mt-2 rounded"
          >
            Cerrar Detalles
          </button>
        </div>
      )}
    </div>
  );
};

export default MembershipPage;



