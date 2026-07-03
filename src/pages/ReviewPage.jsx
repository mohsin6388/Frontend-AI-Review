import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import StarRating from '../components/StarRating';
import TagSelector from '../components/TagSelector';
import ReviewDisplay from '../components/ReviewDisplay';
import { useLanguage } from '../context/LanguageContext';
import reviewContent from '../i18n/reviewContent';
import './ReviewPage.css';
import logo from "../assets/review-booster-logo2.png";

const STEP = {
  LOADING: 'loading',
  ERROR: 'error',
  RATE: 'rate',
  TAGS: 'tags',
  GENERATING: 'generating',
  REVIEW: 'review',
  NEGATIVE: 'negative',
  THANKYOU: 'thankyou',
};

const ReviewPage = () => {
  const { businessId } = useParams();
  const { lang, toggleLang, T } = useLanguage(reviewContent);
  const [step, setStep] = useState(STEP.LOADING);
  const [business, setBusiness] = useState(null);
  const [tags, setTags] = useState([]);
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [generatedReview, setGeneratedReview] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [negativeFeedback, setNegativeFeedback] = useState('');

  // Load business data
  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await api.get(`/business/review/${businessId}`);
        setBusiness(res.data.businesses[0]);
        setTags(res.data.tags);
        setStep(STEP.RATE);
      } catch (err) {
        setErrorMsg(err.message || T.errorFallback);
        setStep(STEP.ERROR);
      }
    };
    fetchBusiness();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessId]);

  const handleRate = (r) => {
    setRating(r);
    setTimeout(() => {
      if (r >= 3) {
        setStep(STEP.TAGS);
      } else {
        setStep(STEP.NEGATIVE);
      }
    }, 400);
  };

  const toggleTag = (label) => {
    setSelectedTags((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label]
    );
  };

  const handleGenerateReview = async () => {
    if (selectedTags.length === 0) return;
    setStep(STEP.GENERATING);
    try {
      const res = await api.post('/review/generate', {
        business_id: businessId,
        rating,
        selected_tags: selectedTags,
      });
      setGeneratedReview(res.data.reviews);
      setSessionId(res.data.session_id);
      setStep(STEP.REVIEW);
    } catch (err) {
      setErrorMsg(err.message);
      setStep(STEP.ERROR);
    }
  };

  const handleTrackCopied = useCallback(async (sid) => {
    try { await api.post(`/review/session/${sid}/copied`); } catch {}
  }, []);

  const handleTrackRedirected = useCallback(async (sid) => {
    try { await api.post(`/review/session/${sid}/redirected`); } catch {}
  }, []);

  const handleNegativeSubmit = async () => {
    try {
      await api.post('/review/feedback', {
        business_id: businessId,
        rating,
        feedback_text: negativeFeedback,
      });
      setStep(STEP.THANKYOU);
    } catch {
      setStep(STEP.THANKYOU);
    }
  };

  const googleUrl = business?.google_review_url;

  // ─── Render ────────────────────────────────────────────────────
  return (
    <div className="page-wrapper">
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <button
        onClick={toggleLang}
        aria-label="Toggle language"
        className="lang-toggle-btn"
      >
        🌐 {lang === "en" ? "Hinglish" : "English"}
      </button>

      {step === STEP.LOADING && (
        <div className="loader-screen">
          <div className="loader-rocket animate-float">🚀</div>
          <p className="loader-text">{T.loading}</p>
        </div>
      )}

      {step === STEP.ERROR && (
        <div className="content-card error-card animate-fadeUp">
          <div className="error-icon">😕</div>
          <h2 className="error-title">{T.errorTitle}</h2>
          <p className="error-msg">{errorMsg}</p>
          <button
            className="btn-secondary"
            onClick={() => window.location.reload()}
          >
            {T.tryAgain}
          </button>
        </div>
      )}

      {(step === STEP.RATE ||
        step === STEP.TAGS ||
        step === STEP.REVIEW ||
        step === STEP.NEGATIVE) &&
        business && (
          <div className="content-card animate-fadeUp">
            {/* Business Header */}
            <div className="biz-header">
              <div className="biz-avatar">
                {business.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="biz-name">{business.name}</h1>
                <p className="biz-type">{business.type}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="divider" />

            {/* Step: Rate */}
            {step === STEP.RATE && (
              <div className="step-section animate-fadeIn">
                <h2 className="step-title">{T.rateTitle}</h2>
                <p className="step-subtitle">{T.rateSubtitle}</p>
                <StarRating
                  onRate={handleRate}
                  labels={T.starRating.labels}
                  placeholder={T.starRating.placeholder}
                />
              </div>
            )}

            {/* Step: Tags */}
            {step === STEP.TAGS && (
              <div className="step-section">
                <div className="rating-badge">
                  {"⭐".repeat(rating)} <span>{rating}/5 Stars</span>
                </div>
                <TagSelector
                  tags={tags}
                  selectedTags={selectedTags}
                  onToggle={toggleTag}
                  hint={T.tagSelector.hint}
                  hintSub={T.tagSelector.hintSub}
                />
                <button
                  className="btn-primary"
                  onClick={handleGenerateReview}
                  disabled={selectedTags.length === 0}
                  style={{ marginTop: "8px" }}
                >
                  {selectedTags.length === 0
                    ? T.tagsSelectPrompt
                    : T.generateBtn(selectedTags.length)}
                </button>
                <button className="btn-back" onClick={() => setStep(STEP.RATE)}>
                  {T.backToRating}
                </button>
              </div>
            )}

            {/* Step: Review */}
            {step === STEP.REVIEW && (
              <ReviewDisplay
                reviews={generatedReview}
                sessionId={sessionId}
                googleUrl={googleUrl}
                onTrackCopied={handleTrackCopied}
                onTrackRedirected={handleTrackRedirected}
                T={T.reviewDisplay}
              />
            )}

            {/* Step: Negative feedback */}
            {step === STEP.NEGATIVE && (
              <div className="step-section animate-fadeIn">
                <div className="negative-icon">🙏</div>
                <h2 className="step-title">{T.negativeTitle}</h2>
                <p className="step-subtitle">
                  {T.negativeSubtitle}
                </p>
                <textarea
                  className="feedback-textarea"
                  placeholder={T.negativePlaceholder}
                  value={negativeFeedback}
                  onChange={(e) => setNegativeFeedback(e.target.value)}
                  rows={4}
                />
                <button className="btn-primary" onClick={handleNegativeSubmit}>
                  {T.sendFeedback}
                </button>
                <button className="btn-back" onClick={() => setStep(STEP.RATE)}>
                  {T.backToRatingShort}
                </button>
              </div>
            )}
          </div>
        )}

      {/* Generating overlay */}
      {step === STEP.GENERATING && (
        <div className="content-card generating-card animate-fadeIn">
          <div className="generating-icon animate-float">🤖</div>
          <h2 className="generating-title">{T.generatingTitle}</h2>
          <p className="generating-sub">
            {T.generatingSub}
          </p>
          <div className="generating-dots">
            <span />
            <span />
            <span />
          </div>
        </div>
      )}

      {/* Thank you screen */}
      {step === STEP.THANKYOU && (
        <div className="content-card thankyou-card animate-fadeUp">
          <div className="thankyou-icon animate-float">💛</div>
          <h2 className="thankyou-title">{T.thankYouTitle}</h2>
          <p className="thankyou-text">
            {T.thankYouText}
          </p>
          <p className="thankyou-sub">{T.thankYouSub}</p>
        </div>
      )}

      {/* Powered by footer */}
      <div className="footer-brand">
        <span>{T.poweredBy}</span>
        <img src={logo} alt="" style={{ height: "30px", width: "30px" }} />
        <span className="brand-name">{T.brandName}</span>
      </div>
    </div>
  );
};

export default ReviewPage;
