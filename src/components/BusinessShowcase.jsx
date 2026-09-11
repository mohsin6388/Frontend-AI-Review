import { BUSINESS_TYPES, BUSINESSES_BY_COUNTRY, DEFAULT_BUSINESSES } from "../i18n/businessShowcaseData";

function BusinessCard({ biz, C }) {
  const { icon: Icon, gradient, badgeColor } = BUSINESS_TYPES[biz.type];

  return (
    <div
      className="biz-card"
      style={{
        width: "100%",
        position: "relative",
        paddingBottom: 8,
      }}
    >
    <div
  className="biz-visual"
  style={{
    position: "relative",
    height: 220,
    background: gradient,           // fallback color agar image load na ho
    borderRadius: "63% 37% 54% 46% / 43% 51% 49% 57%",
    overflow: "hidden",
    transition: "border-radius 0.5s ease",
  }}
>
  <img
    src={biz.image}
    alt={biz.name}
    className="biz-visual-img"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      transition: "transform 0.5s ease",
    }}
  />
  {/* subtle dark overlay so badges/text stay readable over any photo */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%)",
    }}
  />
</div>

      <div
        style={{
          position: "absolute",
          top: -14,
          left: 18,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: badgeColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 10px 22px -6px ${badgeColor}99`,
          border: "3px solid rgba(10,15,26,0.9)",
        }}
      >
        <Icon size={19} color="#0A0F1A" strokeWidth={2.2} />
      </div>

      <div
        style={{
          position: "absolute",
          top: -12,
          right: 14,
          display: "flex",
          alignItems: "center",
          gap: 4,
          background: "rgba(18,24,36,0.92)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: 100,
          padding: "6px 12px",
          boxShadow: "0 10px 20px -8px rgba(0,0,0,0.5)",
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 700, color: "#FFC94A", fontFamily: "'Inter',sans-serif" }}>★</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: "white", fontFamily: "'Inter',sans-serif" }}>
          {biz.rating}
        </span>
        <span style={{ fontSize: 11, color: C.textFaint, fontFamily: "'Inter',sans-serif" }}>
          ({biz.reviews})
        </span>
      </div>

      <div
        className="biz-review-bubble"
        style={{
          position: "relative",
          margin: "-38px 10px 0",
          background: "rgba(246,247,250,0.98)",
          borderRadius: 16,
          padding: "12px 14px",
          display: "flex",
          gap: 10,
          alignItems: "flex-start",
          boxShadow: "0 18px 34px -14px rgba(0,0,0,0.55)",
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            flexShrink: 0,
            background: `linear-gradient(135deg, ${C.accent}, #FFC97A)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 700,
            color: C.ink,
            fontFamily: "'Sora',sans-serif",
          }}
        >
          {biz.customer.charAt(0)}
        </div>
        <div>
          <p style={{ fontSize: 12, color: "#2B2F3A", lineHeight: 1.45, margin: 0, fontFamily: "'Inter',sans-serif" }}>
            "{biz.review}"
          </p>
          <div style={{ fontSize: 10.5, color: "#7A8194", marginTop: 3, fontFamily: "'Inter',sans-serif" }}>
            — {biz.customer}
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 16 }}>
        <div style={{ fontSize: 15.5, fontWeight: 700, color: "white", fontFamily: "'Sora',sans-serif" }}>
          {biz.name}
        </div>
        <div style={{ fontSize: 12, color: C.textFaint, marginTop: 2, fontFamily: "'Inter',sans-serif" }}>
          {biz.category}
        </div>
      </div>
    </div>
  );
}

export function BusinessShowcase({ C, countryCode = "IN" }) {
  const businesses = BUSINESSES_BY_COUNTRY[countryCode] || DEFAULT_BUSINESSES;

  return (
    <div style={{ width: "100%", maxWidth: 1250, margin: "0 auto", paddingTop: "140px" }}>
      <style>{`

       .biz-card:hover .biz-visual-img {
  transform: scale(1.08);
}

.biz-card:hover .biz-visual {
  border-radius: 46% 54% 42% 58% / 55% 40% 60% 45%;
}
        .biz-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 26px;
          padding-top: 20px;
          padding-bottom: 6px;
        }
        .biz-card:hover .biz-visual {
          transform: scale(1.03);
          border-radius: 46% 54% 42% 58% / 55% 40% 60% 45%;
        }
        .biz-card:hover .biz-review-bubble {
          transform: translateY(-4px);
        }
        .biz-review-bubble {
          transition: transform 0.3s ease;
        }
        @media (max-width: 1024px) {
          .biz-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .biz-grid { gap: 16px; }
          .biz-visual { height: 160px !important; }
        }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: 80 }}>
  <div
    style={{
      fontSize: "clamp(26px,3.6vw,38px)",
      fontWeight: 800,
      fontFamily: "'Sora',sans-serif",
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
      background: `linear-gradient(90deg, #FFFFFF 0%, #FFFFFF 35%, ${C.accent} 65%, #FFC97A 100%)`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      display: "inline-block",
    }}
  >
    Real Businesses. Real Reviews.
  </div>
  <p style={{ fontSize: 14.5, color: C.textFaint, marginTop: 15, fontFamily: "'Inter',sans-serif" }}>
    From cafes to clinics, businesses of every kind trust our platform.
  </p>
  <div style={{ width: 100, height: 2, borderRadius: 10, background: `linear-gradient(90deg, ${C.accent}, #FFC97A)`, margin: "20px auto 0" }} />
</div>

      
      <div className="biz-grid">
        {businesses.map((biz) => (
          <BusinessCard key={biz.name} biz={biz} C={C} />
        ))}
      </div>
    </div>
  );
}