import React, { useState } from 'react';
import NewMembershipForm from '../../components/Membresias/newMembershipForm'
import ConfirmPopup from '../../components/Membresias/ConfirmPopup';
import MembershipDetailPopup from '../../components/Membresias/MembershipDetailPopup';
import DisableConfirmationPopup from '../../components/Membresias/DisableConfirmationPopup';
import './MembershipPage.css';
import { Link } from "react-router-dom";

const MembershipPage = () => {
  const [memberships, setMemberships] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [showDisablePopup, setShowDisablePopup] = useState(false);
  const [showEnablePopup, setShowEnablePopup] = useState(false); // Nueva variable de estado para activar membresías
  const [newMembershipData, setNewMembershipData] = useState(null);
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [filter, setFilter] = useState('activas'); // Estado para el filtro

  const handleAddMembership = (newMembership) => {
    setMemberships([...memberships, { ...newMembership, active: true }]);
    setShowConfirmPopup(false);
    setNewMembershipData(null);
  };

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleConfirm = () => {
    if (newMembershipData) {
      handleAddMembership(newMembershipData);
    }
  };

  const handleCancel = () => {
    setShowConfirmPopup(false);
    setShowPopup(false);
  };

  const handleShowDetailPopup = (membership) => {
    setSelectedMembership(membership);
    setShowDetailPopup(true);
  };

  const handleCloseDetailPopup = () => {
    setShowDetailPopup(false);
    setSelectedMembership(null);
  };

  const handleToggleStatus = (membership) => {
    setSelectedMembership(membership);
    if (membership.active) {
      setShowDisablePopup(true); // Muestra el pop-up para deshabilitar
    } else {
      setShowEnablePopup(true); // Muestra el pop-up para activar
    }
  };

  const handleDisableConfirm = () => {
    setMemberships(memberships.map(m =>
      m === selectedMembership ? { ...m, active: false } : m
    ));
    setShowDisablePopup(false);
    setShowDetailPopup(false);
    setFilter('inactivas'); // Cambia el filtro a "inactivas" después de deshabilitar
  };

  const handleEnableConfirm = () => {
    setMemberships(memberships.map(m =>
      m === selectedMembership ? { ...m, active: true } : m
    ));
    setShowEnablePopup(false);
    setShowDetailPopup(false);
    setFilter('activas'); // Cambia el filtro a "activas" después de habilitar
  };

  const handleUpdateMembership = (updatedMembership) => {
    setMemberships(
      memberships.map((m) =>
        m.name === updatedMembership.name ? updatedMembership : m
      )
    );
    handleCloseDetailPopup();
  };

  const filteredMemberships = memberships.filter(m =>
    filter === 'activas' ? m.active : !m.active
  );

  return (
    <div className="membership-container">

      <main className="main-content">
        <div className="top-buttons">
        <Link to="/">
            <button className="back-button">&larr; Regresar</button>
        </Link>
          <button className="register-button" onClick={handleShowPopup}>
            + Registrar Nueva Membresía
          </button>
        </div>

        <div className="order-section">
          <button className="order-button">Ordenar por</button>
          <select
            className="order-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="activas">Activas</option>
            <option value="inactivas">Inactivas</option>
          </select>
        </div>

        <div className="membership-buttons">
          {filteredMemberships.map((membership, index) => (
            <div
              key={index}
              className={`membership-item ${membership.active ? '' : 'inactive'}`}
              onClick={() => handleShowDetailPopup(membership)}
            >
              {membership.name} {/* Solo muestra el nombre de la membresía */}
            </div>
          ))}
        </div>

      </main>
      {showPopup && (
        <div className="popup">
          <NewMembershipForm
            onAddMembership={(membership) => {
              setNewMembershipData(membership);
              setShowConfirmPopup(true);
              setShowPopup(false);
            }}
            onClose={handleClosePopup}
          />
        </div>
      )}

      {showConfirmPopup && (
        <ConfirmPopup
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      {showDetailPopup && selectedMembership && (
        <MembershipDetailPopup
          membership={selectedMembership}
          onClose={handleCloseDetailPopup}
          onToggleStatus={handleToggleStatus}
          onUpdateMembership={handleUpdateMembership}
        />
      )}

      {showDisablePopup && (
        <DisableConfirmationPopup
          onConfirm={handleDisableConfirm}
          onCancel={() => setShowDisablePopup(false)}
        />
      )}

      {showEnablePopup && (
        <DisableConfirmationPopup
          onConfirm={handleEnableConfirm}
          onCancel={() => setShowEnablePopup(false)}
        />
      )}
    </div>
  );
};

export default MembershipPage;















