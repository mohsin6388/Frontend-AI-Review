// src/i18n/countryConfig.js
// Yahan aap country list, currency, aur language mapping control karoge.
// Naya country add karna ho to bas yahan ek object add karo — kahi aur kuch nahi.

export const COUNTRIES = [
  {
    code: "IN",           // ISO country code
    name: "India",
    flag: "🇮🇳",
    lang: "hi",          // is country ke liye default language (hi = Hinglish)
    currencySymbol: "₹",
    currencyCode: "INR",
  },
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    lang: "en",
    currencySymbol: "$",
    currencyCode: "USD",
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    lang: "en",
    currencySymbol: "£",
    currencyCode: "GBP",
  },
  {
    code: "AE",
    name: "UAE",
    flag: "🇦🇪",
    lang: "en",
    currencySymbol: "AED",
    currencyCode: "AED",
  },
];

// Default agar kabhi country na mile (fallback)
export const DEFAULT_COUNTRY = "IN";

// Helper: country code se poora country object nikaalne ke liye
export function getCountryByCode(code) {
  return COUNTRIES.find((c) => c.code === code) || COUNTRIES.find((c) => c.code === DEFAULT_COUNTRY);
}