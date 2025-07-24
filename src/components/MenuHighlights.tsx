import React, { useState } from "react";
import FullScreenMenu from "./FullScreenMenu";
import "./MenuHighlights.css";

const MenuHighlights: React.FC = () => {
  const [isFullScreenMenuOpen, setIsFullScreenMenuOpen] = useState(false);

  const openFullScreenMenu = () => {
    setIsFullScreenMenuOpen(true);
  };

  const closeFullScreenMenu = () => {
    setIsFullScreenMenuOpen(false);
  };

  const dishes = [
    {
      id: 1,
      name: "Spaghetti Carbonara",
      description:
        "Classic Roman pasta with eggs, cheese, pancetta, and black pepper",
      price: "$18",
      icon: "🍝",
    },
    {
      id: 2,
      name: "Margherita Pizza",
      description:
        "Traditional pizza with fresh mozzarella, tomatoes, and basil",
      price: "$16",
      icon: "🍕",
    },
    {
      id: 3,
      name: "Osso Buco",
      description: "Braised veal shanks with vegetables, white wine, and broth",
      price: "$28",
      icon: "🥩",
    },
    {
      id: 4,
      name: "Tiramisu",
      description:
        "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
      price: "$12",
      icon: "🍰",
    },
  ];

  return (
    <section className="menu-highlights" id="menu">
      <div className="menu-container">
        <div className="menu-header">
          <h2>Our Signature Dishes</h2>
          <p>
            Taste the authentic flavors of Italy with our chef's special
            selections
          </p>
        </div>
        <div className="dishes-grid">
          {dishes.map((dish) => (
            <div key={dish.id} className="dish-card">
              <div className="dish-icon">{dish.icon}</div>
              <h3 className="dish-name">{dish.name}</h3>
              <p className="dish-description">{dish.description}</p>
              <div className="dish-price">{dish.price}</div>
            </div>
          ))}
        </div>
        <div className="menu-cta">
          <button className="btn-primary" onClick={openFullScreenMenu}>
            View Full Menu
          </button>
        </div>
      </div>

      <FullScreenMenu
        isOpen={isFullScreenMenuOpen}
        onClose={closeFullScreenMenu}
      />
    </section>
  );
};

export default MenuHighlights;
