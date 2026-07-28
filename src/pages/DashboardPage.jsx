

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import './DashboardPage.css';
import BusinessState from '../components/BusinessState';
import PaymentPage from '../components/PaymentPage';
import logo from "../assets/review-booster-logo2.png";
import Loading from '../components/Loading';
// import { API } from '../utils/api';
import ContactUs from '../components/ContactUs';
import TermsAndCondition from '../components/TermsAndCondition';
import PrivacyPolicy from '../components/PrivacyPolicy';
import Guide from '../components/Guide';
import MySubscriptions from "./MySubscriptions";
import { QrCode, CheckCircle2, Download, Copy, HelpCircle, AlertCircle, Building2, Mail } from "lucide-react";
import CreateBusiness from "../components/CreateBusiness"


const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Dashboard tabs: 'home' | 'create'
  const [activeTab, setActiveTab] = useState('home');

  // Businesses list
  const [businesses, setBusinesses] = useState([]);
  const [bizLoading, setBizLoading] = useState(true);
  const [outLoading, setOutLoading] = useState(false);
  const [showPlaceIdHelp, setShowPlaceIdHelp] = useState(false);

  // Mobile sidebar toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  // QR Create form
  const [form, setForm] = useState({
    name: '',
    type: '',
    google_place_id: '',
    owner_email: '',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [businessTypes, setBusinessTypes] = useState([]);
  const [copied, setCopied] = useState(false);




  useEffect(() => {
    const fetchBiz = async () => {
      setLoading(true);

      try {
        const res = await api.get(`/business/${user.id}`, {
          withCredentials: true,
        });

        setBusinesses(res.data.businesses || []);
        console.log("Fetched Businesses:", res.data.businesses);
      } catch (error) {
        console.log("Business Fetch Error:", error);
      } finally {
        setLoading(false);
        setBizLoading(false);
      }
    };

    if (activeTab === "home" && user?.id) {
      fetchBiz();
    }
  }, [activeTab, user]);


  // Close mobile menu automatically if screen is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const handleLogout = async () => {
    setOutLoading(true);
  try {
    await api.post("/auth/logout");

    logout();

    navigate("/login");
  } catch (error) {
    console.error(
      "Logout Error:",
      error
    );
  } finally {
    setOutLoading(false);
  }
};

  // const handleChange = (e) => {
  //   setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  // };


  // const handleSubmit = async () => {
  //   if (!form.name || !form.type || !form.google_place_id) {
  //     setError("Sab required fields fill karein");
  //     return;
  //   }

  //   setError("");
  //   setLoading(true);

  //   try {
  //     const payload = {
  //       name: form.name,
  //       type: form.type,
  //       google_place_id: form.google_place_id,
  //       owner_email: form.owner_email || null,
  //       user_id: user.id,
  //     };

  //     const res = await api.post("/business", payload);

  //     if (res.data?.success) {
  //       setResult(res.data);

  //       setBusinesses((prev) => [...prev, res.data.business]);
  //     } else {
  //       console.log("==========>", res?.data)
  //       setError(res?.data.error);
  //     }
  //   } catch (err) {
  //     console.log("okay ==========>", err?.response?.data?.error);
  //     setError(
  //       err?.response?.data?.error // || err?.message || "Kuch galat ho gaya",
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  //  const handleCopyLink = async () => {
  //    try {
  //      await navigator.clipboard.writeText(result.reviewPageUrl);

  //      setCopied(true);

  //      setTimeout(() => {
  //        setCopied(false);
  //      }, 2000);
  //    } catch (error) {
  //      console.error("Copy failed:", error);
  //    }
  //  };

  // const handleDownloadQR = () => {
  //   const link = document.createElement('a');
  //   link.href = result.qrCode;
  //   link.download = `${result.business.name}-QR-Code.png`;
  //   link.click();
  // };

  // Helper to switch tabs and close mobile menu together
  
  
  const goToTab = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };


  return (
    <div className="dash-page-wrapper">
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* ── Top Navbar ── */}

      <header className="dash-navbar">
  <button
    className="hamburger-btn"
    onClick={() => setMobileMenuOpen((v) => !v)}
    aria-label="Toggle menu"
  >
    <span className={`hamburger-line ${mobileMenuOpen ? "line1-open" : ""}`} />
    <span className={`hamburger-line ${mobileMenuOpen ? "line2-open" : ""}`} />
    <span className={`hamburger-line ${mobileMenuOpen ? "line3-open" : ""}`} />
  </button>

  <div className="dash-brand">
    <img src={logo} alt="Review Ninja Pro" className="dash-brand-icon" />
    <span className="dash-brand-name">Review Ninja Pro</span>
  </div>

  <div className="dash-nav-right">
    <div className="dash-user-pill">
      <span className="dash-user-avatar">
        {user?.name?.[0]?.toUpperCase() || "?"}
      </span>
      <span className="dash-user-name">{user?.name || "User"}</span>
    </div>

    <button
      className="dash-logout-btn"
      onClick={handleLogout}
      disabled={loading || outLoading}
    >
      {outLoading ? (
        <>
          <span className="dash-spinner" />
          <span className="logout-text">Logging out…</span>
        </>
      ) : (
        <>
          <svg
            className="logout-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span className="logout-text">Logout</span>
        </>
      )}
    </button>
  </div>
