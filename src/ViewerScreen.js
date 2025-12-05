import React, { useState, useEffect } from "react";
import { categories } from "./categories";

export default function ViewerScreen() {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("images")) || {};
    setImages(stored);
  }, []);

  const toggleSelect = (img) => {
    setSelectedImages((prev) =>
      prev.includes(img)
        ? prev.filter((i) => i !== img)
        : [...prev, img]
    );
  };

  const downloadSelected = () => {
    if (selectedImages.length === 0) {
      alert("No images selected!");
      return;
    }

    selectedImages.forEach((img) => {
      const link = document.createElement("a");
      link.href = img;
      link.download = "furniture-image.jpg";
      link.click();
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 20,
        color: "white",
        backgroundColor: "black",   // 🔥 Removed background image and made BLACK
      }}
    >
      {/* 🔥 ACTION BUTTONS */}
      <div
        style={{
          position: "fixed",
          top: 15,
          right: 20,
          display: "flex",
          gap: 15,
          zIndex: 10,
        }}
      >
        <button
          onClick={() => window.location.href = "tel:+919000000000"}
          style={{
            padding: "10px 20px",
            background: "#ff007a",
            borderRadius: 20,
            color: "white",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          📞 Call Admin
        </button>

        <button
          onClick={downloadSelected}
          disabled={selectedImages.length === 0}
          style={{
            padding: "10px 20px",
            background: selectedImages.length === 0 ? "#666" : "#00c853",
            borderRadius: 20,
            color: "white",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ⬇ Download Selected
        </button>
      </div>

      {/* TITLE */}
      <h1
        style={{
          textAlign: "center",
          marginTop: 80,
          fontSize: "32px",
          fontWeight: 700,
          color: "white",
        }}
      >
        Furniture Hub
      </h1>

      {/* SEARCH BAR */}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <input
          type="text"
          placeholder="Search images..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: 12,
            width: "70%",
            background: "#222",
            border: "1px solid #444",
            borderRadius: 8,
            color: "white",
            fontSize: 16,
          }}
        />
      </div>

      {/* IMAGES */}
      <div style={{ marginTop: 40 }}>
        {categories.map((cat) => (
          <div key={cat} style={{ marginTop: 40 }}>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#FFD700",
                marginBottom: 20,
              }}
            >
              {cat}
            </h2>

            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {(images[cat] || [])
                .filter((img) =>
                  img.toLowerCase().includes(search.toLowerCase())
                )
                .map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    width={220}
                    onClick={() => toggleSelect(img)}
                    alt=""
                    style={{
                      borderRadius: 12,
                      cursor: "pointer",
                      border: selectedImages.includes(img)
                        ? "4px solid #ff007a"
                        : "4px solid transparent",
                      boxShadow: "0 0 10px rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
