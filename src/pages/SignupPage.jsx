import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import authContent from "../i18n/authContent";
import logo from "../assets/review-booster-logo2.png";
import Loading from "../components/Loading";
import "./Login.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { lang, toggleLang, T } = useLanguage(authContent);
  const t = T.signup;

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      setError(t.errorFillRequired);
      return;
    }
    if (form.password !== form.confirm_password) {
      setError(t.errorPasswordMismatch);
      return;
    }
    if (form.password.length < 8) {
      setError(t.errorPasswordLength);
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (res?.data?.success === true) {
        login(res.data.user, res.data.token);
        navigate("/dashboard");
      } else {
        setError(res?.data?.message || t.errorGeneric);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || t.errorGeneric);
    } finally {
      setLoading(false);
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

            <p className="tagline-body">{t.taglineBody}</p>
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

            {/* Name */}
            <div className="field">
              <label className="label">{t.nameLabel}</label>
              <div className="input-wrap">
                <span className="icon">👤</span>
                <input
                  className="input"
                  name="name"
                  type="text"
                  placeholder={t.namePlaceholder}
                  value={form.name}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
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

            {/* Confirm Password */}
            <div className="field">
              <label className="label">{t.confirmPasswordLabel}</label>
              <div className="input-wrap">
                <span className="icon">🔒</span>
                <input
                  className="input"
                  name="confirm_password"
                  type="password"
                  placeholder={t.confirmPasswordPlaceholder}
                  value={form.confirm_password}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
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
              {loading ? <Loading size={20} /> : t.signUpBtn}
            </button>

            <p className="footer-text">
              {t.haveAccount}{" "}
              <Link to="/login" className="footer-link">
                {t.signIn}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
