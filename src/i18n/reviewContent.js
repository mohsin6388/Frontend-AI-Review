// Review page (customer QR-scan flow) content — English and Hinglish versions.

const en = {
  loading: "Loading...",
  errorTitle: "Something went wrong",
  errorFallback: "Business not found",
  tryAgain: "Try Again",
  rateTitle: "How was your experience?",
  rateSubtitle: "Please give us your honest rating",
  tagsSelectPrompt: "Select a tag",
  generateBtn: (count) => `✨ Generate AI Review (${count} tags)`,
  backToRating: "← Change rating",
  generatingTitle: "AI Is Writing Your Review...",
  generatingSub: "Crafting a completely natural review just for you",
  negativeTitle: "We're Sorry to Hear That",
  negativeSubtitle:
    "Your feedback helps us improve. What happened? (optional)",
  negativePlaceholder: "Write your feedback here...",
  sendFeedback: "Send Feedback",
  backToRatingShort: "← Back to rating",
  thankYouTitle: "Thank You!",
  thankYouText:
    "Your feedback helps us make our service better. We'll improve soon!",
  thankYouSub: "You can close this page now.",
  poweredBy: "Powered by",
  brandName: "Review Ninja Pro",

  starRating: {
    labels: ["Terrible", "Bad", "Okay", "Good", "Excellent!"],
    placeholder: "Tap to rate your experience",
  },
  tagSelector: {
    hint: "What stood out?",
    hintSub: "(Pick all that apply)",
  },
  reviewDisplay: {
    title: "Your Reviews are Ready!",
    subtitle: "Multiple reviews generated.",
    copyBtn: "Copy & Post on Google",
    copiedBtn: "Copied! Opening Google...",
    steps: [
      "Copy any review you like",
      "The Google Reviews page will open",
      "Paste it in and post your review",
    ],
    disclaimer:
      "🔒 Your review is posted directly to Google. We don't store anything.",
  },
};

const hi = {
  loading: "Loading ho raha hai...",
  errorTitle: "Kuch galat ho gaya",
  errorFallback: "Business nahi mila",
  tryAgain: "Dubara Try Karein",
  rateTitle: "Aapka experience kaisa raha?",
  rateSubtitle: "Apni honest rating dijiye",
  tagsSelectPrompt: "Koi tag select karein",
  generateBtn: (count) => `✨ AI Review Generate Karo (${count} tags)`,
  backToRating: "← Rating change karein",
  generatingTitle: "AI Review Likh Raha Hai...",
  generatingSub: "Ek bilkul natural review ban rahi hai aapke liye",
  negativeTitle: "Hum Maafi Chahte Hain",
  negativeSubtitle:
    "Aapka feedback humein behtar banane mein madad karta hai. Kya hua batayein? (optional)",
  negativePlaceholder: "Aapka feedback yahan likhein...",
  sendFeedback: "Feedback Bhejo",
  backToRatingShort: "← Rating par wapas jayein",
  thankYouTitle: "Shukriya!",
  thankYouText:
    "Aapka feedback humein apni service better banane mein bahut help karta hai. Hum jald hi improve karenge!",
  thankYouSub: "Aap yeh page band kar sakte hain.",
  poweredBy: "Powered by",
  brandName: "Review Ninja Pro",

  starRating: {
    labels: ["Bekaar", "Bura", "Theek-Thaak", "Achha", "Excellent!"],
    placeholder: "Apna experience rate karne ke liye tap karein",
  },
  tagSelector: {
    hint: "Kya sabse achha laga?",
    hintSub: "(Jo bhi apply ho, sab select karein)",
  },
  reviewDisplay: {
    title: "Reviews Ready!",
    subtitle: "Multiple reviews generate ho chuke hain.",
    copyBtn: "Copy Karke Google Par Post Karein",
    copiedBtn: "Copy ho gaya! Google khul raha hai...",
    steps: [
      "Kisi bhi review ko copy karo",
      "Google Reviews page khulega",
      "Paste karke review post kar do",
    ],
    disclaimer:
      "🔒 Aapka review directly Google par post hoga. Hum kuch save nahi karte.",
  },
};

const reviewContent = { en, hi };
export default reviewContent;
