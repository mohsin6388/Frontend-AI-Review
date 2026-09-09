import { useState, useRef } from "react";

// 👉 Apni API key yaha daalo (ya .env file se import karo: process.env.REACT_APP_GOOGLE_API_KEY)
const GOOGLE_API_KEY = "AIzaSyCkfg_wSqIcGnOEMuW3sg7x8_IcaGnL8Q8";

export default function BusinessPlaceSearch({ onPlaceSelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  // User type karte waqt suggestions fetch karo (debounced)
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout(() => fetchSuggestions(value), 300);
  };

  const fetchSuggestions = async (input) => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://places.googleapis.com/v1/places:autocomplete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": GOOGLE_API_KEY,
          },
          body: JSON.stringify({
            input,
            includedPrimaryTypes: ["establishment"], // sirf businesses dikhane ke liye
          }),
        }
      );
      const data = await res.json();
      setSuggestions(data.suggestions || []);
    } catch (err) {
      console.error("Autocomplete error:", err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Jab user dropdown se business select kare
  const handleSelect = async (prediction) => {
    const placeId = prediction.placePrediction.placeId;
    const placeName = prediction.placePrediction.text.text;

    setQuery(placeName);
    setSuggestions([]);

    // Optional: place ka full detail bhi fetch kar lo (address, lat-lng, phone etc.)
    try {
      const res = await fetch(
        `https://places.googleapis.com/v1/places/${placeId}`,
        {
          headers: {
            "X-Goog-Api-Key": GOOGLE_API_KEY,
            "X-Goog-FieldMask":
              "id,displayName,formattedAddress,location,internationalPhoneNumber",
          },
        }
      );
      const details = await res.json();

      // Parent component ko place_id + details bhejo (yaha se DB me save kar sakte ho)
      onPlaceSelect({
        placeId,
        name: details.displayName?.text,
        address: details.formattedAddress,
        location: details.location, // { latitude, longitude }
        phone: details.internationalPhoneNumber,
      });
    } catch (err) {
      console.error("Place details error:", err);
      // Agar details fail ho jaye, tab bhi place_id to mil hi gaya hai
      onPlaceSelect({ placeId, name: placeName });
    }
  };

  return (
    <div style={{ position: "relative", maxWidth: 400 }}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search your Business"
        style={{
         width: "100%",
         padding: "10px 12px",
         fontSize: 14,
         border: "1px solid #ccc",
         borderRadius: 14,
         color: "#000",
         backgroundColor: "#fff",
        }}
      />

      {loading && (
        <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
         Searching......
        </div>
      )}

      {suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            border: "4px solid #ddd",
            borderRadius: 6,
            marginTop: 4,
            listStyle: "none",
            padding: 0,
            zIndex: 10,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            color: "#000",
          }}
        >
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(s)}
              style={{
                padding: "10px 12px",
                cursor: "pointer",
                fontSize: 14,
                borderBottom:
                  idx !== suggestions.length - 1 ? "1px solid #eee" : "none",
              }}
              onMouseDown={(e) => e.preventDefault()} // input blur na ho click se pehle
            >
              {s.placePrediction.text.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}