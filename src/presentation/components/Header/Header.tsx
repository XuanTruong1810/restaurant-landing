import React, { useState } from "react";
import { useRestaurantInfo } from "../../hooks/useRestaurantInfo";
import { Container } from "../../../infrastructure/di/Container";
import "./Header.css";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const container = Container.getInstance();
  const { restaurant, loading, error } = useRestaurantInfo(
    container.getRestaurantInfoUseCaseInstance()
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  if (loading) {
    return (
      <header className={`header ${className}`}>
        <div className="header-container">
          <div className="logo">
            <h1>Loading...</h1>
          </div>
        </div>
      </header>
    );
  }

  if (error) {
    return (
      <header className={`header ${className}`}>
        <div className="header-container">
          <div className="logo">
            <h1>Restaurant</h1>
            <span className="tagline">Error loading info</span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`header ${className}`} data-testid="header">
      <div className="header-container">
        <div className="logo">
          <h1>{restaurant?.name || "Restaurant"}</h1>
          <span className="tagline">{restaurant?.tagline || ""}</span>
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
              <a href="#menu" onClick={closeMenu}>
                Menu
              </a>
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
          <button className="btn-primary" data-testid="reservation-button">
            Make Reservation
          </button>
          <button
            className="mobile-menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            data-testid="mobile-menu-toggle"
          >
            <span className={`hamburger ${isMenuOpen ? "hamburger-open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
