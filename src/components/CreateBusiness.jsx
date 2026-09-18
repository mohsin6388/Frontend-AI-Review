// import React, { useState, useEffect, useRef } from "react";
// import api from "../api";
// import { useAuth } from "../context/AuthContext";
// import Loading from "./Loading";
// import Guide from "./Guide";
// import "./CreateBusiness.css";
// import logo from "../assets/review-booster-logo2.png";
// import {
//   QrCode,
//   CheckCircle2,
//   Download,
//   Copy,
//   HelpCircle,
//   AlertCircle,
//   Building2,
//   Mail,
//   ImagePlus,
//   X,
// } from "lucide-react";
// import ErrorPopup from "./ErrorPopup";
// import BusinessPlaceSearch from "./Businessplacesearch";

// const CreateBusiness = ({ onBusinessCreated }) => {
//   const { user } = useAuth();
//   const fileInputRef = useRef(null);
//   const brandedCardRef = useRef(null);
//   const [popupType, setPopupType] = useState("error"); // "error" | "success" | "info"

//   const [showPlaceIdHelp, setShowPlaceIdHelp] = useState(false);

//   const rbUser = JSON.parse(localStorage.getItem("rb_user"));
//   const email = rbUser?.email;

//   const [form, setForm] = useState({
//     name: "",
//     type: "",
//     google_place_id: "",
//     selected_place_name: "",
//     selected_place_address: "",
//     owner_email: email || "",
//   });

//   const [logoFile, setLogoFile] = useState(null);
//   const [logoPreview, setLogoPreview] = useState(null);

//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [businessTypes, setBusinessTypes] = useState([]);
//   const [businessTypeQuery, setBusinessTypeQuery] = useState("");
//   const [showBusinessTypeOptions, setShowBusinessTypeOptions] = useState(false);
//   const [copied, setCopied] = useState(false);

//   // ===== Fetch business types on mount =====
//   const getBusinessTypes = async () => {
//     try {
//       setLoading(true);
//       const { data } = await api.get("/business/type/business-type");
//       if (data.success) {
//         setBusinessTypes(data.data);
//       }
//     } catch (error) {
//       console.log("Business Types Fetch Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getBusinessTypes();
//   }, []);

//   // ===== Cleanup preview URL on unmount / change =====
//   useEffect(() => {
//     return () => {
//       if (logoPreview) URL.revokeObjectURL(logoPreview);
//     };
//   }, [logoPreview]);

//   const handleChange = (e) => {
//     setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
//   };

//   const handleLogoChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // Only image files
//     if (!file.type.startsWith("image/")) {
//       setError("Sirf image file upload karein (PNG, JPG, SVG)");
//       setPopupType("error");
//       e.target.value = "";
//       return;
//     }

//     // Maximum 2MB
//     if (file.size > 2 * 1024 * 1024) {
//       setError("Logo size 2MB se zyada nahi hona chahiye.");
//       setPopupType("error");
//       e.target.value = "";
//       return;
//     }

//     setError("");
//     setLogoFile(file);
//     setLogoPreview(URL.createObjectURL(file));
//   };

//   const handleRemoveLogo = () => {
//     setLogoFile(null);
//     setLogoPreview(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   const handleSubmit = async () => {
//     if (!form.name || !form.type || !form.google_place_id) {
//       setError("Sab required fields fill karein");
//       setPopupType("error");
//       return;
//     }

//     setError("");
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("name", form.name);
//       formData.append("type", form.type);
//       formData.append("google_place_id", form.google_place_id);
//       formData.append("owner_email", form.owner_email || "");
//       formData.append("user_id", user.id);

//       if (logoFile) {
//         formData.append("logo", logoFile);
//       }

//       const res = await api.post("/business", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (res.data?.success) {
//         setResult(res.data);
//         onBusinessCreated?.(res.data.business);
//         setPopupType("success");
//       } else {
//         setPopupType("error");
//       }
//     } catch (err) {
//       console.log(err);
//       setPopupType("error");

//       if (err?.response?.status === 413) {
//         setError(
//           "File size bahut zyada hai. Chhoti size ki file upload karein.",
//         );
//       } else if (err?.response?.data?.error) {
//         setError(err.response.data.error);
//       } else {
//         setError("Business create karne mein error aayi. Dobara try karein.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCopyLink = async () => {
//     try {
//       await navigator.clipboard.writeText(result.reviewPageUrl);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (error) {
//       console.error("Copy failed:", error);
//     }
//   };

