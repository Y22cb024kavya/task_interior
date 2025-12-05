import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CategoryScreen() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const adminPhone = "+919000000000"; // change to real number

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("images")) || {};
    const decoded = decodeURIComponent(categoryName || "");
    setImages(stored[decoded] || []);
  }, [categoryName]);

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
      link.download = `${decodeURIComponent(categoryName)}.jpg`;
      link.click();
    });
  };

  const filtered = images.filter((img) =>
    img.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "black",
        color: "white",
        padding: 20,
        position: "relative",
      }}
    >
      {/* TOP BAR RIGHT */}
      <div
        style={{
          position: "fixed",
          top: 15,
          right: 20,
          display: "flex",
          gap: 12,
          zIndex: 10,
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={btnTop}
        >
          ⬅ Home
        </button>

        <button
          onClick={() => navigate("/admin-login")}
          style={btnTop}
        >
          🛠 Admin
        </button>

        <button
          onClick={() => (window.location.href = `tel:${adminPhone}`)}
          style={{ ...btnTop, backgroundColor: "#ff007a" }}
        >
          📞 Call Admin
        </button>

        <button
          onClick={downloadSelected}
          disabled={selectedImages.length === 0}
          style={{
            ...btnTop,
            backgroundColor: selectedImages.length === 0 ? "#666" : "#00c853",
          }}
        >
          ⬇ Download Selected
        </button>
      </div>

      {/* TITLE */}
      <h1
        style={{
          textAlign: "center",
          marginTop: 70,
          fontSize: 30,
          fontWeight: 700,
        }}
      >
        {decodeURIComponent(categoryName || "")}
      </h1>

      {/* SEARCH */}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <input
          type="text"
          placeholder="Search in this category..."
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
      <div
        style={{
          marginTop: 40,
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        {filtered.length === 0 && (
          <p style={{ color: "#888" }}>No images found.</p>
        )}

        {filtered.map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            width={220}
            onClick={() => toggleSelect(img)}
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
  );
}

const btnTop = {
  padding: "9px 16px",
  backgroundColor: "#333",
  borderRadius: 20,
  color: "white",
  border: "1px solid #555",
  fontSize: 14,
  cursor: "pointer",
  fontWeight: 600,
};
