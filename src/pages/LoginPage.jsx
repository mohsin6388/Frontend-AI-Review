import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import authContent from "../i18n/authContent";
import logo from "../assets/review-booster-logo2.png";
import Loading from "../components/Loading";
import { API } from '../utils/api'
import ErrorPopup from "../components/ErrorPopup";
import './Login.css'

import { GoogleLogin } from '@react-oauth/google';


const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { lang, toggleLang, T } = useLanguage(authContent);
  const t = T.login;

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState("form"); // "form" | "otp"
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const [popupMsg, setPopupMsg] = useState("");

  useEffect(() => {
    if (resendTimer <= 0) return;
    const timerId = setTimeout(() => setResendTimer((s) => s - 1), 1000);
    return () => clearTimeout(timerId);
  }, [resendTimer]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setPopupMsg(t.errorFillBoth);
      return;
    }
    setLoading(true);
    try {
      const res = await api.post(
        "/auth/login",
        { email: form.email, password: form.password },
        { withCredentials: true }
      );

      login(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      const data = err.response?.data;

      if (data?.needsVerification) {
        setPopupMsg(data.message || "Email not verified. Sending OTP...");
        try {
          await api.post("/auth/resend-otp", { email: form.email }); // signup wala hi endpoint reuse karo
          setStep("otp");
          setResendTimer(30); // agar tumhare paas timer countdown logic hai
        } catch (otpErr) {
          setPopupMsg(otpErr.response?.data?.message || "Failed to send OTP");
        }
      } else {
        setPopupMsg(data?.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setPopupMsg("Enter valid 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/auth/verify-otp", {
        email: form.email,
        otp,
      });

      // verify hone ke baad seedha login kara do (agar backend user + tokens deta hai)
      if (res.data.user) {
        login(res.data.user);
        navigate("/dashboard");
      } else {
        // ya phir user ko dobara login karne bolo
        setPopupMsg("Email verified! Please login again.");
        setStep("form");
      }
    } catch (err) {
      setPopupMsg(err.response?.data?.message || "OTP verification failed");
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
      setPopupMsg(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  const handleKeyDown = (e, cb) => {
    if (e.key === "Enter") cb();
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch(`${API}/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const data = await res.json();

      if (data.success) {
        login(data.user);
        navigate("/dashboard");
      } else {
        setPopupMsg(data.message || "Google login failed");
      }
    } catch (err) {
      console.error(err);
      setPopupMsg("Google login mein network error aaya");
    }
  };

  return (
    <>
      <ErrorPopup message={popupMsg} onClose={() => setPopupMsg("")} />

      <div className="auth-shell">
        <button
          type="button"
          onClick={toggleLang}
          aria-label="Toggle language"
          className="lang-toggle-btn"
        >
          🌐 {lang === "en" ? "Hinglish" : "English"}
        </button>

        {/* Brand / Story Panel */}
        <div className="brand-panel">
          <div className="brand-panel__glow" aria-hidden="true" />
          <div className="brand-panel__stars" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>

          <div className="brand-panel__top">
            <img src={logo} alt="Review Booster logo" className="brand-panel__logo" />

            <div className="brand-panel__copy">
              <p className="brand-panel__tagline">
                {t.taglineLine1}
                <br />
                <span className="brand-panel__highlight">{t.taglineHighlight}</span>
                <br />
                {t.taglineLine2}
              </p>
              <p className="brand-panel__body">{t.taglineBody}</p>
            </div>
          </div>

          {/* Signature element: floating review snapshot cards */}
          <div className="review-stack" aria-hidden="true">
            <div className="review-card review-card--one">
              <div className="review-card__stars">★★★★★</div>
              <div className="review-card__line" />
              <div className="review-card__line review-card__line--short" />
            </div>
            <div className="review-card review-card--two">
              <div className="review-card__stars">★★★★★</div>
              <div className="review-card__line" />
              <div className="review-card__line review-card__line--short" />
            </div>
          </div>

        </div>

        {/* Form Panel */}
        <div className="form-panel">
          <div className="form-card">
            {step === "form" ? (
              <>
                <div className="form-card__head">
                  <p className="form-card__eyebrow">{t.portalLabel}</p>
                  <h1 className="form-card__heading">{t.heading}</h1>
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="email">
                    {t.emailLabel}
                  </label>
                  <div className="field__control">
                    <span className="field__icon" aria-hidden="true">✉️</span>
                    <input
                      id="email"
                      className="field__input"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={t.emailPlaceholder}
                      value={form.email}
                      onChange={handleChange}
                      onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="password">
                    {t.passwordLabel}
                  </label>
                  <div className="field__control">
                    <span className="field__icon" aria-hidden="true">🔒</span>
                    <input
                      id="password"
                      className="field__input"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder={t.passwordPlaceholder}
                      value={form.password}
                      onChange={handleChange}
                      onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
                    />
                  </div>
                </div>

                <div className="field__meta">
                  <Link to="/forgot-password" className="link">
                    {t.forgotPassword}
                  </Link>
                </div>

                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? <Loading size={20} /> : t.signInBtn}
                </button>

                <p className="form-card__footnote">
                  {t.noAccount}{" "}
                  <Link to="/signup" className="link link--strong">
                    {t.createOne}
                  </Link>
                </p>

                <div className="divider">
                  <span>or continue with</span>
                </div>

                <div className="google-btn-wrap">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => setPopupMsg("Google login failed")}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-card__head">
                  <p className="form-card__eyebrow">Verify email</p>
                  <h1 className="form-card__heading">Enter OTP</h1>
                  <p className="form-card__subtext">
                    We've sent a 6-digit code to <strong>{form.email}</strong>
                  </p>
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="otp">OTP</label>
                  <div className="field__control">
                    <span className="field__icon" aria-hidden="true">🔑</span>
                    <input
                      id="otp"
                      className="field__input field__input--otp"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      onKeyDown={(e) => handleKeyDown(e, handleVerifyOtp)}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={handleVerifyOtp}
                  disabled={loading}
                >
                  {loading ? <Loading size={20} /> : "Verify & continue"}
                </button>

                <p className="form-card__footnote">
                  Didn't get the code?{" "}
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendTimer > 0}
                    className="link link--strong link--button"
                  >
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                  </button>
                </p>

                <p className="form-card__footnote">
                  <button
                    type="button"
                    onClick={() => setStep("form")}
                    className="link link--button"
                  >
                    ← Back to sign in
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;


























// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../api";
// import { useAuth } from "../context/AuthContext";
// import { useLanguage } from "../context/LanguageContext";
// import authContent from "../i18n/authContent";
// import logo from "../assets/review-booster-logo2.png";
// import Loading from "../components/Loading";
// import { API } from '../utils/api'
// import ErrorPopup from "../components/ErrorPopup";
// import './Login.css'

// import { GoogleLogin } from '@react-oauth/google';


// const LoginPage = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const { lang, toggleLang, T } = useLanguage(authContent);
//   const t = T.login;

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [step, setStep] = useState("form"); // "form" | "otp"
//   const [otp, setOtp] = useState("");
//   const [resendTimer, setResendTimer] = useState(0);

//   const [popupMsg, setPopupMsg] = useState("");



//   useEffect(() => {
//   if (resendTimer <= 0) return;
//   const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
//   return () => clearTimeout(t);
// }, [resendTimer]);




//   const handleChange = (e) => {
//     setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async () => {
//   if (!form.email || !form.password) {
//     setPopupMsg(t.errorFillBoth);
//     return;
//   }
//   setLoading(true);
//   try {
//     const res = await api.post(
//       "/auth/login",
//       { email: form.email, password: form.password },
//       { withCredentials: true }
//     );

//     login(res.data.user);
//     navigate("/dashboard");
//   } catch (err) {

//      const data = err.response?.data;
    
//      if (data?.needsVerification) {
//       setPopupMsg(data.message || "Email not verified. Sending OTP...");
//       try {
//         await api.post("/auth/resend-otp", { email: form.email }); // signup wala hi endpoint reuse karo
//         setStep("otp");
//         setResendTimer(30); // agar tumhare paas timer countdown logic hai
//       } catch (otpErr) {
//         setPopupMsg(otpErr.response?.data?.message || "Failed to send OTP");
//       }
//     } else {
//       setPopupMsg(data?.message || "Login failed");
//     }



//   } finally {
//     setLoading(false);
//   }
// };



// const handleVerifyOtp = async () => {
//   if (!otp || otp.length !== 6) {
//     setPopupMsg("Enter valid 6-digit OTP");
//     return;
//   }
//   setLoading(true);
//   try {
//     const res = await api.post("/auth/verify-otp", {
//       email: form.email,
//       otp,
//     });

//     // verify hone ke baad seedha login kara do (agar backend user + tokens deta hai)
//     if (res.data.user) {
//       login(res.data.user);
//       navigate("/dashboard");
//     } else {
//       // ya phir user ko dobara login karne bolo
//       setPopupMsg("Email verified! Please login again.");
//       setStep("form");
//     }
//   } catch (err) {
//     setPopupMsg(err.response?.data?.message || "OTP verification failed");
//   } finally {
//     setLoading(false);
//   }
// };

// const handleResendOtp = async () => {
//   if (resendTimer > 0) return;
//   try {
//     await api.post("/auth/resend-otp", { email: form.email });
//     setResendTimer(30);
//   } catch (err) {
//     setPopupMsg(err.response?.data?.message || "Failed to resend OTP");
//   }
// };



// const handleKeyDown = (e, cb) => {
//   if (e.key === "Enter") cb();
// };







// const handleGoogleSuccess = async (credentialResponse) => {
//   try {
//     const res = await fetch(`${API}/auth/google-login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ credential: credentialResponse.credential }),
//     });

//     const data = await res.json();

//     if (data.success) {
//       login(data.user);
//       navigate("/dashboard");
//     } else {
//       setPopupMsg(data.message || "Google login failed");
//     }
//   } catch (err) {
//     console.error(err);
//     setPopupMsg("Google login mein network error aaya");
//   }
// };



//   // const handleSubmit = async () => {
//   //   if (!form.email || !form.password) {
//   //     setError(t.errorFillBoth);
//   //     return;
//   //   }
//   //   setError("");
//   //   setLoading(true);
//   //   try {

//   //     const res = await api.post("/auth/login", {
//   //       email: form.email,
//   //       password: form.password,
//   //     },
//   //     {
//   //      withCredentials: true,
//   //     }
//   //   );

//   //   console.log("Response ===>", res)

//   //     login(res.data.user);
//   //     navigate("/dashboard");
    
//   //   } catch (err) {
//   //     setError(err.response?.data?.message || "Login failed");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };


//   //  const handleGoogleSuccess = async (credentialResponse) => {
//   //   try {
//   //     const res = await fetch(`${API}/auth/google-login`, {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       credentials: "include", // cookies ke liye zaroori hai
//   //       body: JSON.stringify({ credential: credentialResponse.credential }),
//   //     });

//   //     const data = await res.json();

//   //     if (data.success) {
//   //       login(data.user);    
//   //       navigate("/dashboard");
//   //     } else {
//   //       alert(data.message || "Google login failed");
//   //     }
//   //   } catch (err) {
//   //     setError(err.data.message || "Google login failed");
//   //     console.error(err);
//   //     // alert("Google login mein error aaya");
//   //   }
//   // };



//   // const handleKeyDown = (e) => {
//   //   if (e.key === "Enter") handleSubmit();
//   // };

//   return (

//     <>
//     <ErrorPopup message={popupMsg} onClose={() => setPopupMsg("")} />


//         <div className="shell">
//       <button
//         onClick={toggleLang}
//         aria-label="Toggle language"
//         className="lang-toggle-btn"
//       >
//         🌐 {lang === "en" ? "Hinglish" : "English"}
//       </button>
//       {/* Left Panel */}
//       <div className="left">
//         <div>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "flex-start",
//               width: "200px",
//               paddingTop: 20,
//               paddingLeft: 40,
//             }}
//           >
//             <img
//               src={logo}
//               alt="Logo"
//               className="logo"
//               style={{ width: "200px", height: "auto", display: "block" }}
//             />
//           </div>

//           <div style={{ marginTop: 40 }}>
//             <p className="tagline-heading">
//               {t.taglineLine1}
//               <br />
//               <span className="highlight-text">{t.taglineHighlight}</span>
//               <br />
//               {t.taglineLine2}
//             </p>

//             <p className="tagline-body">
//               {t.taglineBody}
//             </p>
//           </div>
//         </div>

//         <div className="quick-access">
//           <p className="quick-label">{t.quickAccessLabel}</p>

//           {t.quickAccessItems.map((item) => (
//             <p key={item} className="quick-item">
//               → {item}
//             </p>
//           ))}
//         </div>
//       </div>

//       {/* Right Panel */}

//       {step === "form" ?

//      ( <>
//       <div className="right">
//         <div style={{ width: "100%", maxWidth: 480 }}>
//           <div className="form-card">
//             <div style={{ marginBottom: 32 }}>
//               <p className="portal-label">{t.portalLabel}</p>
//               <h2 className="heading">{t.heading}</h2>
//             </div>

//             {/* Email */}
//             <div className="field">
//               <label className="label">{t.emailLabel}</label>

//               <div className="input-wrap">
//                 <span className="icon">✉️</span>

//                 <input
//                   className="input"
//                   name="email"
//                   type="email"
//                   placeholder={t.emailPlaceholder}
//                   value={form.email}
//                   onChange={handleChange}
//                   onKeyDown={handleKeyDown}
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className="field">
//               <label className="label">{t.passwordLabel}</label>

//               <div className="input-wrap">
//                 <span className="icon">🔒</span>

//                 <input
//                   className="input"
//                   name="password"
//                   type="password"
//                   placeholder={t.passwordPlaceholder}
//                   value={form.password}
//                   onChange={handleChange}
//                   onKeyDown={handleKeyDown}
//                 />
//               </div>
//             </div>

//             <div
//               style={{
//                 textAlign: "right",
//                 marginTop: -10,
//                 marginBottom: 24,
//               }}
//             >
//               <Link to="/forgot-password" className="forgot-link">
//                 {t.forgotPassword}
//               </Link>
//             </div>

//             {error && <div className="error-box">⚠️ {error}</div>}

//             <button
//               className="btn"
//               onClick={handleSubmit}
//               disabled={loading}
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               {loading ? <Loading size={20} /> : t.signInBtn}
//             </button>

//             <p className="footer-text">
//               {t.noAccount}{" "}
//               <Link to="/signup" className="footer-link">
//                 {t.createOne}
//               </Link>
//             </p>

//             <div style={{marginTop: "20px"}}>
//                <GoogleLogin
            
//         onSuccess={handleGoogleSuccess}
//         onError={() => alert("Google login failed")}
//       />
//             </div>

//             <div className="trust-row">
//               {t.trustItems.map((tr) => (
//                 <span key={tr} className="trust-item">
//                   {tr}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       </>)

//       :


//        (  <>
//                 <div style={{ marginBottom: 32 }}>
//                   <p className="portal-label">Verify Email</p>
//                   <h2 className="heading">Enter OTP</h2>
//                   <p style={{ fontSize: 13, color: "#6b6b68", marginTop: 8 }}>
//                     We've sent a 6-digit code to <strong>{form.email}</strong>
//                   </p>
//                 </div>

//                 <div className="field">
//                   <label className="label">OTP</label>
//                   <div className="input-wrap">
//                     <span className="icon">🔑</span>
//                     <input
//                       className="input"
//                       type="text"
//                       maxLength={6}
//                       placeholder="Enter 6-digit OTP"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
//                       onKeyDown={(e) => handleKeyDown(e, handleVerifyOtp)}
//                     />
//                   </div>
//                 </div>

//                 {error && <div className="error-box">⚠️ {error}</div>}

//                 <button className="btn" onClick={handleVerifyOtp} disabled={loading} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
//                   {loading ? <Loading size={20} /> : "Verify & Continue"}
//                 </button>

//                 <p className="footer-text">
//                   Didn't get the code?{" "}
//                   <button
//                     onClick={handleResendOtp}
//                     disabled={resendTimer > 0}
//                     className="footer-link"
//                     style={{ background: "none", border: "none", cursor: resendTimer > 0 ? "default" : "pointer" }}
//                   >
//                     {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
//                   </button>
//                 </p>

//                 <p className="footer-text">
//                   <button
//                     onClick={() => setStep("form")}
//                     className="footer-link"
//                     style={{ background: "none", border: "none", cursor: "pointer" }}
//                   >
//                     ← Back
//                   </button>
//                 </p>
//          </>)

//        }




//        </div>

    
//     </>

//   );
// };


// export default LoginPage;