//   const handleDownloadQR = async () => {
//     if (!result?.business?.name || !result?.qrCode) return;

//     const waitForImage = (src) =>
//       new Promise((resolve, reject) => {
//         const image = new Image();
//         image.crossOrigin = "anonymous";
//         image.onload = () => resolve(image);
//         image.onerror = reject;
//         image.src = src;
//       });

//     try {
//       const qrImage = await waitForImage(result.qrCode);
//       const footerImage = await waitForImage(logo);
//       // Try loading the uploaded business logo with CORS enabled.
//       // If the image host does not allow CORS, fail safely and continue
//       // with a valid QR download instead of producing a tainted canvas.
//       const businessLogoUrl = result.business?.logo_url || "";
//       const businessImage = businessLogoUrl
//         ? await waitForImage(businessLogoUrl).catch(() => null)
//         : null;

//       const scale = Math.min(Math.max(window.devicePixelRatio || 1, 2), 3);
//       const cardWidth = 380;
//       const qrSize = 220;
//       const innerWidth = cardWidth - 56;
//       const name = form.name || result.business.name;
//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");

//       ctx.font = "700 25px Georgia, serif";
//       const nameLines = [];
//       let currentLine = "";
//       name.split(/\s+/).forEach((word) => {
//         const testLine = currentLine ? `${currentLine} ${word}` : word;
//         if (ctx.measureText(testLine).width > innerWidth && currentLine) {
//           nameLines.push(currentLine);
//           currentLine = word;
//         } else currentLine = testLine;
//       });
//       if (currentLine) nameLines.push(currentLine);

//       // Calculate the complete layout before creating the canvas.
//       // The previous version placed the footer over the scan text because
//       // the canvas height was too short on mobile.
//       const topY = 50;
//       const logoBlockHeight = businessImage ? 94 : 16;
//       const nameBlockHeight = nameLines.length * 32 + 18;
//       const qrBlockHeight = qrSize + 52;
//       const scanBlockHeight = 20 + 26;
//       const footerHeight = 62;
//       const cardHeight =
//         topY +
//         logoBlockHeight +
//         nameBlockHeight +
//         qrBlockHeight +
//         scanBlockHeight +
//         24 +
//         footerHeight;
//       canvas.width = cardWidth * scale;
//       canvas.height = cardHeight * scale;
//       ctx.scale(scale, scale);
//       ctx.fillStyle = "#fffdf8";
//       ctx.fillRect(0, 0, cardWidth, cardHeight);
//       ctx.fillStyle = "#b8935a";
//       ctx.fillRect((cardWidth - 46) / 2, 28, 46, 2);

//       let y = 50;
//       if (businessImage) {
//         ctx.save();
//         ctx.beginPath();
//         ctx.arc(cardWidth / 2, y + 39, 39, 0, Math.PI * 2);
//         ctx.clip();
//         ctx.drawImage(businessImage, cardWidth / 2 - 39, y, 78, 78);
//         ctx.restore();
//         ctx.strokeStyle = "#b8935a";
//         ctx.beginPath();
//         ctx.arc(cardWidth / 2, y + 39, 39, 0, Math.PI * 2);
//         ctx.stroke();
//         y += 94;
//       } else y += 16;

//       ctx.fillStyle = "#201d17";
//       ctx.font = "700 25px Georgia, serif";
//       ctx.textAlign = "center";
//       nameLines.forEach((line) => {
//         ctx.fillText(line, cardWidth / 2, y);
//         y += 32;
//       });
//       y += 18;

//       const qrX = (cardWidth - qrSize - 28) / 2;
//       ctx.fillStyle = "#ffffff";
//       ctx.fillRect(qrX, y, qrSize + 28, qrSize + 28);
//       ctx.strokeStyle = "#b8935a";
//       ctx.strokeRect(qrX, y, qrSize + 28, qrSize + 28);
//       ctx.drawImage(qrImage, qrX + 14, y + 14, qrSize, qrSize);
//       y += qrSize + 52;

//       ctx.fillStyle = "#b8935a";
//       ctx.font = "700 11px Arial, sans-serif";
//       ctx.fillText("▦", cardWidth / 2, y);
//       y += 20;
//       ctx.fillStyle = "#7a6a4a";
//       ctx.font = "700 12px Arial, sans-serif";
//       ctx.fillText("SCAN TO REVIEW", cardWidth / 2, y);

