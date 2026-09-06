// src/components/CountrySelectModal.jsx
import React from "react";
import { COUNTRIES } from "../i18n/countryConfig";
import { useLanguage } from "../context/LanguageContext";
import "./CountrySelectModal.css";

export default function CountrySelectModal() {
  const { needsCountrySelection, selectCountry } = useLanguage();

  // Agar country pehle se select ho chuki hai (localStorage me), to kuch mat dikhao
  if (!needsCountrySelection) return null;

  return (
    <div className="csm-overlay">
      <div className="csm-box">
        <h2 className="csm-title">Select Your Country</h2>
        <p className="csm-sub">Apna country chuno taaki hum aapko sahi language aur pricing dikha sakein</p>

        <div className="csm-grid">
          {COUNTRIES.map((c) => (
            <button
              key={c.code}
              className="csm-country-btn"
              onClick={() => selectCountry(c.code)}
            >
              <img
                className="csm-flag-img"
                src={`https://flagcdn.com/w80/${c.code.toLowerCase()}.png`}
                alt={c.name}
              />
              <span className="csm-name">{c.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}