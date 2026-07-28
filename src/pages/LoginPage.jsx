import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import authContent from "../i18n/authContent";
import logo from "../assets/review-booster-logo2.png";
import Loading from "../components/Loading";
import { API } from '../utils/api'
import './Login.css'

import { GoogleLogin } from '@react-oauth/google';


const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { lang, toggleLang, T } = useLanguage(authContent);
  const t = T.login;

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError(t.errorFillBoth);
      return;
    }
    setError("");
    setLoading(true);
    try {

      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      },
      {
       withCredentials: true,
      }
    );

    console.log("Response ===>", res)

      login(res.data.user);
      navigate("/dashboard");
    
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };


   const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch(`${API}/api/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // cookies ke liye zaroori hai
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const data = await res.json();

      if (data.success) {
        login(data.user);    
        navigate("/dashboard");
      } else {
        alert(data.message || "Google login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Google login mein error aaya");
    }
  };



  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="shell">
      <button
        onClick={toggleLang}
        aria-label="Toggle language"
        className="lang-toggle-btn"
      >
        🌐 {lang === "en" ? "Hinglish" : "English"}
      </button>
      {/* Left Panel */}
      <div className="left">
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              width: "200px",
              paddingTop: 20,
              paddingLeft: 40,
            }}
          >
            <img
              src={logo}
              alt="Logo"
              className="logo"
              style={{ width: "200px", height: "auto", display: "block" }}
            />
          </div>

          <div style={{ marginTop: 40 }}>
            <p className="tagline-heading">
              {t.taglineLine1}
              <br />
              <span className="highlight-text">{t.taglineHighlight}</span>
              <br />
              {t.taglineLine2}
            </p>

            <p className="tagline-body">
              {t.taglineBody}
            </p>
          </div>
        </div>

        <div className="quick-access">
          <p className="quick-label">{t.quickAccessLabel}</p>

          {t.quickAccessItems.map((item) => (
            <p key={item} className="quick-item">
              → {item}
            </p>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="right">
        <div style={{ width: "100%", maxWidth: 480 }}>
          <div className="form-card">
            <div style={{ marginBottom: 32 }}>
              <p className="portal-label">{t.portalLabel}</p>
              <h2 className="heading">{t.heading}</h2>
            </div>

            {/* Email */}
            <div className="field">
              <label className="label">{t.emailLabel}</label>

              <div className="input-wrap">
                <span className="icon">✉️</span>

                <input
                  className="input"
                  name="email"
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={form.email}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            {/* Password */}
            <div className="field">
              <label className="label">{t.passwordLabel}</label>

              <div className="input-wrap">
                <span className="icon">🔒</span>

                <input
                  className="input"
                  name="password"
                  type="password"
                  placeholder={t.passwordPlaceholder}
                  value={form.password}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            <div
              style={{
                textAlign: "right",
                marginTop: -10,
                marginBottom: 24,
              }}
            >
              <Link to="/forgot-password" className="forgot-link">
                {t.forgotPassword}
              </Link>
            </div>

            {error && <div className="error-box">⚠️ {error}</div>}

            <button
              className="btn"
              onClick={handleSubmit}
              disabled={loading}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loading ? <Loading size={20} /> : t.signInBtn}
            </button>

            <p className="footer-text">
              {t.noAccount}{" "}
              <Link to="/signup" className="footer-link">
                {t.createOne}
              </Link>
            </p>

            <div style={{marginTop: "20px"}}>
               <GoogleLogin
            
        onSuccess={handleGoogleSuccess}
        onError={() => alert("Google login failed")}
      />
            </div>

            <div className="trust-row">
              {t.trustItems.map((tr) => (
                <span key={tr} className="trust-item">
                  {tr}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default LoginPage;
