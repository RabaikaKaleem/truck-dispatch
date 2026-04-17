import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/drivers', label: 'Drivers', icon: '👤' },
    { path: '/admin/loads', label: 'Loads', icon: '📦' },
    { path: '/admin/quotes', label: 'Quotes', icon: '💬' },
    { path: '/admin/dispatches', label: 'Dispatches', icon: '🚛' },
    { path: '/admin/admins', label: 'Admins', icon: '🔑' },
  ];

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`admin-layout ${collapsed ? 'collapsed' : ''}`}>
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-logo">🚛</span>
          {!collapsed && <span className="sidebar-brand">TruckDispatch</span>}
          <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? '→' : '←'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {!collapsed && <span className="nav-label">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          {!collapsed && (
            <div className="user-info">
              <p className="user-name">{user?.name}</p>
              <p className="user-role">Administrator</p>
            </div>
          )}
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            🚪 {!collapsed && 'Logout'}
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
