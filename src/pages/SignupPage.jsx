import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import authContent from "../i18n/authContent";
import logo from "../assets/review-booster-logo2.png";
import Loading from "../components/Loading";
import "./Login.css";
import ErrorPopup from "../components/ErrorPopup";

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { lang, toggleLang, T } = useLanguage(authContent);
  const t = T.signup;

  const [step, setStep] = useState("form"); // "form" | "otp"
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [popupMsg, setPopupMsg] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (resendTimer <= 0) return;
    const id = setInterval(() => setResendTimer((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [resendTimer]);


  // ===== STEP 1: submit form -> send OTP =====
  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      setPopupMsg(t.errorFillRequired);
      return;
    }
    if (form.password !== form.confirm_password) {
      setPopupMsg(t.errorPasswordMismatch);
      return;
    }
    if (form.password.length < 8) {
      setPopupMsg(t.errorPasswordLength);
      return;
    }
    setLoading(true);

    try {
      const res = await api.post("/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (res?.data?.success === true) {
        setStep("otp");
        setResendTimer(30);
      } else {
       setPopupMsg(res?.data?.message || t.errorGeneric);
      }
    } catch (err) {
      setPopupMsg(err.response?.data?.message || err.message || t.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
  if (!otp || otp.length < 6) {
    setPopupMsg("Please enter the 6-digit OTP");
    return;
  }
  setLoading(true);

  try {
    const res = await api.post("/auth/verify-otp", {
      email: form.email,
      otp,
    });

    if (res?.data?.success === true) {
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } else {
      setPopupMsg(res?.data?.message || "Invalid OTP");
    }
  } catch (err) {
    setPopupMsg(err.response?.data?.message || err.message || "Invalid OTP");
  } finally {
    setLoading(false);
  }
};

const handleResendOtp = async () => {
  if (resendTimer > 0) return;
  try {
    await api.post("/auth/resend-otp", { email: form.email });
    setResendTimer(30);
  } catch (err) {
    setPopupMsg(err.response?.data?.message || "Could not resend OTP");
  }
};

  const handleKeyDown = (e, action) => {
    if (e.key === "Enter") action();
  };

  return (

    <>
    <ErrorPopup message={popupMsg} onClose={() => setPopupMsg("")} />


    <div className="shell">
      <button onClick={toggleLang} aria-label="Toggle language" className="lang-toggle-btn">
        🌐 {lang === "en" ? "Hinglish" : "English"}
      </button>

      <div className="left">
        <div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", width: "200px", paddingTop: 20, paddingLeft: 40 }}>
            <img src={logo} alt="Logo" className="logo" style={{ width: "200px", height: "auto", display: "block" }} />
          </div>
          <div style={{ marginTop: 40 }}>
            <p className="tagline-heading">
              {t.taglineLine1}
              <br />
              <span className="highlight-text">{t.taglineHighlight}</span>
              <br />
              {t.taglineLine2}
            </p>
            <p className="tagline-body">{t.taglineBody}</p>
          </div>
        </div>

        <div className="quick-access">
          <p className="quick-label">{t.quickAccessLabel}</p>
          {t.quickAccessItems.map((item) => (
            <p key={item} className="quick-item">→ {item}</p>
          ))}
        </div>
      </div>

      <div className="right">
        <div style={{ width: "100%", maxWidth: 480 }}>
          <div className="form-card">
            {step === "form" ? (
              <>
                <div style={{ marginBottom: 32 }}>
                  <p className="portal-label">{t.portalLabel}</p>
                  <h2 className="heading">{t.heading}</h2>
                </div>

                <div className="field">
                  <label className="label">{t.nameLabel}</label>
                  <div className="input-wrap">
                    <span className="icon">👤</span>
                    <input className="input" name="name" type="text" placeholder={t.namePlaceholder} value={form.name} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, handleSubmit)} />
                  </div>
                </div>

                <div className="field">
                  <label className="label">{t.emailLabel}</label>
                  <div className="input-wrap">
                    <span className="icon">✉️</span>
                    <input className="input" name="email" type="email" placeholder={t.emailPlaceholder} value={form.email} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, handleSubmit)} />
                  </div>
                </div>

                <div className="field">
                  <label className="label">{t.passwordLabel}</label>
                  <div className="input-wrap">
                    <span className="icon">🔒</span>
                    <input className="input" name="password" type="password" placeholder={t.passwordPlaceholder} value={form.password} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, handleSubmit)} />
                  </div>
                </div>

                <div className="field">
                  <label className="label">{t.confirmPasswordLabel}</label>
                  <div className="input-wrap">
                    <span className="icon">🔒</span>
                    <input className="input" name="confirm_password" type="password" placeholder={t.confirmPasswordPlaceholder} value={form.confirm_password} onChange={handleChange} onKeyDown={(e) => handleKeyDown(e, handleSubmit)} />
                  </div>
                </div>

                {error && <div className="error-box">⚠️ {error}</div>}

                <button className="btn" onClick={handleSubmit} disabled={loading} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  {loading ? <Loading size={20} /> : t.signUpBtn}
                </button>

                <p className="footer-text">
                  {t.haveAccount} <Link to="/login" className="footer-link">{t.signIn}</Link>
                </p>
              </>
            ) : (
              <>
                <div style={{ marginBottom: 32 }}>
                  <p className="portal-label">Verify Email</p>
                  <h2 className="heading">Enter OTP</h2>
                  <p style={{ fontSize: 13, color: "#6b6b68", marginTop: 8 }}>
                    We've sent a 6-digit code to <strong>{form.email}</strong>
                  </p>
                </div>

                <div className="field">
                  <label className="label">OTP</label>
                  <div className="input-wrap">
                    <span className="icon">🔑</span>
                    <input
                      className="input"
                      type="text"
                      maxLength={6}
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      onKeyDown={(e) => handleKeyDown(e, handleVerifyOtp)}
                    />
                  </div>
                </div>

                {error && <div className="error-box">⚠️ {error}</div>}

                <button className="btn" onClick={handleVerifyOtp} disabled={loading} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  {loading ? <Loading size={20} /> : "Verify & Continue"}
                </button>

                <p className="footer-text">
                  Didn't get the code?{" "}
                  <button
                    onClick={handleResendOtp}
                    disabled={resendTimer > 0}
                    className="footer-link"
                    style={{ background: "none", border: "none", cursor: resendTimer > 0 ? "default" : "pointer" }}
                  >
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                  </button>
                </p>

                <p className="footer-text">
                  <button
                    onClick={() => setStep("form")}
                    className="footer-link"
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                  >
                    ← Back
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>

    </>
  );
};

export default SignupPage;