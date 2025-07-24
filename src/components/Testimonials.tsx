import React from "react";
import "./Testimonials.css";

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, NY",
      rating: 5,
      review:
        "Absolutely incredible! The pasta was perfectly al dente and the atmosphere was so authentic. Chef Marco's attention to detail really shows in every dish. This is now our go-to spot for special occasions.",
      avatar: "👩‍💼",
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Brooklyn, NY",
      rating: 5,
      review:
        "Best Italian food I've had outside of Italy! The wood-fired pizza is phenomenal, and the wine selection is outstanding. The staff made us feel like family from the moment we walked in.",
      avatar: "👨‍💻",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      location: "Manhattan, NY",
      rating: 5,
      review:
        "Bella Vista exceeded all expectations. The tiramisu was heavenly, and the ambiance is perfect for date nights. We've been coming here for years and it never disappoints!",
      avatar: "👩‍🎨",
    },
    {
      id: 4,
      name: "David Thompson",
      location: "Queens, NY",
      rating: 5,
      review:
        "From the moment you walk in, you're transported to Italy. The osso buco was tender and flavorful, and the service was impeccable. Highly recommend for anyone seeking authentic Italian cuisine.",
      avatar: "👨‍🍳",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`star ${index < rating ? "filled" : "empty"}`}
      >
        {index < rating ? "★" : "☆"}
      </span>
    ));
  };

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2>What Our Guests Say</h2>
          <p>
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <div className="customer-info">
                  <div className="avatar">{testimonial.avatar}</div>
                  <div className="customer-details">
                    <h4>{testimonial.name}</h4>
                    <p className="location">{testimonial.location}</p>
                  </div>
                </div>
                <div className="rating">{renderStars(testimonial.rating)}</div>
              </div>
              <div className="testimonial-content">
                <p>"{testimonial.review}"</p>
              </div>
            </div>
          ))}
        </div>
        <div className="testimonials-stats">
          <div className="stat">
            <h3>500+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat">
            <h3>4.9/5</h3>
            <p>Average Rating</p>
          </div>
          <div className="stat">
            <h3>35+</h3>
            <p>Years of Excellence</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
