import { useState, useEffect, useRef } from "react";
import logo from "../assets/review-booster-logo2.png";
import { useLanguage } from "../context/LanguageContext";
import homeContent from "../i18n/homeContent";
import { Globe, Rocket, ShieldCheck, Star, Check, Plus, Sparkles, Smile, Laugh } from "lucide-react";

/* ============================================================================
   DESIGN TOKENS
   Deep ink-navy surfaces, a single refined amber accent (kept close to the
   existing brand mark so the logo still belongs), a cool paper tone for the
   light section (never cream+terracotta), and a disciplined Sora/Inter pair.
   ============================================================================ */
const C = {
  ink: "#070B14",
  inkSoft: "#0B1220",
  surface: "#101A2E",
  surfaceBorder: "rgba(255,255,255,0.08)",
  surfaceHair: "rgba(255,255,255,0.05)",
  accent: "#E8973D",
  accentDeep: "#C4741F",
  accentSoft: "rgba(232,151,61,0.14)",
  navy: "#0A3A66",
  navyDeep: "#062442",
  text: "#F3F6FB",
  textDim: "rgba(243,246,251,0.64)",
  textFaint: "rgba(243,246,251,0.4)",
  paper: "#F4F7FB",
  paperInk: "#0B2036",
  paperDim: "#5B6B80",
};

const FOOTER_LINK_HREFS = {
  Features: "/#features",
  "How It Works": "/#how-it-works",
  Pricing: "/#pricing",
  "Privacy Policy": "/privacy-policy",
  "Terms & Condition": "/terms-and-condition",
  "Refund Policy": "/refund-policy",
  "About Us": "/about-us",
  Contact: "/contact-us",
};

function LangToggle({ lang, toggleLang, small = false }) {
  return (
    <button
      onClick={toggleLang}
      aria-label="Toggle language"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: "rgba(232,151,61,0.08)",
        border: `1px solid ${C.surfaceBorder}`,
        borderRadius: 20,
        padding: small ? "7px 12px" : "8px 15px",
        color: C.accent,
        fontSize: small ? 11 : 12,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "'Inter',sans-serif",
        whiteSpace: "nowrap",
        flexShrink: 0,
        transition: "border-color .2s ease, background .2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(232,151,61,0.5)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.surfaceBorder)}
    >
      <span aria-hidden><Globe size={14} /></span> {lang === "en" ? "Hinglish" : "English"}
    </button>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Stars({ count = 5, size = 15 }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ fontSize: size, color: C.accent, lineHeight: 1 }}>
          <Star size={size} fill="currentColor" stroke="none" />
        </span>
      ))}
    </span>
  );
}

/* Subtle grid + glow ambience instead of scattered particles */
function Ambience() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70%",
          height: "60%",
          background: `radial-gradient(ellipse at center, rgba(232,151,61,0.10) 0%, transparent 70%)`,
          filter: "blur(10px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 100%)",
        }}
      />
    </div>
  );
}

function GoogleG({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.16 2.85l6.08-6.08C34.52 3.18 29.6 1 24 1 14.8 1 7 6.7 3.55 14.65l7.1 5.52C12.4 14.07 17.73 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.63-.15-3.2-.42-4.7H24v8.9h12.67c-.55 2.96-2.2 5.47-4.67 7.16l7.1 5.52C43.4 37.8 46.5 31.6 46.5 24.5z" />
      <path fill="#FBBC05" d="M10.65 28.17A14.55 14.55 0 0 1 9.5 24c0-1.44.25-2.83.65-4.17l-7.1-5.52A23.5 23.5 0 0 0 .5 24c0 3.8.9 7.4 2.55 10.6l7.1-5.52z" />
      <path fill="#34A853" d="M24 46.5c5.6 0 10.3-1.85 13.7-5.02l-7.1-5.52C28.9 37.6 26.6 38.5 24 38.5c-6.27 0-11.6-4.57-13.35-10.67l-7.1 5.52C7 41.8 14.8 46.5 24 46.5z" />
    </svg>
  );
}

function PhoneMockup({ T }) {
  return (
    <div
      style={{
        position: "relative",
        width: "min(230px, 82vw)",
        background: "#0A1524",
        borderRadius: 38,
        padding: "13px 9px",
        boxShadow: "0 40px 90px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ width: 58, height: 11, background: "#050B14", borderRadius: 8, margin: "0 auto 10px" }} />
      <div
        style={{
          background: "white",
          borderRadius: 22,
          overflow: "hidden",
          minHeight: 310,
          padding: 15,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 9, borderBottom: "1px solid #EEF1F5" }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${C.navy}, ${C.navyDeep})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "white", fontSize: 12, fontWeight: 700 }}>RN</span>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 11, color: "#111", fontFamily: "'Inter',sans-serif" }}>{T.brand}</div>
            <div style={{ fontSize: 9, color: "#8A93A3", fontFamily: "'Inter',sans-serif" }}>{T.thanks}</div>
          </div>
        </div>
        <div style={{ background: "#F5F8FC", borderRadius: 10, padding: "9px 11px", border: "1px solid #E1E9F2" }}>
          <p style={{ margin: 0, fontSize: 11, color: C.paperInk, fontWeight: 600, fontFamily: "'Inter',sans-serif" }}>{T.question}</p>
        </div>
        {[
          { emoji: <Laugh size={16} />, label: T.optionExcellent, selected: true },
          { emoji: <Smile size={16} />, label: T.optionGood, selected: false },
        ].map((o) => (
          <div
            key={o.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#FAFBFD",
              borderRadius: 8,
              padding: "8px 10px",
              border: o.selected ? `2px solid ${C.navy}` : "2px solid transparent",
            }}
          >
            <span style={{ fontSize: 16 }}>{o.emoji}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: o.selected ? C.navy : "#374151", fontFamily: "'Inter',sans-serif" }}>
              {o.label}
            </span>
            {o.selected && (
              <span style={{ marginLeft: "auto", fontSize: 9, background: C.navy, color: "white", padding: "2px 6px", borderRadius: 5 }}><Check size={14} /></span>
            )}
          </div>
        ))}
        <div style={{ background: "linear-gradient(135deg,#F5F8FC,#EAF1FA)", borderRadius: 10, padding: "9px 11px", border: "1px solid #CFE0F2" }}>
          <div style={{ fontSize: 9, color: C.navy, fontWeight: 700, marginBottom: 4, fontFamily: "'Inter',sans-serif" }}><Sparkles size={12} /> {T.aiReady}</div>
          <div style={{ fontSize: 10, color: C.paperInk, lineHeight: 1.55, fontFamily: "'Inter',sans-serif" }}>&ldquo;{T.sampleReview}&rdquo;</div>
        </div>
        <div
          style={{
            background: "#4285F4",
            borderRadius: 9,
            padding: "8px 0",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <GoogleG size={13} />
          <span style={{ color: "white", fontSize: 11, fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>{T.postToGoogle}</span>
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label, icon, delay = 0 }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      style={{
        background: C.surfaceHair,
        border: `1px solid ${C.surfaceBorder}`,
        borderRadius: 16,
        padding: "26px 20px",
        textAlign: "center",
        transform: vis ? "translateY(0)" : "translateY(28px)",
        opacity: vis ? 1 : 0,
        transition: `all 0.6s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      <div style={{ fontSize: 26, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 32, fontWeight: 800, color: C.accent, fontFamily: "'Sora',sans-serif", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: C.textFaint, marginTop: 7, fontFamily: "'Inter',sans-serif", fontWeight: 500 }}>{label}</div>
    </div>
  );
}

function StepCard({ num, title, desc, icon, delay = 0 }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      style={{
        background: "white",
        borderRadius: 18,
        padding: "30px 26px",
        position: "relative",
        boxShadow: "0 2px 8px rgba(11,32,54,0.05)",
        border: "1px solid rgba(11,32,54,0.07)",
        transform: vis ? "translateY(0)" : "translateY(36px)",
        opacity: vis ? 1 : 0,
        transition: `all 0.65s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 12,
            background: `linear-gradient(135deg, ${C.navy}, ${C.navyDeep})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
          }}
        >
          {icon}
        </div>
        <span style={{ fontWeight: 800, fontSize: 13, color: "rgba(11,32,54,0.18)", fontFamily: "'Sora',sans-serif", letterSpacing: 1 }}>
          {String(num).padStart(2, "0")}
        </span>
      </div>
      <h3 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 700, color: C.paperInk, fontFamily: "'Sora',sans-serif" }}>{title}</h3>
      <p style={{ margin: 0, fontSize: 13.5, color: C.paperDim, lineHeight: 1.7, fontFamily: "'Inter',sans-serif" }}>{desc}</p>
    </div>
  );
}

function FeatureItem({ icon, title, desc, delay = 0 }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        gap: 20,
        alignItems: "flex-start",
        padding: "26px 0",
        borderBottom: `1px solid ${C.surfaceHair}`,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateX(0)" : "translateX(-32px)",
        transition: `all 0.6s ease ${delay}ms`,
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 50,
          height: 50,
          borderRadius: 14,
          background: C.accentSoft,
          border: `1px solid rgba(232,151,61,0.25)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
        }}
      >
        {icon}
      </div>
      <div>
        <h3 style={{ margin: "0 0 6px", fontSize: 17, fontWeight: 700, color: C.text, fontFamily: "'Sora',sans-serif" }}>{title}</h3>
        <p style={{ margin: 0, fontSize: 13.5, color: C.textDim, lineHeight: 1.75, fontFamily: "'Inter',sans-serif" }}>{desc}</p>
      </div>
    </div>
  );
}

function TestiCard({ name, biz, text, delay = 0 }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      style={{
        background: C.surfaceHair,
        border: `1px solid ${C.surfaceBorder}`,
        borderRadius: 16,
        padding: "24px 22px",
        transform: vis ? "translateY(0)" : "translateY(28px)",
        opacity: vis ? 1 : 0,
        transition: `all 0.6s ease ${delay}ms`,
      }}
    >
      <Stars count={5} size={13} />
      <p
        style={{
          margin: "13px 0 18px",
          fontSize: 13.5,
          color: C.textDim,
          lineHeight: 1.75,
          fontFamily: "'Inter',sans-serif",
        }}
      >
        &ldquo;{text}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${C.navy}, ${C.accent})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 14,
            color: "white",
            flexShrink: 0,
            fontFamily: "'Sora',sans-serif",
          }}
        >
          {name[0]}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: C.text, fontFamily: "'Inter',sans-serif" }}>{name}</div>
          <div style={{ fontSize: 11, color: C.textFaint, fontFamily: "'Inter',sans-serif" }}>{biz}</div>
        </div>
      </div>
    </div>
  );
}

