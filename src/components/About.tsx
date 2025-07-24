import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Founded in 1985 by the Rossi family, Bella Vista has been serving 
              authentic Italian cuisine for over three decades. Our passion for 
              traditional recipes and fresh, quality ingredients has made us a 
              beloved destination for food lovers.
            </p>
            <p>
              Every dish is prepared with love and attention to detail, using 
              recipes passed down through generations. From our handmade pasta 
              to our wood-fired pizzas, we bring the true taste of Italy to your table.
            </p>
            <div className="features">
              <div className="feature">
                <h3>🍝 Fresh Pasta</h3>
                <p>Made daily with traditional techniques</p>
              </div>
              <div className="feature">
                <h3>🔥 Wood-Fired Oven</h3>
                <p>Authentic flavors from our brick oven</p>
              </div>
              <div className="feature">
                <h3>🌿 Local Ingredients</h3>
                <p>Sourced from local farms and markets</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="chef-placeholder">
              <div className="chef-icon">👨‍🍳</div>
              <h3>Chef Marco Rossi</h3>
              <p>Third generation chef with 25+ years of experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
