import React, { useEffect } from "react";
import "./ErrorPopup.css";

const ErrorPopup = ({ message, onClose, type = "error", duration = 4000 }) => {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const icon = type === "error" ? "⚠️" : type === "success" ? "✅" : "ℹ️";

  return (
    <div className={`popup-overlay-toast popup-${type}`}>
      <div className="popup-content">
        <span className="popup-icon">{icon}</span>
        <p className="popup-message">{message}</p>
        <button className="popup-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;