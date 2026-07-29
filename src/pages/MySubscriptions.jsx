import React, { useEffect, useState } from 'react'
import api from "../api";
import "./MySubscriptions.css";

const MySubscriptions = ({ user }) => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/payment/check-payment/${user.id}`);
        console.log(data);
        setPaymentInfo(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchPaymentStatus();
    }
  }, [user]);

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
          <p style={{ color: "#6b7280", fontSize: 14 }}>
            Loading Your Subscription &amp; Details
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  const data = paymentInfo?.data;

  // ===== NO SUBSCRIPTION STATE =====
  if (!data || !paymentInfo?.isPaid) {
    return (
      <div className="sub-page">
        <div className="no-sub-card">
          <div className="no-sub-icon">📭</div>
          <h2>No Active Subscription</h2>
          <p>You haven't subscribed to any plan yet. Choose a plan to get started.</p>
        </div>
      </div>
    );
  }

  const planName = data.plan_name
    ? data.plan_name.charAt(0).toUpperCase() + data.plan_name.slice(1)
    : "N/A";

    console.log("====>",planName)

  const planNames = {
  Starter_quarterly: "Starter Quarterly Plan",
  Starter_yearly: "Starter Yearly Plan",
  Growth_quarterly: "Growth Quarterly Plan",
  Growth_yearly: "Growth Yearly Plan",
  };


  // ===== EXPIRY CALCULATION (pure frontend, based on end_date) =====
  // Raw days remaining, can go negative once expired
  const rawDaysRemaining = data.end_date
    ? Math.ceil((new Date(data.end_date) - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  const isExpired = rawDaysRemaining !== null && rawDaysRemaining <= 0;
  const isExpiringSoon =
    rawDaysRemaining !== null && rawDaysRemaining > 0 && rawDaysRemaining <= 7;
  const isActive = rawDaysRemaining !== null && rawDaysRemaining > 0;

  const daysRemaining = rawDaysRemaining !== null ? Math.max(0, rawDaysRemaining) : null;

  return (
    <div className="sub-page">
      <div className="subscription-card">
        <div className="sub-header">
          <div>
            <span
              className={`sub-status-pill ${
                isExpired ? "expired" : isExpiringSoon ? "warning" : "active"
              }`}
            >
              {isExpired ? "● Expired" : isExpiringSoon ? "● Expiring Soon" : "● Active"}
            </span>
            <h1>🎉 {planNames[planName]}</h1>
          </div>

          {daysRemaining !== null && isActive && (
            <div className={`days-left-box ${isExpiringSoon ? "warning" : ""}`}>
              <span className="days-number">{daysRemaining}</span>
              <span className="days-label">days left</span>
            </div>
          )}
        </div>

        <div className="subscription-details">
          <div className="detail-item">
            <h4>Plan</h4>
            <p>{planNames[planName]}</p>
          </div>

          <div className="detail-item">
            <h4>Amount Paid</h4>
            <p>₹{data.amount ? Number(data.amount).toLocaleString("en-IN") : "N/A"}</p>
          </div>

          <div className="detail-item">
            <h4>Payment Date</h4>
            <p>
              {data.paid_at
                ? new Date(data.paid_at).toLocaleDateString("en-IN")
                : "N/A"}
            </p>
          </div>

          <div className="detail-item">
            <h4>Started On</h4>
            <p>
              {data.start_date
                ? new Date(data.start_date).toLocaleDateString("en-IN")
                : "N/A"}
            </p>
          </div>

          <div className="detail-item">
            <h4>Expiry Date</h4>
            <p>
              {data.end_date
                ? new Date(data.end_date).toLocaleDateString("en-IN")
                : "N/A"}
            </p>
          </div>

          <div className="detail-item">
            <h4>Business Locations</h4>
            <p>{data.max_businesses ?? "N/A"}</p>
          </div>

          <div className="detail-item">
            <h4>Status</h4>
            <p>{isExpired ? "Expired ⚠️" : "Active ✅"}</p>
          </div>

          <div className="detail-item">
            <h4>Payment Status</h4>
            <p className="capitalize">{data.payment_status || "N/A"}</p>
          </div>
        </div>

        {isExpired && (
          <div className="renew-banner expired">
            ⚠️ Your plan has expired. Renew now to continue enjoying all features.
          </div>
        )}

        {isExpiringSoon && (
          <div className="renew-banner warning">
            ⏳ Your plan expires in {daysRemaining} day{daysRemaining === 1 ? "" : "s"}.
            Renew soon to avoid any interruption.
          </div>
        )}
      </div>
    </div>
  );
};

export default MySubscriptions