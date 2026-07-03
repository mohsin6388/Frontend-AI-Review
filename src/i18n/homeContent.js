// Home landing page content — English and Hinglish versions.
// Add new UI text here (both languages) instead of hardcoding strings in Home.jsx.

const en = {
  nav: {
    links: ["Features", "How It Works", "Pricing", "FAQ"],
    cta: "Get Started Free",
  },

  hero: {
    titleLine1: "Turn Every Customer",
    titleLine2Pre: "Into a",
    titleHighlight: "5-Star Review",
    subtitle:
      "One QR scan lets our Smart AI auto-generate a Google review — keeping negative feedback private while boosting your Google ranking.",
    stats: [
      { n: "2,400+", l: "Businesses Served" },
      { n: "1.2M+", l: "Reviews Generated" },
      { n: "4.9★", l: "Avg Rating Boost" },
    ],
  },

  phoneMockup: {
    brand: "Review Ninja Pro",
    thanks: "Thanks for visiting!",
    question: "How was your experience?",
    optionExcellent: "Excellent",
    optionGood: "Good",
    aiReady: "AI Review Ready",
    sampleReview: "Amazing experience! Highly recommend!",
    postToGoogle: "Post to Google",
  },

  ticker: [
    "🌟 AI-Powered Reviews",
    "🚀 Boost Google Ranking",
    "🛡️ Negative Feedback Shield",
    "🌐 100+ Countries",
    "📱 1-Click QR Scan",
    "💬 Multi-Language Support",
    "⚡ Instant Live Post",
  ],

  whyMatters: {
    badge: "WHY IT MATTERS",
    titleMain: "Google Reviews",
    titleHighlight: "= More Customers",
    bodyStrong: "93% of customers rely on reviews",
    bodyRest:
      "before deciding. More reviews mean better Google ranking and more visibility where it matters most.",
    cta: "Start Getting Reviews →",
    stats: [
      { value: "73%", label: "of all reviews happen on Google", icon: "📊" },
      { value: "93%", label: "of customers trust online reviews", icon: "🤝" },
      { value: "112+", label: "reviews needed to build real trust", icon: "⭐" },
      { value: "4.8x", label: "more leads for top-ranked businesses", icon: "📈" },
    ],
  },

  howItWorks: {
    badge: "SIMPLE PROCESS",
    title: "In Just 3 Simple Steps",
    sub: "No app to download, no long forms. Just scan — and let AI handle the rest.",
    steps: [
      {
        num: "01",
        icon: "📲",
        title: "Scan QR Code",
        desc: "Customers scan the QR code placed at your counter using their phone camera — no extra app needed.",
      },
      {
        num: "02",
        icon: "👆",
        title: "Share Experience",
        desc: "A simple page opens — they tap a rating and pick a few tags describing their experience.",
      },
      {
        num: "03",
        icon: "✨",
        title: "AI Auto-Posts",
        desc: "Our AI writes a genuine-sounding review based on the tags and rating. One tap and it's posted straight to Google.",
      },
    ],
    shieldTitle: "Protects You From Negative Reviews",
    shieldBodyPre: "If a customer isn't happy, their feedback",
    shieldBodyStrong: "comes to you privately — never to Google.",
    shieldBodyPost: "You can resolve it personally.",
  },

  features: {
    badge: "KEY FEATURES",
    titleMain: "What Makes Review Ninja Pro",
    titleHighlight: "Different",
    items: [
      {
        icon: "🤖",
        title: "Keyword-Rich AI Reviews",
        desc: "Our AI doesn't just write generic praise — it weaves in important keywords (Best Food, Great Service) that actively improve your Google ranking.",
      },
      {
        icon: "🌐",
        title: "Multi-Lingual — 100+ Countries",
        desc: "Collect feedback in Hindi, English, Tamil, Bengali or any language. Our AI crafts a natural, polished review in every language.",
      },
      {
        icon: "⚡",
        title: "Zero Friction Posting",
        desc: "Customers never have to type a long review themselves. One tap and the AI-generated review goes live on Google Business.",
      },
      {
        icon: "📊",
        title: "Smart Dashboard",
        desc: "Real-time insights — total reviews, average rating, keyword performance, negative feedback trends and sentiment analysis to help you improve.",
      },
    ],
  },

  testimonials: {
    badge: "CUSTOMER STORIES",
    titleMain: "Businesses That",
    titleHighlight: "Love Us",
    items: [
      {
        name: "Rahul Sharma",
        biz: "Sharma Restaurant, Delhi",
        text: "Our Google rating jumped from 3.8 to 4.7 in just 2 months! The AI has a review ready the moment someone scans the QR.",
      },
      {
        name: "Priya Mehta",
        biz: "Mehta Beauty Salon, Mumbai",
        text: "The negative-review shield is the best feature! An unhappy customer's feedback came straight to my phone — never touched Google.",
      },
      {
        name: "Arun Patel",
        biz: "Patel Auto Service, Surat",
        text: "The multi-language support is amazing. Our Gujarati customers leave feedback in their own language — business grew 40%!",
      },
    ],
  },

  pricing: {
    badge: "PRICING",
    title: "Simple, Affordable Plans",
    sub: "Acrylic QR standee + AI engine — everything in one package.",
    note: "* Setup charges are one-time. Free trial available. Enterprise starts at ₹1,999/month.",
    plans: [
      {
        plan: "Starter",
        audience: "Small Vendors, New Cafes",
        setupPrice: "999",
        monthlyPrice: "799",
        features: [
          "1 Acrylic QR Standee",
          "Basic AI Engine",
          "50 Reviews/month",
          "Negative Feedback Filter",
          "Email Support",
        ],
      },
      {
        plan: "Growth Plan",
        audience: "Restaurants, Salons, Clinics",
        setupPrice: "1,499",
        monthlyPrice: "999",
        highlight: true,
        features: [
          "2 Premium Acrylic Standees",
          "Unlimited AI Reviews",
          "Negative Review Filter",
          "Keyword-Rich AI Reviews",
          "Multi-Language Support",
          "Analytics Dashboard",
          "Priority Support",
        ],
      },
      {
        plan: "Enterprise",
        audience: "Multi-branch Brands, Hotels",
        isCustom: true,
        features: [
          "Custom Branded Standees (all branches)",
          "Centralized Dashboard",
          "Unlimited Reviews & Locations",
          "White-Label Option",
          "API Access & Integrations",
          "Dedicated Account Manager",
        ],
      },
    ],
    bestSeller: "⭐ BEST SELLER",
    custom: "Custom",
    customNote: "Min ₹1,999/month",
    perMonth: "/mo",
    ctaDefault: "Get Started →",
    ctaCustom: "Contact Sales →",
  },

  faq: {
    badge: "FAQ",
    title: "Frequently Asked Questions",
    items: [
      {
        q: "Does this violate Google's Terms of Service?",
        a: "Not at all. Review Ninja Pro simply helps customers share their genuine experience conveniently. The AI only assists with writing — the content is based on a real experience. It's fully Google TOS compliant.",
      },
      {
        q: "Does the customer need to download an app?",
        a: "No! Just scan the QR with the phone camera. It's a fully browser-based process — nothing to download.",
      },
      {
        q: "How are negative reviews handled?",
        a: "If a customer selects 'Average' or lower, it never gets posted to Google. You get a private message instead, so you can resolve it personally.",
      },
      {
        q: "Is a free trial available?",
        a: "Yes! A 14-day free trial, no credit card required. Try the Starter features and decide.",
      },
      {
        q: "When will I receive the Acrylic Standee?",
        a: "It's couriered to your address within 5-7 business days after order confirmation.",
      },
    ],
  },

  cta: {
    titleLine1: "Get Started Today —",
    titleLine2Pre: "Get",
    titleHighlight: "Free",
    titleLine2Post: "Reviews for up to 15 Customers",
    subtitle: "2,400+ businesses are already growing. When is it your turn?",
    primaryBtn: "Start Free Trial →",
    secondaryBtn: "Talk to Sales",
    note: "No credit card required • Cancel anytime • Setup in 5 minutes",
  },

  footer: {
    tagline: "India's most advanced AI-powered review generation platform.",
    columns: [
      { heading: "Product", links: ["Features", "How It Works", "Pricing"] },
      { heading: "Company", links: ["About Us", "Contact"] },
      { heading: "Legal", links: ["Privacy Policy", "Terms", "GDPR", "Refund Policy"] },
    ],
    copyright: "© 2026 Review Ninja Pro. Made with ❤️ in India.",
  },
};

