import React, { useState, useEffect } from "react";
import { categories } from "./categories";

export default function AdminScreen() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [images, setImages] = useState({});

  // Load stored images on start
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("images")) || {};
    setImages(stored);
  }, []);

  // Handle Upload
  const handleUpload = (e) => {
    if (!selectedCategory) {
      alert("Please select a category first!");
      return;
    }

    const file = URL.createObjectURL(e.target.files[0]);

    const updated = {
      ...images,
      [selectedCategory]: [...(images[selectedCategory] || []), file],
    };

    setImages(updated);
    localStorage.setItem("images", JSON.stringify(updated));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        padding: "20px",
      }}
    >
      {/* 🔥 TITLE AT TOP */}
      <h1
        style={{
          textAlign: "center",
          fontSize: "32px",
          fontWeight: 700,
          marginTop: 10,
          marginBottom: 40,
        }}
      >
        Admin Screen
      </h1>

      {/* 🔥 CONTROL BAR BELOW TITLE */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginBottom: "40px",
        }}
      >
        {/* CATEGORY DROPDOWN */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: 10,
            background: "#222",
            border: "1px solid #444",
            color: "white",
            borderRadius: 8,
          }}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* FILE UPLOAD */}
        <input
          type="file"
          onChange={handleUpload}
          style={{
            padding: 8,
            background: "#333",
            borderRadius: 8,
          }}
        />

        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Search images..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: 12,
            width: "50%",
            background: "#222",
            border: "1px solid #444",
            borderRadius: 8,
            color: "white",
            fontSize: 16,
          }}
        />
      </div>

      {/* 🔥 IMAGE DISPLAY SECTION */}
      <div>
        {Object.keys(images).map((cat) => (
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

            <div
              style={{
                display: "flex",
                gap: 20,
                flexWrap: "wrap",
              }}
            >
              {images[cat]
                .filter((img) => img.toLowerCase().includes(search.toLowerCase()))
                .map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    width={200}
                    alt=""
                    style={{
                      borderRadius: 10,
                      boxShadow: "0 0 10px rgba(255,255,255,0.3)",
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
