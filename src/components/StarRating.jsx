import React, { useState } from 'react';
import './StarRating.css';

const DEFAULT_LABELS = ['Terrible', 'Bad', 'Okay', 'Good', 'Excellent!'];

const StarRating = ({ onRate, labels = DEFAULT_LABELS, placeholder = 'Tap to rate your experience' }) => {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);

  const handleSelect = (rating) => {
    setSelected(rating);
    onRate(rating);
  };

  const active = hovered || selected;

  return (
    <div className="star-rating-container">
      <div className="stars-row">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`star-btn ${star <= active ? 'active' : ''} ${star <= selected ? 'selected' : ''}`}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => handleSelect(star)}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        ))}
      </div>
      <div className="star-label" aria-live="polite">
        {active ? (
          <span className="label-text">{labels[active - 1]}</span>
        ) : (
          <span className="label-placeholder">{placeholder}</span>
        )}
      </div>
    </div>
  );
};

export default StarRating;
