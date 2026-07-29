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
        This Refund Policy explains the terms under which payments made to
        Review Ninja Pro ("Service", "Platform", "we", "us", "our"),
        owned and operated by Deific Digital, are handled. By subscribing
        to or making any payment on the Platform, you agree to the terms
        set out in this Policy, in addition to our Terms &amp; Conditions.
      </p>
    ),
  },
  {
    id: "general-policy",
    number: "02",
    title: "General Policy — No Refunds",
    body: (
      <>
        <p className="terms-lead">
          All payments made towards any subscription plan (Free Trial
          upgrade, Starter, Growth, Enterprise, or any add-on) are strictly
          non-refundable, once processed. This applies regardless of:
        </p>
        <ul>
          <li>How much of the Service (reviews generated, business locations used, standees claimed) you have actually used</li>
          <li>Change of mind, dissatisfaction, or discontinuation of your business</li>
          <li>Downgrading from a higher plan to a lower one</li>
          <li>Non-usage of the Service during your active billing period</li>
        </ul>
        <p>
          By completing a payment on the Platform, you expressly
          acknowledge and accept this no-refund policy.
        </p>
      </>
    ),
  },
  {
    id: "cancellation",
    number: "03",
    title: "Subscription Cancellation",
    body: (
      <p>
        There is currently no option to cancel a subscription mid-cycle.
        Once a plan is purchased, it remains active for its full paid
        duration (minimum three months for Starter/Growth plans, or the
        applicable annual/Enterprise term), and no partial refund is issued
        for any unused portion of that period. We may introduce a
        self-serve cancellation option in the future; this Policy will be
        updated accordingly if and when that happens.
      </p>
    ),
  },
  {
    id: "exceptions",
    number: "04",
    title: "Exception: Duplicate or Double Payment",
    body: (
      <>
        <p className="terms-lead">
          The only exception to our no-refund policy is genuine duplicate
          or double payment, meaning:
        </p>
        <ul>
          <li>You were charged more than once for the same subscription plan or billing cycle due to a technical or payment gateway error</li>
          <li>Your account reflects a duplicate transaction for the same order</li>
        </ul>
        <p>
          In such verified cases, we will refund the duplicate (extra)
          amount charged. This exception does not apply to separate,
          intentional purchases (e.g., buying two different plans, or
          renewing after your term ends).
        </p>
      </>
    ),
  },
  {
    id: "failed-payments",
    number: "05",
    title: "Failed or Pending Transactions",
    body: (
      <p>
        If a payment attempt fails or remains "pending" but an amount is
        deducted from your bank account, card, or UPI, this amount is
        automatically reversed and refunded to your original payment
        method by Razorpay (our payment gateway) within 5–7 business days.
        No action is required from you in such cases, though you're welcome
        to contact us if the amount is not reversed within this window.
      </p>
    ),
  },
  {
    id: "reporting",
    number: "06",
    title: "Reporting a Duplicate Payment",
    body: (
      <>
        <p className="terms-lead">
          If you believe you have been charged more than once for the same
          plan, please contact us with the following details:
        </p>
        <ul>
          <li>Registered email address / account details</li>
          <li>Payment date(s) and amount(s) charged</li>
          <li>Transaction ID(s) or payment reference number(s), if available</li>
        </ul>
        <p>
          We will verify the transactions with Razorpay and, if confirmed
          as a genuine duplicate charge, process the refund of the extra
          amount to your original payment method within a reasonable
          timeframe.
        </p>
      </>
    ),
  },
  {
    id: "enterprise",
    number: "07",
    title: "Enterprise Plan Payments",
    body: (
      <p>
        Payments made under a custom Enterprise plan are also
        non-refundable, except in the case of a verified duplicate payment
        as described in Section 04. Any additional refund-related terms
        specific to an Enterprise agreement, if applicable, will be
        communicated separately in writing at the time of that agreement.
      </p>
    ),
  },
  {
    id: "changes",
    number: "08",
    title: "Changes to This Policy",
    body: (
      <p>
        We may update this Refund Policy from time to time, including if we
        introduce new cancellation or refund options in the future. The
        updated Policy will be posted on this page with a revised
        "Effective Date." Continued use of the Service after such changes
        constitutes your acceptance of the updated Policy.
      </p>
    ),
  },
  {
    id: "contact",
    number: "09",
    title: "Contact Us",
    body: (
      <p>
        For any questions or concerns regarding payments or this Refund
        Policy, please contact us at{" "}
        <a className="terms-contact-link" href="mailto:deificmonk@gmail.com">
          deificmonk@gmail.com
        </a>{" "}
        or visit www.deificmonk.com
      </p>
    ),
  },
];

function RefundPolicy() {
  return (
    <div style={{ background: "#050e1c", minHeight: "100vh" }}>
      <Navbar />

      <div className="terms-wrapper">
        <div className="terms-page">
          <div className="terms-header-card">
            <div className="terms-eyebrow">Legal Document</div>
            <h2 className="terms-title">Refund Policy</h2>
            <p className="terms-subtitle">
              Please read this policy carefully to understand how payments,
              cancellations, and refunds are handled.
            </p>
          </div>

          <div className="terms-content-card">
            <p className="terms-doc-name">Refund Policy — Review Ninja Pro</p>

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

export default RefundPolicy;