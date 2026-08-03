import React, { useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";
import Guide from "./Guide";
import "./CreateBusiness.css";
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

const CreateBusiness = ({ onBusinessCreated, email }) => {
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const brandedCardRef = useRef(null);

  const [showPlaceIdHelp, setShowPlaceIdHelp] = useState(false);

  const [form, setForm] = useState({
    name: "",
    type: "",
    google_place_id: "",
    owner_email: email[0].owner_email || "",
  });

  console.log("CreateBusiness email prop:", email);


  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [businessTypes, setBusinessTypes] = useState([]);
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

    if (!file.type.startsWith("image/")) {
      setError("Sirf image file upload karein (PNG, JPG, SVG)");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setError("Logo size 3MB se kam hona chahiye");
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

    // logo sirf tab append karo jab user ne select kiya ho
    if (logoFile) {
      formData.append("logo", logoFile);
    }

    const res = await api.post("/business", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data?.success) {
      setResult(res.data);
      onBusinessCreated?.(res.data.business);
    } else {
      setError(res?.data.error);
    }
  } catch (err) {
    setError(err?.response?.data?.error);
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
  if (!brandedCardRef.current) return;

  try {
    await document.fonts.ready;

    const images = brandedCardRef.current.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((res) => {
              img.onload = res;
              img.onerror = res;
            })
      )
    );

    const dataUrl = await toPng(brandedCardRef.current, {
      cacheBust: true,
      pixelRatio: 3,
      backgroundColor: "#fdfaf3",
      skipFonts: true,
    });

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${result.business.name}-QR-Card.png`;
    link.click();
  } catch (err) {
    // Extension-blocked font fetch jaisi non-critical errors ko silently ignore karo
    console.warn("Download warning (non-critical):", err);
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
                <p>PNG, JPG or SVG. Square image works best.</p>
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
          <div className="form-group">
            <label>Business Type</label>
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="">Select Business Type</option>
              {businessTypes.map((t) => (
                <option key={t.id} value={t.business_type}>
                  {t.business_type}
                </option>
              ))}
            </select>
          </div>

          {/* Google Place ID */}
          <div className="form-group full-width">
            <label>Google Place ID</label>
            <input
              type="text"
              name="google_place_id"
              placeholder="Enter Google Place ID"
              value={form.google_place_id}
              onChange={handleChange}
            />

            <button
              type="button"
              className="help-link"
              onClick={() => setShowPlaceIdHelp(true)}
            >
              <HelpCircle size={14} strokeWidth={2} />
              How to find your Google Business Place ID
            </button>
          </div>

          {/* Email */}
          <div className="form-group full-width">
            <label>Owner Email</label>
            <div className="input-with-icon">
              <Mail size={16} strokeWidth={2} className="input-icon" />
              <input
                type="email"
                name="owner_email"
                placeholder="you@example.com"
                value={ email[0].owner_email}
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
              {result.business?.logo_url && (
                 <img
                   src={result.business.logo_url}
                   alt="Business logo"
                   className="branded-qr-logo"
                   crossOrigin="anonymous"
                 />
               )}
              

              <p className="branded-qr-name">{form.name}</p>

              <div className="branded-qr-code-wrap">
                <img
                  src={result.qrCode}
                  alt="QR Code"
                  className="branded-qr-img"
                />
              </div>

              <span className="branded-qr-scanme">
                <QrCode size={14} strokeWidth={2.5} />
                Scan to Review
              </span>
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
  );
};

export default CreateBusiness;
