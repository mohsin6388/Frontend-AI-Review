import React, { useState, useEffect, useRef } from "react";
import "./BusinessDetails.css";
import { API } from "../utils/api";
import api from "../api";
import { toPng } from "html-to-image";

const BusinessDetails = ({ business, setSelectedBusiness, setActiveTab }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popUp, setPopUp] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const ticketRef = useRef(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("rb_token");
        const res = await fetch(`${API}/review/${business.id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setReviews(data.reviews || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [business.id]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(business.user_review_url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const handleDownloadQR = async () => {
    if (!ticketRef.current) return;
    setDownloading(true);

    try {
      await document.fonts.ready;

      const images = ticketRef.current.querySelectorAll("img");
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

      const dataUrl = await toPng(ticketRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#faf8f2",
        skipFonts: true,
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${business.name}-QR-Card.png`;
      link.click();
    } catch (err) {
      console.warn("Download warning (non-critical):", err);
    } finally {
      setDownloading(false);
    }
  };

  const handleDelete = async () => {
  try {
    setDeleting(true);
    const { data } = await api.delete(`/business/${business.id}`);

    if (data.success) {
      setPopUp(false);
      setSelectedBusiness(null);
      setActiveTab("create");
    }
  } catch (error) {
    console.log("Delete Error:", error);
  } finally {
    setDeleting(false);
  }
};

  // const handleDelete = async () => {
  //   try {
  //     setLoading(true);
  //     const { data } = await api.delete(`/business/${business.id}`);
  //     if (data.success) {
  //       setPopUp(false);
  //       setSelectedBusiness(null);
  //       setActiveTab("create");
  //     }
  //   } catch (error) {
  //     console.log("Delete Error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    business.user_review_url
  )}`;

  return (
    <>
      <div className="bd-page">
        {/* HEADER */}
        <div className="bd-header">
          <button className="bd-back" onClick={() => setSelectedBusiness(null)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Back
          </button>

          <button className="bd-delete" onClick={() => setPopUp(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18" />
              <path d="M8 6V4h8v2" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
            </svg>
            Delete business
          </button>
        </div>

        {/* IDENTITY STRIP */}
        <div className="bd-identity">
          <div className="bd-identity-left">
            {business.logo_url ? (
              <img src={business.logo_url} alt={business.name} className="bd-logo" />
            ) : (
              <div className="bd-logo bd-logo-fallback">
                {business.name?.[0]?.toUpperCase()}
              </div>
            )}
            <div>
              <span className="bd-eyebrow">{business.type}</span>
              <h1>{business.name}</h1>
            </div>
          </div>

          <div className="bd-stat">
            <span>Total reviews</span>
            <strong>{business.total_reviews_generated ?? 0}</strong>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="bd-main-grid">
          {/* DETAILS */}
          <div className="bd-card bd-details-card">
            <h2 className="bd-card-title">Business details</h2>

            <div className="bd-detail-row">
              <span>Business type</span>
              <strong>{business.type}</strong>
            </div>
            <div className="bd-detail-row">
              <span>Owner email</span>
              <strong>{business.owner_email || "—"}</strong>
            </div>
            <div className="bd-detail-row">
              <span>Google Place ID</span>
              <strong><code>{business.google_place_id}</code></strong>
            </div>
            <div className="bd-detail-row">
              <span>Created</span>
              <strong>{new Date(business.created_at).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}</strong>
            </div>

            
             <a className="bd-google-link"
              href={business.google_review_url}
              target="_blank"
              rel="noreferrer"
            >
              Open Google review page
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>

          {/* QR TICKET */}
          <div className="bd-card bd-qr-card">
            <h2 className="bd-card-title">Review QR code</h2>

            <div className="bd-ticket" ref={ticketRef}>
              <div className="bd-ticket-top">
                {business.logo_url ? (
                  <img src={business.logo_url} alt={business.name} className="bd-ticket-logo" />
                ) : (
                  <div className="bd-ticket-logo bd-logo-fallback">
                    {business.name?.[0]?.toUpperCase()}
                  </div>
                )}
                <p className="bd-ticket-name">{business.name}</p>
              </div>

              {/* <div className="bd-ticket-perforation">
                <span className="bd-notch bd-notch-left" />
                <span className="bd-perf-line" />
                <span className="bd-notch bd-notch-right" />
              </div> */}

              <div className="bd-ticket-bottom">
                <div className="bd-qr-wrap">
                  <img src={qrSrc} alt="QR Code" />
                </div>
                <span className="bd-scan-pill">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <path d="M14 14h3v3h-3zM19 14h2M14 19h2M19 19h2" />
                  </svg>
                  Scan to review
                </span>
              </div>
            </div>

            <button className="bd-download-btn" onClick={handleDownloadQR} disabled={downloading}>
              {downloading ? (
                "Preparing…"
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v12" />
                    <path d="M7 10l5 5 5-5" />
                    <path d="M5 21h14" />
                  </svg>
                  Download QR card
                </>
              )}
            </button>

            <div className="bd-link-row">
              <span title={business.user_review_url}>{business.user_review_url}</span>
              <button onClick={handleCopyLink}>
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        {/* REVIEWS */}
        <div className="bd-card bd-reviews-card">
          <h2 className="bd-card-title">Customer reviews</h2>

          {loading ? (
            <p className="bd-empty">Loading reviews…</p>
          ) : reviews.length === 0 ? (
            <div className="bd-empty-state">
              <p>No reviews yet</p>
              <span>Share the QR code above to start collecting reviews.</span>
            </div>
          ) : (
            <div className="bd-reviews-list">
              {reviews.map((review) => (
                <div key={review.id} className="bd-review-item">
                  <div className="bd-review-top">
                    <div>
                      <h4>{review.customer_name}</h4>
                      <span className="bd-rating-text">{review.star_rating} out of 5</span>
                    </div>
                    <div className="bd-stars">{"★".repeat(review.star_rating)}{"☆".repeat(5 - review.star_rating)}</div>
                  </div>
                  <p>{review.review_text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {popUp && (
  <div className="bd-modal-overlay">
    <div className="bd-modal">
      <div className="bd-modal-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18" />
          <path d="M8 6V4h8v2" />
          <path d="M19 6l-1 14H6L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
        </svg>
      </div>

      <h2>Delete business</h2>
      <p>
        This will permanently remove <strong>{business.name}</strong> and all
        its review data. This action cannot be undone.
      </p>

      <div className="bd-modal-actions">
        <button
          className="bd-modal-cancel"
          onClick={() => setPopUp(false)}
          disabled={deleting}
        >
          Cancel
        </button>

        <button
          className="bd-modal-confirm"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? (
            <>
              <span className="bd-spinner" />
              Deleting…
            </>
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default BusinessDetails;