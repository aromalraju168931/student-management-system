import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="brand-main">ADMINISTRATION</span>
        <span className="brand-sub">Panel</span>
      </div>

      <div className="nav-links">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
          <span>📊</span> Dashboard
        </NavLink>
        
        <NavLink to="/add" className={({ isActive }) => isActive ? "active" : ""}>
          <span>➕</span> Add Student
        </NavLink>
        
        <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>
          <span>⚙️</span> Profile
        </NavLink>
      </div>
      
      <div className="logout-wrapper">
        <button className="btn-logout-extreme" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;