import React, { useState } from "react";
import FullScreenMenu from "./FullScreenMenu";
import "./Header.css";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFullScreenMenuOpen, setIsFullScreenMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openFullScreenMenu = () => {
    setIsFullScreenMenuOpen(true);
    setIsMenuOpen(false); // Close mobile menu if open
  };

  const closeFullScreenMenu = () => {
    setIsFullScreenMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Bella Vista</h1>
          <span className="tagline">Authentic Italian Cuisine</span>
        </div>
        <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
          <ul className="nav-list">
            <li>
              <a href="#home" onClick={closeMenu}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={closeMenu}>
                About
              </a>
            </li>
            <li>
              <button
                className="menu-link-button"
                onClick={openFullScreenMenu}
                aria-label="Open full menu"
              >
                Menu
              </button>
            </li>
            <li>
              <a href="#gallery" onClick={closeMenu}>
                Gallery
              </a>
            </li>
            <li>
              <a href="#testimonials" onClick={closeMenu}>
                Reviews
              </a>
            </li>
            <li>
              <a href="#contact" onClick={closeMenu}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <button className="btn-secondary" onClick={openFullScreenMenu}>
            View Full Menu
          </button>
          <button className="btn-primary">Make Reservation</button>
          <button
            className="mobile-menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isMenuOpen ? "hamburger-open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      <FullScreenMenu
        isOpen={isFullScreenMenuOpen}
        onClose={closeFullScreenMenu}
      />
    </header>
  );
};

export default Header;
