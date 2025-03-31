import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./solar.css";

const BirthInputPage = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

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

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/voronoi.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
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

  const handleShowPast = async () => {
    if (!formData.name || !formData.dob || !formData.tob || !formData.lat || !formData.lng) {
      alert("Please fill all required details properly.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/generate-past", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      navigate("/past", { state: { ...data } });

    } catch (error) {
      alert("Backend Error: Please check server is running");
      console.error(error);
    }
  };

  return (
    <div className="solar-syst" style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}></canvas>

      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(0,0,0,0.85)",
        padding: "30px",
        borderRadius: "15px",
        color: "#eee",
        zIndex: 1,
        backdropFilter: "blur(10px)",
        boxShadow: "0 0 25px rgba(255,0,255,0.3)"
      }}>
        <h2 style={{ marginBottom: "20px", fontFamily: "'Playfair Display', serif" }}>Enter Birth Details</h2>

        <form style={{ display: "flex", flexDirection: "column", gap: "15px", width: "320px" }}>
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

          <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
            <button type="button" onClick={handleShowPast} style={{ ...buttonStyle, flex: 1 }}>
              Show Past
            </button>
            <button type="button" style={{ ...buttonStyle, flex: 1 }}>
              Show Future
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid rgba(255, 0, 255, 0.5)",
  background: "rgba(17, 17, 17, 0.8)",
  color: "#eee",
  width: "100%",
  fontFamily: "'Playfair Display', serif",
  outline: "none",
  transition: "all 0.3s ease",
  height: "50px",
  boxShadow: "0 0 10px rgba(255,0,255,0.15)",
  boxSizing: "border-box",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none"
};

const selectStyle = {
  backgroundImage: "url(\"data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  backgroundSize: "16px",
  paddingRight: "35px",
  cursor: "pointer"
};

const buttonStyle = {
  padding: "14px",
  background: "linear-gradient(45deg, #8a2be2, #ff00ff)",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontFamily: "'Playfair Display', serif",
  fontSize: "1rem",
  transition: "all 0.3s ease",
  boxShadow: "0 0 15px rgba(255,0,255,0.5)",
  letterSpacing: "0.5px"
};


export default BirthInputPage;
