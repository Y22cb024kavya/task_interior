import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "./categories";

export default function HomeScreen() {
  const [images, setImages] = useState({});
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const adminPhone = "+919000000000";

  const sliderImages = [
    "/images/slide1.jpg",
    "/images/slide2.jpg",
    "/images/slide3.jpg",
    "/images/slide4.jpg"
    
  ];

  // Load uploaded images stored locally
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("images")) || {};
    setImages(stored);
  }, []);

  // Auto slideshow change
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "black", color: "white" }}>

      {/* 🔹 FIXED NAVBAR */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          padding: "15px 25px",
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 50,
          boxSizing: "border-box",
        }}
      >
        {/* Center Title */}
        <h1
          style={{
            fontSize: 34,
            fontWeight: 800,
            margin: 0,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Furniture Hub
        </h1>

        {/* Buttons Right Side */}
        <div style={{ display: "flex", gap: 12, marginLeft: "auto" }}>
          <button onClick={() => navigate("/admin-login")} style={btn}>🛠 Admin</button>

          <button
            onClick={() => (window.location.href = `tel:${adminPhone}`)}
            style={{ ...btn, background: "#ff007a" }}
          >
            📞 Call Admin
          </button>

          <button style={{ ...btn, background: "#777", whiteSpace: "nowrap" }}>
            ⬇ Download
          </button>
        </div>
      </div>

      {/* Space Below Fixed Header */}
      <div style={{ height: 90 }}></div>

      {/* 🔹 FULL WIDTH SLIDER + TEXT */}
      <div style={{ width: "100%", marginTop: 20, position: "relative" }}>
        <img
          src={sliderImages[index]}
          alt="slider"
          style={{
            width: "100%",
            height: "500px",
            objectFit: "cover",
            filter: "brightness(0.45)",
          }}
        />

        {/* Overlay Text */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            width: "80%",
            color: "white",
            fontWeight: 700,
          }}
        >
          <h1 style={{ fontSize: "50px", margin: 0 }}>Interior Designers in</h1>

          <h1 style={{ fontSize: "55px", margin: 0, color: "gold" }}>
            Hyderabad
          </h1>

          <p style={{ fontSize: "22px", marginTop: "20px", lineHeight: "32px" }}>
            Hassle-free home interiors guaranteed with our best interior
            designers in Hyderabad
          </p>
        </div>
      </div>

      {/* 🔹 SEARCH BAR */}
      <div style={{ textAlign: "center", marginTop: 25 }}>
        <input
          type="text"
          placeholder="Search images..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "80%",
            padding: 12,
            background: "#222",
            border: "1px solid #444",
            borderRadius: 10,
            color: "white",
            fontSize: 18,
          }}
        />
      </div>

      {/* 🔹 CATEGORY BOXES */}
      <div
        style={{
          marginTop: 40,
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          justifyContent: "center",
          paddingBottom: 80,
        }}
      >
        {categories.map((cat) => (
          <div
            key={cat}
            style={{
              width: 220,
              background: "#111",
              borderRadius: 14,
              padding: 10,
              cursor: "pointer",
              boxShadow: "0 0 12px rgba(255,255,255,0.2)",
            }}
            onClick={() => navigate(`/category/${encodeURIComponent(cat)}`)}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#FFD700" }}>
              {cat}
            </h3>

            {images[cat]?.length ? (
              <img
                src={images[cat][0]}
                alt={cat}
                style={{
                  width: "100%",
                  height: 150,
                  objectFit: "cover",
                  borderRadius: 10,
                }}
              />
            ) : (
              <div
                style={{
                  height: 150,
                  borderRadius: 10,
                  background: "#222",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#777",
                }}
              >
                No images yet
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const btn = {
  padding: "10px 20px",
  backgroundColor: "#333",
  borderRadius: 25,
  color: "white",
  border: "1px solid #555",
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
};
