import React from 'react';
import './styles/Header.css'; // Path to your CSS file

const Header = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <img 
          src="/images/logo1.jpg" 
          alt="Logo" 
          className="logo-image" 
        />
      </div>
      <div className="header-space"></div>
      <div className="header-button">
        <button className="logout-button">Salir</button>
      </div>
      <div className="header-profile">
        <img 
          src="/images/logo2.jpg" 
          alt="Profile" 
          className="profile-image" 
        />
      </div>
    </header>
  );
};

export default Header;
