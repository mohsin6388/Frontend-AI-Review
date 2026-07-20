import React from "react";
import "./AboutUs.css";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const About = () => {
  return (
    <div className="about-card">
      <span className="about-badge">About Review Ninja Pro</span>

      <h1 className="about-title">
        Helping Businesses Grow with AI-Powered Reviews
      </h1>

      <p className="about-description">
        <strong>Review Ninja Pro</strong> is an AI-powered review generation
        platform that helps businesses improve their online reputation by
        generating high-quality review suggestions. Our goal is to make it
        easier for businesses to grow their Google Business Profile and
        increase their visibility in local search results.
      </p>

      <p className="about-description">
        We believe that genuine customer reviews play a vital role in building
        trust and attracting new customers. With Review Ninja Pro, businesses
        can simplify the review process and encourage more authentic customer
        feedback.
      </p>

      <div className="about-section">
        <h2 className="about-heading">Our Mission</h2>
        <p className="about-text">
          To help businesses strengthen their online presence using AI-powered
          review generation and improve their local visibility on Google.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-heading">What We Do</h2>

        <ul className="about-list">
          <li>✨ AI-powered review generation</li>
          <li>📍 Improve Google Business Profile visibility</li>
          <li>⭐ Help businesses collect more customer reviews</li>
          <li>🚀 Increase local search presence</li>
          <li>🤝 Build customer trust through authentic feedback</li>
        </ul>
      </div>
    </div>
  );
};

function AboutUs() {
  return (
    <div style={{ background: "#050e1c", minHeight: "100vh" }}>
      <Navbar />

      <div className="about-wrapper">
        <About />
      </div>

      <Footer />
    </div>
  );
}

export default AboutUs;