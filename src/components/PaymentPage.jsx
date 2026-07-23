


import React, { useState, useEffect } from 'react'
import './PaymentPage.css';
import api from "../api";

const PLANS = {
  starter: {
    id: "starter",
    name: "Starter",
    tagline: "For small shops & solo businesses",
    monthlyPrice: 999,
    yearlyPrice: 9999,
    features: [
      "1 Location / Business Profile",
      "Custom QR Code for Google Reviews",
      "Basic AI Review Suggestions",
      "WhatsApp/SMS Invites (200–300/mo)",
      "Basic Review Gate",
    ],
  },
  growth: {
    id: "growth",
    name: "Growth / Pro",
    tagline: "For established businesses & clinics",
    monthlyPrice: 1999,
    yearlyPrice: 19999,
    popular: true,
    features: [
      "Everything in Starter",
      "Smart AI Review Engine (Multi-language)",
      "Unlimited QR Code Scans",
      "WhatsApp Auto-Reminders",
      "Digital Business Card / Microsite",
      "Auto Social Media Creatives",
      "Priority Support",
    ],
  },
};

const PaymentPage = ({ user }) => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [processingPlan, setProcessingPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState("monthly"); // "monthly" | "yearly"

  const fetchPaymentStatus = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/payment/check-payment/${user.id}`);
      setPaymentInfo(data);

      // Auto-switch toggle to match user's current plan's billing cycle
      if (data?.data?.plan_name) {
        if (data.data.plan_name.endsWith("_yearly")) {
          setBillingCycle("yearly");
        } else if (data.data.plan_name.endsWith("_monthly")) {
          setBillingCycle("monthly");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchPaymentStatus();
    }
  }, [user]);

  const handlePayment = async (planId) => {
    setPaymentError("");
    setProcessingPlan(planId);

    try {
      const token = localStorage.getItem("rb_token");

      // plan_name sent to backend includes billing cycle,
      // e.g. "starter_monthly" or "starter_yearly"
      const backendPlanName = `${planId}_${billingCycle}`;

      const { data } = await api.post(
        "/payment/create-order",
        { user_id: user.id, plan_name: backendPlanName },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const options = {
        key: "rzp_live_TEwIhHLXLXjQto",
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,
        name: "Review Ninja Pro",
        description: "Subscription Plan",

        handler: async function (response) {
          try {
            const verifyRes = await api.post(
              "/payment/verify-payment",
              response,
              { headers: { Authorization: `Bearer ${token}` } },
            );

            if (verifyRes.data?.success) {
              setShowSuccess(true);
              await fetchPaymentStatus();
            } else {
              setPaymentError("Payment verify nahi ho paya. Support se contact karein.");
            }
          } catch (err) {
            console.log(err);
            setPaymentError("Payment verify nahi ho paya. Support se contact karein.");
          } finally {
            setProcessingPlan(null);
          }
        },

        modal: {
          ondismiss: function () {
            setProcessingPlan(null);
          },
        },

        prefill: { name: user.name, email: user.email },
        theme: { color: "#2563eb" },
      };

      const razor = new window.Razorpay(options);

      razor.on("payment.failed", function (response) {
        console.log(response.error);
        setPaymentError("Payment fail ho gaya: " + response.error.description);
        setProcessingPlan(null);
      });

      razor.open();
    } catch (error) {
      console.log(error);
      setPaymentError("Order banane mein error aaya. Dobara try karein.");
      setProcessingPlan(null);
    }
  };

  const renderButtonContent = (planId, label) => {
    const fullPlanId = `${planId}_${billingCycle}`;

    if (processingPlan === planId) {
      return (
        <>
          <span className="btn-spinner" />
          Processing...
        </>
      );
    }
    if (paymentInfo?.data?.plan_name === fullPlanId) {
      return "✓ Current Plan";
    }
    return label;
  };

  const getButtonClass = (planId) => {
    const fullPlanId = `${planId}_${billingCycle}`;

    if (paymentInfo?.data?.plan_name === fullPlanId) return "buy-btn current-plan";
    if (processingPlan === planId) return "buy-btn processing";
    return "buy-btn";
  };

  const isButtonDisabled = (planId) => {
    const fullPlanId = `${planId}_${billingCycle}`;
    return paymentInfo?.data?.plan_name === fullPlanId || processingPlan === planId;
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f4f7ff 0%, #eef3ff 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 36,
              height: 36,
              border: "3px solid #e4e8f0",
              borderTopColor: "#3d5af1",
              borderRadius: "50%",
              animation: "spin .7s linear infinite",
              margin: "0 auto 12px",
            }}
          />
          <p style={{ color: "#6b7280", fontSize: 14 }}>Loading Plans…</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="pricing-page animate-fadeIn">
      {paymentError && (
        <div className="payment-error-banner">{paymentError}</div>
      )}

      <div className="pricing-header">
        <h1>Choose Your Plan</h1>
        <p>Start collecting more Google reviews with powerful QR tools.</p>
      </div>

      {/* ===== BILLING TOGGLE ===== */}
      <div className="billing-toggle">
        <button
          className={billingCycle === "monthly" ? "toggle-btn active" : "toggle-btn"}
          onClick={() => setBillingCycle("monthly")}
        >
          Monthly
        </button>
        <button
          className={billingCycle === "yearly" ? "toggle-btn active" : "toggle-btn"}
          onClick={() => setBillingCycle("yearly")}
        >
          Yearly
          <span className="save-tag">Save 2 months</span>
        </button>
      </div>

      <div className="pricing-grid">
        {Object.values(PLANS).map((plan) => {
          const price =
            billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

          return (
            <div
              key={plan.id}
              className={plan.popular ? "pricing-card popular-card" : "pricing-card"}
            >
              {plan.popular && <span className="popular-tag">Most Popular</span>}

              <div className="card-top">
                <span className="plan-badge">{plan.name}</span>
                <p className="plan-tagline">{plan.tagline}</p>

                <h2>
                  ₹{price.toLocaleString("en-IN")}
                  <span className="price-period">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </h2>
                <p className="plan-gst">+ 18% GST</p>

                <div className="plan-features">
                  {plan.features.map((f, i) => (
                    <p key={i}>
                      <span className="check-icon">✔</span> {f}
                    </p>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handlePayment(plan.id)}
                className={getButtonClass(plan.id)}
                disabled={isButtonDisabled(plan.id)}
              >
                {renderButtonContent(plan.id, "Buy Now")}
              </button>
            </div>
          );
        })}

        {/* ================= ENTERPRISE PLAN ================= */}
        <div className="pricing-card">
          <div className="card-top">
            <span className="plan-badge">Enterprise</span>
            <p className="plan-tagline">Chains, franchises & agencies</p>

            <h2>Custom</h2>
            <p className="plan-gst">₹4,999–₹7,999/mo · up to 5 locations</p>

            <div className="plan-features">
              <p><span className="check-icon">✔</span> Multi-location Dashboard</p>
              <p><span className="check-icon">✔</span> White-Label branding</p>
              <p><span className="check-icon">✔</span> Unlimited Campaigns</p>
              <p><span className="check-icon">✔</span> Dedicated Account Manager</p>
              <p><span className="check-icon">✔</span> Sentiment Analysis</p>
            </div>
          </div>

          <button className="buy-btn">
            <a
              href="https://wa.me/918750200899"
              style={{ textDecoration: "none", color: "white" }}
            >
              Contact Now
            </a>
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="success-icon">✓</div>
            <h3>Payment Successful</h3>
            <p>Aapka plan activate ho gaya hai. Confirmation email bhej di gayi hai.</p>
            <button onClick={() => setShowSuccess(false)} className="success-close-btn">
              Great!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage





