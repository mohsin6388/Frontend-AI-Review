


import React from "react";
import "./TermsAndCondition.css";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const SECTIONS = [
  {
    id: "intro",
    number: "01",
    title: "Introduction",
    body: (
      <p>
        This Privacy Policy explains how Review Ninja Pro ("Service",
        "Platform", "we", "us", "our"), owned and operated by Deific Digital, collects, uses, stores, and protects information when you
        use our website www.reviewninjapro.com, dashboard, and QR-based
        review generation tools. By using the Service, you agree to the
        collection and use of information as described in this Policy.
      </p>
    ),
  },
  {
    id: "info-business-owner",
    number: "02",
    title: "Information We Collect From Business Owners",
    body: (
      <>
        <p className="terms-lead">
          When you sign up and use the Platform as a business owner, we
          collect:
        </p>
        <ul>
          <li>Account information — name, email address, password, and phone number</li>
          <li>Business information — business name, business type, brand logo, Google Place ID, and business email</li>
          <li>Payment information — processed securely through Razorpay for subscription billing (we do not store your card, UPI, or bank details on our own servers)</li>
        </ul>
      </>
    ),
  },
  {
    id: "info-customer",
    number: "03",
    title: "Information We Collect From Customers (Review Generation)",
    body: (
      <>
        <p>
          When a customer scans a business's QR code to leave feedback, we
          do <strong>not</strong> collect any personal data about that
          customer — no name, email, phone number, or identity information
          is requested or stored.
        </p>
        <p>
          We only capture the star rating and the feedback tags the
          customer selects. This information is used by our AI engine to
          generate a draft review, and is also stored so it can be shown to
          the business owner on their dashboard — helping them understand
          which aspects of their service customers rate positively or
          negatively. This data is anonymous and is not linked to any
          identifiable customer.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    number: "04",
    title: "How We Use Your Information",
    body: (
      <ul>
        <li>To create and manage your account and business profile</li>
        <li>To generate your QR code and standee</li>
        <li>To process subscription payments and manage billing</li>
        <li>To provide customer support and respond to your queries or tickets</li>
        <li>To show you aggregated, anonymous customer feedback trends (ratings and tags) on your dashboard</li>
        <li>For our own marketing and promotional communications, such as informing you about offers, plan upgrades, or product updates</li>
      </ul>
    ),
  },
  {
    id: "ai-processing",
    number: "05",
    title: "AI Processing",
    body: (
      <p>
        To generate reviews, the star rating and selected tags are securely
        sent to a third-party AI provider for processing. The AI provider
        does not receive any personal or identifying information about the
        customer or business owner beyond what is necessary to generate the
        review text.
      </p>
    ),
  },
  {
    id: "payment-processing",
    number: "06",
    title: "Payment Processing",
    body: (
      <p>
        All subscription payments are processed through Razorpay, a
        third-party payment gateway. Razorpay handles your payment details
        in accordance with its own privacy and security practices. We do
        not store your full card, UPI, or bank account details on our
        servers.
      </p>
    ),
  },
  {
    id: "cookies-analytics",
    number: "07",
    title: "Cookies & Analytics",
    body: (
      <p>
        We do not currently use cookies or analytics tools on our website.
        In the future, we may use tools such as Google Analytics to
        understand website traffic and improve our ranking and user
        experience. If and when we do, this Policy will be updated, and
        such tools will only collect standard, non-identifying usage data
        (such as pages visited and general location) in accordance with
        their respective privacy practices.
      </p>
    ),
  },
  {
    id: "data-sharing",
    number: "08",
    title: "Data Sharing & Third Parties",
    body: (
      <>
        <p className="terms-lead">
          We do not sell, rent, or trade your personal information. We only
          share information with:
        </p>
        <ul>
          <li>Razorpay, to process subscription payments</li>
          <li>Our AI provider, to generate review drafts (rating and tags only, no personal data)</li>
          <li>Hosting and infrastructure providers necessary to operate the Service</li>
          <li>Law enforcement or regulatory authorities, where required by applicable law</li>
        </ul>
      </>
    ),
  },
  {
    id: "data-security",
    number: "09",
    title: "Data Security",
    body: (
      <p>
        We take reasonable technical and organizational measures to protect
        your information from unauthorized access, alteration, disclosure,
        or destruction. However, no method of transmission or storage over
        the internet is 100% secure, and we cannot guarantee absolute
        security.
      </p>
    ),
  },
  {
    id: "data-retention",
    number: "10",
    title: "Data Retention",
    body: (
      <p>
        We retain business owner account and business information for as
        long as your account remains active, and for a reasonable period
        thereafter to comply with legal, accounting, or reporting
        requirements. Anonymous rating/tag data collected from customer
        feedback is retained to continue showing you historical trends on
        your dashboard.
      </p>
    ),
  },
  {
    id: "your-rights",
    number: "11",
    title: "Your Rights",
    body: (
      <>
        <p className="terms-lead">As a business owner, you have the right to:</p>
        <ul>
          <li>Access and review the personal information we hold about you</li>
          <li>Request correction of inaccurate or incomplete information</li>
          <li>Request deletion of your account and associated data, subject to any legal retention requirements</li>
          <li>Opt out of marketing communications at any time</li>
        </ul>
        <p>
          To exercise any of these rights, please contact us using the
          details in Section 14.
        </p>
      </>
    ),
  },
  {
    id: "childrens-privacy",
    number: "12",
    title: "Children's Privacy",
    body: (
      <p>
        The Service is not intended for individuals under the age of 18. We
        do not knowingly collect personal information from children. If you
        believe a child has provided us with personal information, please
        contact us so we can remove it.
      </p>
    ),
  },
  {
    id: "changes",
    number: "13",
    title: "Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy from time to time to reflect
        changes in our practices, technology, or legal requirements. The
        updated Policy will be posted on this page with a revised
        "Effective Date." Continued use of the Service after such changes
        constitutes your acceptance of the updated Policy.
      </p>
    ),
  },
  {
    id: "contact",
    number: "14",
    title: "Contact Us",
    body: (
      <p>
        If you have any questions about this Privacy Policy or how your
        data is handled, please contact us at{" "}
        <a className="terms-contact-link" href="mailto:deificmonk@gmail.com">
          deificmonk@gmail.com
        </a>{" "}
        or visit www.reviewninjapro.com
      </p>
    ),
  },
];

function PrivacyPolicy() {
  return (
    <div style={{ background: "#050e1c", minHeight: "100vh" }}>
      <Navbar />

      <div className="terms-wrapper">
        <div className="terms-page">
          <div className="terms-header-card">
            <div className="terms-eyebrow">Legal Document</div>
            <h2 className="terms-title">Privacy Policy</h2>
            <p className="terms-subtitle">
              Please read this policy carefully to understand how we
              collect, use, and protect your information.
            </p>
          </div>

          <div className="terms-content-card">
            <p className="terms-doc-name">Privacy Policy — Review Ninja Pro</p>

            {SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="terms-section">
                <div className="terms-section-heading">
                  <span className="terms-section-number">{section.number}</span>
                  <h3>{section.title}</h3>
                </div>
                <div className="terms-section-body">{section.body}</div>
              </section>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;