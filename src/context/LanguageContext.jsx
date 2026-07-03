import React, { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

const STORAGE_KEY = "rnp_lang"; // 'en' | 'hi' (hi = Hinglish here)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === "en" || saved === "hi" ? saved : "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore (private browsing etc.)
    }
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === "en" ? "hi" : "en"));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Returns { lang, toggleLang, setLang, T } where T is the full content
// object for the current language, pulled from the given translations map.
export function useLanguage(translations) {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  const T = translations ? translations[ctx.lang] : undefined;
  return { ...ctx, T };
}