//       // Keep the footer below the scan label instead of calculating it from
//       // an undersized fixed canvas height.
//       const footerY = cardHeight - footerHeight;
//       ctx.fillStyle = "#fbf8f0";
//       ctx.fillRect(0, footerY, cardWidth, 62);
//       ctx.strokeStyle = "#ece4cf";
//       ctx.beginPath();
//       ctx.moveTo(0, footerY);
//       ctx.lineTo(cardWidth, footerY);
//       ctx.stroke();
//       ctx.drawImage(footerImage, cardWidth / 2 - 72, footerY + 19, 24, 24);
//       ctx.fillStyle = "#201d17";
//       ctx.font = "700 12px Arial, sans-serif";
//       ctx.textAlign = "left";
//       ctx.fillText("Review Ninja Pro", cardWidth / 2 - 40, footerY + 35);

//       const dataUrl = canvas.toDataURL("image/png");
//       const safeName = name.replace(/[^a-z0-9-_ ]/gi, "").trim() || "business";
//       const link = document.createElement("a");
//       link.href = dataUrl;
//       link.download = `${safeName}-QR-Card.png`;
//       link.style.display = "none";
//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       // iOS Safari does not reliably support the download attribute.
//       if (/iPad|iPhone|iPod/i.test(navigator.userAgent)) {
//         setTimeout(() => window.open(dataUrl, "_blank"), 300);
//       }
//     } catch (err) {
//       console.error("QR Download Error:", err);
//       setError("QR download nahi ho paya. Please dobara try karein.");
//       setPopupType("error");
//     }
//   };

//   if (showPlaceIdHelp) {
//     return (
//       <div className="create-form-card">
//         <Guide onBack={() => setShowPlaceIdHelp(false)} />
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="create-business-layout animate-fadeIn">
//         {/* LEFT SIDE */}
//         <div className="create-form-card">
//           <div className="create-header">
//             <div className="create-badge">
//               <Building2 size={14} strokeWidth={2.5} />
//               New Business
//             </div>

//             <p className="create-subtitle">
//               Add your business details and generate a smart QR code for
//               collecting customer reviews.
//             </p>
//           </div>

//           <div className="form-grid">
//             {/* Logo Upload */}
//             <div className="form-group full-width">
//               <label>Business Logo</label>

//               <div className="logo-upload-row">
//                 <div
//                   className="logo-upload-box"
//                   onClick={() => fileInputRef.current?.click()}
//                 >
//                   {logoPreview ? (
//                     <img src={logoPreview} alt="Logo preview" />
//                   ) : (
//                     <>
//                       <ImagePlus size={20} strokeWidth={1.75} />
//                       <span>Upload</span>
//                     </>
//                   )}
//                 </div>

//                 <div className="logo-upload-info">
//                   <p>
//                     PNG, JPG or SVG. Square image works best. Maximum size: 2MB.
//                   </p>
//                   {logoPreview && (
//                     <button
//                       type="button"
//                       className="remove-logo-btn"
//                       onClick={handleRemoveLogo}
//                     >
//                       <X size={13} strokeWidth={2.5} />
//                       Remove
//                     </button>
//                   )}
//                 </div>

//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept="image/*"
//                   onChange={handleLogoChange}
//                   hidden
//                 />
//               </div>
//             </div>

//             {/* Business Name */}
//             <div className="form-group">
//               <label>Business Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="e.g. Sharma Ji Cafe"
//                 value={form.name}
//                 onChange={handleChange}
//               />
//             </div>