</header>


      <div className="dashboard-layout">
        {/* Mobile overlay - shown behind sidebar when open */}
        <div
          className={`sidebar-overlay ${mobileMenuOpen ? "show" : ""}`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Sidebar */}
        <aside className={`sidebar ${mobileMenuOpen ? "open" : ""}`}>
          <div className="sidebar-menu">
            <button
              className={`sidebar-item ${activeTab === "home" ? "active" : ""}`}
              onClick={() => {
                goToTab("home");
                setResult(null);
              }}
            >
              Businesses
            </button>

            <button
              className={`sidebar-item ${activeTab === "create" ? "active" : ""}`}
              onClick={() => goToTab("create")}
            >
              New Business
            </button>

            <button
              className={`sidebar-item ${activeTab === "payments" ? "active" : ""}`}
              onClick={() => goToTab("payments")}
            >
              Plans & Billing
            </button>

            <button
              className={`sidebar-item ${activeTab === "subscription" ? "active" : ""}`}
              onClick={() => goToTab("subscription")}
            >
              My Subscriptions
            </button>

            <button
              className={`sidebar-item ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => goToTab("settings")}
            >
              Contact Us
            </button>

            <button
              className={`sidebar-item ${activeTab === "termsConditions" ? "active" : ""}`}
              onClick={() => goToTab("termsConditions")}
            >
              Terms & Condition
            </button>

            <button
              className={`sidebar-item ${activeTab === "privacyPolicy" ? "active" : ""}`}
              onClick={() => goToTab("privacyPolicy")}
            >
              Privacy Policy
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="dash-main">


          {activeTab === "home" &&
            (loading ? (
              <div
                style={{
                  minHeight: "100vh",
                  background:
                    "linear-gradient(135deg, #f4f7ff 0%, #eef3ff 100%)",
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
                    Loading your businesses...
                  </p>
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
              </div>
            ) : (
              <BusinessState
                user={user}
                businesses={businesses}
                bizLoading={bizLoading}
                setActiveTab={setActiveTab}
              />
            ))}




            {activeTab === "create" && (
  <CreateBusiness
    onBusinessCreated={(newBiz) =>
      setBusinesses((prev) => [...prev, newBiz])
    }
  />
            )}


          {/* PAYMENT TAB */}
          {activeTab === "payments" && <PaymentPage user={user} />}

          {activeTab === "subscription" && <MySubscriptions user={user} />}

          {/* SETTINGS TAB */}
          {activeTab === "settings" && <ContactUs />}

          {/* SETTINGS TAB */}
          {activeTab === "termsConditions" && <TermsAndCondition />}

          {/* SETTINGS TAB */}
          {activeTab === "privacyPolicy" && <PrivacyPolicy />}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;