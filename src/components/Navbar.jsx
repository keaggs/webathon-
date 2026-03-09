import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Menu, X, User } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'Internships', path: '/jobs?type=internship' },
    { name: 'My Applications', path: '/profile' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path.split('?')[0]);
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <Briefcase className="text-terracotta" size={28} />
          <span>GoaWorks</span>
        </Link>
        
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}
          <div className="nav-actions-mobile">
            <Link to="/login" className="btn btn-outline w-full mt-4" onClick={closeMenu}>Login / Sign Up</Link>
          </div>
        </div>

        <div className="nav-actions-desktop">
          <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
          <Link to="/profile" className="btn btn-primary" aria-label="Profile">
            <User size={20} />
          </Link>
        </div>

        <button className="nav-toggle" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
}
