import React, { useState, useEffect } from "react";
import "./FullScreenMenu.css";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  icon: string;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  isSpicy?: boolean;
}

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const FullScreenMenu: React.FC<FullScreenMenuProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState("appetizers");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const categories = [
    { id: "appetizers", name: "Appetizers", icon: "🥗" },
    { id: "pasta", name: "Pasta", icon: "🍝" },
    { id: "pizza", name: "Pizza", icon: "🍕" },
    { id: "mains", name: "Main Courses", icon: "🥩" },
    { id: "desserts", name: "Desserts", icon: "🍰" },
    { id: "beverages", name: "Beverages", icon: "🍷" },
  ];

  const menuItems: Record<string, MenuItem[]> = {
    appetizers: [
      {
        id: "1",
        name: "Bruschetta Classica",
        description: "Toasted bread with fresh tomatoes, basil, and garlic",
        price: "$12",
        category: "appetizers",
        icon: "🍅",
        isVegetarian: true,
      },
      {
        id: "2",
        name: "Antipasto Platter",
        description: "Selection of cured meats, cheeses, and marinated vegetables",
        price: "$18",
        category: "appetizers",
        icon: "🧀",
      },
      {
        id: "3",
        name: "Calamari Fritti",
        description: "Crispy fried squid rings with marinara sauce",
        price: "$16",
        category: "appetizers",
        icon: "🦑",
      },
    ],
    pasta: [
      {
        id: "4",
        name: "Spaghetti Carbonara",
        description: "Classic Roman pasta with eggs, cheese, pancetta, and black pepper",
        price: "$18",
        category: "pasta",
        icon: "🍝",
      },
      {
        id: "5",
        name: "Fettuccine Alfredo",
        description: "Fresh fettuccine in creamy parmesan sauce",
        price: "$16",
        category: "pasta",
        icon: "🍝",
        isVegetarian: true,
      },
      {
        id: "6",
        name: "Penne Arrabbiata",
        description: "Penne pasta in spicy tomato sauce with garlic and chili",
        price: "$15",
        category: "pasta",
        icon: "🍝",
        isVegetarian: true,
        isSpicy: true,
      },
    ],
    pizza: [
      {
        id: "7",
        name: "Margherita",
        description: "Traditional pizza with fresh mozzarella, tomatoes, and basil",
        price: "$16",
        category: "pizza",
        icon: "🍕",
        isVegetarian: true,
      },
      {
        id: "8",
        name: "Quattro Stagioni",
        description: "Four seasons pizza with artichokes, ham, mushrooms, and olives",
        price: "$20",
        category: "pizza",
        icon: "🍕",
      },
      {
        id: "9",
        name: "Diavola",
        description: "Spicy pizza with salami, mozzarella, and chili oil",
        price: "$18",
        category: "pizza",
        icon: "🍕",
        isSpicy: true,
      },
    ],
    mains: [
      {
        id: "10",
        name: "Osso Buco",
        description: "Braised veal shanks with vegetables, white wine, and broth",
        price: "$28",
        category: "mains",
        icon: "🥩",
      },
      {
        id: "11",
        name: "Branzino al Sale",
        description: "Mediterranean sea bass baked in sea salt crust",
        price: "$26",
        category: "mains",
        icon: "🐟",
        isGlutenFree: true,
      },
      {
        id: "12",
        name: "Pollo Parmigiana",
        description: "Breaded chicken breast with tomato sauce and mozzarella",
        price: "$22",
        category: "mains",
        icon: "🍗",
      },
    ],
    desserts: [
      {
        id: "13",
        name: "Tiramisu",
        description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
        price: "$12",
        category: "desserts",
        icon: "🍰",
        isVegetarian: true,
      },
      {
        id: "14",
        name: "Panna Cotta",
        description: "Silky vanilla custard with berry compote",
        price: "$10",
        category: "desserts",
        icon: "🍮",
        isVegetarian: true,
        isGlutenFree: true,
      },
      {
        id: "15",
        name: "Cannoli Siciliani",
        description: "Crispy pastry shells filled with sweet ricotta cream",
        price: "$8",
        category: "desserts",
        icon: "🥐",
        isVegetarian: true,
      },
    ],
    beverages: [
      {
        id: "16",
        name: "Chianti Classico",
        description: "Full-bodied red wine from Tuscany",
        price: "$45",
        category: "beverages",
        icon: "🍷",
      },
      {
        id: "17",
        name: "Prosecco di Valdobbiadene",
        description: "Premium sparkling wine from Veneto",
        price: "$38",
        category: "beverages",
        icon: "🥂",
      },
      {
        id: "18",
        name: "Espresso",
        description: "Traditional Italian coffee",
        price: "$4",
        category: "beverages",
        icon: "☕",
        isVegetarian: true,
        isGlutenFree: true,
      },
    ],
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const closeItemDetail = () => {
    setSelectedItem(null);
  };

  if (!isOpen) return null;

  return (
    <div className={`fullscreen-menu ${isOpen ? "open" : ""}`}>
      <div className="menu-overlay" onClick={onClose} />
      
      <div className="menu-container">
        {/* Header */}
        <div className="menu-header">
          <h1 className="menu-title">Our Menu</h1>
          <button className="close-button" onClick={onClose} aria-label="Close menu">
            <span className="close-icon">×</span>
          </button>
        </div>

        {/* Categories */}
        <div className="menu-categories">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-button ${activeCategory === category.id ? "active" : ""}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="menu-content">
          <div className="menu-items-grid">
            {menuItems[activeCategory]?.map((item, index) => (
              <div
                key={item.id}
                className="menu-item-card"
                style={{ "--delay": `${index * 0.1}s` } as React.CSSProperties}
                onClick={() => handleItemClick(item)}
              >
                <div className="item-icon">{item.icon}</div>
                <div className="item-content">
                  <div className="item-header">
                    <h3 className="item-name">{item.name}</h3>
                    <span className="item-price">{item.price}</span>
                  </div>
                  <p className="item-description">{item.description}</p>
                  <div className="item-badges">
                    {item.isVegetarian && <span className="badge vegetarian">🌱 Vegetarian</span>}
                    {item.isGlutenFree && <span className="badge gluten-free">🌾 Gluten Free</span>}
                    {item.isSpicy && <span className="badge spicy">🌶️ Spicy</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="item-detail-modal">
          <div className="modal-overlay" onClick={closeItemDetail} />
          <div className="modal-content">
            <button className="modal-close" onClick={closeItemDetail}>×</button>
            <div className="modal-icon">{selectedItem.icon}</div>
            <h2>{selectedItem.name}</h2>
            <p className="modal-description">{selectedItem.description}</p>
            <div className="modal-price">{selectedItem.price}</div>
            <div className="modal-badges">
              {selectedItem.isVegetarian && <span className="badge vegetarian">🌱 Vegetarian</span>}
              {selectedItem.isGlutenFree && <span className="badge gluten-free">🌾 Gluten Free</span>}
              {selectedItem.isSpicy && <span className="badge spicy">🌶️ Spicy</span>}
            </div>
            <button className="add-to-order-btn">Add to Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullScreenMenu;
