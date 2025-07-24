import React from "react";
import "./Specials.css";

const Specials: React.FC = () => {
  const specials = [
    {
      id: 1,
      title: "Wine Wednesday",
      description: "50% off all Italian wines every Wednesday",
      day: "Wednesday",
      discount: "50% OFF",
      icon: "🍷",
      color: "#8B0000"
    },
    {
      id: 2,
      title: "Family Sunday",
      description: "Kids eat free with adult entrée purchase",
      day: "Sunday",
      discount: "FREE",
      icon: "👨‍👩‍👧‍👦",
      color: "#228B22"
    },
    {
      id: 3,
      title: "Date Night Special",
      description: "3-course meal for two with complimentary dessert",
      day: "Friday & Saturday",
      discount: "$65",
      icon: "💕",
      color: "#DC143C"
    }
  ];

  return (
    <section className="specials" id="specials">
      <div className="specials-container">
        <div className="specials-header">
          <h2>Weekly Specials</h2>
          <p>Don't miss out on our amazing weekly offers and promotions</p>
        </div>
        <div className="specials-grid">
          {specials.map(special => (
            <div key={special.id} className="special-card" style={{"--accent-color": special.color} as React.CSSProperties}>
              <div className="special-header">
                <div className="special-icon">{special.icon}</div>
                <div className="special-discount">{special.discount}</div>
              </div>
              <div className="special-content">
                <h3>{special.title}</h3>
                <p className="special-day">{special.day}</p>
                <p className="special-description">{special.description}</p>
              </div>
              <div className="special-cta">
                <button className="btn-special">Learn More</button>
              </div>
            </div>
          ))}
        </div>
        <div className="newsletter-signup">
          <div className="newsletter-content">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for exclusive offers and updates</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email address" />
              <button className="btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specials;