//             {/* Business Type */}
//             <div className="form-group business-type-field">
//               <label>Business Type</label>
//               <div className="business-type-select">
//                 <input
//                   type="text"
//                   value={businessTypeQuery || form.type}
//                   placeholder="Search business type..."
//                   onFocus={() => setShowBusinessTypeOptions(true)}
//                   onChange={(e) => {
//                     setBusinessTypeQuery(e.target.value);
//                     setForm((f) => ({ ...f, type: "" }));
//                     setShowBusinessTypeOptions(true);
//                   }}
//                   onBlur={() =>
//                     setTimeout(() => setShowBusinessTypeOptions(false), 150)
//                   }
//                   autoComplete="off"
//                 />
//                 {showBusinessTypeOptions && (
//                   <div className="business-type-options">
//                     {businessTypes
//                       .filter((t) =>
//                         t.business_type
//                           .toLowerCase()
//                           .includes((businessTypeQuery || "").toLowerCase()),
//                       )
//                       .map((t) => (
//                         <button
//                           type="button"
//                           key={t.id}
//                           className="business-type-option"
//                           onMouseDown={(e) => e.preventDefault()}
//                           onClick={() => {
//                             setForm((f) => ({ ...f, type: t.business_type }));
//                             setBusinessTypeQuery(t.business_type);
//                             setShowBusinessTypeOptions(false);
//                           }}
//                         >
//                           {t.business_type}
//                         </button>
//                       ))}
//                     {businessTypes.filter((t) =>
//                       t.business_type
//                         .toLowerCase()
//                         .includes((businessTypeQuery || "").toLowerCase()),
//                     ).length === 0 && (
//                       <div className="business-type-empty">
//                         No business type found
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/*
//          Google PLace ID */}

//             <div className="form-group full-width">
//               <label>Search Your Google Business</label>

//               <BusinessPlaceSearch
//                 onPlaceSelect={(place) => {
//                   setForm((f) => ({
//                     ...f,
//                     google_place_id: place.placeId,
//                     selected_place_name: place.name,
//                     selected_place_address: place.address,
//                   }));
//                 }}
//               />
//             </div>

//             {/* Selected Business Confirmation */}
//             {form.google_place_id && (
//               <div className="form-group full-width">
//                 <label>Selected Business</label>
//                 <div className="selected-place-box">
//                   <div className="selected-place-icon">
//                     <CheckCircle2 size={18} strokeWidth={2.5} />
//                   </div>
//                   <div className="selected-place-text">
//                     <div className="selected-place-name">
//                       {form.selected_place_name}
//                     </div>
//                     <div className="selected-place-address">
//                       {form.selected_place_address}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Email */}
//             <div className="form-group full-width">
//               <label>Owner Email</label>
//               <div className="input-with-icon">
//                 <Mail size={16} strokeWidth={2} className="input-icon" />
//                 <input
//                   type="email"
//                   name="owner_email"
//                   // placeholder="you@example.com"
//                   value={email}
//                   disabled
//                   // onChange={handleChange}
//                 />
//               </div>
//             </div>
//           </div>

//           {error && (
//             <div className="error-box">
//               <AlertCircle size={16} strokeWidth={2} />
//               {error}
//             </div>
//           )}

//           <button
//             className="generate-btn"
//             onClick={handleSubmit}
//             disabled={loading}
//           >
//             {loading ? (
//               <Loading size={20} />
//             ) : (
//               <>
//                 <QrCode size={18} strokeWidth={2.25} />
//                 Generate QR Code
//               </>
//             )}
//           </button>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="preview-card">
//           {!result ? (
//             <>
//               <div className="preview-icon-wrap">
//                 <QrCode size={30} strokeWidth={1.75} />
//               </div>

//               <h3>QR Preview</h3>
//               <p className="preview-desc">
//                 Your generated review QR code will appear here.
//               </p>

//               <div className="preview-placeholder">
//                 <QrCode size={40} strokeWidth={1.25} />
//               </div>

//               <div className="preview-features">
//                 <div className="feature-item">
//                   <CheckCircle2 size={16} strokeWidth={2} />
//                   Instant QR Generation
//                 </div>
//                 <div className="feature-item">
//                   <CheckCircle2 size={16} strokeWidth={2} />
//                   Google Review Redirect
//                 </div>
//                 <div className="feature-item">
//                   <CheckCircle2 size={16} strokeWidth={2} />
//                   Download PNG QR
//                 </div>
//               </div>
//             </>
//           ) : (
//             <div className="qr-result-section">
//               <div className="success-badge">
//                 <CheckCircle2 size={16} strokeWidth={2.25} />
//                 QR Generated Successfully
//               </div>

//               {/* ===== BRANDED QR CARD ===== */}
//               <div className="branded-qr-card" ref={brandedCardRef}>
//                 <div className="branded-qr-inner">
//                   {result.business?.logo_url && (
//                     <img
//                       src={result.business.logo_url}
//                       alt="Business logo"
//                       className="branded-qr-logo"
//                       crossOrigin="anonymous"
//                     />
//                   )}

//                   <p className="branded-qr-name">{form.name}</p>
//                   <div className="branded-qr-divider" />

