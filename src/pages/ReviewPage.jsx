
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import StarRating from '../components/StarRating';
import TagSelector from '../components/TagSelector';
import ReviewDisplay from '../components/ReviewDisplay';
import { useLanguage } from '../context/LanguageContext';
import reviewContent from '../i18n/reviewContent';
import styles from './ReviewPage.module.css';
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
        console.log("checking my side at local ================");

        const res = await api.get(`/business/review/${businessId}`);

        setBusiness(res.data.businesses[0]);
        setTags(res.data.tags);
        setStep(STEP.RATE);

      } catch (err) {

        console.log("FULL API ERROR:", err);
        console.log("BACKEND RESPONSE:", err.response?.data);

        const backendMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          T.errorFallback;

        setErrorMsg(backendMessage);
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
    <div className={styles['page-wrapper']}>
      {/* Background orbs */}
      <div className={styles.orb + ' ' + styles['orb-1']} />
      <div className={styles.orb + ' ' + styles['orb-2']} />


      <button
  onClick={toggleLang}
  aria-label="Toggle language"
  className={styles['lang-toggle-btn']}
>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
  {lang === "en" ? "Hinglish" : "English"}
</button>

      {/* <button
        onClick={toggleLang}
        aria-label="Toggle language"
        className={styles['lang-toggle-btn']}
      >
        🌐 {lang === "en" ? "Hinglish" : "English"}
      </button> */}

      {step === STEP.LOADING && (
        <div className={styles['loader-screen']}>
          <div className={`${styles['loader-rocket']} ${styles['animate-float']}`}>🚀</div>
          <p className={styles['loader-text']}>{T.loading}</p>
        </div>
      )}

      {step === STEP.ERROR && (
        <div className={`${styles['content-card']} ${styles['error-card']} ${styles['animate-fadeUp']}`}>
          <div className={styles['error-icon']}>😕</div>
          <h2 className={styles['error-title']}>{T.errorTitle}</h2>
          <p className={styles['error-msg']}>{errorMsg}</p>
          <button
            className={styles['btn-secondary']}
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
          <div className={`${styles['content-card']} ${styles['animate-fadeUp']}`}>
            {/* Business Header */}
            <div className={styles['biz-header']}>
              <div className={styles['biz-avatar']}>
                <img
                  src={business.logo_url}
                  alt={business.name}
                  className={styles['biz-avatar-img']}
                  onError={(e) => {
                    e.target.src = "/default-business.png"; // fallback image
                  }}
                />
              </div>
              <div className={styles['new-biz']}>
                <h1 className={styles['biz-name']}>{business.name}</h1>
                <div className={styles['biz-type-row']}>
                  <span className={styles['biz-type-line']} />
                  <p className={styles['biz-type']}>{business.type}</p>
                  <span className={styles['biz-type-line']} />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className={styles.divider} />

            {/* Step: Rate */}
            {step === STEP.RATE && (
              <div className={`${styles['step-section']} ${styles['animate-fadeIn']}`}>
                <h2 className={styles['step-title']}>{T.rateTitle}</h2>
                <StarRating
                  onRate={handleRate}
                  labels={T.starRating.labels}
                  placeholder={T.starRating.placeholder}
                />
              </div>
            )}

            {/* Step: Tags */}
            {step === STEP.TAGS && (
              <div className={styles['step-section']}>
                <div className={styles['rating-badge']}>
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
                  className={styles['btn-primary']}
                  onClick={handleGenerateReview}
                  disabled={selectedTags.length === 0}
                  style={{ marginTop: "8px" }}
                >
                  {selectedTags.length === 0
                    ? T.tagsSelectPrompt
                    : T.generateBtn(selectedTags.length)}
                </button>
                <button className={styles['btn-back']} onClick={() => setStep(STEP.RATE)}>
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
              <div className={`${styles['step-section']} ${styles['animate-fadeIn']}`}>
                <div className={styles['negative-icon']}>🙏</div>
                <h2 className={styles['step-title']}>{T.negativeTitle}</h2>
                <p className={styles['step-subtitle']}>
                  {T.negativeSubtitle}
                </p>
                <textarea
                  className={styles['feedback-textarea']}
                  placeholder={T.negativePlaceholder}
                  value={negativeFeedback}
                  onChange={(e) => setNegativeFeedback(e.target.value)}
                  rows={4}
                />
                <button className={styles['btn-primary']} onClick={handleNegativeSubmit}>
                  {T.sendFeedback}
                </button>
                <button className={styles['btn-back']} onClick={() => setStep(STEP.RATE)}>
                  {T.backToRatingShort}
                </button>
              </div>
            )}
          </div>
        )}

      {/* Generating overlay */}
      {step === STEP.GENERATING && (
        <div className={`${styles['content-card']} ${styles['generating-card']} ${styles['animate-fadeIn']}`}>
          <div className={`${styles['generating-icon']} ${styles['animate-float']}`}>🤖</div>
          <h2 className={styles['generating-title']}>{T.generatingTitle}</h2>
          <p className={styles['generating-sub']}>
            {T.generatingSub}
          </p>
          <div className={styles['generating-dots']}>
            <span />
            <span />
            <span />
          </div>
        </div>
      )}

      {/* Thank you screen */}
      {step === STEP.THANKYOU && (
        <div className={`${styles['content-card']} ${styles['thankyou-card']} ${styles['animate-fadeUp']}`}>
          <div className={`${styles['thankyou-icon']} ${styles['animate-float']}`}>💛</div>
          <h2 className={styles['thankyou-title']}>{T.thankYouTitle}</h2>
          <p className={styles['thankyou-text']}>
            {T.thankYouText}
          </p>
          <p className={styles['thankyou-sub']}>{T.thankYouSub}</p>
        </div>
      )}

      {/* Powered by footer */}
      <div className={styles['footer-divider']} />
      <div className={styles['footer-brand']}>
        <span>{T.poweredBy}</span>
        <img src={logo} alt="" style={{ height: "30px", width: "30px" }} />
        <span className={styles['ninja-pro']}>{T.brandName}</span>
      </div>
    </div>
  );
};


export default ReviewPage;