// import React, { useState } from "react";
// import api from "../api"; 
// import "./ReviewDisplay.css";

// const ReviewDisplay = ({
//   reviews,
//   sessionId,
//   googleUrl,
//   onTrackCopied,
//   onTrackRedirected,
//   T = {
//     title: "Your Reviews are Ready!",
//     subtitle: "AI has crafted multiple reviews for you",
//     copyBtn: "Copy & Post on Google",
//     copiedBtn: "Copied! Opening Google...",
//     steps: [
//       "Copy any review you like",
//       "The Google Reviews page will open",
//       "Paste it in and post your review",
//     ],
//     disclaimer:
//       "🔒 Your review is posted directly to Google. We don't store anything.",
//   },
// }) => {
//   const [copiedIndex, setCopiedIndex] = useState(null);
//   const [selectedReview, setSelectedReview] = useState("");

//   const handleCopyAndGo = async (reviewText, index) => {
//     try {
//       // Review state me save karo
//       setSelectedReview(reviewText);

//       console.log("Saving review to backend:", reviewText);

//        await api.post("/review/save-review", {
//          session_id: sessionId,
//          review_text: reviewText,
//        });


//       await navigator.clipboard.writeText(reviewText);

//       setCopiedIndex(index);

//       // Track analytics
//       if (sessionId) {
//         onTrackCopied?.(sessionId);

//         setTimeout(() => {
//           onTrackRedirected?.(sessionId);
//         }, 500);
//       }

//       // Open Google Review Page
//       setTimeout(() => {
//         window.open(googleUrl, "_blank");
//       }, 300);

//       // Reset copied state
//       setTimeout(() => {
//         setCopiedIndex(null);
//       }, 3000);
//     } catch (err) {
//       console.error("Copy failed:", err);

//       // Fallback copy
//       const textarea = document.createElement("textarea");

//       textarea.value = reviewText;

//       document.body.appendChild(textarea);

//       textarea.select();

//       document.execCommand("copy");

//       document.body.removeChild(textarea);

//       setCopiedIndex(index);

//       setTimeout(() => {
//         window.open(googleUrl, "_blank");
//       }, 300);

//       setTimeout(() => {
//         setCopiedIndex(null);
//       }, 3000);
//     }
//   };

//   return (
//     <div className="review-display animate-fadeUp">
//       {/* HEADER */}
//       <div className="review-header">
//         <div className="review-icon">✨</div>

//         <div>
//           <h3 className="review-title">{T.title}</h3>

//           <p className="review-subtitle">
//             {T.subtitle}
//           </p>
//         </div>
//       </div>

//       {/* REVIEW SLIDER */}
//       <div className="reviews-slider">
//         {reviews?.map((item, index) => (
//           <div className="review-card" key={index}>
//             <div className="review-text-box">
//               <div className="quote-mark">"</div>

//               <p className="review-text">{item.review}</p>
//             </div>

//             <button
//               className={`copy-btn ${copiedIndex === index ? "copied" : ""}`}
//               onClick={() => handleCopyAndGo(item.review, index)}
//             >
//               {copiedIndex === index ? (
//                 <>
//                   <span className="btn-icon">✅</span>
//                   {T.copiedBtn}
//                 </>
//               ) : (
//                 <>
//                   <span className="btn-icon">⭐</span>
//                   {T.copyBtn}
//                 </>
//               )}
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* STEPS */}
//       <div className="review-steps">
//         {T.steps.map((step, i) => (
//           <div className="step-item" key={i}>
//             <span className="step-num">{i + 1}</span>
//             <span className="step-text">{step}</span>
//           </div>
//         ))}
//       </div>

//       {/* DISCLAIMER */}
//       {/* <p className="disclaimer">
//         {T.disclaimer}
//       </p> */}
//     </div>
//   );
// };

// export default ReviewDisplay;






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
    steps: [
      "Copy any review you like",
      "The Google Reviews page will open",
      "Paste it in and post your review",
    ],
  },
}) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopyAndGo = async (reviewText, index) => {
    try {
      await api.post("/review/save-review", {
        session_id: sessionId,
        review_text: reviewText,
      });

      await navigator.clipboard.writeText(reviewText);
      setCopiedIndex(index);

      if (sessionId) {
        onTrackCopied?.(sessionId);
        setTimeout(() => {
          onTrackRedirected?.(sessionId);
        }, 500);
      }

      setTimeout(() => {
        window.open(googleUrl, "_blank");
      }, 300);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 3000);
    } catch (err) {
      console.error("Copy failed:", err);

      const textarea = document.createElement("textarea");
      textarea.value = reviewText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      setCopiedIndex(index);

      setTimeout(() => {
        window.open(googleUrl, "_blank");
      }, 300);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 3000);
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
        {reviews?.map((item, index) => (
          <div className="rnp-review-card" key={index}>
            <div className="rnp-review-text-box">
              <div className="rnp-quote-mark">"</div>
              <p className="rnp-review-text">{item.review}</p>
            </div>

            <button
              className={`rnp-copy-btn ${copiedIndex === index ? "rnp-copied" : ""}`}
              onClick={() => handleCopyAndGo(item.review, index)}
            >
              {copiedIndex === index ? (
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
        ))}
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