//                   <div className="branded-qr-code-wrap">
//                     <img
//                       src={result.qrCode}
//                       alt="QR Code"
//                       className="branded-qr-img"
//                     />
//                   </div>

//                   <span className="branded-qr-scanme">
//                     <QrCode size={13} strokeWidth={2.5} />
//                     Scan to Review
//                   </span>
//                 </div>

//                 {/* ===== BRAND FOOTER ===== */}
//                 <div className="branded-qr-footer">
//                   <img
//                     src={logo}
//                     alt="Review Ninja Pro"
//                     className="footer-mark-img"
//                   />
//                   <span className="footer-name">Review Ninja Pro</span>
//                 </div>
//               </div>

//               <button className="download-btn" onClick={handleDownloadQR}>
//                 <Download size={16} strokeWidth={2.25} />
//                 Download QR
//               </button>

//               <div className="review-link-box">
//                 <span>{result.reviewPageUrl}</span>
//                 <button onClick={handleCopyLink}>
//                   {copied ? (
//                     <>
//                       <CheckCircle2 size={14} strokeWidth={2.25} />
//                       Copied
//                     </>
//                   ) : (
//                     <>
//                       <Copy size={14} strokeWidth={2.25} />
//                       Copy
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <ErrorPopup
//         message={error}
//         type={popupType}
//         onClose={() => setError("")}
//       />
//     </>
//   );
// };

// export default CreateBusiness;

import React, { useState, useEffect, useRef } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";
import Guide from "./Guide";
import "./CreateBusiness.css";
import logo from "../assets/review-booster-logo2.png";
import {
  QrCode,
  CheckCircle2,
  Download,
  Copy,
  HelpCircle,
  AlertCircle,
  Building2,
  Mail,
  ImagePlus,
  X,
} from "lucide-react";
import ErrorPopup from "./ErrorPopup";
import BusinessPlaceSearch from "./Businessplacesearch";

