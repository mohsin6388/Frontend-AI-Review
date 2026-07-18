import React, { useEffect, useRef, useState } from "react";
import "./TermsAndCondition.css";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SECTIONS = [
  {
    id: "acceptance",
    number: "01",
    title: "Acceptance of Terms",
    body: (
      <p>
        By accessing and using Review Booster ("the Service"), you agree to
        be bound by these Terms and Conditions. If you do not agree, please
        discontinue use immediately.
      </p>
    ),
  },
  {
    id: "description",
    number: "02",
    title: "Description of Service",
    body: (
      <p>
        Review Booster provides AI-powered tools to help businesses
        generate, manage, and respond to Google Reviews. Our service is
        intended for legitimate business use only.
      </p>
    ),
  },
  {
    id: "accounts",
    number: "03",
    title: "User Accounts",
    body: (
      <ul>
        <li>
          You must provide accurate and complete information when creating
          an account.
        </li>
        <li>
          You are responsible for maintaining the security of your account
          credentials.
        </li>
        <li>
          We reserve the right to suspend accounts that violate our
          policies.
        </li>
        <li>
          Each account is for single-business use unless you hold an
          Enterprise plan.
        </li>
      </ul>
    ),
  },
  {
    id: "acceptable-use",
    number: "04",
    title: "Acceptable Use Policy",
    body: (
      <>
        <p className="terms-lead">Users agree NOT to:</p>
        <ul>
          <li>
            Generate fake or misleading reviews for businesses they do not
            own or operate.
          </li>
          <li>
            Use the service to harm, defame, or misrepresent any person or
            business.
          </li>
          <li>
            Attempt to reverse-engineer, scrape, or exploit the platform AI
            systems.
          </li>
          <li>
            Resell or redistribute the service without written
            authorization.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "subscription",
    number: "05",
    title: "Subscription and Payments",
    body: (
      <ul>
        <li>
          Subscriptions are billed monthly or annually as selected at
          purchase.
        </li>
        <li>All payments are processed securely via Razorpay/Stripe.</li>
        <li>
          Refunds are available within 7 days of purchase for Pro plans and
          3 days for Enterprise plans.
        </li>
        <li>
          We reserve the right to modify pricing with 30 days advance
          notice.
        </li>
      </ul>
    ),
  },
  {
    id: "ip",
    number: "06",
    title: "Intellectual Property",
    body: (
      <p>
        All AI models, interfaces, and generated content templates remain
        the intellectual property of Review Booster. User-generated content
        is owned by the respective user.
      </p>
    ),
  },
  {
    id: "privacy",
    number: "07",
    title: "Privacy and Data",
    body: (
      <p>
        We collect and process data as described in our Privacy Policy. We
        do not sell user data to third parties. AI-generated content may be
        used in anonymized form to improve our models.
      </p>
    ),
  },
  {
    id: "liability",
    number: "08",
    title: "Limitation of Liability",
    body: (
      <p>
        Review Booster is not liable for any indirect, incidental, or
        consequential damages arising from use of the service. Our maximum
        liability is limited to the amount paid in the previous 3 months.
      </p>
    ),
  },
  {
    id: "termination",
    number: "09",
    title: "Termination",
    body: (
      <p>
        We reserve the right to terminate accounts that violate these terms
        without prior notice. Users may cancel their subscription at any
        time via account settings.
      </p>
    ),
  },
  {
    id: "contact",
    number: "10",
    title: "Contact",
    body: (
      <p>
        For questions about these Terms, contact us at{" "}
        <a className="terms-contact-link" href="mailto:Deificmonk@gmail.com">
          Deificmonk@gmail.com
        </a>
        .
      </p>
    ),
  },
];

const TermsConditionsPage = () => {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="terms-page animate-fadeIn">
      <div className="terms-header-card">
        <div className="terms-eyebrow">Legal Document</div>
        <h2 className="terms-title">Terms &amp; Conditions</h2>
        <p className="terms-subtitle">
          Please read these terms carefully before using this platform. By
          continuing, you agree to be bound by these conditions.
        </p>
      </div>

      <div className="terms-body-layout">
        {/* Sticky section nav */}
        <nav className="terms-nav" aria-label="Terms sections">
          <div className="terms-nav-label">On this page</div>
          <ul>
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <button
                  className={`terms-nav-item ${
                    activeId === section.id ? "active" : ""
                  }`}
                  onClick={() => scrollToSection(section.id)}
                >
                  <span className="terms-nav-number">{section.number}</span>
                  <span>{section.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sections */}
        <div className="terms-content-card">
          <p className="terms-doc-name">Terms and Conditions — Review Booster</p>

          {SECTIONS.map((section) => (
            <section
              key={section.id}
              id={section.id}
              ref={(el) => (sectionRefs.current[section.id] = el)}
              className="terms-section"
            >
              <div className="terms-section-heading">
                <span className="terms-section-number">
                  {section.number}
                </span>
                <h3>{section.title}</h3>
              </div>
              <div className="terms-section-body">{section.body}</div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};



function TermsAndCondition() {
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
        <TermsConditionsPage />
      </div>

      <Footer />
    </div>
  );
}




export default TermsAndCondition;