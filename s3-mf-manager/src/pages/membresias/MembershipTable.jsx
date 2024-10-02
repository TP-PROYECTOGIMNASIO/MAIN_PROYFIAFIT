import React, { useState } from 'react';
import MembershipDetailModal from './MembershipDetailModal';

const MembershipTable = ({ memberships, setMemberships, onDisableMembership }) => {
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);

  const handleMembershipClick = (membership) => {
    setSelectedMembership(membership);
    setDetailModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {memberships.length > 0 ? (
          memberships.map((membership) => (
            <button
              key={membership.id}
              className="bg-red-600 text-white py-4 rounded text-xl font-bold"
              onClick={() => handleMembershipClick(membership)}
            >
              {membership.name}
            </button>
          ))
        ) : (
          <p className="text-center">No hay membresías registradas.</p>
        )}
      </div>

      <MembershipDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        membership={selectedMembership}
        setMemberships={setMemberships}
        onDisableMembership={onDisableMembership}
      />
    </>
  );
};

export default MembershipTable;