function PricingCard({
  plan,
  monthlyPrice,
  yearlyPrice,
  billingCycle = "monthly",
  audience,
  features,
  highlight = false,
  isCustom = false,
  delay = 0,
  labels = {
    bestSeller: "⭐ BEST SELLER",
    custom: "Custom",
    customNote: "Min ₹1,999/month",
    perMonth: "/mo",
    perYear: "/yr",
    ctaDefault: "Get Started →",
    ctaCustom: "Contact Sales →",
  },
}) {
  const [ref, vis] = useInView();
  const [hover, setHover] = useState(false);
  const price = billingCycle === "monthly" ? monthlyPrice : yearlyPrice;
  const periodLabel = billingCycle === "monthly" ? labels.perMonth : labels.perYear;

  return (
    <div
      ref={ref}
      onClick={() => (window.location.href = isCustom ? "/contact-us" : "/login")}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="price-card"
      style={{
        background: highlight ? `linear-gradient(160deg, ${C.navy}, ${C.navyDeep})` : C.surfaceHair,
        border: highlight ? "1px solid rgba(232,151,61,0.4)" : `1px solid ${C.surfaceBorder}`,
        borderRadius: 20,
        padding: "34px 26px",
        position: "relative",
        overflow: "hidden",
        transform: vis
          ? hover
            ? "translateY(-8px) scale(1.015)"
            : "translateY(0) scale(1)"
          : "translateY(36px) scale(1)",
        opacity: vis ? 1 : 0,
        transition: `opacity .5s ease ${delay}ms, transform .45s cubic-bezier(.22,1,.36,1), box-shadow .45s ease, border-color .3s ease`,
        boxShadow: hover
          ? "0 28px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(232,151,61,0.35)"
          : highlight
          ? "0 20px 50px rgba(6,36,66,0.4)"
          : "0 4px 18px rgba(0,0,0,0.18)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* sheen sweep on hover */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: hover ? "120%" : "-40%",
          width: "40%",
          height: "100%",
          background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.10), transparent)",
          transition: "left .7s ease",
          pointerEvents: "none",
        }}
      />

      {highlight && (
        <div
          style={{
            position: "absolute",
            top: -13,
            left: "50%",
            transform: "translateX(-50%)",
            background: C.accent,
            color: "#1A0F00",
            fontSize: 10,
            fontWeight: 700,
            padding: "4px 15px",
            borderRadius: 20,
            letterSpacing: 0.6,
            fontFamily: "'Inter',sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          {labels.bestSeller}
        </div>
      )}

      <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, letterSpacing: 1.4, textTransform: "uppercase", marginBottom: 4, fontFamily: "'Inter',sans-serif" }}>
        {plan}
      </div>
      <div style={{ fontSize: 12, color: C.textFaint, marginBottom: 18, fontFamily: "'Inter',sans-serif" }}>{audience}</div>

      {isCustom ? (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: "white", fontFamily: "'Sora',sans-serif" }}>{labels.custom}</div>
          <div style={{ fontSize: 11.5, color: C.textFaint, marginTop: 4, fontFamily: "'Inter',sans-serif" }}>{labels.customNote}</div>
        </div>
      ) : (
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{ fontSize: 38, fontWeight: 800, color: highlight ? "white" : C.accent, fontFamily: "'Sora',sans-serif" }}>₹{price}</span>
            <span style={{ fontSize: 12.5, color: C.textFaint, fontFamily: "'Inter',sans-serif" }}>{periodLabel}</span>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 11, marginBottom: 26, flex: 1 }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
            <span style={{ color: C.accent, fontSize: 14, flexShrink: 0, marginTop: 1 }}><Check size={14} /></span>
            <span style={{ fontSize: 13, color: highlight ? "rgba(255,255,255,0.82)" : C.textDim, lineHeight: 1.5, fontFamily: "'Inter',sans-serif" }}>{f}</span>
          </div>
        ))}
      </div>

      <button
        style={{
          width: "100%",
          padding: "13px 0",
          background: highlight ? C.accent : hover ? "rgba(232,151,61,0.22)" : "rgba(232,151,61,0.12)",
          border: highlight ? "none" : "1px solid rgba(232,151,61,0.3)",
          borderRadius: 11,
          color: highlight ? "#1A0F00" : "white",
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "'Inter',sans-serif",
          transition: "background .2s ease, transform .2s ease",
          transform: hover ? "translateY(-1px)" : "none",
        }}
      >
        {isCustom ? labels.ctaCustom : labels.ctaDefault}
      </button>
    </div>
  );
}

