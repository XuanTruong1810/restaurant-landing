import React from 'react';
import './Contact.css';

const Contact: React.FC = () => {
  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h2>Visit Us Today</h2>
          <p>Come experience the authentic taste of Italy</p>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <h3>📍 Location</h3>
              <p>123 Italian Street<br />Downtown District<br />New York, NY 10001</p>
            </div>
            <div className="info-card">
              <h3>📞 Contact</h3>
              <p>Phone: (555) 123-4567<br />Email: info@bellavista.com</p>
            </div>
            <div className="info-card">
              <h3>🕒 Hours</h3>
              <p>
                Monday - Thursday: 11:30 AM - 10:00 PM<br />
                Friday - Saturday: 11:30 AM - 11:00 PM<br />
                Sunday: 12:00 PM - 9:00 PM
              </p>
            </div>
          </div>
          <div className="reservation-form">
            <h3>Make a Reservation</h3>
            <form className="form">
              <div className="form-row">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Email Address" required />
              </div>
              <div className="form-row">
                <input type="tel" placeholder="Phone Number" required />
                <input type="date" required />
              </div>
              <div className="form-row">
                <select required>
                  <option value="">Select Time</option>
                  <option value="5:30">5:30 PM</option>
                  <option value="6:00">6:00 PM</option>
                  <option value="6:30">6:30 PM</option>
                  <option value="7:00">7:00 PM</option>
                  <option value="7:30">7:30 PM</option>
                  <option value="8:00">8:00 PM</option>
                </select>
                <select required>
                  <option value="">Party Size</option>
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5">5+ People</option>
                </select>
              </div>
              <textarea placeholder="Special Requests (Optional)" rows={3}></textarea>
              <button type="submit" className="btn-primary">Book Table</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
