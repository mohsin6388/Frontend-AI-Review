import React from "react";
import "./PrivacyPolicy.css";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SECTIONS = [
  {
    id: "collect",
    number: "01",
    title: "Information We Collect",
    body: (
      <>
        <p className="privacy-lead">We may collect the following information:</p>
        <ul>
          <li>Name and email address</li>
          <li>Billing and payment information</li>
          <li>Device and browser information</li>
          <li>Usage activity on our platform</li>
        </ul>
      </>
    ),
  },
  {
    id: "use",
    number: "02",
    title: "How We Use Your Information",
    body: (
      <>
        <p className="privacy-lead">We use your information to:</p>
        <ul>
          <li>Provide and improve our services</li>
          <li>Process payments securely</li>
          <li>Send important updates and notifications</li>
          <li>Monitor platform security and performance</li>
        </ul>
      </>
    ),
  },
  {
    id: "security",
    number: "03",
    title: "Data Security",
    body: (
      <p>
        We implement industry-standard security measures to protect your
        data from unauthorized access, misuse, or disclosure.
      </p>
    ),
  },
  {
    id: "third-party",
    number: "04",
    title: "Third-Party Services",
    body: (
      <p>
        We may use trusted third-party providers for analytics, payments,
        and communication services.
      </p>
    ),
  },
  {
    id: "cookies",
    number: "05",
    title: "Cookies",
    body: (
      <p>
        Our platform may use cookies to improve user experience and
        analytics tracking.
      </p>
    ),
  },
  {
    id: "rights",
    number: "06",
    title: "User Rights",
    body: (
      <p>
        Users can request access, correction, or deletion of their personal
        data at any time.
      </p>
    ),
  },
  {
    id: "contact",
    number: "07",
    title: "Contact Us",
    body: (
      <p>
        If you have questions regarding this Privacy Policy, contact us at{" "}
        <a className="privacy-contact-link" href="mailto:deificmonk@gmail.com">
          deificmonk@gmail.com
        </a>
        .
      </p>
    ),
  },
];

function PrivacyPolicy() {
  return (
    <div style={{ background: "#050e1c", minHeight: "100vh" }}>
      <Navbar />

      <div className="privacy-wrapper">
        <div className="privacy-page">
          <div className="privacy-header-card">
            <div className="privacy-eyebrow">Legal Document</div>
            <h2 className="privacy-title">Privacy Policy</h2>
            <p className="privacy-updated">Last updated: 26 May 2026</p>
            <p className="privacy-subtitle">
              Welcome to Review Booster. Your privacy is important to us.
              Therefore, we request that you read all sections carefully.
            </p>
          </div>

          <div className="privacy-content-card">
            <p className="privacy-doc-name">Privacy Policy — Review Booster</p>

            {SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="privacy-section">
                <div className="privacy-section-heading">
                  <span className="privacy-section-number">{section.number}</span>
                  <h3>{section.title}</h3>
                </div>
                <div className="privacy-section-body">{section.body}</div>
              </section>
            ))}

            <p className="privacy-footnote">
              This policy may be updated periodically. Continued use of the
              platform constitutes acceptance of any revised policy.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;