function BillingToggle({ billingCycle, setBillingCycle, T }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        background: C.surfaceHair,
        border: `1px solid ${C.surfaceBorder}`,
        width: "fit-content",
        margin: "0 auto 40px",
        padding: 5,
        borderRadius: 999,
      }}
    >
      {["monthly", "yearly"].map((cycle) => (
        <button
          key={cycle}
          onClick={() => setBillingCycle(cycle)}
          style={{
            border: "none",
            background: billingCycle === cycle ? C.accent : "transparent",
            color: billingCycle === cycle ? "#1A0F00" : C.textDim,
            padding: "9px 22px",
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'Inter',sans-serif",
            transition: "all .25s ease",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {cycle === "monthly" ? T.pricing.monthlyLabel : T.pricing.yearlyLabel}
          {cycle === "yearly" && (
            <span
              style={{
                background: billingCycle === "yearly" ? "rgba(0,0,0,0.18)" : C.accentSoft,
                color: billingCycle === "yearly" ? "#1A0F00" : C.accent,
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: 999,
              }}
            >
              {T.pricing.saveTag}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

function FAQItem({ q, a, delay = 0 }) {
  const [open, setOpen] = useState(false);
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      style={{
        borderBottom: `1px solid ${C.surfaceHair}`,
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateX(-18px)",
        transition: `all 0.5s ease ${delay}ms`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "19px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          gap: 14,
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 600, color: C.text, textAlign: "left", fontFamily: "'Inter',sans-serif" }}>{q}</span>
        <span
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: open ? C.accent : C.accentSoft,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 17,
            color: open ? "#1A0F00" : C.accent,
            flexShrink: 0,
            transition: "all .3s",
            transform: open ? "rotate(45deg)" : "none",
          }}
        >
          <Plus size={16} />
        </span>
      </button>
      <div style={{ overflow: "hidden", maxHeight: open ? 220 : 0, transition: "max-height 0.35s ease", paddingBottom: open ? 15 : 0 }}>
        <p style={{ margin: 0, fontSize: 14, color: C.textDim, lineHeight: 1.8, fontFamily: "'Inter',sans-serif" }}>{a}</p>
      </div>
    </div>
  );
}

function SectionHeading({ badge, title, sub, light = false }) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      style={{
        textAlign: "center",
        marginBottom: 50,
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(18px)",
        transition: "all .6s",
      }}
    >
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: C.accent,
          letterSpacing: 2.5,
          textTransform: "uppercase",
          display: "block",
          marginBottom: 12,
          fontFamily: "'Inter',sans-serif",
        }}
      >
        {badge}
      </span>
      <h2
        style={{
          fontSize: "clamp(26px,4vw,42px)",
          fontWeight: 700,
          fontFamily: "'Sora',sans-serif",
          color: light ? C.paperInk : "white",
          marginBottom: sub ? 12 : 0,
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
        }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {sub && (
        <p
          style={{
            fontSize: 15,
            color: light ? C.paperDim : C.textFaint,
            maxWidth: 480,
            margin: "0 auto",
            fontFamily: "'Inter',sans-serif",
            lineHeight: 1.6,
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

export default function ReviewMasterLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [heroVis, setHeroVis] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang, T } = useLanguage(homeContent);
  const [billingCycle, setBillingCycle] = useState("monthly");

  useEffect(() => {
    const t = setTimeout(() => setHeroVis(true), 100);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{-webkit-font-smoothing:antialiased;font-family:'Inter',sans-serif;}
        @keyframes bounce-slow{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
        @keyframes fadeSlideUp{from{opacity:0;transform:translateY(26px);}to{opacity:1;transform:translateY(0);}}
        @keyframes ticker{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
        @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.45;}}

        .btn-primary{background:${C.accent};border:none;border-radius:11px;color:#1A0F00;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;transition:all .22s ease;box-shadow:0 6px 18px rgba(232,151,61,0.28);}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(232,151,61,0.4);background:#F0A14D;}
        .btn-outline{background:transparent;border:1.5px solid rgba(255,255,255,0.18);border-radius:11px;color:white;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;transition:all .22s ease;}
        .btn-outline:hover{border-color:${C.accent};background:rgba(232,151,61,0.08);}

        .nav-link{position:relative;transition:color .2s ease;}
        .nav-link::after{content:"";position:absolute;left:0;bottom:-4px;width:0;height:2px;background:${C.accent};transition:width .25s ease;}
        .nav-link:hover{color:#ffffff!important;}
        .nav-link:hover::after{width:100%;}

        .hamburger{display:none;flex-direction:column;justify-content:center;gap:5px;width:26px;height:20px;cursor:pointer;}
        .hamburger span{display:block;height:2px;width:100%;background:white;border-radius:2px;transition:all .3s ease;}
        .hamburger.open span:nth-child(1){transform:rotate(45deg) translate(5px,6px);}
        .hamburger.open span:nth-child(2){opacity:0;}
        .hamburger.open span:nth-child(3){transform:rotate(-45deg) translate(5px,-6px);}

        .mobile-menu{display:flex;flex-direction:column;gap:2px;position:fixed;top:0;right:0;bottom:0;width:min(78vw,320px);background:#0B1220;padding:90px 28px 28px;z-index:99;border-left:1px solid ${C.surfaceBorder};transform:translateX(100%);transition:transform .35s cubic-bezier(.4,0,.2,1);box-shadow:-20px 0 60px rgba(0,0,0,0.4);}
        .mobile-menu.open{transform:translateX(0);}
        .mobile-menu a{padding:14px 0;color:rgba(243,246,251,0.8);text-decoration:none;font-size:15px;font-weight:600;font-family:'Inter',sans-serif;border-bottom:1px solid rgba(255,255,255,0.06);}
        .mobile-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:98;opacity:0;pointer-events:none;transition:opacity .3s ease;}
        .mobile-overlay.open{opacity:1;pointer-events:auto;}

        .price-card:hover{border-color:rgba(232,151,61,0.4);}

        @media(max-width:900px){
          .nav-links{display:none!important;}
          .nav-btns{display:none!important;}
          .hamburger{display:flex!important;}
        }
        @media(max-width:768px){
          .hero-stats{gap:22px!important;}
          .two-col{grid-template-columns:1fr!important;}
          .stats-grid{grid-template-columns:1fr 1fr!important;}
          .footer-grid{grid-template-columns:1fr 1fr!important;}
        }
        @media(max-width:480px){
          .stats-grid{grid-template-columns:1fr!important;}
          .footer-grid{grid-template-columns:1fr!important;}
          .pricing-grid{grid-template-columns:1fr!important;}
        }
      `}</style>

      <div style={{ background: C.ink, color: C.text, overflowX: "hidden", minHeight: "100vh" }}>
        {/* NAVBAR */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            padding: "0 5%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: scrolled ? 68 : 78,
            background: scrolled ? "rgba(7,11,20,0.92)" : "transparent",
            backdropFilter: scrolled ? "blur(18px)" : "none",
            boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.3)" : "none",
            borderBottom: scrolled ? `1px solid ${C.surfaceBorder}` : "1px solid transparent",
            transition: "all .35s cubic-bezier(.4,0,.2,1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `2px solid ${C.accent}`,
                flexShrink: 0,
              }}
            >
              <img src={logo} alt="logo" style={{ width: 34, height: 34, objectFit: "contain" }} />
            </div>
            <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.01em", fontFamily: "'Sora',sans-serif", color: "white" }}>
              Review <span style={{ color: C.accent }}>Ninja</span>
              <span style={{ fontWeight: 500, opacity: 0.7, fontSize: 14, marginLeft: 4 }}>Pro</span>
            </span>
          </div>

          <div className="nav-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {T.nav.links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
                className="nav-link"
                style={{ color: "rgba(243,246,251,0.68)", textDecoration: "none", fontSize: 14, fontWeight: 600, fontFamily: "'Inter',sans-serif", padding: "4px 0" }}
              >
                {l}
              </a>
            ))}
          </div>

          <div className="nav-right" style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <LangToggle lang={lang} toggleLang={toggleLang} small />
            <div className="nav-btns" style={{ display: "flex", gap: 10 }}>
              <button className="btn-primary" style={{ padding: "10px 20px", fontSize: 13 }} onClick={() => (window.location.href = "/login")}>
                {T.nav.cta}
              </button>
            </div>
            <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <span />
              <span />
              <span />
            </div>
          </div>
        </nav>

        <div className={`mobile-overlay ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)} />
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {T.nav.links.map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(/\s/g, "-")}`} onClick={() => setMenuOpen(false)}>
              {l}
            </a>
          ))}
          <button className="btn-primary" style={{ padding: "13px", fontSize: 14, marginTop: 16, borderRadius: 10 }} onClick={() => (window.location.href = "/login")}>
            {T.nav.cta}
          </button>
        </div>

        {/* HERO */}
        <section
          style={{
            minHeight: "100vh",
            background: `radial-gradient(ellipse 80% 55% at 50% 0%, rgba(10,58,102,0.4) 0%, ${C.ink} 72%)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "130px 5% 80px",
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          <Ambience />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto", width: "100%" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: C.accentSoft,
                border: "1px solid rgba(232,151,61,0.28)",
                borderRadius: 100,
                padding: "6px 15px",
                marginBottom: 26,
                animation: heroVis ? "fadeSlideUp 0.6s ease both" : "none",
              }}
            >
              <span style={{ width: 6, height: 6, background: C.accent, borderRadius: "50%", animation: "pulse 1.5s ease infinite" }} />
              <span style={{ fontSize: 11, color: C.accent, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", fontFamily: "'Inter',sans-serif" }}>
                AI-Powered Review Generation
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(32px,6vw,64px)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: "white",
                marginBottom: 22,
                letterSpacing: "-0.02em",
                fontFamily: "'Sora',sans-serif",
                animation: heroVis ? "fadeSlideUp 0.7s ease 0.1s both" : "none",
              }}
            >
              {T.hero.titleLine1} <br /> {T.hero.titleLine2Pre}{" "}
              <span style={{ background: `linear-gradient(135deg, ${C.accent}, #FFC97A)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {T.hero.titleHighlight}
              </span>
            </h1>

            <p
              style={{
                fontSize: "clamp(14px,1.8vw,17px)",
                color: C.textDim,
                maxWidth: 520,
                margin: "0 auto 36px",
                lineHeight: 1.7,
                fontFamily: "'Inter',sans-serif",
                animation: heroVis ? "fadeSlideUp 0.7s ease 0.2s both" : "none",
              }}
            >
              {T.hero.subtitle}
            </p>

            <div
              className="hero-stats"
              style={{ display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap", animation: heroVis ? "fadeSlideUp 0.7s ease 0.4s both" : "none" }}
            >
              {T.hero.stats.map((s) => (
                <div key={s.n} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: C.accent, fontFamily: "'Sora',sans-serif" }}>{s.n}</div>
                  <div style={{ fontSize: 11, color: C.textFaint, fontFamily: "'Inter',sans-serif" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 60, position: "relative", zIndex: 1, animation: heroVis ? "fadeSlideUp 0.9s ease 0.5s both" : "none" }}>
            <div style={{ animation: "bounce-slow 3.5s ease-in-out infinite" }}>
              <PhoneMockup T={T.phoneMockup} />
            </div>
          </div>
        </section>

        {/* TICKER */}
        <div style={{ background: C.accentSoft, borderTop: `1px solid ${C.surfaceBorder}`, borderBottom: `1px solid ${C.surfaceBorder}`, padding: "13px 0", overflow: "hidden" }}>
          <div style={{ display: "flex", animation: "ticker 24s linear infinite", width: "max-content" }}>
            {[...Array(2)]
              .fill(T.ticker)
              .flat()
              .map((t, i) => (
                <span key={i} style={{ padding: "0 28px", fontSize: 12, fontWeight: 600, color: C.textDim, whiteSpace: "nowrap", fontFamily: "'Inter',sans-serif" }}>
                  {t}
                </span>
              ))}
          </div>
        </div>

        {/* WHY GOOGLE REVIEWS */}
        <section style={{ padding: "84px 5%", background: C.ink, position: "relative", overflow: "hidden" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="two-col">
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.accent, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 12, fontFamily: "'Inter',sans-serif" }}>
                {T.whyMatters.badge}
              </span>
              <h2 style={{ fontSize: "clamp(20px,2.6vw,30px)", fontWeight: 700, fontFamily: "'Sora',sans-serif", lineHeight: 1.2, marginBottom: 18, color: "white" }}>
                {T.whyMatters.titleMain} <span style={{ color: C.accent }}>{T.whyMatters.titleHighlight}</span>
              </h2>
              <p style={{ fontSize: 15, color: C.textDim, lineHeight: 1.8, marginBottom: 30, fontFamily: "'Inter',sans-serif" }}>
                <strong style={{ color: "white" }}>{T.whyMatters.bodyStrong}</strong> {T.whyMatters.bodyRest}
              </p>
              <button className="btn-primary" style={{ padding: "13px 26px", fontSize: 14 }} onClick={() => (window.location.href = "/login")}>
                {T.whyMatters.cta}
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="stats-grid">
              {T.whyMatters.stats.map((s, i) => (
                <StatCard key={s.label} value={s.value} label={s.label} icon={s.icon} delay={i * 100} />
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" style={{ padding: "84px 5%", background: C.paper }}>
          <SectionHeading light badge={T.howItWorks.badge} title={T.howItWorks.title} sub={T.howItWorks.sub} />
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}>
            {T.howItWorks.steps.map((s, i) => (
              <StepCard key={s.num} num={s.num} icon={s.icon} title={s.title} delay={i * 150} desc={s.desc} />
            ))}
          </div>
          <div
            style={{
              maxWidth: 680,
              margin: "44px auto 0",
              background: `linear-gradient(135deg, ${C.navy}, ${C.navyDeep})`,
              borderRadius: 18,
              padding: "30px 32px",
              display: "flex",
              gap: 20,
              alignItems: "flex-start",
              boxShadow: "0 20px 50px rgba(6,36,66,0.3)",
            }}
          >
            <div style={{ fontSize: 40, flexShrink: 0 }}><ShieldCheck size={40} /></div>
            <div>
              <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 19, fontWeight: 700, color: "white", marginBottom: 8 }}>{T.howItWorks.shieldTitle}</h3>
              <p style={{ fontSize: 13, color: "rgba(243,246,251,0.72)", lineHeight: 1.75, margin: 0, fontFamily: "'Inter',sans-serif" }}>
                {T.howItWorks.shieldBodyPre} <strong style={{ color: C.accent }}>{T.howItWorks.shieldBodyStrong}</strong> {T.howItWorks.shieldBodyPost}
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" style={{ padding: "84px 5%", background: C.inkSoft, position: "relative", overflow: "hidden" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <SectionHeading badge={T.features.badge} title={`${T.features.titleMain} <span style="color:${C.accent}">${T.features.titleHighlight}</span>`} />
            {T.features.items.map((f, i) => (
              <FeatureItem key={f.title} icon={f.icon} delay={i * 100} title={f.title} desc={f.desc} />
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ padding: "84px 5%", background: C.ink, position: "relative", overflow: "hidden" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <SectionHeading badge={T.testimonials.badge} title={`${T.testimonials.titleMain} <span style="color:${C.accent}">${T.testimonials.titleHighlight}</span>`} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
              {T.testimonials.items.map((tItem, i) => (
                <TestiCard key={tItem.name} delay={i * 100} name={tItem.name} biz={tItem.biz} text={tItem.text} />
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" style={{ padding: "84px 5%", background: C.inkSoft, position: "relative", overflow: "hidden" }}>
          <div style={{ maxWidth: 1060, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <SectionHeading badge={T.pricing.badge} title={T.pricing.title} sub={T.pricing.sub} />
            <BillingToggle billingCycle={billingCycle} setBillingCycle={setBillingCycle} T={T} />
            <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 22, alignItems: "stretch" }}>
              {T.pricing.plans.map((p, i) => (
                <PricingCard
                  key={p.plan}
                  delay={i * 150}
                  plan={p.plan}
                  audience={p.audience}
                  setupPrice={p.setupPrice}
                  monthlyPrice={p.monthlyPrice}
                  yearlyPrice={p.yearlyPrice}
                  billingCycle={billingCycle}
                  highlight={p.highlight}
                  isCustom={p.isCustom}
                  features={p.features}
                  labels={{
                    bestSeller: T.pricing.bestSeller,
                    custom: T.pricing.custom,
                    customNote: T.pricing.customNote,
                    perMonth: T.pricing.perMonth,
                    perYear: T.pricing.perYear,
                    ctaDefault: T.pricing.ctaDefault,
                    ctaCustom: T.pricing.ctaCustom,
                  }}
                />
              ))}
            </div>
            <p style={{ textAlign: "center", marginTop: 26, fontSize: 12, color: C.textFaint, fontFamily: "'Inter',sans-serif" }}>{T.pricing.note}</p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" style={{ padding: "84px 5%", background: C.ink }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <SectionHeading badge={T.faq.badge} title={T.faq.title} />
            {T.faq.items.map((item, i) => (
              <FAQItem key={item.q} delay={i * 80} q={item.q} a={item.a} />
            ))}
          </div>
        </section>

        {/* CTA BANNER */}
        <section style={{ padding: "76px 5%", background: `linear-gradient(135deg, ${C.navy}, ${C.navyDeep})`, position: "relative", overflow: "hidden", textAlign: "center" }}>
          <div style={{ maxWidth: 620, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}><Rocket size={40} /></div>
            <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 700, fontFamily: "'Sora',sans-serif", color: "white", marginBottom: 16, lineHeight: 1.2 }}>
              {T.cta.titleLine1}
              <span style={{ fontSize: "clamp(20px,3vw,34px)", fontWeight: 700, fontFamily: "'Sora',sans-serif", color: "white", display: "block", marginTop: 6 }}>
                {T.cta.titleLine2Pre} <span style={{ color: C.accent }}>{T.cta.titleHighlight}</span> {T.cta.titleLine2Post}
              </span>
            </h2>
            <p style={{ fontSize: 15, color: "rgba(243,246,251,0.68)", marginBottom: 34, lineHeight: 1.7, fontFamily: "'Inter',sans-serif" }}>{T.cta.subtitle}</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn-primary" style={{ padding: "14px 34px", fontSize: 15 }} onClick={() => (window.location.href = "/login")}>
                {T.cta.primaryBtn}
              </button>
              <button className="btn-outline" style={{ padding: "14px 30px", fontSize: 15 }}>
                {T.cta.secondaryBtn}
              </button>
            </div>
            <p style={{ marginTop: 20, fontSize: 12, color: "rgba(243,246,251,0.42)", fontFamily: "'Inter',sans-serif" }}>{T.cta.note}</p>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ background: "#050810", padding: "56px 5% 30px", borderTop: `1px solid ${C.surfaceHair}` }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 44 }}>
              <div>
                <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", width: "fit-content" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${C.accent}`, flexShrink: 0 }}>
                    <img src={logo} alt="logo" style={{ width: 34, height: 34, objectFit: "contain" }} />
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 18, fontFamily: "'Sora',sans-serif", color: "white" }}>
                    Review <span style={{ color: C.accent }}>Ninja</span> Pro
                  </span>
                </a>
                <p style={{ fontSize: 13, color: C.textFaint, lineHeight: 1.8, maxWidth: 260, margin: "16px 0 0", fontFamily: "'Inter',sans-serif" }}>{T.footer.tagline}</p>
              </div>

              {T.footer.columns.map((col) => (
                <div key={col.heading}>
                  <h4 style={{ fontSize: 11, fontWeight: 700, color: C.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16, fontFamily: "'Inter',sans-serif" }}>
                    {col.heading}
                  </h4>
                  {col.links.map((l) => (
                    <div key={l} style={{ marginBottom: 10 }}>
                      <a href={FOOTER_LINK_HREFS[l] || "#"} style={{ fontSize: 13, color: C.textFaint, textDecoration: "none", fontFamily: "'Inter',sans-serif" }}>
                        {l}
                      </a>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div style={{ borderTop: `1px solid ${C.surfaceHair}`, paddingTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
              <p style={{ fontSize: 12, color: "rgba(243,246,251,0.25)", fontFamily: "'Inter',sans-serif" }}>{T.footer.copyright}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}





























// import { useState, useEffect, useRef } from "react";
// import logo from "../assets/review-booster-logo2.png"
// import { useLanguage } from "../context/LanguageContext";
// import homeContent from "../i18n/homeContent";

// const FOOTER_LINK_HREFS = {
//   Features: "/#features",
//   "How It Works": "/#how-it-works",
//   Pricing: "/#pricing",
//   "Privacy Policy": "/privacy-policy",
//   "Terms & Condition": "/terms-and-condition",
//   "Refund Policy": "/refund-policy",
//   "About Us": "/about-us",
//   "Contact": "/contact-us",
// };

// // Small pill button that switches between English and Hinglish.
// // Always visible (desktop + mobile) regardless of navbar collapse state.
// function LangToggle({ lang, toggleLang, small = false }) {
//   return (
//     <button
//       onClick={toggleLang}
//       aria-label="Toggle language"
//       style={{
//         display: "flex",
//         alignItems: "center",
//         gap: 5,
//         background: "rgba(255,140,66,0.1)",
//         border: "1px solid rgba(255,140,66,0.35)",
//         borderRadius: 20,
//         padding: small ? "6px 10px" : "7px 14px",
//         color: "#FF8C42",
//         fontSize: small ? 11 : 12,
//         fontWeight: 700,
//         cursor: "pointer",
//         fontFamily: "'Poppins',sans-serif",
//         whiteSpace: "nowrap",
//         flexShrink: 0,
//       }}
//     >
//       🌐 {lang === "en" ? "Hinglish" : "English"}
//     </button>
//   );
// }

// function useInView(threshold = 0.15) {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) setVisible(true);
//       },
//       { threshold },
//     );
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, []);
//   return [ref, visible];
// }

// function Stars({ count = 5, size = 18 }) {
//   return (
//     <span style={{ display: "inline-flex", gap: 2 }}>
//       {Array.from({ length: count }).map((_, i) => (
//         <span
//           key={i}
//           style={{ fontSize: size, color: "#FF8C42", lineHeight: 1 }}
//         >
//           ★
//         </span>
//       ))}
//     </span>
//   );
// }

// function ParticleBg() {
//   return (
//     <div
//       style={{
//         position: "absolute",
//         inset: 0,
//         overflow: "hidden",
//         pointerEvents: "none",
//         zIndex: 0,
//       }}
//     >
//       {[...Array(14)].map((_, i) => (
//         <div
//           key={i}
//           style={{
//             position: "absolute",
//             width: (i % 3) * 3 + 4,
//             height: (i % 3) * 3 + 4,
//             borderRadius: "50%",
//             background: "rgba(255,140,66,0.12)",
//             left: `${(i * 37 + 10) % 100}%`,
//             top: `${(i * 53 + 5) % 100}%`,
//             animation: `floatP ${4 + i * 0.4}s ease-in-out infinite alternate`,
//             animationDelay: `${i * 0.25}s`,
//           }}
//         />
//       ))}
//     </div>
//   );
// }

// function GoogleG({ size = 32 }) {
//   return (
//     <svg width={size} height={size} viewBox="0 0 48 48">
//       <path
//         fill="#EA4335"
//         d="M24 9.5c3.14 0 5.95 1.08 8.16 2.85l6.08-6.08C34.52 3.18 29.6 1 24 1 14.8 1 7 6.7 3.55 14.65l7.1 5.52C12.4 14.07 17.73 9.5 24 9.5z"
//       />
//       <path
//         fill="#4285F4"
//         d="M46.5 24.5c0-1.63-.15-3.2-.42-4.7H24v8.9h12.67c-.55 2.96-2.2 5.47-4.67 7.16l7.1 5.52C43.4 37.8 46.5 31.6 46.5 24.5z"
//       />
//       <path
//         fill="#FBBC05"
//         d="M10.65 28.17A14.55 14.55 0 0 1 9.5 24c0-1.44.25-2.83.65-4.17l-7.1-5.52A23.5 23.5 0 0 0 .5 24c0 3.8.9 7.4 2.55 10.6l7.1-5.52z"
//       />
//       <path
//         fill="#34A853"
//         d="M24 46.5c5.6 0 10.3-1.85 13.7-5.02l-7.1-5.52C28.9 37.6 26.6 38.5 24 38.5c-6.27 0-11.6-4.57-13.35-10.67l-7.1 5.52C7 41.8 14.8 46.5 24 46.5z"
//       />
//     </svg>
//   );
// }

// function PhoneMockup({ T }) {
//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "min(220px, 85vw)",
//         background: "#0a1628",
//         borderRadius: 36,
//         padding: "12px 8px",
//         boxShadow: "0 32px 80px rgba(7,48,87,0.55), 0 0 0 2px #1a3a5c",
//       }}
//     >
//       <div
//         style={{
//           width: 60,
//           height: 12,
//           background: "#050e1c",
//           borderRadius: 8,
//           margin: "0 auto 10px",
//         }}
//       />
//       <div
//         style={{
//           background: "white",
//           borderRadius: 20,
//           overflow: "hidden",
//           minHeight: 300,
//           padding: 14,
//           display: "flex",
//           flexDirection: "column",
//           gap: 10,
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 8,
//             paddingBottom: 8,
//             borderBottom: "1px solid #f0f0f0",
//           }}
//         >
//           <div
//             style={{
//               width: 30,
//               height: 30,
//               borderRadius: "50%",
//               background: "linear-gradient(135deg,#073057,#0a4a8a)",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <span style={{ color: "white", fontSize: 12, fontWeight: 700 }}>
//               RN
//             </span>
//           </div>
//           <div>
//             <div style={{ fontWeight: 700, fontSize: 11, color: "#111" }}>
//               {T.brand}
//             </div>
//             <div style={{ fontSize: 9, color: "#6b7280" }}>
//               {T.thanks}
//             </div>
//           </div>
//         </div>
//         <div
//           style={{
//             background: "#eff6ff",
//             borderRadius: 10,
//             padding: "8px 10px",
//             border: "1px solid #bfdbfe",
//           }}
//         >
//           <p
//             style={{
//               margin: 0,
//               fontSize: 11,
//               color: "#1e3a5f",
//               fontWeight: 600,
//             }}
//           >
//             {T.question}
//           </p>
//         </div>
//         {[
//           { emoji: "🤩", label: T.optionExcellent, selected: true },
//           { emoji: "😊", label: T.optionGood, selected: false },
//         ].map((o) => (
//           <div
//             key={o.label}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: 8,
//               background: "#f9fafb",
//               borderRadius: 8,
//               padding: "7px 10px",
//               border: o.selected
//                 ? "2px solid #073057"
//                 : "2px solid transparent",
//             }}
//           >
//             <span style={{ fontSize: 16 }}>{o.emoji}</span>
//             <span
//               style={{
//                 fontSize: 12,
//                 fontWeight: 600,
//                 color: o.selected ? "#073057" : "#374151",
//               }}
//             >
//               {o.label}
//             </span>
//             {o.selected && (
//               <span
//                 style={{
//                   marginLeft: "auto",
//                   fontSize: 9,
//                   background: "#073057",
//                   color: "white",
//                   padding: "2px 6px",
//                   borderRadius: 5,
//                 }}
//               >
//                 ✓
//               </span>
//             )}
//           </div>
//         ))}
//         <div
//           style={{
//             background: "linear-gradient(135deg,#eff6ff,#dbeafe)",
//             borderRadius: 10,
//             padding: "8px 10px",
//             border: "1px solid #93c5fd",
//           }}
//         >
//           <div
//             style={{
//               fontSize: 9,
//               color: "#1d4ed8",
//               fontWeight: 700,
//               marginBottom: 3,
//             }}
//           >
//             ✨ {T.aiReady}
//           </div>
//           <div style={{ fontSize: 10, color: "#1e3a5f", lineHeight: 1.5 }}>
//             "{T.sampleReview}"
//           </div>
//         </div>
//         <div
//           style={{
//             background: "#4285F4",
//             borderRadius: 8,
//             padding: "7px 0",
//             textAlign: "center",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: 5,
//           }}
//         >
//           <GoogleG size={12} />
//           <span style={{ color: "white", fontSize: 11, fontWeight: 700 }}>
//             {T.postToGoogle}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// function StatCard({ value, label, icon, delay = 0 }) {
//   const [ref, vis] = useInView();
//   return (
//     <div
//       ref={ref}
//       style={{
//         background: "rgba(255,255,255,0.05)",
//         border: "1px solid rgba(255,140,66,0.2)",
//         borderRadius: 18,
//         padding: "24px 20px",
//         textAlign: "center",
//         backdropFilter: "blur(16px)",
//         transform: vis ? "translateY(0)" : "translateY(30px)",
//         opacity: vis ? 1 : 0,
//         transition: `all 0.6s cubic-bezier(.22,1,.36,1) ${delay}ms`,
//       }}
//     >
//       <div style={{ fontSize: 30, marginBottom: 6 }}>{icon}</div>
//       <div
//         style={{
//           fontSize: 34,
//           fontWeight: 800,
//           color: "#FF8C42",
//           fontFamily: "'Poppins',sans-serif",
//           lineHeight: 1,
//         }}
//       >
//         {value}
//       </div>
//       <div
//         style={{
//           fontSize: 12,
//           color: "rgba(240,245,251,0.6)",
//           marginTop: 6,
//           fontFamily: "'Poppins',sans-serif",
//         }}
//       >
//         {label}
//       </div>
//     </div>
//   );
// }

// function StepCard({ num, title, desc, icon, delay = 0 }) {
//   const [ref, vis] = useInView();
//   return (
//     <div
//       ref={ref}
//       style={{
//         background: "white",
//         borderRadius: 22,
//         padding: "28px 24px",
//         position: "relative",
//         boxShadow: "0 8px 32px rgba(7,48,87,0.08)",
//         border: "1px solid rgba(7,48,87,0.08)",
//         transform: vis ? "translateY(0)" : "translateY(40px)",
//         opacity: vis ? 1 : 0,
//         transition: `all 0.65s cubic-bezier(.22,1,.36,1) ${delay}ms`,
//       }}
//     >
//       <div
//         style={{
//           width: 48,
//           height: 48,
//           borderRadius: 14,
//           background: "linear-gradient(135deg,#073057,#0a4a8a)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           fontSize: 22,
//           marginBottom: 14,
//           boxShadow: "0 6px 16px rgba(7,48,87,0.25)",
//         }}
//       >
//         {icon}
//       </div>
//       <div
//         style={{
//           position: "absolute",
//           top: 18,
//           right: 18,
//           width: 32,
//           height: 32,
//           borderRadius: "50%",
//           background: "rgba(255,140,66,0.1)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           fontWeight: 800,
//           fontSize: 14,
//           color: "#FF8C42",
//           fontFamily: "'Poppins',sans-serif",
//         }}
//       >
//         {num}
//       </div>
//       <h3
//         style={{
//           margin: "0 0 8px",
//           fontSize: 18,
//           fontWeight: 700,
//           color: "#073057",
//           fontFamily: "'Poppins',sans-serif",
//         }}
//       >
//         {title}
//       </h3>
//       <p
//         style={{
//           margin: 0,
//           fontSize: 13,
//           color: "#6b7280",
//           lineHeight: 1.7,
//           fontFamily: "'Poppins',sans-serif",
//         }}
//       >
//         {desc}
//       </p>
//     </div>
//   );
// }

// function FeatureItem({ icon, title, desc, delay = 0 }) {
//   const [ref, vis] = useInView();
//   return (
//     <div
//       ref={ref}
//       style={{
//         display: "flex",
//         gap: 20,
//         alignItems: "flex-start",
//         padding: "28px 0",
//         borderBottom: "1px solid rgba(255,140,66,0.1)",
//         opacity: vis ? 1 : 0,
//         transform: vis ? "translateX(0)" : "translateX(-40px)",
//         transition: `all 0.6s ease ${delay}ms`,
//       }}
//     >
//       <div
//         style={{
//           flexShrink: 0,
//           width: 56,
//           height: 56,
//           borderRadius: 16,
//           background: "linear-gradient(135deg,#073057,#0a4a8a)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           fontSize: 26,
//         }}
//       >
//         {icon}
//       </div>
//       <div>
//         <h3
//           style={{
//             margin: "0 0 6px",
//             fontSize: 18,
//             fontWeight: 700,
//             color: "white",
//             fontFamily: "'Poppins',sans-serif",
//           }}
//         >
//           {title}
//         </h3>
//         <p
//           style={{
//             margin: 0,
//             fontSize: 14,
//             color: "rgba(240,245,251,0.6)",
//             lineHeight: 1.75,
//             fontFamily: "'Poppins',sans-serif",
//           }}
//         >
//           {desc}
//         </p>
//       </div>
//     </div>
//   );
// }

// function TestiCard({ name, biz, text, delay = 0 }) {
//   const [ref, vis] = useInView();
//   return (
//     <div
//       ref={ref}
//       style={{
//         background: "rgba(255,255,255,0.05)",
//         border: "1px solid rgba(255,140,66,0.15)",
//         borderRadius: 18,
//         padding: "24px 20px",
//         backdropFilter: "blur(16px)",
//         transform: vis ? "translateY(0)" : "translateY(30px)",
//         opacity: vis ? 1 : 0,
//         transition: `all 0.6s ease ${delay}ms`,
//       }}
//     >
//       <Stars count={5} size={14} />
//       <p
//         style={{
//           margin: "12px 0 16px",
//           fontSize: 14,
//           color: "rgba(240,245,251,0.75)",
//           lineHeight: 1.75,
//           fontStyle: "italic",
//           fontFamily: "'Poppins',sans-serif",
//         }}
//       >
//         "{text}"
//       </p>
//       <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//         <div
//           style={{
//             width: 38,
//             height: 38,
//             borderRadius: "50%",
//             background: "linear-gradient(135deg,#073057,#FF8C42)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontWeight: 700,
//             fontSize: 15,
//             color: "white",
//             flexShrink: 0,
//           }}
//         >
//           {name[0]}
//         </div>
//         <div>
//           <div
//             style={{
//               fontWeight: 700,
//               fontSize: 13,
//               color: "white",
//               fontFamily: "'Poppins',sans-serif",
//             }}
//           >
//             {name}
//           </div>
//           <div
//             style={{
//               fontSize: 11,
//               color: "rgba(240,245,251,0.45)",
//               fontFamily: "'Poppins',sans-serif",
//             }}
//           >
//             {biz}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// function PricingCard({
//   plan,
//   setupPrice,
//   monthlyPrice,
//   yearlyPrice,
//   billingCycle = "monthly",
//   audience,
//   features,
//   highlight = false,
//   isCustom = false,
//   delay = 0,
//   labels = {
//     bestSeller: "⭐ BEST SELLER",
//     custom: "Custom",
//     customNote: "Min ₹1,999/month",
//     perMonth: "/mo",
//     perYear: "/yr",
//     ctaDefault: "Get Started →",
//     ctaCustom: "Contact Sales →",
//   },
// }) {
//   const [ref, vis] = useInView();
//   const price = billingCycle === "monthly" ? monthlyPrice : yearlyPrice;
//   const periodLabel = billingCycle === "monthly" ? labels.perMonth : labels.perYear;
 
//   return (
//     <div
//       ref={ref}
//       onClick={() => (window.location.href = isCustom ? "/contact-us" : "/login")}
//       style={{
//         background: highlight
//           ? "linear-gradient(145deg,#073057,#0a4a8a)"
//           : "rgba(255,255,255,0.04)",
//         border: highlight
//           ? "1px solid rgba(255,140,66,0.45)"
//           : "1px solid rgba(255,255,255,0.08)",
//         borderRadius: 22,
//         padding: "32px 24px",
//         position: "relative",
//         transform: vis ? "translateY(0)" : "translateY(40px)",
//         opacity: vis ? 1 : 0,
//         transition: `all 0.5s ease ${delay}ms`,
//         boxShadow: highlight ? "0 24px 60px rgba(7,48,87,0.4)" : "none",
//         cursor: "pointer",
//       }}
//     >
//       {highlight && (
//         <div
//           style={{
//             position: "absolute",
//             top: -13,
//             left: "50%",
//             transform: "translateX(-50%)",
//             background: "#FF8C42",
//             color: "white",
//             fontSize: 10,
//             fontWeight: 700,
//             padding: "3px 14px",
//             borderRadius: 20,
//             letterSpacing: 1,
//             fontFamily: "'Poppins',sans-serif",
//             whiteSpace: "nowrap",
//           }}
//         >
//           {labels.bestSeller}
//         </div>
//       )}
//       <div
//         style={{
//           fontSize: 11,
//           fontWeight: 700,
//           color: "#FF8C42",
//           letterSpacing: 1,
//           textTransform: "uppercase",
//           marginBottom: 3,
//           fontFamily: "'Poppins',sans-serif",
//         }}
//       >
//         {plan}
//       </div>
//       <div
//         style={{
//           fontSize: 11,
//           color: "rgba(240,245,251,0.45)",
//           marginBottom: 14,
//           fontFamily: "'Poppins',sans-serif",
//         }}
//       >
//         {audience}
//       </div>
//       {isCustom ? (
//         <div style={{ marginBottom: 22 }}>
//           <div
//             style={{
//               fontSize: 26,
//               fontWeight: 800,
//               color: "white",
//               fontFamily: "'Poppins',sans-serif",
//             }}
//           >
//             {labels.custom}
//           </div>
//           <div
//             style={{
//               fontSize: 11,
//               color: "rgba(240,245,251,0.45)",
//               marginTop: 3,
//               fontFamily: "'Poppins',sans-serif",
//             }}
//           >
//             {labels.customNote}
//           </div>
//         </div>
//       ) : (
//         <div style={{ marginBottom: 22 }}>
//           <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
//             <span
//               style={{
//                 fontSize: 36,
//                 fontWeight: 800,
//                 color: "#FF8C42",
//                 fontFamily: "'Poppins',sans-serif",
//               }}
//             >
//               ₹{price}
//             </span>
//             <span
//               style={{
//                 fontSize: 12,
//                 color: "rgba(240,245,251,0.45)",
//                 fontFamily: "'Poppins',sans-serif",
//               }}
//             >
//               {periodLabel}
//             </span>
//           </div>
//         </div>
//       )}
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           gap: 10,
//           marginBottom: 24,
//         }}
//       >
//         {features.map((f, i) => (
//           <div
//             key={i}
//             style={{ display: "flex", gap: 8, alignItems: "flex-start" }}
//           >
//             <span
//               style={{
//                 color: "#FF8C42",
//                 fontSize: 14,
//                 flexShrink: 0,
//                 marginTop: 1,
//               }}
//             >
//               ✓
//             </span>
//             <span
//               style={{
//                 fontSize: 13,
//                 color: "rgba(240,245,251,0.7)",
//                 lineHeight: 1.5,
//                 fontFamily: "'Poppins',sans-serif",
//               }}
//             >
//               {f}
//             </span>
//           </div>
//         ))}
//       </div>
 
//       <button
//         style={{
//           width: "100%",
//           padding: "13px 0",
//           background: highlight ? "#FF8C42" : "rgba(255,140,66,0.12)",
//           border: highlight ? "none" : "1px solid rgba(255,140,66,0.25)",
//           borderRadius: 11,
//           color: "white",
//           fontSize: 14,
//           fontWeight: 700,
//           cursor: "pointer",
//           fontFamily: "'Poppins',sans-serif",
//           marginTop: "auto",
//         }}
//         onClick={() => (window.location.href = isCustom ? "/contact-us" : "/login")}
//       >
//         {isCustom ? labels.ctaCustom : labels.ctaDefault}
//       </button>
//     </div>
//   );
// }
 
 
// /* -------------------------------------------------------------------------
//    STEP 2 — ADD this new component anywhere near the other small components
//    (e.g. right after PricingCard). This renders the Monthly/Yearly pill toggle,
//    styled to match the dark landing-page theme.
//    ------------------------------------------------------------------------- */
// function BillingToggle({ billingCycle, setBillingCycle, T }) {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         gap: 6,
//         background: "rgba(255,255,255,0.05)",
//         border: "1px solid rgba(255,140,66,0.2)",
//         width: "fit-content",
//         margin: "0 auto 36px",
//         padding: 5,
//         borderRadius: 999,
//       }}
//     >
//       <button
//         onClick={() => setBillingCycle("monthly")}
//         style={{
//           border: "none",
//           background: billingCycle === "monthly" ? "#FF8C42" : "transparent",
//           color: "white",
//           padding: "9px 22px",
//           borderRadius: 999,
//           fontSize: 13,
//           fontWeight: 700,
//           cursor: "pointer",
//           fontFamily: "'Poppins',sans-serif",
//           transition: "all .2s ease",
//         }}
//       >
//         {T.pricing.monthlyLabel}
//       </button>
//       <button
//         onClick={() => setBillingCycle("yearly")}
//         style={{
//           border: "none",
//           background: billingCycle === "yearly" ? "#FF8C42" : "transparent",
//           color: "white",
//           padding: "9px 22px",
//           borderRadius: 999,
//           fontSize: 13,
//           fontWeight: 700,
//           cursor: "pointer",
//           fontFamily: "'Poppins',sans-serif",
//           display: "flex",
//           alignItems: "center",
//           gap: 8,
//           transition: "all .2s ease",
//         }}
//       >
//         {T.pricing.yearlyLabel}
//         <span
//           style={{
//             background: billingCycle === "yearly" ? "rgba(255,255,255,0.25)" : "rgba(255,140,66,0.15)",
//             color: billingCycle === "yearly" ? "white" : "#FF8C42",
//             fontSize: 10,
//             fontWeight: 700,
//             padding: "2px 8px",
//             borderRadius: 999,
//           }}
//         >
//           {T.pricing.saveTag}
//         </span>
//       </button>
//     </div>
//   );
// }

// function FAQItem({ q, a, delay = 0 }) {
//   const [open, setOpen] = useState(false);
//   const [ref, vis] = useInView();
//   return (
//     <div
//       ref={ref}
//       style={{
//         borderBottom: "1px solid rgba(255,140,66,0.1)",
//         opacity: vis ? 1 : 0,
//         transform: vis ? "none" : "translateX(-20px)",
//         transition: `all 0.5s ease ${delay}ms`,
//       }}
//     >
//       <button
//         onClick={() => setOpen(!open)}
//         style={{
//           width: "100%",
//           background: "none",
//           border: "none",
//           padding: "18px 0",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           cursor: "pointer",
//           gap: 12,
//         }}
//       >
//         <span
//           style={{
//             fontSize: 15,
//             fontWeight: 600,
//             color: "white",
//             textAlign: "left",
//             fontFamily: "'Poppins',sans-serif",
//           }}
//         >
//           {q}
//         </span>
//         <span
//           style={{
//             width: 26,
//             height: 26,
//             borderRadius: "50%",
//             background: open ? "#FF8C42" : "rgba(255,140,66,0.12)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: 18,
//             color: open ? "white" : "#FF8C42",
//             flexShrink: 0,
//             transition: "all .3s",
//             transform: open ? "rotate(45deg)" : "none",
//           }}
//         >
//           +
//         </span>
//       </button>
//       <div
//         style={{
//           overflow: "hidden",
//           maxHeight: open ? 200 : 0,
//           transition: "max-height 0.35s ease",
//           paddingBottom: open ? 14 : 0,
//         }}
//       >
//         <p
//           style={{
//             margin: 0,
//             fontSize: 14,
//             color: "rgba(240,245,251,0.6)",
//             lineHeight: 1.8,
//             fontFamily: "'Poppins',sans-serif",
//           }}
//         >
//           {a}
//         </p>
//       </div>
//     </div>
//   );
// }

// function SectionHeading({ badge, title, sub, light = false }) {
//   const [ref, vis] = useInView();
//   return (
//     <div
//       ref={ref}
//       style={{
//         textAlign: "center",
//         marginBottom: 48,
//         opacity: vis ? 1 : 0,
//         transform: vis ? "none" : "translateY(20px)",
//         transition: "all .6s",
//       }}
//     >
//       <span
//         style={{
//           fontSize: 16,
//           fontWeight: 700,
//           color: "#FF8C42",
//           letterSpacing: 2,
//           textTransform: "uppercase",
//           display: "block",
//           marginBottom: 10,
//           fontFamily: "'Poppins',sans-serif",
          
//         }}
//       >
//         {badge}
//       </span>
//       <h2
//         style={{
//           fontSize: "clamp(26px,4vw,44px)",
//           fontWeight: 800,
//           fontFamily: "'Poppins',sans-serif",
//           color: light ? "#073057" : "white",
//           marginBottom: sub ? 12 : 0,
//           lineHeight: 1.2,
//         }}
//         dangerouslySetInnerHTML={{ __html: title }}
//       />
//       {sub && (
//         <p
//           style={{
//             fontSize: 15,
//             color: light ? "#6b7280" : "rgba(240,245,251,0.5)",
//             maxWidth: 480,
//             margin: "0 auto",
//             fontFamily: "'Poppins',sans-serif",
//           }}
//         >
//           {sub}
//         </p>
//       )}
//     </div>
//   );
// }

// export default function ReviewMaterLanding() {
//   const [scrolled, setScrolled] = useState(false);
//   const [heroVis, setHeroVis] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const { lang, toggleLang, T } = useLanguage(homeContent);
//   const [billingCycle, setBillingCycle] = useState("monthly");

//   useEffect(() => {
//     const t = setTimeout(() => setHeroVis(true), 100);
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     window.addEventListener("scroll", onScroll);
//     return () => {
//       clearTimeout(t);
//       window.removeEventListener("scroll", onScroll);
//     };
//   }, []);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
//         *{box-sizing:border-box;margin:0;padding:0;}
//         body{-webkit-font-smoothing:antialiased;font-family:'Poppins',sans-serif;}
//         @keyframes floatP{from{transform:translateY(0) scale(1);}to{transform:translateY(-20px) scale(1.2);}}
//         @keyframes bounce-slow{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
//         @keyframes spin-slow{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
//         @keyframes fadeSlideUp{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);}}
//         @keyframes ticker{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
//         @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.5;}}
//         .btn-primary{background:linear-gradient(135deg,#FF8C42,#e8722e);border:none;border-radius:12px;color:white;font-weight:700;cursor:pointer;font-family:'Poppins',sans-serif;transition:all .25s;box-shadow:0 6px 20px rgba(255,140,66,0.3);}
//         .btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(255,140,66,0.45);}
//         .btn-outline{background:transparent;border:1.5px solid rgba(240,245,251,0.3);border-radius:12px;color:white;font-weight:700;cursor:pointer;font-family:'Poppins',sans-serif;transition:all .25s;}
//         .btn-outline:hover{border-color:#FF8C42;background:rgba(255,140,66,0.08);}
//         @media(max-width:768px){
//           .nav-links{display:none!important;}
//           .nav-btns{display:none!important;}
//           .hamburger{display:flex!important;}
//           .hero-stats{gap:24px!important;}
//           .hero-btns{flex-direction:column!important;align-items:stretch!important;}
//           .hero-btns button{text-align:center;}
//           .two-col{grid-template-columns:1fr!important;}
//           .stats-grid{grid-template-columns:1fr 1fr!important;}
//           .footer-grid{grid-template-columns:1fr 1fr!important;}
//         }
//         @media(max-width:480px){
//           .stats-grid{grid-template-columns:1fr!important;}
//           .footer-grid{grid-template-columns:1fr!important;}
//           .pricing-grid{grid-template-columns:1fr!important;}
//         }
//         .mobile-menu{display:none;position:fixed;top:68px;left:0;right:0;background:rgba(5,14,28,0.97);backdrop-filter:blur(20px);padding:20px 5%;flex-direction:column;gap:4px;z-index:99;border-bottom:1px solid rgba(255,140,66,0.1);}
//         .mobile-menu.open{display:flex;}
//         .mobile-menu a{padding:12px 0;color:rgba(240,245,251,0.8);text-decoration:none;font-size:15px;font-weight:600;font-family:'Poppins',sans-serif;border-bottom:1px solid rgba(255,255,255,0.05);}
//         .hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px;}
//         .hamburger span{width:22px;height:2px;background:white;border-radius:2px;transition:all .3s;}

//         .nav-link {
//   transition: color .25s ease;
// }
// .nav-link::after {
//   content: "";
//   position: absolute;
//   left: 0;
//   bottom: -4px;
//   width: 0;
//   height: 2px;
//   background: #FF8C42;
//   transition: width .25s ease;
// }
// .nav-link:hover {
//   color: #ffffff;
// }
// .nav-link:hover::after {
//   width: 100%;
// }

// .hamburger {
//   display: none;
//   flex-direction: column;
//   justify-content: center;
//   gap: 5px;
//   width: 28px;
//   height: 22px;
//   cursor: pointer;
// }
// .hamburger span {
//   display: block;
//   height: 2px;
//   width: 100%;
//   background: white;
//   border-radius: 2px;
//   transition: all .3s ease;
// }
// .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 6px); }
// .hamburger.open span:nth-child(2) { opacity: 0; }
// .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -6px); }

// .mobile-menu {
//   display: none;
// }

// @media (max-width: 900px) {
//   .nav-links,
//   .nav-btns {
//     display: none !important;
//   }
//   .hamburger {
//     display: flex;
//   }
//   .mobile-menu {
//     position: fixed;
//     top: 70px;
//     left: 0;
//     right: 0;
//     background: rgba(5,14,28,0.98);
//     backdrop-filter: blur(20px);
//     display: flex;
//     flex-direction: column;
//     padding: 20px 6%;
//     gap: 18px;
//     transform: translateY(-10px);
//     opacity: 0;
//     pointer-events: none;
//     transition: all .3s ease;
//     border-bottom: 1px solid rgba(255,140,66,0.12);
//   }
//   .mobile-menu.open {
//     transform: translateY(0);
//     opacity: 1;
//     pointer-events: auto;
//   }
//   .mobile-nav-link {
//     color: rgba(240,245,251,0.85);
//     text-decoration: none;
//     font-size: 15px;
//     font-weight: 600;
//     font-family: 'Poppins',sans-serif;
//   }
// }
//       `}</style>

//       <div
//         style={{
//           background: "#050e1c",
//           color: "white",
//           overflowX: "hidden",
//           minHeight: "100vh",
//         }}
//       >
//         {/* NAVBAR */}

//         <nav
//   style={{
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 100,
//     padding: "0 5%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     height: scrolled ? 70 : 80,
//     background: scrolled ? "rgba(5,14,28,0.94)" : "transparent",
//     backdropFilter: scrolled ? "blur(20px)" : "none",
//     boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.25)" : "none",
//     borderBottom: scrolled ? "1px solid rgba(255,140,66,0.12)" : "1px solid transparent",
//     transition: "all .35s cubic-bezier(.4,0,.2,1)",
//   }}
// >
//   {/* Logo */}
//   <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//     <div
//       style={{
//         width: 50,
//         height: 50,
//         borderRadius: "50%",
//         background: "white",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         boxShadow: "0 2px 10px rgba(255,140,66,0.25)",
//         border: "2px solid #FF8C42",
//       }}
//     >
//       <img src={logo} alt="logo" style={{ width: 36, height: 36, objectFit: "contain" }} />
//     </div>

//     <span
//       style={{
//         fontWeight: 800,
//         fontSize: 18,
//         letterSpacing: "-0.02em",
//         fontFamily: "'Sora',sans-serif",
//         color: "white",
//       }}
//     >
//       Review <span style={{ color: "#FF8C42" }}>Ninja</span>
//       <span style={{ fontWeight: 500, opacity: 0.75, fontSize: 14, marginLeft: 4 }}>Pro</span>
//     </span>
//   </div>

//   {/* Nav Links */}
//   <div className="nav-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
//     {T.nav.links.map((l) => (
      
//       <a  key={l}
//         href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
//         className="nav-link"
//         style={{
//           color: "rgba(240,245,251,0.7)",
//           textDecoration: "none",
//           fontSize: 14,
//           fontWeight: 600,
//           fontFamily: "'Poppins',sans-serif",
//           position: "relative",
//           padding: "4px 0",
//         }}
//       >
//         {l}
//       </a>
//     ))}
//   </div>

//   {/* Right side */}
//   <div className="nav-right" style={{ display: "flex", gap: 14, alignItems: "center" }}>
//     <LangToggle lang={lang} toggleLang={toggleLang} small />
//     <div className="nav-btns" style={{ display: "flex", gap: 10 }}>
//       <button
//         className="btn-primary"
//         style={{
//           padding: "10px 20px",
//           fontSize: 13,
//           fontWeight: 700,
//           borderRadius: 8,
//           letterSpacing: "0.02em",
//         }}
//         onClick={() => (window.location.href = "/login")}
//       >
//         {T.nav.cta}
//       </button>
//     </div>

//     <div
//       className={`hamburger ${menuOpen ? "open" : ""}`}
//       onClick={() => setMenuOpen(!menuOpen)}
//       aria-label="Toggle menu"
//     >
//       <span />
//       <span />
//       <span />
//     </div>
//   </div>

//   {/* Mobile dropdown */}
//   <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
//     {T.nav.links.map((l) => (
      
//       <a  key={l}
//         href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
//         onClick={() => setMenuOpen(false)}
//         className="mobile-nav-link"
//       >
//         {l}
//       </a>
//     ))}
//     <button
//       className="btn-primary"
//       style={{ marginTop: 12, width: "100%", padding: "12px 0", borderRadius: 8, fontWeight: 700 }}
//       onClick={() => (window.location.href = "/login")}
//     >
//       {T.nav.cta}
//     </button>
//   </div>
//         </nav>




//         {/* <nav
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             zIndex: 100,
//             padding: "0px 5%",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             height: 80,
//             background: scrolled ? "rgba(5,14,28,0.94)" : "transparent",
//             backdropFilter: scrolled ? "blur(20px)" : "none",
//             borderBottom: scrolled ? "1px solid rgba(255,140,66,0.1)" : "none",
//             transition: "all .3s ease",
//           }}
//         >
//           <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//             <div
//               style={{
//                 width: 60,
//                 height: 60,
//                 borderRadius: "50%",
//                 // background: "linear-gradient(135deg,#073057,#0a4a8a)",
//                 background: "white",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontWeight: 600,
//                 fontSize: 17,
//                 color: "white",
//                 border: "2px solid #FF8C42",
//               }}
//             >
//               <img
//                 src={logo}
//                 alt="logo"
//                 style={{ width: "50px", height: "50px" }}
//               />
//             </div>

//             <span
//               style={{
//                 fontWeight: 800,
//                 fontSize: 19,
//                 fontFamily: "'Sora',sans-serif",
//                 color: "white",
//               }}
//             >
//               Review <span style={{ color: "#FF8C42" }}> Ninja</span> Pro
//             </span>
//           </div>
//           <div
//             className="nav-links"
//             style={{ display: "flex", gap: 28, alignItems: "center" }}
//           >
//             {T.nav.links.map((l) => (
//               <a
//                 key={l}
//                 href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
//                 style={{
//                   color: "rgba(240,245,251,0.65)",
//                   textDecoration: "none",
//                   fontSize: 14,
//                   fontWeight: 600,
//                   fontFamily: "'Poppins',sans-serif",
//                 }}
//               >
//                 {l}
//               </a>
//             ))}
//           </div>
//           <div
//             className="nav-right"
//             style={{ display: "flex", gap: 10, alignItems: "center" }}
//           >
//             <LangToggle lang={lang} toggleLang={toggleLang} small />
//             <div className="nav-btns" style={{ display: "flex", gap: 10 }}>
//               <button
//                 className="btn-primary"
//                 style={{ padding: "0px 12px", fontSize: 13 }}
//                 onClick={() => (window.location.href = "/login")}
//               >
//                 {T.nav.cta}
//               </button>
//             </div>
//             <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
//               <span
//                 style={{
//                   transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none",
//                 }}
//               />
//               <span style={{ opacity: menuOpen ? 0 : 1 }} />
//               <span
//                 style={{
//                   transform: menuOpen
//                     ? "rotate(-45deg) translateY(-7px)"
//                     : "none",
//                 }}
//               />
//             </div>
//           </div>
//         </nav> */}

//         <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
//           {T.nav.links.map((l) => (
//             <a
//               key={l}
//               href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
//               onClick={() => setMenuOpen(false)}
//             >
//               {l}
//             </a>
//           ))}
//           <button
//             className="btn-primary"
//             style={{
//               padding: "12px",
//               fontSize: 14,
//               marginTop: 8,
//               borderRadius: 10,
//             }}
//             onClick={() => (window.location.href = "/login")}
//           >
//             {T.nav.cta}
//           </button>
//         </div>

//         {/* HERO */}
//         <section
//           style={{
//             minHeight: "100vh",
//             background:
//               "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(7,48,87,0.55) 0%, #050e1c 70%)",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             padding: "120px 5% 80px",
//             position: "relative",
//             overflow: "hidden",
//             textAlign: "center",
//           }}
//         >
//           <ParticleBg />
//           <div
//             style={{
//               position: "relative",
//               zIndex: 1,
//               maxWidth: 820,
//               margin: "0 auto",
//               width: "100%",
//               paddingTop: 80
//             }}
//           >
//             {/* <div
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: 8,
//                 background: "rgba(255,140,66,0.08)",
//                 border: "1px solid rgba(255,140,66,0.2)",
//                 borderRadius: 100,
//                 padding: "5px 14px",
//                 marginBottom: 24,
//                 animation: heroVis ? "fadeSlideUp 0.6s ease both" : "none",
//               }}
//             >
//               <span
//                 style={{
//                   width: 6,
//                   height: 6,
//                   background: "#FF8C42",
//                   borderRadius: "50%",
//                   animation: "pulse 1.5s ease infinite",
//                 }}
//               />
//               <span
//                 style={{
//                   fontSize: 11,
//                   color: "#FF8C42",
//                   fontWeight: 700,
//                   letterSpacing: 1,
//                   textTransform: "uppercase",
//                   fontFamily: "'Poppins',sans-serif",
//                 }}
//               >
//                 AI-Powered Review Generation
//               </span>
//             </div> */}
//             <h1
//               style={{
//                 fontSize: "clamp(30px,6vw,65px)",
//                 fontWeight: 700,
//                 lineHeight: 1.1,
//                 color: "white",
//                 marginBottom: 20,
//                 letterSpacing: -1.5,
//                 animation: heroVis ? "fadeSlideUp 0.7s ease 0.1s both" : "none",
//               }}
//             >
//               {T.hero.titleLine1} <br/> {T.hero.titleLine2Pre}{" "}
//               <span
//                 style={{
//                   background: "linear-gradient(135deg,#FF8C42,#ffb380)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                 }}
//               >
//                 {T.hero.titleHighlight}
//               </span>
//             </h1>
//             <p
//               style={{
//                 fontSize: "clamp(14px,1.8vw,17px)",
//                 color: "rgba(240,245,251,0.6)",
//                 maxWidth: 520,
//                 margin: "0 auto 32px",
//                 lineHeight: 1.7,
//                 fontFamily: "'Poppins',sans-serif",
//                 animation: heroVis ? "fadeSlideUp 0.7s ease 0.2s both" : "none",
//               }}
//             >
//               {T.hero.subtitle}
//             </p>

//             {/* <div
//               className="hero-btns"
//               style={{
//                 display: "flex",
//                 gap: 12,
//                 justifyContent: "center",
//                 flexWrap: "wrap",
//                 marginBottom: 44,
//                 animation: heroVis ? "fadeSlideUp 0.7s ease 0.3s both" : "none",
//               }}
//             >
//               <button
//                 className="btn-primary"
//                 style={{ padding: "14px 32px", fontSize: 15 }}
//               >
//                 🚀 Free Trial Shuru Karein
//               </button>
//               <button
//                 className="btn-outline"
//                 style={{ padding: "14px 32px", fontSize: 15 }}
//               >
//                 ▶ Demo Dekhein
//               </button>
//             </div> */}

//             <div
//               className="hero-stats"
//               style={{
//                 display: "flex",
//                 gap: 36,
//                 justifyContent: "center",
//                 flexWrap: "wrap",
//                 animation: heroVis ? "fadeSlideUp 0.7s ease 0.4s both" : "none",
//               }}
//             >
//               {T.hero.stats.map((s) => (
//                 <div key={s.n} style={{ textAlign: "center" }}>
//                   <div
//                     style={{
//                       fontSize: 26,
//                       fontWeight: 800,
//                       color: "#FF8C42",
//                       fontFamily: "'Poppins',sans-serif",
//                     }}
//                   >
//                     {s.n}
//                   </div>
//                   <div
//                     style={{
//                       fontSize: 11,
//                       color: "rgba(240,245,251,0.45)",
//                       fontFamily: "'Poppins',sans-serif",
//                     }}
//                   >
//                     {s.l}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div
//             style={{
//               marginTop: 56,
//               position: "relative",
//               zIndex: 1,
//               animation: heroVis ? "fadeSlideUp 0.9s ease 0.5s both" : "none",
//             }}
//           >
//             <div style={{ animation: "bounce-slow 3.5s ease-in-out infinite" }}>
//               <PhoneMockup T={T.phoneMockup} />
//             </div>
//           </div>
//         </section>

//         {/* TICKER */}
//         <div
//           style={{
//             background: "rgba(255,140,66,0.06)",
//             borderTop: "1px solid rgba(255,140,66,0.12)",
//             borderBottom: "1px solid rgba(255,140,66,0.12)",
//             padding: "12px 0",
//             overflow: "hidden",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               animation: "ticker 22s linear infinite",
//               width: "max-content",
//             }}
//           >
//             {[...Array(2)]
//               .fill(T.ticker)
//               .flat()
//               .map((t, i) => (
//                 <span
//                   key={i}
//                   style={{
//                     padding: "0 28px",
//                     fontSize: 12,
//                     fontWeight: 600,
//                     color: "rgba(240,245,251,0.6)",
//                     whiteSpace: "nowrap",
//                     fontFamily: "'Poppins',sans-serif",
//                   }}
//                 >
//                   {t}
//                 </span>
//               ))}
//           </div>
//         </div>

//         {/* WHY GOOGLE REVIEWS */}
//         <section
//           style={{
//             padding: "80px 5%",
//             background: "#050e1c",
//             position: "relative",
//             overflow: "hidden",
//           }}
//         >
//           <div
//             style={{
//               maxWidth: 1100,
//               margin: "0 auto",
//               display: "grid",
//               gridTemplateColumns: "1fr 1fr",
//               gap: 64,
//               alignItems: "center",
//             }}
//             className="two-col"
//           >
//             <div>
//               <span
//                 style={{
//                   fontSize: 11,
//                   fontWeight: 700,
//                   color: "#FF8C42",
//                   letterSpacing: 2,
//                   textTransform: "uppercase",
//                   display: "block",
//                   marginBottom: 10,
//                   fontFamily: "'Poppins',sans-serif",
//                 }}
//               >
//                 {T.whyMatters.badge}
//               </span>
//               <h2
//                 style={{
//                   fontSize: "clamp(16px,2.5vw,26px)",
//                   fontWeight: 800,
//                   fontFamily: "'Poppins',sans-serif",
//                   lineHeight: 1.15,
//                   marginBottom: 16,
//                   color: "white",
//                 }}
//               >
//                 {T.whyMatters.titleMain}{" "}
//                 <span style={{ color: "#FF8C42" }}>{T.whyMatters.titleHighlight}</span>
//               </h2>
//               <p
//                 style={{
//                   fontSize: 15,
//                   color: "rgba(240,245,251,0.6)",
//                   lineHeight: 1.8,
//                   marginBottom: 28,
//                   fontFamily: "'Poppins',sans-serif",
//                 }}
//               >
//                 <strong style={{ color: "white" }}>
//                   {T.whyMatters.bodyStrong}
//                 </strong>{" "}
//                 {T.whyMatters.bodyRest}
//               </p>
//               <button
//                 className="btn-primary"
//                 style={{ padding: "5px 10px", fontSize: 14 }}
//                 onClick={() => (window.location.href = "/login")}
//               >
//                 {T.whyMatters.cta}
//               </button>
//             </div>

//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gap: 16,
//               }}
//               className="stats-grid"
//             >
//               {T.whyMatters.stats.map((s, i) => (
//                 <StatCard
//                   key={s.label}
//                   value={s.value}
//                   label={s.label}
//                   icon={s.icon}
//                   delay={i * 100}
//                 />
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* HOW IT WORKS */}
//         <section
//           id="how-it-works"
//           style={{ padding: "80px 5%", background: "#F0F5FB" }}
//         >
//           <SectionHeading
//             light
//             badge={T.howItWorks.badge}
//             title={T.howItWorks.title}
//             sub={T.howItWorks.sub}
//           />
//           <div
//             style={{
//               maxWidth: 1000,
//               margin: "0 auto",
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
//               gap: 24,
//             }}
//           >
//             {T.howItWorks.steps.map((s, i) => (
//               <StepCard
//                 key={s.num}
//                 num={s.num}
//                 icon={s.icon}
//                 title={s.title}
//                 delay={i * 150}
//                 desc={s.desc}
//               />
//             ))}
//           </div>
//           <div
//             style={{
//               maxWidth: 680,
//               margin: "40px auto 0",
//               background: "linear-gradient(135deg,#073057,#0a4a8a)",
//               borderRadius: 20,
//               padding: "28px 32px",
//               display: "flex",
//               gap: 20,
//               alignItems: "flex-start",
//               boxShadow: "0 16px 48px rgba(7,48,87,0.35)",
//             }}
//           >
//             <div style={{ fontSize: 44, flexShrink: 0 }}>🛡️</div>
//             <div>
//               <h3
//                 style={{
//                   fontFamily: "'Poppins',sans-serif",
//                   fontSize: 20,
//                   fontWeight: 700,
//                   color: "white",
//                   marginBottom: 8,
//                 }}
//               >
//                 {T.howItWorks.shieldTitle}
//               </h3>
//               <p
//                 style={{
//                   fontSize: 13,
//                   color: "rgba(240,245,251,0.7)",
//                   lineHeight: 1.75,
//                   margin: 0,
//                   fontFamily: "'Poppins',sans-serif",
//                 }}
//               >
//                 {T.howItWorks.shieldBodyPre}{" "}
//                 <strong style={{ color: "#FF8C42" }}>
//                   {T.howItWorks.shieldBodyStrong}
//                 </strong>{" "}
//                 {T.howItWorks.shieldBodyPost}
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* FEATURES */}
//         <section
//           id="features"
//           style={{
//             padding: "80px 5%",
//             background: "#060d1a",
//             position: "relative",
//             overflow: "hidden",
//           }}
//         >
//           <ParticleBg />
//           <div
//             style={{
//               maxWidth: 900,
//               margin: "0 auto",
//               position: "relative",
//               zIndex: 1,
//             }}
//           >
//             <SectionHeading
//               badge={T.features.badge}
//               title={`${T.features.titleMain} <span style="color:#FF8C42">${T.features.titleHighlight}</span>`}
//             />
//             {T.features.items.map((f, i) => (
//               <FeatureItem
//                 key={f.title}
//                 icon={f.icon}
//                 delay={i * 100}
//                 title={f.title}
//                 desc={f.desc}
//               />
//             ))}
//           </div>
//         </section>

//         {/* TESTIMONIALS */}
//         <section
//           style={{
//             padding: "80px 5%",
//             background: "#050e1c",
//             position: "relative",
//             overflow: "hidden",
//           }}
//         >
//           <ParticleBg />
//           <div
//             style={{
//               maxWidth: 1000,
//               margin: "0 auto",
//               position: "relative",
//               zIndex: 1,
//             }}
//           >
//             <SectionHeading
//               badge={T.testimonials.badge}
//               title={`${T.testimonials.titleMain} <span style="color:#FF8C42">${T.testimonials.titleHighlight}</span>`}
//             />
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
//                 gap: 20,
//               }}
//             >
//               {T.testimonials.items.map((tItem, i) => (
//                 <TestiCard
//                   key={tItem.name}
//                   delay={i * 100}
//                   name={tItem.name}
//                   biz={tItem.biz}
//                   text={tItem.text}
//                 />
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* PRICING */}

//         <section
//           id="pricing"
//           style={{
//             padding: "80px 5%",
//             background: "#060d1a",
//             position: "relative",
//             overflow: "hidden",
//           }}
//         >
//           <ParticleBg />
//           <div
//             style={{
//               maxWidth: 1060,
//               margin: "0 auto",
//               position: "relative",
//               zIndex: 1,
//             }}
//           >
//             <SectionHeading
//               badge={T.pricing.badge}
//               title={T.pricing.title}
//               sub={T.pricing.sub}
//             />
 
//             <BillingToggle
//               billingCycle={billingCycle}
//               setBillingCycle={setBillingCycle}
//               T={T}
//             />
 
//             <div
//               className="pricing-grid"
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))",
//                 gap: 22,
//               }}
//             >
//               {T.pricing.plans.map((p, i) => (
//                 <PricingCard
//                   key={p.plan}
//                   delay={i * 150}
//                   plan={p.plan}
//                   audience={p.audience}
//                   setupPrice={p.setupPrice}
//                   monthlyPrice={p.monthlyPrice}
//                   yearlyPrice={p.yearlyPrice}
//                   billingCycle={billingCycle}
//                   highlight={p.highlight}
//                   isCustom={p.isCustom}
//                   features={p.features}
//                   labels={{
//                     bestSeller: T.pricing.bestSeller,
//                     custom: T.pricing.custom,
//                     customNote: T.pricing.customNote,
//                     perMonth: T.pricing.perMonth,
//                     perYear: T.pricing.perYear,
//                     ctaDefault: T.pricing.ctaDefault,
//                     ctaCustom: T.pricing.ctaCustom,
//                   }}
//                 />
//               ))}
//             </div>
//             <p
//               style={{
//                 textAlign: "center",
//                 marginTop: 24,
//                 fontSize: 12,
//                 color: "rgba(240,245,251,0.35)",
//                 fontFamily: "'Poppins',sans-serif",
//               }}
//             >
//               {T.pricing.note}
//             </p>
//           </div>
//         </section>


//         {/* <section
//           id="pricing"
//           style={{
//             padding: "80px 5%",
//             background: "#060d1a",
//             position: "relative",
//             overflow: "hidden",
//           }}
//         >
//           <ParticleBg />
//           <div
//             style={{
//               maxWidth: 1060,
//               margin: "0 auto",
//               position: "relative",
//               zIndex: 1,
//             }}
//           >
//             <SectionHeading
//               badge={T.pricing.badge}
//               title={T.pricing.title}
//               sub={T.pricing.sub}
//             />
//             <div
//               className="pricing-grid"
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))",
//                 gap: 22,
//               }}
//             >
//               {T.pricing.plans.map((p, i) => (
//                 <PricingCard
//                   key={p.plan}
//                   delay={i * 150}
//                   plan={p.plan}
//                   audience={p.audience}
//                   setupPrice={p.setupPrice}
//                   monthlyPrice={p.monthlyPrice}
//                   highlight={p.highlight}
//                   isCustom={p.isCustom}
//                   features={p.features}
//                   labels={{
//                     bestSeller: T.pricing.bestSeller,
//                     custom: T.pricing.custom,
//                     customNote: T.pricing.customNote,
//                     perMonth: T.pricing.perMonth,
//                     ctaDefault: T.pricing.ctaDefault,
//                     ctaCustom: T.pricing.ctaCustom,
//                   }}
//                 />
//               ))}
//             </div>
//             <p
//               style={{
//                 textAlign: "center",
//                 marginTop: 24,
//                 fontSize: 12,
//                 color: "rgba(240,245,251,0.35)",
//                 fontFamily: "'Poppins',sans-serif",
//               }}
//             >
//               {T.pricing.note}
//             </p>
//           </div>
//         </section> */}

//         {/* FAQ */}
//         <section id="faq" style={{ padding: "80px 5%", background: "#050e1c" }}>
//           <div style={{ maxWidth: 720, margin: "0 auto" }}>
//             <SectionHeading badge={T.faq.badge} title={T.faq.title} />
//             {T.faq.items.map((item, i) => (
//               <FAQItem key={item.q} delay={i * 80} q={item.q} a={item.a} />
//             ))}
//           </div>
//         </section>

//         {/* CTA BANNER */}
//         <section
//           style={{
//             padding: "70px 5%",
//             background: "linear-gradient(135deg,#073057,#0a4a8a)",
//             position: "relative",
//             overflow: "hidden",
//             textAlign: "center",
//           }}
//         >
//           <ParticleBg />
//           <div
//             style={{
//               maxWidth: 620,
//               margin: "0 auto",
//               position: "relative",
//               zIndex: 1,
//             }}
//           >
//             <div style={{ fontSize: 44, marginBottom: 14 }}>🚀</div>
//             <h2
//               style={{
//                 fontSize: "clamp(26px,4vw,44px)",
//                 fontWeight: 800,
//                 fontFamily: "'Poppins',sans-serif",
//                 color: "white",
//                 marginBottom: 14,
//                 lineHeight: 1.2,
//               }}
//             >
//               {T.cta.titleLine1}
//               <span
//                 style={{
//                   fontSize: "clamp(20px,3vw,35px)",
//                   fontWeight: 800,
//                   fontFamily: "'Poppins',sans-serif",
//                   color: "white",
//                   marginBottom: 14,
//                   lineHeight: 1.2,
//                 }}
//               >
//                 {T.cta.titleLine2Pre}{" "}
//                 <span
//                   style={{
//                     color: "#FF8C42",
//                   }}
//                 >
//                   {T.cta.titleHighlight}
//                 </span>{" "}
//                 {T.cta.titleLine2Post}
//               </span>
//             </h2>
//             <p
//               style={{
//                 fontSize: 15,
//                 color: "rgba(240,245,251,0.65)",
//                 marginBottom: 32,
//                 lineHeight: 1.7,
//                 fontFamily: "'Poppins',sans-serif",
//               }}
//             >
//               {T.cta.subtitle}
//             </p>
//             <div
//               style={{
//                 display: "flex",
//                 gap: 12,
//                 justifyContent: "center",
//                 flexWrap: "wrap",
//               }}
//             >
//               <button
//                 style={{
//                   padding: "14px 36px",
//                   fontSize: 15,
//                   fontWeight: 700,
//                   background: "#FF8C42",
//                   color: "white",
//                   border: "none",
//                   borderRadius: 12,
//                   cursor: "pointer",
//                   boxShadow: "0 6px 20px rgba(255,140,66,0.35)",
//                   fontFamily: "'Poppins',sans-serif",
//                 }}
//                 onClick={() => (window.location.href = "/login")}
//               >
//                 {T.cta.primaryBtn}
//               </button>
//               <button
//                 style={{
//                   padding: "14px 32px",
//                   fontSize: 15,
//                   fontWeight: 700,
//                   background: "transparent",
//                   color: "white",
//                   border: "2px solid rgba(240,245,251,0.3)",
//                   borderRadius: 12,
//                   cursor: "pointer",
//                   fontFamily: "'Poppins',sans-serif",
//                 }}
//               >
//                 {T.cta.secondaryBtn}
//               </button>
//             </div>
//             <p
//               style={{
//                 marginTop: 18,
//                 fontSize: 12,
//                 color: "rgba(240,245,251,0.4)",
//                 fontFamily: "'Poppins',sans-serif",
//               }}
//             >
//               {T.cta.note}
//             </p>
//           </div>
//         </section>



//          <footer
//       style={{
//         background: "#030810",
//         padding: "50px 5% 28px",
//         borderTop: "1px solid rgba(255,140,66,0.08)",
//       }}
//     >
//       <style>{`
//         @media(max-width:768px){
//           .footer-grid{grid-template-columns:1fr 1fr!important;}
//         }
//         @media(max-width:480px){
//           .footer-grid{grid-template-columns:1fr!important;}
//         }
//       `}</style>
 
//       <div style={{ maxWidth: 1100, margin: "0 auto" }}>
//         <div
//           className="footer-grid"
//           style={{
//             display: "grid",
//             gridTemplateColumns: "2fr 1fr 1fr 1fr",
//             gap: 40,
//             marginBottom: 40,
//           }}
//         >
//           <div>
//             <a
//               href="/"
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 8,
//                 padding: 8,
//                 textDecoration: "none",
//                 width: "fit-content",
//               }}
//             >
//               <div
//                 style={{
//                   width: 60,
//                   height: 60,
//                   borderRadius: "50%",
//                   background: "white",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   border: "2px solid #FF8C42",
//                 }}
//               >
//                 <img
//                   src={logo}
//                   alt="logo"
//                   style={{ width: "50px", height: "50px" }}
//                 />
//               </div>
 
//               <span
//                 style={{
//                   fontWeight: 800,
//                   fontSize: 19,
//                   fontFamily: "'Sora',sans-serif",
//                   color: "white",
//                 }}
//               >
//                 Review <span style={{ color: "#FF8C42" }}> Ninja</span> Pro
//               </span>
//             </a>
//             <p
//               style={{
//                 fontSize: 13,
//                 color: "rgba(240,245,251,0.4)",
//                 lineHeight: 1.8,
//                 maxWidth: 260,
//                 margin: "16px 0 0",
//                 fontFamily: "'Poppins',sans-serif",
//               }}
//             >
//               {T.footer.tagline}
//             </p>
//           </div>
 
//           {T.footer.columns.map((col) => (
//             <div key={col.heading}>
//               <h4
//                 style={{
//                   fontSize: 11,
//                   fontWeight: 700,
//                   color: "#FF8C42",
//                   letterSpacing: 2,
//                   textTransform: "uppercase",
//                   marginBottom: 14,
//                   fontFamily: "'Poppins',sans-serif",
//                 }}
//               >
//                 {col.heading}
//               </h4>
//               {col.links.map((l) => (
//                 <div key={l} style={{ marginBottom: 9 }}>
//                   <a
//                     href={FOOTER_LINK_HREFS[l] || "#"}
//                     style={{
//                       fontSize: 13,
//                       color: "rgba(240,245,251,0.45)",
//                       textDecoration: "none",
//                       fontFamily: "'Poppins',sans-serif",
//                     }}
//                   >
//                     {l}
//                   </a>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
 
//         <div
//           style={{
//             borderTop: "1px solid rgba(255,255,255,0.05)",
//             paddingTop: 20,
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             flexWrap: "wrap",
//             gap: 10,
//           }}
//         >
//           <p
//             style={{
//               fontSize: 12,
//               color: "rgba(240,245,251,0.25)",
//               fontFamily: "'Poppins',sans-serif",
//             }}
//           >
//             {T.footer.copyright}
//           </p>
//         </div>
//       </div>
//     </footer>



//       </div>
//     </>
//   );
// }









