import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <div className="nav-logo-icon">🚛</div>
          <span>Truck<em>Dispatch</em></span>
        </Link>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>☰</button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {[
            { to: '/', label: 'Home' },
            { to: '/about', label: 'About' },
            { to: '/services', label: 'Services' },
            { to: '/contact', label: 'Contact' },
          ].map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                onClick={() => setMenuOpen(false)}
                style={{ color: isActive(to) ? 'white' : '' }}
              >
                {label}
              </Link>
            </li>
          ))}

          {user ? (
            <>
              <li>
                <Link
                  to={user.role === 'admin' ? '/admin' : '/driver'}
                  className="nav-btn-login"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <button className="btn nav-logout" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-btn-login" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/get-quote" className="nav-btn-primary" onClick={() => setMenuOpen(false)}>
                  Get Free Quote
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
