
import React, { useState, useEffect } from 'react'
import './PaymentPage.css';
import api from "../api";

const PLANS = {
  starter: {
    id: "starter",
    name: "Starter",
    tagline: "For small shops & solo businesses",
    monthlyPrice: 999,
    quarterlyPrice: 2997, // assumption: 999 x 3 — change if actual discounted price hai
    yearlyPrice: 9999,
    features: [
      "2 Location / Business Profile",
      "2 Business Review QR Standee",
      "50 AI Review Generations per Business Location",
      "AI-Powered Review Generator",
      "Advanced Review Analytics",
    ],
  },
  growth: {
    id: "growth",
    name: "Growth / Pro",
    tagline: "For established businesses & clinics",
    monthlyPrice: 1999,
    quarterlyPrice: 5997, // assumption: 1999 x 3 — change if actual discounted price hai
    yearlyPrice: 19999,
    popular: true,
    features: [
      "3 Location / Business Profile",
      "3 Business Review QR Standee",
      "100 AI Review Generations per Business Location",
      "AI-Powered Review Generator",
      "Advanced Review Analytics with sentiment analysis",
    ],
  },
};

const PaymentPage = ({ user }) => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [processingPlan, setProcessingPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState("monthly"); // "monthly" | "yearly" — top toggle, sirf card price display ke liye

  // ===== popup ke liye state =====
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [modalPlan, setModalPlan] = useState(null);
  const [modalCycle, setModalCycle] = useState("quarterly"); // "quarterly" | "yearly"

  const fetchPaymentStatus = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/payment/check-payment/${user.id}`);
      setPaymentInfo(data);

      // Auto-switch toggle to match user's current plan's billing cycle
      if (data?.data?.plan_name) {
        if (data.data.plan_name.endsWith("_yearly")) {
          setBillingCycle("yearly");
        } else if (data.data.plan_name.endsWith("_quarterly")) {
          // quarterly ke liye top toggle me alag option nahi hai, monthly-view se match kar rahe
          setBillingCycle("monthly");
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

  // Buy Now ab seedha payment nahi, popup kholega — current top toggle ke hisaab se default cycle set karega
  const openPlanModal = (plan) => {
    setModalPlan(plan);
    setModalCycle(billingCycle === "yearly" ? "yearly" : "quarterly");
    setShowPlanModal(true);
  };

  const closePlanModal = () => {
    setShowPlanModal(false);
    setModalPlan(null);
  };

  // handlePayment ab planId + cycle dono leta hai
  const handlePayment = async (planId, cycle) => {
    setPaymentError("");
    setProcessingPlan(planId);

    try {
      const token = localStorage.getItem("rb_token");

      // plan_name sent to backend, e.g. "starter_quarterly" or "starter_yearly"
      const backendPlanName = `${planId}_${cycle}`;

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

  // popup se "Proceed to Pay" click hone par
  const handleModalProceed = () => {
    if (!modalPlan) return;
    closePlanModal();
    handlePayment(modalPlan.id, modalCycle);
  };

  // ===== BUG FIX: card ka "current plan" status uss card ke top-toggle cycle ke against check hona chahiye =====
  // Top toggle "monthly" -> card ka actual purchase-cycle "quarterly" hota hai (kyunki popup me monthly ka option nahi, quarterly hi hai)
  // Top toggle "yearly" -> card ka actual purchase-cycle "yearly" hota hai
  const getCardFullPlanId = (planId) => {
    const cycle = billingCycle === "yearly" ? "yearly" : "quarterly";
    return `${planId}_${cycle}`;
  };

  const isCardCurrentPlan = (planId) => {
    return paymentInfo?.data?.plan_name === getCardFullPlanId(planId);
  };

  const renderButtonContent = (planId, label) => {
    if (processingPlan === planId) {
      return (
        <>
          <span className="btn-spinner" />
          Processing...
        </>
      );
    }
    if (isCardCurrentPlan(planId)) {
      return "✓ Current Plan";
    }
    return label;
  };

  const getButtonClass = (planId) => {
    if (isCardCurrentPlan(planId)) return "buy-btn current-plan";
    if (processingPlan === planId) return "buy-btn processing";
    return "buy-btn";
  };

  const isButtonDisabled = (planId) => {
    return isCardCurrentPlan(planId) || processingPlan === planId;
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

  const modalPrice =
    modalPlan && (modalCycle === "quarterly" ? modalPlan.quarterlyPrice : modalPlan.yearlyPrice);

  return (
    <div className="pricing-page animate-fadeIn">
      {paymentError && (
        <div className="payment-error-banner">{paymentError}</div>
      )}

      <div className="pricing-header">
        <h1>Choose Your Plan</h1>
        <p>Start collecting more Google reviews with powerful QR tools.</p>
      </div>

      {/* ===== BILLING TOGGLE (card price display ke liye) ===== */}
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
                onClick={() => openPlanModal(plan)}
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
              <p><span className="check-icon">✔</span> Multi-Location Business Profiles</p>
              <p><span className="check-icon">✔</span> QR Standees for All Locations</p>
              <p><span className="check-icon">✔</span> Unlimited AI Review Generator</p>
              <p><span className="check-icon">✔</span> Advanced Review Analytics</p>
              <p><span className="check-icon">✔</span> Custom Feature Development</p>
              <p><span className="check-icon">✔</span> Priority Support</p>
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

      {/* ===== PLAN SELECTION POPUP ===== */}
      {showPlanModal && modalPlan && (
        <div className="success-overlay" onClick={closePlanModal}>
          <div className="plan-modal" onClick={(e) => e.stopPropagation()}>
            <button className="plan-modal-close" onClick={closePlanModal}>✕</button>

            <span className="plan-badge">{modalPlan.name}</span>
            <p className="plan-tagline" style={{ marginTop: 4 }}>
              {modalPlan.tagline}
            </p>

            <div className="plan-features" style={{ margin: "16px 0" }}>
              {modalPlan.features.map((f, i) => (
                <p key={i}>
                  <span className="check-icon">✔</span> {f}
                </p>
              ))}
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "16px 0" }} />

            {/* dropdown: 3 Months / Yearly */}
            <label className="plan-modal-label">Select Billing Cycle</label>
            <select
              value={modalCycle}
              onChange={(e) => setModalCycle(e.target.value)}
              className="plan-modal-select"
            >
              <option value="quarterly">
                3 Months — ₹{modalPlan.quarterlyPrice.toLocaleString("en-IN")}
              </option>
              <option value="yearly">
                Yearly — ₹{modalPlan.yearlyPrice.toLocaleString("en-IN")}
              </option>
            </select>

            {/* price breakdown */}
            <div className="plan-modal-summary">
              <div className="plan-modal-row">
                <span>Plan Amount</span>
                <span>₹{modalPrice?.toLocaleString("en-IN")}</span>
              </div>
              <div className="plan-modal-row">
                <span>GST (18%)</span>
                <span>₹{Math.round(modalPrice * 0.18).toLocaleString("en-IN")}</span>
              </div>
              <div className="plan-modal-row plan-modal-total">
                <span>Total Amount</span>
                <span>
                  ₹{Math.round(modalPrice * 1.18).toLocaleString("en-IN")}
                  <span className="price-period">
                    {modalCycle === "quarterly" ? " / 3 months" : " / year"}
                  </span>
                </span>
              </div>
            </div>

            <button
              onClick={handleModalProceed}
              className="buy-btn"
              disabled={processingPlan === modalPlan.id}
              style={{ width: "100%", marginTop: 16 }}
            >
              {processingPlan === modalPlan.id ? "Processing..." : "Proceed to Pay"}
            </button>
          </div>
        </div>
      )}

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

export default PaymentPage;