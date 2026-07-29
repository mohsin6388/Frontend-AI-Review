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
        Welcome to Review Ninja Pro ("Service", "Platform", "we", "us",
        "our"), owned and operated by Deific Digital. These Terms &amp;
        Conditions ("Terms") govern your access to and use of our website
        www.reviewninjapro.com, dashboard, mobile interface, QR-based
        review generation tools, and all related services (collectively,
        the "Service"). By signing up for, accessing, or using the Service,
        you ("User", "Business Owner", "you") agree to be bound by these
        Terms. If you do not agree, please do not use the Service.
      </p>
    ),
  },
  {
    id: "description",
    number: "02",
    title: "Description of Service",
    body: (
      <p>
        Review Ninja Pro is a digital platform that helps businesses
        collect customer feedback and generate reviews using Artificial
        Intelligence (AI). Business owners create an account, register
        their business location(s), and receive a unique QR code linked to
        their business profile. Customers who visit the business scan this
        QR code, provide a star rating, and select relevant feedback tags.
        Based on this input, our system uses an AI engine to generate a
        draft review, which the customer may then edit before posting it to
        the business's Google My Business (GMB) profile or other linked
        review platforms.
      </p>
    ),
  },
  {
    id: "who-can-use",
    number: "03",
    title: "Who Can Use This Service",
    body: (
      <>
        <p className="terms-lead">
          This Service is designed for local businesses that collect
          customer reviews and wish to improve their online presence and
          local search ranking, including but not limited to:
        </p>
        <ul>
          <li>Restaurants</li>
          <li>Salons</li>
          <li>Parlours</li>
          <li>Cafés</li>
          <li>Lounges and bars</li>
          <li>Other local service-based businesses that rely on customer reviews for visibility and ranking</li>
        </ul>
        <p>
          You must be at least 18 years old and legally authorized to
          represent the business you register on the Platform.
        </p>
      </>
    ),
  },
  {
    id: "account-registration",
    number: "04",
    title: "Account Registration",
    body: (
      <>
        <p className="terms-lead">
          To use the Service, you must create an account by providing:
        </p>
        <ul>
          <li>A valid email address</li>
          <li>A password</li>
          <li>A valid phone number</li>
        </ul>
        <p>
          You agree to verify your account as prompted and to provide
          accurate, complete, and current information at all times. You are
          solely responsible for maintaining the confidentiality of your
          login credentials and for all activity that occurs under your
          account. Notify us immediately of any unauthorized use of your
          account.
        </p>
      </>
    ),
  },
  {
    id: "business-profile",
    number: "05",
    title: "Business Profile & QR Code Setup",
    body: (
      <>
        <p className="terms-lead">
          After registration, you can create a business profile from your
          dashboard by providing:
        </p>
        <ul>
          <li>Business name</li>
          <li>Business type/category</li>
          <li>Business brand logo</li>
          <li>Google Place ID (as provided by Google My Business / GMB)</li>
          <li>Business email address</li>
        </ul>
        <p>
          Upon submission, the Platform generates a unique QR code bearing
          your business name and logo. You may download this QR code and
          display it at your premises (e.g., as a standee, table tent,
          counter display) to enable customers to scan it and leave
          feedback. You are responsible for the physical care, display, and
          replacement of your QR code/standee. If lost, damaged, or
          removed, you may re-download or re-order it from your dashboard,
          subject to your active plan's entitlements.
        </p>
      </>
    ),
  },
  {
    id: "subscription-plans",
    number: "06",
    title: "Subscription Plans & Pricing",
    body: (
      <>
        <p className="terms-lead">
          We offer the following subscription tiers. Features, limits, and
          pricing may be updated from time to time; the version in effect
          at the time of your purchase or renewal will apply.
        </p>
        <ul>
          <li><strong>Free Trial</strong> — Free for 1 month, 1 business, 5 AI-generated reviews.</li>
          <li><strong>Starter Plan</strong> — ₹999/month, 2 business locations, 50 reviews/month, 1 standee.</li>
          <li><strong>Growth Plan</strong> — ₹1,999/month, 3 business locations, 50 reviews/month, 3 standees.</li>
          <li><strong>Enterprise Plan</strong> — Custom pricing, on request.</li>
        </ul>
        <p>
          New users receive a one-time, one (1) month free trial upon
          sign-up. The free trial does not auto-renew into a paid plan; you
          must actively subscribe to continue using the Service afterward.
          Except for the free trial, the minimum purchase duration for
          Starter and Growth plans is three (3) months — monthly-only
          (single month) purchases are not available. Users who subscribe
          annually receive the equivalent of two (2) months free compared
          to cumulative monthly pricing (e.g., Starter Plan: ₹9,999/year in
          place of ₹11,988; Growth Plan: ₹19,999/year in place of
          ₹23,988). Exact pricing displayed on the Platform at checkout
          shall prevail over this document in case of any discrepancy.
          Businesses with custom or high-volume requirements may contact us
          directly for Enterprise pricing, determined on a case-by-case
          basis before any commitment is made.
        </p>
      </>
    ),
  },
  {
    id: "payments",
    number: "07",
    title: "Payments & Non-Refundable Policy",
    body: (
      <>
        <ul>
          <li>All payments made towards any subscription plan (Starter, Growth, Enterprise, or any add-on) are strictly non-refundable, in full or in part, once processed, regardless of the extent to which the Service or its features (including reviews, standees, or business location slots) have been utilized.</li>
          <li>This includes, without limitation, cases of early cancellation, downgrade, non-usage, dissatisfaction, or discontinuation of your business.</li>
          <li>You are responsible for reviewing plan features, limits, and pricing carefully before making a payment.</li>
          <li>We reserve the right to change subscription pricing prospectively; such changes will not affect an already-active billing cycle.</li>
        </ul>
        <p>
          By making a payment, you expressly acknowledge and accept this
          non-refundable policy.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    number: "08",
    title: "Acceptable Use & Restrictions",
    body: (
      <>
        <p className="terms-lead">
          The Service is intended solely to help genuine customers of your
          business share authentic feedback and reviews. By using the
          Service, you agree that:
        </p>
        <ul>
          <li>The Service may only be used to generate reviews from real customers who have genuinely visited or used your business's products or services.</li>
          <li>You will not use, or permit or encourage others to use, the Service to generate fake, incentivized-in-exchange-for-rating-manipulation, or fraudulent reviews, or reviews from persons who have not actually availed your services.</li>
          <li>You will not misuse the QR code, standee, or Platform to solicit reviews in a manner that violates Google's review policies, other review platforms' guidelines, or applicable consumer protection or advertising laws.</li>
          <li>You will not attempt to reverse-engineer, copy, resell, or misuse the Platform, its AI engine, or its underlying technology.</li>
          <li>You will not use the Service for any unlawful, defamatory, misleading, or harmful purpose.</li>
        </ul>
        <p>
          We reserve the right to suspend or terminate any account found to
          be in violation of this section, without refund, and without
          prior notice in cases of serious or repeated violation.
        </p>
      </>
    ),
  },
  {
    id: "ai-disclaimer",
    number: "09",
    title: "AI-Generated Content Disclaimer",
    body: (
      <ul>
        <li>Reviews generated through the Platform are created using an AI engine based on the customer's star rating and selected feedback tags.</li>
        <li>While we strive to make AI-generated reviews natural and human-readable, the AI-generated text is not guaranteed to be 100% accurate, error-free, or fully human-like, and may occasionally contain mistakes, awkward phrasing, or inaccuracies.</li>
        <li>Customers are responsible for reading and verifying/editing the AI-generated review before copying and posting it to Google My Business or any other platform. The Service provides a draft only, not a final, verified statement of fact.</li>
        <li>The Company disclaims liability for the accuracy, appropriateness, or consequences of any AI-generated review that a customer chooses to post, whether edited or unedited.</li>
      </ul>
    ),
  },
  {
    id: "content-ownership",
    number: "10",
    title: "Content Ownership",
    body: (
      <ul>
        <li>Reviews generated using the Platform, once posted by the customer, belong to the customer and/or the platform (e.g., Google) on which they are posted, subject to that platform's own terms.</li>
        <li>You (the business owner) retain ownership of your business name, logo, and branding materials that you upload to the Platform. By uploading your logo and business details, you grant us a limited, non-exclusive license to use them solely for the purpose of generating your QR code, standee, and operating the Service for you.</li>
        <li>All intellectual property in the Platform itself — including its software, AI engine, design, and technology — remains the exclusive property of the Company.</li>
      </ul>
    ),
  },
  {
    id: "privacy",
    number: "11",
    title: "Data Privacy & Use",
    body: (
      <ul>
        <li>We collect and securely store business owner information (such as account details, business details, and payment information) as necessary to operate the Service.</li>
        <li>We may use this data for our own marketing and promotional purposes (such as informing you about offers, plan upgrades, or product updates).</li>
        <li>We do not sell, rent, or share your data with any third party, except where required to operate core Service functionality (such as payment processors) or where required by law.</li>
        <li>For further details on how we handle your data, please refer to our separate Privacy Policy, which forms part of these Terms by reference.</li>
      </ul>
    ),
  },
  {
    id: "support",
    number: "12",
    title: "Support & Grievance Redressal",
    body: (
      <>
        <p className="terms-lead">
          If you face any issue related to technical functionality,
          payments, or your account, you may:
        </p>
        <ul>
          <li>Raise a support ticket through the Contact section on your dashboard, which opens a chat interface where you can describe your issue; our team will review and respond to resolve it.</li>
          <li>
            Reach out to us directly at{" "}
            <a className="terms-contact-link" href="mailto:deificmonk@gmail.com">
              deificmonk@gmail.com
            </a>
            .
          </li>
        </ul>
        <p>
          We aim to respond to and resolve queries within a reasonable
          timeframe, though response times may vary based on the nature and
          complexity of the issue.
        </p>
      </>
    ),
  },
  {
    id: "suspension",
    number: "13",
    title: "Account Suspension & Termination",
    body: (
      <ul>
        <li>We reserve the right to suspend or terminate your account, with or without notice, if you violate these Terms, misuse the Service (including for fake or manipulated reviews), fail to make payment, or engage in any unlawful activity.</li>
        <li>You may stop using the Service at any time; however, this does not entitle you to a refund of any amount already paid, as set out in Section 07.</li>
      </ul>
    ),
  },
  {
    id: "liability",
    number: "14",
    title: "Limitation of Liability",
    body: (
      <>
        <p className="terms-lead">
          The Service is provided on an "as is" and "as available" basis.
          To the maximum extent permitted by law, the Company shall not be
          liable for:
        </p>
        <ul>
          <li>Any inaccuracy, error, or unintended content in AI-generated reviews;</li>
          <li>Any loss of business, reputation, or revenue resulting from reviews posted (or not posted) using the Service;</li>
          <li>Any action taken by Google or other third-party platforms in relation to reviews collected via the Service (including removal or flagging of reviews);</li>
          <li>Any indirect, incidental, or consequential damages arising from use of the Service.</li>
        </ul>
      </>
    ),
  },
  {
    id: "indemnification",
    number: "15",
    title: "Indemnification",
    body: (
      <p>
        You agree to indemnify and hold harmless the Company, its officers,
        employees, and affiliates from any claims, damages, liabilities, or
        expenses arising out of your misuse of the Service, violation of
        these Terms, or violation of any third-party review platform's
        policies or applicable law.
      </p>
    ),
  },
  {
    id: "changes",
    number: "16",
    title: "Changes to These Terms",
    body: (
      <p>
        We may update or modify these Terms from time to time to reflect
        changes in our Service, plans, or legal requirements. The updated
        Terms will be posted on this page with a revised "Effective Date."
        Continued use of the Service after such changes constitutes your
        acceptance of the updated Terms.
      </p>
    ),
  },
  {
    id: "governing-law",
    number: "17",
    title: "Governing Law & Jurisdiction",
    body: (
      <p>
        These Terms shall be governed by and construed in accordance with
        the laws of India. Any disputes arising out of or in connection
        with these Terms shall be subject to the exclusive jurisdiction of
        the courts of Kanpur Nagar (U.P), India.
      </p>
    ),
  },
  {
    id: "contact",
    number: "18",
    title: "Contact Us",
    body: (
      <p>
        If you have any questions about these Terms, please contact us at{" "}
        <a className="terms-contact-link" href="mailto:deificmonk@gmail.com">
          deificmonk@gmail.com
        </a>{" "}
        or visit www.reviewninjapro.com 
      </p>
    ),
  },
];

function TermsAndCondition() {
  return (
    <div style={{ background: "#050e1c", minHeight: "100vh" }}>
      <Navbar />

      <div className="terms-wrapper">
        <div className="terms-page">
          <div className="terms-header-card">
            <div className="terms-eyebrow">Legal Document</div>
            <h2 className="terms-title">Terms &amp; Conditions</h2>
            <p className="terms-subtitle">
              Please read these terms carefully before using this platform.
              By continuing, you agree to be bound by these conditions.
            </p>
          </div>

          <div className="terms-content-card">
            <p className="terms-doc-name">Terms and Conditions — [Service/App Name]</p>

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

export default TermsAndCondition;