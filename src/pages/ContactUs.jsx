import React, {useState} from "react";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
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

  const phone = "918750200899"; // Apna WhatsApp number
  const text = `Hello Review Ninja Pro,

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}`;

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
    "_blank"
  );
};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <span style={styles.badge}>Contact Us</span>

        <h1 style={styles.title}>Get in Touch</h1>

        <p style={styles.description}>
          We'd love to hear from you. Fill out the form below and our team will
          get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Enter the subject"
              value={formData.subject}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Message</label>
            <textarea
              name="message"
              rows="6"
              placeholder="Tell us how we can help you..."
              value={formData.message}
              onChange={handleChange}
              required
              style={styles.textarea}
            />
          </div>

          <button type="submit" style={styles.button}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f8fafc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
    boxSizing: "border-box",
  },

  card: {
    width: "100%",
    maxWidth: "700px",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "40px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
    boxSizing: "border-box",
  },

  badge: {
    display: "inline-block",
    padding: "8px 14px",
    background: "#dbeafe",
    color: "#2563eb",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "18px",
  },

  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "10px",
  },

  description: {
    color: "#6b7280",
    fontSize: "15px",
    lineHeight: "1.8",
    marginBottom: "30px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
  },

  input: {
    width: "100%",
    padding: "13px 15px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    outline: "none",
    fontSize: "15px",
    color: "#111827",
    background: "#fff",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    padding: "13px 15px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    outline: "none",
    fontSize: "15px",
    fontFamily: "inherit",
    resize: "vertical",
    color: "#111827",
    background: "#fff",
    boxSizing: "border-box",
  },

  button: {
    marginTop: "10px",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
};



function ContactUs() {
  return (
    <div style={{ background: "#050e1c", minHeight: "100vh" }}>
      <Navbar />
 
      {/* Content area — light background echoes the "How It Works" section
          on the homepage so it reads as part of the same brand, while still
          giving the legal text a calm, readable surface. */}
      <div
        style={{
          background: "#F0F5FB",
          paddingTop: 120,
          paddingBottom: 80,
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        <Contact />
      </div>
 
      <Footer />
    </div>
  );
}

export default ContactUs;