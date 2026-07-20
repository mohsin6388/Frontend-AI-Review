import React from "react";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'




const About = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <span style={styles.badge}>About Review Ninja Pro</span>

        <h1 style={styles.title}>
          Helping Businesses Grow with AI-Powered Reviews
        </h1>

        <p style={styles.description}>
          <strong>Review Ninja Pro</strong> is an AI-powered review generation
          platform that helps businesses improve their online reputation by
          generating high-quality review suggestions. Our goal is to make it
          easier for businesses to grow their Google Business Profile and
          increase their visibility in local search results.
        </p>

        <p style={styles.description}>
          We believe that genuine customer reviews play a vital role in building
          trust and attracting new customers. With Review Ninja Pro, businesses
          can simplify the review process and encourage more authentic customer
          feedback.
        </p>

        <div style={styles.section}>
          <h2 style={styles.heading}>Our Mission</h2>
          <p style={styles.text}>
            To help businesses strengthen their online presence using AI-powered
            review generation and improve their local visibility on Google.
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.heading}>What We Do</h2>

          <ul style={styles.list}>
            <li>✨ AI-powered review generation</li>
            <li>📍 Improve Google Business Profile visibility</li>
            <li>⭐ Help businesses collect more customer reviews</li>
            <li>🚀 Increase local search presence</li>
            <li>🤝 Build customer trust through authentic feedback</li>
          </ul>
        </div>
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
    maxWidth: "900px",
    background: "#fff",
    borderRadius: "18px",
    padding: "40px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
  },

  badge: {
    display: "inline-block",
    background: "#dbeafe",
    color: "#2563eb",
    padding: "8px 14px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 600,
    marginBottom: "18px",
  },

  title: {
    fontSize: "36px",
    fontWeight: 700,
    color: "#111827",
    marginBottom: "20px",
    lineHeight: 1.3,
  },

  description: {
    fontSize: "16px",
    color: "#4b5563",
    lineHeight: 1.8,
    marginBottom: "18px",
  },

  section: {
    marginTop: "35px",
  },

  heading: {
    fontSize: "24px",
    color: "#111827",
    marginBottom: "14px",
    fontWeight: 700,
  },

  text: {
    color: "#4b5563",
    fontSize: "16px",
    lineHeight: 1.8,
  },

  list: {
    paddingLeft: "22px",
    color: "#4b5563",
    lineHeight: 2,
    fontSize: "16px",
  },
};

 
function AboutUs() {
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
        <About />
      </div>
 
      <Footer />
    </div>
  );
}

export default AboutUs;