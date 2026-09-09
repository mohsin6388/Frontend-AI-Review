import React, { useState } from "react";
import api from "../api";
import "./ReviewDisplay.css";

const ReviewDisplay = ({
  reviews,
  sessionId,
  googleUrl,
  onTrackCopied,
  onTrackRedirected,
  T = {
    title: "Your Reviews are Ready!",
    subtitle: "AI has crafted multiple reviews for you",
    copyBtn: "Copy & Post on Google",
    copiedBtn: "Copied! Opening Google...",
    loadingBtn: "Redirecting...",
    steps: [
      "Copy any review you like",
      "The Google Reviews page will open",
      "Paste it in and post your review",
    ],
  },
}) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [loadingIndex, setLoadingIndex] = useState(null);

  
  const handleCopyAndGo = async (reviewText, index) => {
    setLoadingIndex(index);

    try {
      await api.post("/review/save-review", {
        session_id: sessionId,
        review_text: reviewText,
      });

      await navigator.clipboard.writeText(reviewText);

      if (sessionId) {
        onTrackCopied?.(sessionId);
        setTimeout(() => {
          onTrackRedirected?.(sessionId);
        }, 500);
      }

      setTimeout(() => {
        window.open(googleUrl, "_blank");
        setLoadingIndex(null);
        setCopiedIndex(index);

        setTimeout(() => {
          setCopiedIndex(null);
        }, 3000);
      }, 300);
    } catch (err) {
      console.error("Copy failed:", err);

      const textarea = document.createElement("textarea");
      textarea.value = reviewText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      setTimeout(() => {
        window.open(googleUrl, "_blank");
        setLoadingIndex(null);
        setCopiedIndex(index);

        setTimeout(() => {
          setCopiedIndex(null);
        }, 3000);
      }, 300);
    }
  };

  return (
    <div className="rnp-review-display animate-fadeUp">
      {/* HEADER */}
      <div className="rnp-header">
        <div className="rnp-icon">✨</div>
        <div>
          <h3 className="rnp-title">{T.title}</h3>
          <p className="rnp-subtitle">{T.subtitle}</p>
        </div>
      </div>

      {/* REVIEW SLIDER */}
      <div className="rnp-reviews-slider">
        {reviews?.map((item, index) => {
          const isLoading = loadingIndex === index;
          const isCopied = copiedIndex === index;

          return (
            <div className="rnp-review-card" key={index}>
              <div className="rnp-review-text-box">
                <div className="rnp-quote-mark">"</div>
                <p className="rnp-review-text">{item.review}</p>
              </div>

              <button
                className={`rnp-copy-btn ${isCopied ? "rnp-copied" : ""} ${
                  isLoading ? "rnp-loading" : ""
                }`}
                onClick={() => handleCopyAndGo(item.review, index)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="rnp-spinner" />
                    {T.loadingBtn}
                  </>
                ) : isCopied ? (
                  <>
                    <span className="rnp-btn-icon">✅</span>
                    {T.copiedBtn}
                  </>
                ) : (
                  <>
                    <span className="rnp-btn-icon">⭐</span>
                    {T.copyBtn}
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* STEPS */}
      <div className="rnp-steps">
        {T.steps.map((step, i) => (
          <div className="rnp-step-item" key={i}>
            <span className="rnp-step-num">{i + 1}</span>
            <span className="rnp-step-text">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewDisplay;