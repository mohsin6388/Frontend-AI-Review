import React, { useState } from "react";
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneNumber = "918750200899"; // Apna WhatsApp number
    const text = `Hello Review Ninja Pro,

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <div className="dash-contact-wrapper animate-fadeIn">
      <div className="dash-contact-card">
        <div className="dash-contact-header">
          <span className="dash-contact-icon">💬</span>
          <div>
            <h2 className="dash-contact-title">Contact Us</h2>
            <p className="dash-contact-subtitle">We'll reply within 24 hours</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="dash-contact-form">
          <div className="dash-contact-row">
            <div className="dash-contact-field">
              <label className="dash-contact-label">Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="dash-contact-input"
              />
            </div>

            <div className="dash-contact-field">
              <label className="dash-contact-label">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="dash-contact-input"
              />
            </div>
          </div>

          <div className="dash-contact-field">
            <label className="dash-contact-label">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="+91 9XX543XXX"
              value={formData.phone}
              onChange={handleChange}
              className="dash-contact-input"
            />
          </div>

          <div className="dash-contact-field">
            <label className="dash-contact-label">Message</label>
            <textarea
              name="message"
              rows="6"
              placeholder="How can we help you?"
              value={formData.message}
              onChange={handleChange}
              required
              className="dash-contact-textarea"
            />
          </div>

          <button type="submit" className="dash-contact-button">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;