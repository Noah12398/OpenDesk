import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, MapPin, LogOut, LogIn, UserCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    await logout();
    closeMenu();
    navigate('/');
  };

  // Active link helper
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <div className="logo-icon">
            <MapPin size={24} color="var(--neutral-white)" />
          </div>
          <span className="logo-text">OpenDesk</span>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation */}
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li>
              <Link to="/" className={`nav-link ${isActive('/')}`} onClick={closeMenu}>Home</Link>
            </li>
            <li>
              <Link to="/map" className={`nav-link ${isActive('/map')}`} onClick={closeMenu}>Find Spaces</Link>
            </li>
            <li>
              <Link to="/add-resource" className={`nav-link ${isActive('/add-resource')}`} onClick={closeMenu}>Add Resource</Link>
            </li>
            {isAdmin && (
              <li>
                <Link to="/admin" className={`nav-link ${isActive('/admin')}`} onClick={closeMenu}>Admin</Link>
              </li>
            )}
            <li>
              <Link to="/emergency" className={`nav-link ${isActive('/emergency')}`} onClick={closeMenu}>Emergency Help</Link>
            </li>
          </ul>

          {/* Auth Section */}
          <div className="nav-auth">
            {isAuthenticated ? (
              <>
                <div className="user-info">
                  <UserCircle size={20} />
                  <span className="user-email">{user?.email}</span>
                  {isAdmin && <span className="admin-badge">Admin</span>}
                </div>
                <button onClick={handleLogout} className="logout-btn">
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="login-btn" onClick={closeMenu}>
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