const hi = {
  nav: {
    links: ["Features", "How It Works", "Pricing", "FAQ"],
    cta: "Free Mein Shuru Karein",
  },

  hero: {
    titleLine1: "Har Customer Ko",
    titleLine2Pre: "Banaye",
    titleHighlight: "5-Star Review",
    subtitle:
      "Ek QR scan se Smart AI automatic Google review generate karta hai — negative feedback private rakhta hai aur Google ranking boost karta hai.",
    stats: [
      { n: "2,400+", l: "Businesses Served" },
      { n: "1.2M+", l: "Reviews Generated" },
      { n: "4.9★", l: "Avg Rating Boost" },
    ],
  },

  phoneMockup: {
    brand: "Review Ninja Pro",
    thanks: "Aapke visit ke liye shukriya!",
    question: "Aapka experience kaisa raha?",
    optionExcellent: "Excellent",
    optionGood: "Good",
    aiReady: "AI Review Ready",
    sampleReview: "Bahut badhiya experience! Highly recommend karta hoon!",
    postToGoogle: "Google Par Post Karein",
  },

  ticker: [
    "🌟 AI-Powered Reviews",
    "🚀 Google Ranking Boost",
    "🛡️ Negative Feedback Shield",
    "🌐 100+ Countries",
    "📱 1-Click QR Scan",
    "💬 Multi-Language Support",
    "⚡ Instant Live Post",
  ],

  whyMatters: {
    badge: "WHY IT MATTERS",
    titleMain: "Google Reviews",
    titleHighlight: "= Zyada Customers",
    bodyStrong: "93% customers reviews par bharosa karte hain",
    bodyRest:
      "decide karne se pehle. Zyada reviews matlab better Google ranking, aur jahan zaroorat hai wahan zyada visibility.",
    cta: "Reviews Lena Shuru Karein →",
    stats: [
      { value: "73%", label: "saare reviews Google par hi hote hain", icon: "📊" },
      { value: "93%", label: "customers online reviews par trust karte hain", icon: "🤝" },
      { value: "112+", label: "reviews se real trust banta hai", icon: "⭐" },
      { value: "4.8x", label: "zyada leads top-ranked businesses ko milte hain", icon: "📈" },
    ],
  },

  howItWorks: {
    badge: "SIMPLE PROCESS",
    title: "Sirf 3 Steps Mein",
    sub: "No app download, no long forms. Bas scan karo aur AI baaki sambhal leta hai.",
    steps: [
      {
        num: "01",
        icon: "📲",
        title: "Scan QR Code",
        desc: "Customer counter par rakhe QR code ko phone se scan karta hai — kisi extra app ki zaroorat nahi.",
      },
      {
        num: "02",
        icon: "👆",
        title: "Share Experience",
        desc: "Simple page open hoga — sirf rating pe click karein aur service ke according tags choose karein.",
      },
      {
        num: "03",
        icon: "✨",
        title: "AI Auto-Posts",
        desc: "AI tags aur rating ke basis pe professional, genuine review generate karta hai. Customer 'Post' click kare — seedha Google review par live!",
      },
    ],
    shieldTitle: "Negative Reviews Se Bachaye",
    shieldBodyPre: "Agar koi customer khush nahi hai, unka feedback",
    shieldBodyStrong: "aapke paas private aayega — Google par nahi.",
    shieldBodyPost: "Personally resolve kar sakte hain.",
  },

  features: {
    badge: "KEY FEATURES",
    titleMain: "Review Ninja Pro Ko",
    titleHighlight: "Alag Kya Banata Hai",
    items: [
      {
        icon: "🤖",
        title: "Keyword-Rich AI Reviews",
        desc: "AI sirf normal baatein nahi likhta — important keywords (Best Food, Great Service) review mein add karta hai, jisse Google ranking improve hoti hai.",
      },
      {
        icon: "🌐",
        title: "Multi-Lingual — 100+ Countries",
        desc: "Hindi, English, Tamil, Bengali ya koi bhi bhasha mein feedback lo — hamara AI har language mein perfect review banata hai.",
      },
      {
        icon: "⚡",
        title: "Zero Friction Posting",
        desc: "Customer ko khud se lamba review type nahi karna padta. Ek click mein AI-generated review Google Business par live ho jaata hai.",
      },
      {
        icon: "📊",
        title: "Smart Dashboard",
        desc: "Real-time insights — kitne reviews aaye, average rating, keyword performance, negative feedback trends aur sentiment analysis, jo aapke business ko improve karne mein madad karega.",
      },
    ],
  },

  testimonials: {
    badge: "CUSTOMER STORIES",
    titleMain: "Businesses Jo",
    titleHighlight: "Humein Pasand Karte Hain",
    items: [
      {
        name: "Rahul Sharma",
        biz: "Sharma Restaurant, Delhi",
        text: "Hamari Google rating 3.8 se 4.7 ho gayi sirf 2 mahine mein! QR scan karte hi AI review ready kar deta hai.",
      },
      {
        name: "Priya Mehta",
        biz: "Mehta Beauty Salon, Mumbai",
        text: "Negative review shield feature best hai! Ek naraz customer ka feedback seedha mere phone par aaya, Google par nahi gaya.",
      },
      {
        name: "Arun Patel",
        biz: "Patel Auto Service, Surat",
        text: "Multi-language support amazing hai. Gujarati customers apni bhasha mein feedback dete hain — business 40% grow kiya!",
      },
    ],
  },

  pricing: {
    badge: "PRICING",
    title: "Simple, Affordable Plans",
    sub: "Acrylic QR Standee + AI Engine — sab ek package mein.",
    note: "* Setup charges one-time hain. Free trial available hai. Enterprise minimum ₹1,999/month.",
    plans: [
      {
        plan: "Starter",
        audience: "Chote Vendors, Naye Cafes",
        setupPrice: "999",
        monthlyPrice: "799",
        features: [
          "1 Acrylic QR Standee",
          "Basic AI Engine",
          "50 Reviews/month",
          "Negative Feedback Filter",
          "Email Support",
        ],
      },
      {
        plan: "Growth Plan",
        audience: "Restaurants, Salons, Clinics",
        setupPrice: "1,499",
        monthlyPrice: "999",
        highlight: true,
        features: [
          "2 Premium Acrylic Standees",
          "Unlimited AI Reviews",
          "Negative Review Filter",
          "Keyword-Rich AI Reviews",
          "Multi-Language Support",
          "Analytics Dashboard",
          "Priority Support",
        ],
      },
      {
        plan: "Enterprise",
        audience: "Multi-branch Brands, Hotels",
        isCustom: true,
        features: [
          "Custom Branded Standees (saari branches)",
          "Centralized Dashboard",
          "Unlimited Reviews & Locations",
          "White-Label Option",
          "API Access & Integrations",
          "Dedicated Account Manager",
        ],
      },
    ],
    bestSeller: "⭐ BEST SELLER",
    custom: "Custom",
    customNote: "Min ₹1,999/month",
    perMonth: "/mo",
    ctaDefault: "Shuru Karein →",
    ctaCustom: "Sales Se Baat Karein →",
  },

  faq: {
    badge: "FAQ",
    title: "Aksar Puche Jane Wale Sawaal",
    items: [
      {
        q: "Kya yeh Google ke Terms of Service ke against hai?",
        a: "Bilkul nahi. Review Ninja Pro customers ke genuine experiences ko conveniently share karne mein madad karta hai. AI sirf writing assist karta hai — content genuine experience par based hota hai. Google TOS compliant hai.",
      },
      {
        q: "Customer ko koi app download karni hogi?",
        a: "Nahi! Sirf QR scan karo phone camera se. Fully browser-based process hai — koi download nahi.",
      },
      {
        q: "Negative reviews kaise handle hote hain?",
        a: "Agar customer 'Average' ya lower select karta hai, Google par post nahi hota. Aapko private message milega jahan personally resolve kar sakte hain.",
      },
      {
        q: "Free trial available hai?",
        a: "Haan! 14-day free trial, bina credit card ke. Starter features try karo aur decide karo.",
      },
      {
        q: "Acrylic Standee kab milega?",
        a: "Order confirm hone ke baad 5-7 business days mein aapke address par courier ho jaata hai.",
      },
    ],
  },

  cta: {
    titleLine1: "Aaj Hi Shuru Karein —",
    titleLine2Pre: "Customer Se",
    titleHighlight: "Free",
    titleLine2Post: "Kare 15 Review Tak Generate",
    subtitle: "2,400+ businesses already grow kar rahe hain. Aapka number kab aayega?",
    primaryBtn: "Free Trial Shuru Karein →",
    secondaryBtn: "Sales Se Baat Karein",
    note: "No credit card required • Cancel anytime • Setup 5 minute mein",
  },

  footer: {
    tagline: "India ka sabse advanced AI-powered review generation platform.",
    columns: [
      { heading: "Product", links: ["Features", "How It Works", "Pricing"] },
      { heading: "Company", links: ["About Us", "Contact"] },
      { heading: "Legal", links: ["Privacy Policy", "Terms", "GDPR", "Refund Policy"] },
    ],
    copyright: "© 2026 Review Ninja Pro. Made with ❤️ in India.",
  },
};

const homeContent = { en, hi };
export default homeContent;
