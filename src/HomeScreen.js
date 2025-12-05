import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "./categories";
import { defaultImages } from "./defaultImages";

export default function HomeScreen() {
  const [images, setImages] = useState({});
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const adminPhone = "+916281803434";

  const sliderImages = [
    "/images/slide1.jpg",
    "/images/slide2.jpg",
    "/images/slide3.jpg",
    "/images/slide4.jpg"
  ];

  // Load stored images
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("images")) || {};
    setImages(stored);
  }, []);

  // Auto slider
  useEffect(() => {
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % sliderImages.length),
      3000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "black", color: "white" }}>

      {/* 🔹 TOP HEADER BAR */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          padding: "12px 40px",
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 100,
          boxSizing: "border-box",
          borderBottom: "1px solid #ddd",
        }}
      >

        {/* 🔹 LEFT: LOGO + TITLE */}
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <img
            src="/images/logo.jpg"
            alt="Logo"
            style={{ width: 90, objectFit: "contain" }}
          />

          <h1
            style={{
              fontSize: 48,
              fontFamily: "Georgia, serif",
              fontWeight: "600",
              margin: 0,
              color: "#1a0d0d",
              whiteSpace: "nowrap",
            }}
          >
            Livespace
          </h1>
        </div>

        {/* 🔹 RIGHT BUTTONS */}
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => navigate("/admin-login")} style={btnDark}>
            🛠 Admin
          </button>

          <button
            onClick={() => (window.location.href = `tel:${adminPhone}`)}
            style={btnPink}
          >
            📞 Call Admin
          </button>

          <button style={btnOutlined}>⬇ Download</button>
        </div>
      </div>

      {/* Header Spacing */}
      <div style={{ height: 110 }}></div>

      {/* 🔹 SLIDER SECTION */}
      <div style={{ width: "100%", position: "relative" }}>
        <img
          src={sliderImages[index]}
          alt="slider"
          style={{
            width: "100%",
            height: "550px",
            objectFit: "cover",
            filter: "brightness(0.45)",
          }}
        />

        {/* OVERLAY TEXT */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "20%",
            transform: "translateY(-50%)",
            textAlign: "left",
            maxWidth: "50%",
            color: "white",
          }}
        >
          <h2 style={{ fontSize: 60, margin: 0, fontWeight: 700, color: "gold" }}>
            Furniture Designers 
          </h2>

          <p style={{ fontSize: 24, marginTop: 20, lineHeight: "34px" }}>
            Home Furnitures guaranteed with our best Furniture designers in Our Shop.
          </p>
        </div>
      </div>

      {/* 🔹 CATEGORY GRID */}
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
              position: "relative"
            }}
            onClick={() => navigate(`/category/${encodeURIComponent(cat)}`)}
          >
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#FFD700" }}>
              {cat}
            </h3>

            {/* ALWAYS SHOW DEFAULT IMAGE */}
            <img
              src={defaultImages[cat]}
              alt="default"
              style={{
                width: "100%",
                height: 150,
                objectFit: "cover",
                borderRadius: 10,
                position: "relative",
                zIndex: 2
              }}
            />

            {/* SHOW USER UPLOADED IMAGE BEHIND (FADED) */}
            {images[cat]?.length > 0 && (
              <img
                src={images[cat][0]}
                alt="uploaded"
                style={{
                  width: "100%",
                  height: 150,
                  objectFit: "cover",
                  borderRadius: 10,
                  position: "absolute",
                  top: 40,
                  left: 0,
                  zIndex: 1,
                  opacity: 0.25,
                  filter: "blur(3px)"
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* 🔹 BUTTON STYLES */
const btnDark = {
  padding: "10px 20px",
  background: "#333",
  borderRadius: 25,
  color: "white",
  border: "1px solid #444",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};

const btnPink = {
  padding: "10px 20px",
  background: "#ff007a",
  borderRadius: 25,
  color: "white",
  border: "none",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};

const btnOutlined = {
  padding: "10px 20px",
  background: "white",
  borderRadius: 25,
  border: "2px solid #333",
  fontSize: 14,
  fontWeight: 600,
  color: "#111",
  cursor: "pointer",
};
