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
      <div className="flex flex-col items-center gap-2"> {/* Flex column para centrar y espaciar */}
      {memberships.length > 0 ? (
          memberships.map((membership) => (
            <button
              key={membership.membership_id}
              className="bg-red-600 text-white py-2 px-8 rounded text-sm font-bold w-80 hover:bg-red-500 transition duration-200"
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