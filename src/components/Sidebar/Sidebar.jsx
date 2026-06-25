import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Package,
  ShoppingCart,
  Truck,
  FileText,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <BarChart3 size={20} />,
    },
    {
      title: 'Parts',
      path: '/parts',
      icon: <Package size={20} />,
    },
    {
      title: 'Orders',
      path: '/orders',
      icon: <ShoppingCart size={20} />,
    },
    {
      title: 'Suppliers',
      path: '/suppliers',
      icon: <Truck size={20} />,
    },
    {
      title: 'Reports',
      path: '/reports',
      icon: <FileText size={20} />,
    },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button
            className="sidebar-close"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${
                isActive(item.path) ? 'active' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="link-icon">{item.icon}</span>
              <span className="link-text">{item.title}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
