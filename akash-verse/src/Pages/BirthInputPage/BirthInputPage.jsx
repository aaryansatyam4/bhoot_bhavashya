import React, { useEffect, useState, useRef } from "react";
import "./solar.css";

const BirthInputPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    tob: "",
    pob: "",
    country: "",
    lat: "",
    lng: ""
  });

  const [citiesData, setCitiesData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    fetch('/city_Data.json')
      .then(response => response.json())
      .then(data => setCitiesData(data))
      .catch(err => console.error("Error loading cities.json", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "pob") {
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        const filtered = citiesData.filter(city =>
          city.city.toLowerCase().startsWith(value.toLowerCase())
        ).slice(0, 5);

        setSuggestions(filtered);
        setActiveSuggestion(0);
        setShowSuggestions(true);
      }, 200);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSuggestionClick = (city) => {
    setFormData({
      ...formData,
      pob: city.city,
      country: city.country,
      lat: city.lat,
      lng: city.lng
    });
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      setActiveSuggestion((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      setActiveSuggestion((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      if (suggestions[activeSuggestion]) {
        handleSuggestionClick(suggestions[activeSuggestion]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Form submitted! (Check console for data)");
  };

  return (
    <div className="solar-syst" style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(0,0,0,0.85)",
        padding: "30px",
        borderRadius: "15px",
        color: "#eee",
        zIndex: 10,
        backdropFilter: "blur(10px)",
        boxShadow: "0 0 25px rgba(255,0,255,0.3)"
      }}>
        <h2 style={{ marginBottom: "20px", fontFamily: "'Playfair Display', serif" }}>Enter Birth Details</h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", width: "320px" }}>
          <input type="text" name="name" placeholder="Your Name..." value={formData.name} onChange={handleChange} style={inputStyle} />

          <select name="gender" value={formData.gender} onChange={handleChange} style={{ ...inputStyle, ...selectStyle }}>
            <option value="">Select Gender...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input type="date" name="dob" value={formData.dob} onChange={handleChange} style={inputStyle} />

          <input type="time" name="tob" value={formData.tob} onChange={handleChange} style={inputStyle} />

          <div style={{ position: "relative" }}>
            <input
              type="text"
              name="pob"
              placeholder="Place of Birth..."
              value={formData.pob}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              style={inputStyle}
            />
            {showSuggestions && suggestions.length > 0 && (
              <div style={{
                position: "absolute",
                background: "#111",
                width: "100%",
                borderRadius: "5px",
                zIndex: 100,
                marginTop: "5px",
                maxHeight: "150px",
                overflowY: "auto",
                boxShadow: "0 0 8px rgba(255,0,255,0.4)"
              }}>
                {suggestions.map((city, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSuggestionClick(city)}
                    style={{
                      padding: "8px",
                      cursor: "pointer",
                      background: idx === activeSuggestion ? "#333" : "transparent",
                      color: "#ccc"
                    }}
                  >
                    {city.city}, {city.country}
                  </div>
                ))}
              </div>
            )}
          </div>

          {formData.lat && (
            <div style={{ fontSize: "0.9rem", marginTop: "5px", color: "#aaa" }}>
              <p>Country: {formData.country}</p>
              <p>Latitude: {formData.lat}</p>
              <p>Longitude: {formData.lng}</p>
            </div>
          )}

          <button type="submit" style={buttonStyle}>Submit</button>
        </form>
      </div>
    </div>
  );
};

// Input Style
const inputStyle = {
  padding: "12px",
  borderRadius: "7px",
  border: "1px solid #8a2be2",
  background: "#111",
  color: "#eee",
  width: "100%",
  fontFamily: "'Playfair Display', serif",
  outline: "none",
  transition: "0.3s",
  height: "45px",
  boxShadow: "0 0 5px rgba(255,0,255,0.3)",
  boxSizing: "border-box",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none"
};

// Select Arrow Style
const selectStyle = {
  backgroundImage: "url(\"data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 10px center",
  backgroundSize: "16px",
  paddingRight: "30px"
};

// Submit Button Style
const buttonStyle = {
  padding: "12px",
  background: "linear-gradient(45deg, #8a2be2, #ff00ff)",
  color: "#fff",
  border: "none",
  borderRadius: "7px",
  cursor: "pointer",
  fontFamily: "'Playfair Display', serif",
  fontSize: "1rem",
  transition: "0.3s",
  boxShadow: "0 0 8px rgba(255,0,255,0.4)"
};

export default BirthInputPage;
