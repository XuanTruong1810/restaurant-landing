import React, { useState } from "react";
import FullScreenMenu from "./FullScreenMenu";
import "./Hero.css";

const Hero: React.FC = () => {
  const [isFullScreenMenuOpen, setIsFullScreenMenuOpen] = useState(false);

  const openFullScreenMenu = () => {
    setIsFullScreenMenuOpen(true);
  };

  const closeFullScreenMenu = () => {
    setIsFullScreenMenuOpen(false);
  };

  return (
    <section className="hero" id="home">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Bella Vista</h1>
          <p className="hero-subtitle">
            Experience the authentic taste of Italy in the heart of the city
          </p>
          <p className="hero-description">
            Fresh ingredients, traditional recipes, and a warm atmosphere make
            every meal a memorable experience.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={openFullScreenMenu}>
              View Our Menu
            </button>
            <button className="btn-secondary">Make Reservation</button>
          </div>
        </div>
      </div>

      <FullScreenMenu
        isOpen={isFullScreenMenuOpen}
        onClose={closeFullScreenMenu}
      />
    </section>
  );
};

export default Hero;
