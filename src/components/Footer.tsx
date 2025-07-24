import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Bella Vista</h3>
            <p>
              Authentic Italian cuisine in the heart of the city. Experience the
              true taste of Italy with every bite.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                📘
              </a>
              <a href="#" aria-label="Instagram">
                📷
              </a>
              <a href="#" aria-label="Twitter">
                🐦
              </a>
              <a href="#" aria-label="TikTok">
                🎵
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#menu">Menu</a>
              </li>
              <li>
                <a href="#gallery">Gallery</a>
              </li>
              <li>
                <a href="#testimonials">Reviews</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>
              📍 123 Italian Street
              <br />
              Downtown District
              <br />
              New York, NY 10001
            </p>
            <p>📞 (555) 123-4567</p>
            <p>✉️ info@bellavista.com</p>
          </div>
          <div className="footer-section">
            <h4>Hours</h4>
            <p>
              Monday - Thursday
              <br />
              11:30 AM - 10:00 PM
            </p>
            <p>
              Friday - Saturday
              <br />
              11:30 AM - 11:00 PM
            </p>
            <p>
              Sunday
              <br />
              12:00 PM - 9:00 PM
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Bella Vista Restaurant. All rights reserved.</p>
          <p>Made with ❤️ for food lovers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