const CreateBusiness = ({ onBusinessCreated }) => {
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const brandedCardRef = useRef(null);
  const [popupType, setPopupType] = useState("error"); // "error" | "success" | "info"

  const [showPlaceIdHelp, setShowPlaceIdHelp] = useState(false);

  const rbUser = JSON.parse(localStorage.getItem("rb_user"));
  const email = rbUser?.email;

  const [form, setForm] = useState({
    name: "",
    type: "",
    google_place_id: "",
    selected_place_name: "",
    selected_place_address: "",
    owner_email: email || "",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [businessTypes, setBusinessTypes] = useState([]);
  const [businessTypeQuery, setBusinessTypeQuery] = useState("");
  const [showBusinessTypeOptions, setShowBusinessTypeOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  // ===== Fetch business types on mount =====
  const getBusinessTypes = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/business/type/business-type");
      if (data.success) {
        setBusinessTypes(data.data);
      }
    } catch (error) {
      console.log("Business Types Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBusinessTypes();
  }, []);

  // ===== Cleanup preview URL on unmount / change =====
  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
    };
  }, [logoPreview]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Only image files
    if (!file.type.startsWith("image/")) {
      setError("Sirf image file upload karein (PNG, JPG, SVG)");
      setPopupType("error");
      e.target.value = "";
      return;
    }

    // Maximum 2MB
    if (file.size > 2 * 1024 * 1024) {
      setError("Logo size 2MB se zyada nahi hona chahiye.");
      setPopupType("error");
      e.target.value = "";
      return;
    }

    setError("");
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (!form.name || !form.type || !form.google_place_id) {
      setError("Sab required fields fill karein");
      setPopupType("error");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("type", form.type);
      formData.append("google_place_id", form.google_place_id);
      formData.append("owner_email", form.owner_email || "");
      formData.append("user_id", user.id);

      if (logoFile) {
        formData.append("logo", logoFile);
      }

      const res = await api.post("/business", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.success) {
        setResult(res.data);
        onBusinessCreated?.(res.data.business);
        setPopupType("success");
      } else {
        setPopupType("error");
      }
    } catch (err) {
      console.log(err);
      setPopupType("error");

      if (err?.response?.status === 413) {
        setError(
          "File size bahut zyada hai. Chhoti size ki file upload karein.",
        );
      } else if (err?.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Business create karne mein error aayi. Dobara try karein.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(result.reviewPageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const handleDownloadQR = async () => {
    if (!result?.business?.name || !result?.qrCode) return;

    const loadImage = (src) =>
      new Promise((resolve) => {
        if (!src) return resolve(null);
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.onload = () => resolve(image);
        image.onerror = () => resolve(null);
        image.src = src;
      });

    try {
      const [qrImage, footerImage, businessImage] = await Promise.all([
        loadImage(result.qrCode),
        loadImage(logo),
        loadImage(result.business?.logo_url),
      ]);

      if (!qrImage) throw new Error("QR image could not be loaded");

      // Use one fixed export layout on every device. The on-screen card is
      // responsive, but the downloaded PNG must never depend on viewport size.
      const scale = Math.min(Math.max(window.devicePixelRatio || 1, 2), 3);
      const cardWidth = 380;
      const sidePadding = 24;
      const qrSize = 220;
      const qrFrameSize = qrSize + 28;
      const contentWidth = cardWidth - sidePadding * 2;
      const name = (form.name || result.business.name || "Business").trim();

      const canvas = document.createElement("canvas");
      const measure = canvas.getContext("2d");
      if (!measure) throw new Error("Canvas is not supported");

      measure.font = "700 25px Georgia, serif";
      const nameLines = [];
      let line = "";
      name.split(/\s+/).forEach((word) => {
        const next = line ? `${line} ${word}` : word;
        if (measure.measureText(next).width > contentWidth && line) {
          nameLines.push(line);
          line = word;
        } else {
          line = next;
        }
      });
      if (line) nameLines.push(line);

      const topRuleY = 28;
      const logoTop = 60;
      const logoSize = 78;
      const logoGap = businessImage ? 24 : 0;
      const nameStartBaseline = businessImage
        ? logoTop + logoSize + logoGap + 25
        : 84;
      const nameLineHeight = 32;
      const nameBottom =
        nameStartBaseline + (nameLines.length - 1) * nameLineHeight;
      const qrTop = nameBottom + 32;
      const scanIconY = qrTop + qrFrameSize + 30;
      const scanTextY = scanIconY + 22;
      const footerHeight = 78;
      const footerTop = scanTextY + 28;
      const cardHeight = footerTop + footerHeight;

      canvas.width = Math.ceil(cardWidth * scale);
      canvas.height = Math.ceil(cardHeight * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context is unavailable");
      ctx.scale(scale, scale);
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      ctx.imageSmoothingEnabled = false;

      ctx.fillStyle = "#fffdf8";
      ctx.fillRect(0, 0, cardWidth, cardHeight);

      // Top gold rule
      ctx.fillStyle = "#b8935a";
      ctx.fillRect((cardWidth - 46) / 2, topRuleY, 46, 2);

      // Business logo (same size and spacing as the responsive preview)
      if (businessImage) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(
          cardWidth / 2,
          logoTop + logoSize / 2,
          logoSize / 2,
          0,
          Math.PI * 2,
        );
        ctx.clip();
        ctx.drawImage(
          businessImage,
          (cardWidth - logoSize) / 2,
          logoTop,
          logoSize,
          logoSize,
        );
        ctx.restore();

        ctx.strokeStyle = "#b8935a";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(
          cardWidth / 2,
          logoTop + logoSize / 2,
          logoSize / 2,
          0,
          Math.PI * 2,
        );
        ctx.stroke();
      }

      // Business name with guaranteed gap below the logo
      ctx.fillStyle = "#201d17";
      ctx.font = "700 25px Georgia, serif";
      nameLines.forEach((text, index) => {
        ctx.fillText(
          text,
          cardWidth / 2,
          nameStartBaseline + index * nameLineHeight,
        );
      });

      // QR frame and QR image
      const qrFrameX = (cardWidth - qrFrameSize) / 2;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(qrFrameX, qrTop, qrFrameSize, qrFrameSize);
      ctx.strokeStyle = "#b8935a";
      ctx.lineWidth = 1;
      ctx.strokeRect(qrFrameX, qrTop, qrFrameSize, qrFrameSize);
      ctx.drawImage(qrImage, qrFrameX + 14, qrTop + 14, qrSize, qrSize);

      // Scan label
      ctx.fillStyle = "#b8935a";
      ctx.font = "700 14px Arial, sans-serif";
      ctx.fillText("▦", cardWidth / 2, scanIconY);
      ctx.fillStyle = "#7a6a4a";
      ctx.font = "700 12px Arial, sans-serif";
      ctx.fillText("SCAN TO REVIEW", cardWidth / 2, scanTextY);

      // Footer is drawn after all content and has its own reserved height.
      ctx.fillStyle = "#fbf8f0";
      ctx.fillRect(0, footerTop, cardWidth, footerHeight);
      ctx.strokeStyle = "#ece4cf";
      ctx.beginPath();
      ctx.moveTo(0, footerTop);
      ctx.lineTo(cardWidth, footerTop);
      ctx.stroke();

      if (footerImage) {
        ctx.drawImage(footerImage, cardWidth / 2 - 72, footerTop + 27, 24, 24);
      }
      ctx.textAlign = "left";
      ctx.fillStyle = "#201d17";
      ctx.font = "700 16px Arial, sans-serif";
      ctx.fillText("Review Ninja Pro", cardWidth / 2 - 40, footerTop + 44);

      const dataUrl = canvas.toDataURL("image/png");
      const safeName = name.replace(/[^a-z0-9-_ ]/gi, "").trim() || "business";
      const fileName = `${safeName}-QR-Card.png`;

      // Direct data-URL download works in Chrome/Android and does not depend
      // on a blob URL or on an off-screen DOM clone.
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = fileName;
      link.rel = "noopener";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      link.remove();

      // iOS Safari may ignore the download attribute; show the PNG instead.
      if (/iPad|iPhone|iPod/i.test(navigator.userAgent)) {
        const opened = window.open();
        if (opened) {
          opened.document.write(
            `<title>${fileName}</title><img src="${dataUrl}" style="max-width:100%;height:auto;display:block;margin:auto;" />`,
          );
          opened.document.close();
        }
      }
    } catch (err) {
      console.error("QR Download Error:", err);
      setError("QR download nahi ho paya. Please dobara try karein.");
      setPopupType("error");
    }
  };

  if (showPlaceIdHelp) {
    return (
      <div className="create-form-card">
        <Guide onBack={() => setShowPlaceIdHelp(false)} />
      </div>
    );
  }

  return (
    <>
      <div className="create-business-layout animate-fadeIn">
        {/* LEFT SIDE */}
        <div className="create-form-card">
          <div className="create-header">
            <div className="create-badge">
              <Building2 size={14} strokeWidth={2.5} />
              New Business
            </div>

            <p className="create-subtitle">
              Add your business details and generate a smart QR code for
              collecting customer reviews.
            </p>
          </div>

          <div className="form-grid">
            {/* Logo Upload */}
            <div className="form-group full-width">
              <label>Business Logo</label>

              <div className="logo-upload-row">
                <div
                  className="logo-upload-box"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo preview" />
                  ) : (
                    <>
                      <ImagePlus size={20} strokeWidth={1.75} />
                      <span>Upload</span>
                    </>
                  )}
                </div>

                <div className="logo-upload-info">
                  <p>
                    PNG, JPG or SVG. Square image works best. Maximum size: 2MB.
                  </p>
                  {logoPreview && (
                    <button
                      type="button"
                      className="remove-logo-btn"
                      onClick={handleRemoveLogo}
                    >
                      <X size={13} strokeWidth={2.5} />
                      Remove
                    </button>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  hidden
                />
              </div>
            </div>

            {/* Business Name */}
            <div className="form-group">
              <label>Business Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Sharma Ji Cafe"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            {/* Business Type */}
            <div className="form-group business-type-field">
              <label>Business Type</label>
              <div className="business-type-select">
                <input
                  type="text"
                  value={businessTypeQuery || form.type}
                  placeholder="Search business type..."
                  onFocus={() => setShowBusinessTypeOptions(true)}
                  onChange={(e) => {
                    setBusinessTypeQuery(e.target.value);
                    setForm((f) => ({ ...f, type: "" }));
                    setShowBusinessTypeOptions(true);
                  }}
                  onBlur={() =>
                    setTimeout(() => setShowBusinessTypeOptions(false), 150)
                  }
                  autoComplete="off"
                />
                {showBusinessTypeOptions && (
                  <div className="business-type-options">
                    {businessTypes
                      .filter((t) =>
                        t.business_type
                          .toLowerCase()
                          .includes((businessTypeQuery || "").toLowerCase()),
                      )
                      .map((t) => (
                        <button
                          type="button"
                          key={t.id}
                          className="business-type-option"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setForm((f) => ({ ...f, type: t.business_type }));
                            setBusinessTypeQuery(t.business_type);
                            setShowBusinessTypeOptions(false);
                          }}
                        >
                          {t.business_type}
                        </button>
                      ))}
                    {businessTypes.filter((t) =>
                      t.business_type
                        .toLowerCase()
                        .includes((businessTypeQuery || "").toLowerCase()),
                    ).length === 0 && (
                      <div className="business-type-empty">
                        No business type found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 
         Google PLace ID */}

            <div className="form-group full-width">
              <label>Search Your Google Business</label>

              <BusinessPlaceSearch
                onPlaceSelect={(place) => {
                  setForm((f) => ({
                    ...f,
                    google_place_id: place.placeId,
                    selected_place_name: place.name,
                    selected_place_address: place.address,
                  }));
                }}
              />
            </div>

            {/* Selected Business Confirmation */}
            {form.google_place_id && (
              <div className="form-group full-width">
                <label>Selected Business</label>
                <div className="selected-place-box">
                  <div className="selected-place-icon">
                    <CheckCircle2 size={18} strokeWidth={2.5} />
                  </div>
                  <div className="selected-place-text">
                    <div className="selected-place-name">
                      {form.selected_place_name}
                    </div>
                    <div className="selected-place-address">
                      {form.selected_place_address}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Email */}
            <div className="form-group full-width">
              <label>Owner Email</label>
              <div className="input-with-icon">
                <Mail size={16} strokeWidth={2} className="input-icon" />
                <input
                  type="email"
                  name="owner_email"
                  // placeholder="you@example.com"
                  value={email}
                  disabled
                  // onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="error-box">
              <AlertCircle size={16} strokeWidth={2} />
              {error}
            </div>
          )}

          <button
            className="generate-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <Loading size={20} />
            ) : (
              <>
                <QrCode size={18} strokeWidth={2.25} />
                Generate QR Code
              </>
            )}
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="preview-card">
          {!result ? (
            <>
              <div className="preview-icon-wrap">
                <QrCode size={30} strokeWidth={1.75} />
              </div>

              <h3>QR Preview</h3>
              <p className="preview-desc">
                Your generated review QR code will appear here.
              </p>

              <div className="preview-placeholder">
                <QrCode size={40} strokeWidth={1.25} />
              </div>

              <div className="preview-features">
                <div className="feature-item">
                  <CheckCircle2 size={16} strokeWidth={2} />
                  Instant QR Generation
                </div>
                <div className="feature-item">
                  <CheckCircle2 size={16} strokeWidth={2} />
                  Google Review Redirect
                </div>
                <div className="feature-item">
                  <CheckCircle2 size={16} strokeWidth={2} />
                  Download PNG QR
                </div>
              </div>
            </>
          ) : (
            <div className="qr-result-section">
              <div className="success-badge">
                <CheckCircle2 size={16} strokeWidth={2.25} />
                QR Generated Successfully
              </div>

              {/* ===== BRANDED QR CARD ===== */}
              <div className="branded-qr-card" ref={brandedCardRef}>
                <div className="branded-qr-inner">
                  {result.business?.logo_url && (
                    <img
                      src={result.business.logo_url}
                      alt="Business logo"
                      className="branded-qr-logo"
                      crossOrigin="anonymous"
                    />
                  )}

                  <p className="branded-qr-name">{form.name}</p>
                  <div className="branded-qr-divider" />

                  <div className="branded-qr-code-wrap">
                    <img
                      src={result.qrCode}
                      alt="QR Code"
                      className="branded-qr-img"
                    />
                  </div>

                  <span className="branded-qr-scanme">
                    <QrCode size={13} strokeWidth={2.5} />
                    Scan to Review
                  </span>
                </div>

                {/* ===== BRAND FOOTER ===== */}
                <div className="branded-qr-footer">
                  <img
                    src={logo}
                    alt="Review Ninja Pro"
                    className="footer-mark-img"
                  />
                  <span className="footer-name">Review Ninja Pro</span>
                </div>
              </div>

              <button className="download-btn" onClick={handleDownloadQR}>
                <Download size={16} strokeWidth={2.25} />
                Download QR
              </button>

              <div className="review-link-box">
                <span>{result.reviewPageUrl}</span>
                <button onClick={handleCopyLink}>
                  {copied ? (
                    <>
                      <CheckCircle2 size={14} strokeWidth={2.25} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} strokeWidth={2.25} />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ErrorPopup
        message={error}
        type={popupType}
        onClose={() => setError("")}
      />
    </>
  );
};

export default CreateBusiness;
