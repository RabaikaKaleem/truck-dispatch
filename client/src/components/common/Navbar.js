import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🚛 <span>TruckDispatch</span>
        </Link>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link></li>
          <li><Link to="/get-quote" onClick={() => setMenuOpen(false)}>Get Quote</Link></li>
          <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>

          {user ? (
            <>
              <li>
                <Link to={user.role === 'admin' ? '/admin' : '/driver'} onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
              </li>
              <li>
                <button className="btn btn-outline nav-logout" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
              <li>
                <Link to="/register" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
                  Join as Driver
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
