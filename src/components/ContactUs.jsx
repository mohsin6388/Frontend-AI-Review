import React, { useState } from "react";
import './ContactUs.css';
import { API } from "../utils/api"; // path apne project ke hisaab se check kar lena

const ContactUs = () => {
  const [view, setView] = useState("select"); // "select" | "ticket" | "contact"

  // ── Contact Us (WhatsApp) state ─────────────────────────
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // ── Raise a Ticket state ────────────────────────────────
  const [ticketData, setTicketData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    category: "General",
    priority: "Medium",
  });
  const [ticketLoading, setTicketLoading] = useState(false);
  const [ticketError, setTicketError] = useState("");
  const [ticketSuccess, setTicketSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTicketChange = (e) => {
    setTicketData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setTicketError("");
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

  const handleTicketSubmit = async (e) => {
    e.preventDefault();

    try {
      setTicketError("");
      setTicketLoading(true);

      const response = await fetch(`${API}/business/tickets/create`, {
        method: "POST",
        credentials: "include", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticketData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Ticket create nahi ho paya");
      }

      setTicketSuccess(true);
      setTicketData({
        name: "",
        email: "",
        phone: "",
        message: "",
        category: "General",
        priority: "Medium",
      });
    } catch (err) {
      setTicketError(err.message);
    } finally {
      setTicketLoading(false);
    }
  };

  // ── Screen 1: Box Selection ──────────────────────────────
  if (view === "select") {
    return (
      <div className="dash-contact-wrapper animate-fadeIn">
        <div className="dash-contact-select-grid">
          <div
            className="dash-contact-box"
            onClick={() => setView("ticket")}
          >
            <span className="dash-contact-box-icon">🎫</span>
            <h3 className="dash-contact-box-title">Raise a Ticket</h3>
            <p className="dash-contact-box-desc">
              Facing an issue? Raise a support ticket and we'll track it for you.
            </p>
          </div>

          <div
            className="dash-contact-box"
            onClick={() => setView("contact")}
          >
            <span className="dash-contact-box-icon">💬</span>
            <h3 className="dash-contact-box-title">Contact Us</h3>
            <p className="dash-contact-box-desc">
              Have a question? Message us directly, we'll reply within 24 hours.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Screen 2: Raise a Ticket Form ─────────────────────────
  if (view === "ticket") {
    return (
      <div className="dash-contact-wrapper animate-fadeIn">
        <div className="dash-contact-card">
          <div className="dash-contact-header">
            <span className="dash-contact-icon">🎫</span>
            <div>
              <h2 className="dash-contact-title">Raise a Ticket</h2>
              <p className="dash-contact-subtitle">We'll reply within 24 hours</p>
            </div>
          </div>

          <button
            type="button"
            className="dash-contact-back"
            onClick={() => setView("select")}
          >
            ← Back
          </button>

          {ticketSuccess ? (
            <div className="dash-contact-success">
              ✓ Ticket raise ho gaya! Hum jald hi contact karenge.
              <button
                type="button"
                className="dash-contact-success-reset"
                onClick={() => setView("select")}
              >
                Wapas jao
              </button>
            </div>
          ) : (
            <form onSubmit={handleTicketSubmit} className="dash-contact-form">
              <div className="dash-contact-row">
                <div className="dash-contact-field">
                  <label className="dash-contact-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={ticketData.name}
                    onChange={handleTicketChange}
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
                    value={ticketData.email}
                    onChange={handleTicketChange}
                    required
                    className="dash-contact-input"
                  />
                </div>
              </div>

              <div className="dash-contact-row">
                <div className="dash-contact-field">
                  <label className="dash-contact-label">Category</label>
                  <select
                    name="category"
                    value={ticketData.category}
                    onChange={handleTicketChange}
                    className="dash-contact-input"
                  >
                    <option value="General">General</option>
                    <option value="Billing">Billing</option>
                    <option value="Technical">Technical</option>
                    <option value="Account">Account</option>
                    <option value="Feature Request">Feature Request</option>
                  </select>
                </div>

                <div className="dash-contact-field">
                  <label className="dash-contact-label">Priority</label>
                  <select
                    name="priority"
                    value={ticketData.priority}
                    onChange={handleTicketChange}
                    className="dash-contact-input"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="dash-contact-field">
                <label className="dash-contact-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 9XX543XXX"
                  value={ticketData.phone}
                  onChange={handleTicketChange}
                  className="dash-contact-input"
                />
              </div>

              <div className="dash-contact-field">
                <label className="dash-contact-label">Message</label>
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Describe your issue in detail..."
                  value={ticketData.message}
                  onChange={handleTicketChange}
                  required
                  className="dash-contact-textarea"
                />
              </div>

              {ticketError && (
                <div className="dash-contact-error">{ticketError}</div>
              )}

              <button
                type="submit"
                className="dash-contact-button"
                disabled={ticketLoading}
              >
                {ticketLoading ? "Submitting..." : "Raise Ticket"}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // ── Screen 3: Contact Us Form (WhatsApp) ──────────────────
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

        <button
          type="button"
          className="dash-contact-back"
          onClick={() => setView("select")}
        >
          ← Back
        </button>

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