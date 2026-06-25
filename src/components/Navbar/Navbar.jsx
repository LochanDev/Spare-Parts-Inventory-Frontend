import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          <span className="logo-icon">📦</span>
          Spare Parts
        </Link>

        <button
          className="navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link to="/parts" className="nav-link">
            Parts
          </Link>
          <Link to="/orders" className="nav-link">
            Orders
          </Link>
          <Link to="/suppliers" className="nav-link">
            Suppliers
          </Link>
          <Link to="/reports" className="nav-link">
            Reports
          </Link>

          <div className="navbar-user">
            <div className="user-info">
              <User size={18} />
              <span>{user?.email}</span>
            </div>
            <button
              className="logout-btn"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
