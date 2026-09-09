// src/context/LanguageContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { COUNTRIES, DEFAULT_COUNTRY, getCountryByCode } from "../i18n/countryConfig";

const LanguageContext = createContext(null);

const LANG_KEY = "rnp_lang";       // 'en' | 'hi'
const COUNTRY_KEY = "rnp_country"; // 'IN' | 'US' | 'GB' | 'AE' ...

export function LanguageProvider({ children }) {
  // Country: agar localStorage me pehle se saved hai to wahi, warna null
  // (null ka matlab -> abhi tak user ne select nahi kiya, popup dikhana hoga)
  const [country, setCountryState] = useState(() => {
    try {
      const saved = localStorage.getItem(COUNTRY_KEY);
      return saved && COUNTRIES.some((c) => c.code === saved) ? saved : null;
    } catch {
      return null;
    }
  });

  // Lang: agar country pehle se saved hai to uski default lang lo,
  // warna localStorage me jo bhi lang save thi wahi, warna 'en'
  const [lang, setLang] = useState(() => {
    try {
      const savedLang = localStorage.getItem(LANG_KEY);
      if (savedLang === "en" || savedLang === "hi") return savedLang;
      return "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {}
  }, [lang]);

  useEffect(() => {
    try {
      if (country) localStorage.setItem(COUNTRY_KEY, country);
    } catch {}
  }, [country]);

  const toggleLang = () => setLang((l) => (l === "en" ? "hi" : "en"));

  // Yeh function popup se call hoga jab user country select karega
  const selectCountry = (code) => {
    setCountryState(code);
    const info = getCountryByCode(code);
    if (info) setLang(info.lang); // country ke hisaab se language auto set
  };

  const currentCountryInfo = getCountryByCode(country || DEFAULT_COUNTRY);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        country,              // 'IN' | 'US' | ... ya null (agar select nahi hua)
        selectCountry,        // popup isko call karega
        countryInfo: currentCountryInfo, // { code, name, flag, currencySymbol, ... }
        needsCountrySelection: country === null, // popup dikhana hai ya nahi
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// Returns { lang, toggleLang, setLang, country, selectCountry, countryInfo, T }
export function useLanguage(translations) {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  const T = translations ? translations[ctx.lang] : undefined;
  return { ...ctx, T };
}
