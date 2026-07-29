import logo from "../assets/review-booster-logo2.png";
import { useLanguage } from "../context/LanguageContext";
import homeContent from "../i18n/homeContent";


const FOOTER_LINK_HREFS = {
  Features: "/#features",
  "How It Works": "/#how-it-works",
  Pricing: "/#pricing",
  "Privacy Policy": "/privacy-policy",
  "Terms & Condition": "/terms-and-condition",
  "About Us": "/about-us",
  "Contact": "/contact-us",
  "Refund Policy": "/refund-policy",
};

export default function Footer() {
  const { T } = useLanguage(homeContent);

  return (
    <footer
      style={{
        background: "#030810",
        padding: "50px 5% 28px",
        borderTop: "1px solid rgba(255,140,66,0.08)",
      }}
    >
      <style>{`
        @media(max-width:768px){
          .footer-grid{grid-template-columns:1fr 1fr!important;}
        }
        @media(max-width:480px){
          .footer-grid{grid-template-columns:1fr!important;}
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 40,
            marginBottom: 40,
          }}
        >
          <div>
            <a
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: 8,
                textDecoration: "none",
                width: "fit-content",
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #FF8C42",
                }}
              >
                <img
                  src={logo}
                  alt="logo"
                  style={{ width: "50px", height: "50px" }}
                />
              </div>

              <span
                style={{
                  fontWeight: 800,
                  fontSize: 19,
                  fontFamily: "'Sora',sans-serif",
                  color: "white",
                }}
              >
                Review <span style={{ color: "#FF8C42" }}> Ninja</span> Pro
              </span>
            </a>
            <p
              style={{
                fontSize: 13,
                color: "rgba(240,245,251,0.4)",
                lineHeight: 1.8,
                maxWidth: 260,
                margin: "16px 0 0",
                fontFamily: "'Poppins',sans-serif",
              }}
            >
              {T.footer.tagline}
            </p>
          </div>

          {T.footer.columns.map((col) => (
            <div key={col.heading}>
              <h4
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#FF8C42",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  marginBottom: 14,
                  fontFamily: "'Poppins',sans-serif",
                }}
              >
                {col.heading}
              </h4>
              {col.links.map((l) => (
                <div key={l} style={{ marginBottom: 9 }}>
                  <a
                     href={FOOTER_LINK_HREFS[l] || "#"}
                    style={{
                      fontSize: 13,
                      color: "rgba(240,245,251,0.45)",
                      textDecoration: "none",
                      fontFamily: "'Poppins',sans-serif",
                    }}
                  >
                    {l}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: "rgba(240,245,251,0.25)",
              fontFamily: "'Poppins',sans-serif",
            }}
          >
            {T.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}