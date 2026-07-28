import React, { useState } from "react";
import "./ContactUs.css";
import { API } from "../utils/api";
import TicketDesk from "./TicketDesk";

const ContactUs = () => {
  const [view, setView] = useState("select"); // "select" | "tickets" | "contact"

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneNumber = "918750200899";
    const text = `Hello Review Ninja Pro,

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}`;

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, "_blank");
  };

  // ── Screen 1: Selection ──────────────────────────────
  if (view === "select") {
    return (
      <div className="dash-contact-wrapper animate-fadeIn">
        <div className="dash-contact-select-intro">
          <span className="eyebrow">Support</span>
          <h1>How can we help?</h1>
          <p>Raise a ticket for issues we should track, or message us directly for quick questions.</p>
        </div>

        <div className="dash-contact-select-grid">
          <div className="dash-contact-box" onClick={() => setView("tickets")}>
            <div className="dash-contact-box-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 000 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 000-4V9z" />
              </svg>
            </div>
            <h3 className="dash-contact-box-title">Raise a Ticket</h3>
            <p className="dash-contact-box-desc">
              Facing an issue? Open a ticket and follow the conversation until it's resolved.
            </p>
            <span className="dash-contact-box-cta">
              Open ticket desk
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </div>

          <div className="dash-contact-box" onClick={() => setView("contact")}>
            <div className="dash-contact-box-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
              </svg>
            </div>
            <h3 className="dash-contact-box-title">Contact Us</h3>
            <p className="dash-contact-box-desc">
              Have a quick question? Message us on WhatsApp, we'll reply within 24 hours.
            </p>
            <span className="dash-contact-box-cta">
              Send a message
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ── Screen 2: Ticket desk (list + chat) ───────────────
  if (view === "tickets") {
    return <TicketDesk onExit={() => setView("select")} />;
  }

  // ── Screen 3: Contact Us Form (WhatsApp) ──────────────
  return (
    <div className="dash-contact-wrapper animate-fadeIn">
      <div className="dash-contact-card">
        <button type="button" className="dash-contact-back" onClick={() => setView("select")}>
          ← Back
        </button>

        <div className="dash-contact-header">
          <div className="dash-contact-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
            </svg>
          </div>
          <div>
            <h2 className="dash-contact-title">Contact Us</h2>
            <p className="dash-contact-subtitle">We'll reply within 24 hours</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="dash-contact-form">
          <div className="dash-contact-row">
            <div className="dash-contact-field">
              <label className="dash-contact-label">Name</label>
              <input type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required className="dash-contact-input" />
            </div>
            <div className="dash-contact-field">
              <label className="dash-contact-label">Email</label>
              <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required className="dash-contact-input" />
            </div>
          </div>

          <div className="dash-contact-field">
            <label className="dash-contact-label">Phone</label>
            <input type="tel" name="phone" placeholder="+91 9XX543XXX" value={formData.phone} onChange={handleChange} className="dash-contact-input" />
          </div>

          <div className="dash-contact-field">
            <label className="dash-contact-label">Message</label>
            <textarea name="message" rows="6" placeholder="How can we help you?" value={formData.message} onChange={handleChange} required className="dash-contact-textarea" />
          </div>

          <button type="submit" className="dash-contact-button">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;