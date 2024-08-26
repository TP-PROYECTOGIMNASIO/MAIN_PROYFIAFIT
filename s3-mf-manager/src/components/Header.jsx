import '../Header.css';
import logo from '../assets/3.png';
import profile from '../assets/profile.png';

export default function Header()  {
  return (
    <div className="header">
    <div className="header-container">
      <div className="logo-wrapper">
        <img src={logo} alt="Fia Fit Logo" className="logo"/> 
      </div>
      
      <div className="user-profile">
      <nav className="navigation">
        <a href="#" className="navigation-link">Inicio</a>
      </nav>
        <img src={profile} alt="User Profile" className="user-profile-picture" />
      </div>
    </div>
  </div>
  );
};

