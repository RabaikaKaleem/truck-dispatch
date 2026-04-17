import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './DriverLayout.css';

const DriverLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/driver', label: 'Dashboard', icon: '📊' },
    { path: '/driver/loads', label: 'My Loads', icon: '📦' },
    { path: '/driver/dispatches', label: 'Dispatches', icon: '🚛' },
    { path: '/driver/profile', label: 'Profile', icon: '👤' },
  ];

  const isActive = (path) => {
    if (path === '/driver') return location.pathname === '/driver';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="driver-layout">
      <aside className="driver-sidebar">
        <div className="driver-sidebar-header">
          <span>🚛</span>
          <span className="driver-brand">TruckDispatch</span>
        </div>

        <nav className="driver-nav">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className={`driver-nav-item ${isActive(item.path) ? 'active' : ''}`}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="driver-sidebar-footer">
          <div className="driver-user-info">
            <p className="driver-name">{user?.name}</p>
            <p className="driver-role">Driver</p>
          </div>
          <button className="driver-logout-btn" onClick={handleLogout}>🚪 Logout</button>
        </div>
      </aside>

      <main className="driver-main">
        <div className="driver-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DriverLayout;
