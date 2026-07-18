import { useState } from "react";
import logo from "../assets/review-booster-logo2.png";
import { useLanguage } from "../context/LanguageContext";
import homeContent from "../i18n/homeContent";

// Small pill button that switches between English and Hinglish.
function LangToggle({ lang, toggleLang, small = false }) {
  return (
    <button
      onClick={toggleLang}
      aria-label="Toggle language"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        background: "rgba(255,140,66,0.1)",
        border: "1px solid rgba(255,140,66,0.35)",
        borderRadius: 20,
        padding: small ? "6px 10px" : "7px 14px",
        color: "#FF8C42",
        fontSize: small ? 11 : 12,
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "'Poppins',sans-serif",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      🌐 {lang === "en" ? "Hinglish" : "English"}
    </button>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang, T } = useLanguage(homeContent);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');

        .navbar-btn-primary{
          background:linear-gradient(135deg,#FF8C42,#e8722e);
          border:none;border-radius:12px;color:white;font-weight:700;
          cursor:pointer;font-family:'Poppins',sans-serif;transition:all .25s;
          box-shadow:0 6px 20px rgba(255,140,66,0.3);
        }
        .navbar-btn-primary:hover{
          transform:translateY(-2px);
          box-shadow:0 12px 30px rgba(255,140,66,0.45);
        }

        @media(max-width:768px){
          .nav-links{display:none!important;}
          .nav-btns{display:none!important;}
          .hamburger{display:flex!important;}
        }

        .mobile-menu{
          display:none;position:fixed;top:80px;left:0;right:0;
          background:rgba(5,14,28,0.97);backdrop-filter:blur(20px);
          padding:20px 5%;flex-direction:column;gap:4px;z-index:99;
          border-bottom:1px solid rgba(255,140,66,0.1);
        }
        .mobile-menu.open{display:flex;}
        .mobile-menu a{
          padding:12px 0;color:rgba(240,245,251,0.8);text-decoration:none;
          font-size:15px;font-weight:600;font-family:'Poppins',sans-serif;
          border-bottom:1px solid rgba(255,255,255,0.05);
        }
        .hamburger{
          display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px;
        }
        .hamburger span{
          width:22px;height:2px;background:white;border-radius:2px;transition:all .3s;
        }
      `}</style>

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0px 5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 80,
          background: "rgba(5,14,28,0.97)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,140,66,0.1)",
        }}
      >
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
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

        <div
          className="nav-links"
          style={{ display: "flex", gap: 28, alignItems: "center" }}
        >
          {T.nav.links.map((l) => (
            <a
              key={l}
              href={`/#${l.toLowerCase().replace(/\s/g, "-")}`}
              style={{
                color: "rgba(240,245,251,0.65)",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "'Poppins',sans-serif",
              }}
            >
              {l}
            </a>
          ))}
        </div>

        <div
          className="nav-right"
          style={{ display: "flex", gap: 10, alignItems: "center" }}
        >
          <LangToggle lang={lang} toggleLang={toggleLang} small />
          <div className="nav-btns" style={{ display: "flex", gap: 10 }}>
            <button
              className="navbar-btn-primary"
              style={{ padding: "0px 12px", fontSize: 13 }}
              onClick={() => (window.location.href = "/login")}
            >
              {T.nav.cta}
            </button>
          </div>
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span
              style={{
                transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none",
              }}
            />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span
              style={{
                transform: menuOpen
                  ? "rotate(-45deg) translateY(-7px)"
                  : "none",
              }}
            />
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {T.nav.links.map((l) => (
          <a
            key={l}
            href={`/#${l.toLowerCase().replace(/\s/g, "-")}`}
            onClick={() => setMenuOpen(false)}
          >
            {l}
          </a>
        ))}
        <button
          className="navbar-btn-primary"
          style={{
            padding: "12px",
            fontSize: 14,
            marginTop: 8,
            borderRadius: 10,
          }}
          onClick={() => (window.location.href = "/login")}
        >
          {T.nav.cta}
        </button>
      </div>
    </>
  );
}