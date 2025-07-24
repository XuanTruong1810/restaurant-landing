import React from "react";
import "./Gallery.css";

const Gallery: React.FC = () => {
  const galleryItems = [
    {
      id: 1,
      title: "Fresh Pasta Making",
      description: "Our chefs prepare fresh pasta daily",
      emoji: "🍝",
      category: "Kitchen",
    },
    {
      id: 2,
      title: "Wood-Fired Pizza",
      description: "Authentic Neapolitan pizza from our brick oven",
      emoji: "🍕",
      category: "Specialties",
    },
    {
      id: 3,
      title: "Fine Wine Selection",
      description: "Curated Italian wines to complement your meal",
      emoji: "🍷",
      category: "Beverages",
    },
    {
      id: 4,
      title: "Elegant Dining Room",
      description: "Warm and inviting atmosphere for special occasions",
      emoji: "🕯️",
      category: "Ambiance",
    },
    {
      id: 5,
      title: "Fresh Ingredients",
      description: "Daily selection of the finest local produce",
      emoji: "🥬",
      category: "Quality",
    },
    {
      id: 6,
      title: "Homemade Desserts",
      description: "Traditional Italian sweets made in-house",
      emoji: "🍰",
      category: "Desserts",
    },
  ];

  return (
    <section className="gallery" id="gallery">
      <div className="gallery-container">
        <div className="gallery-header">
          <h2>Experience Bella Vista</h2>
          <p>
            Take a visual journey through our restaurant, kitchen, and culinary
            creations
          </p>
        </div>
        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <div key={item.id} className="gallery-item">
              <div className="gallery-image">
                <div className="gallery-emoji">{item.emoji}</div>
                <div className="gallery-overlay">
                  <span className="gallery-category">{item.category}</span>
                </div>
              </div>
              <div className="gallery-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
