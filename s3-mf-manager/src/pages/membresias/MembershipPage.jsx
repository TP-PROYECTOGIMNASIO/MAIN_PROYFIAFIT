import React, { useState } from 'react';
import MembershipTable from './MembershipTable';
import CreateMembershipModal from './CreateMembershipModal';

const Dashboard = () => {
  const [memberships, setMemberships] = useState([]); // Estado para guardar las membresías
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filter, setFilter] = useState('actives'); // Filtro por estado

  const handleAddMembership = (newMembership) => {
    setMemberships([...memberships, newMembership]); // Actualiza la lista de membresías
  };

  const filteredMemberships = memberships.filter(membership => 
    filter === 'actives' ? membership.isEnabled : !membership.isEnabled
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <button className="flex items-center text-black font-bold text-lg">
          <span className="mr-2">&larr;</span> Regresar
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

      <MembershipTable memberships={filteredMemberships} setMemberships={setMemberships} />

      {isCreateModalOpen && (
        <CreateMembershipModal
          onClose={() => setIsCreateModalOpen(false)}
          onAddMembership={handleAddMembership}
        />
      )}
    </div>
  );
};

export default Dashboard;



