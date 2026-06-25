import React from 'react';
import './AuthLayout.css';

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-logo">
          <span className="auth-logo-icon">📦</span>
          <h1>Spare Parts Inventory System</h1>
        </div>
        <div className="auth-content">
          {children}
        </div>
        <div className="auth-footer">
          <p>&copy; 2024 Spare Parts Inventory System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
