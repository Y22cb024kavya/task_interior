import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const checkLogin = () => {
    if (password === "9756") {
      navigate("/admin");
    } else {
      alert("Incorrect Password!");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        backgroundColor: "black",               // 🔥 removes white space
        backgroundImage: `url("/images/login-chair.jpg")`, // 🔥 use background instead of img
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",              // 🔥 maintain original proportions
        backgroundPosition: "center",
      }}
    >
      {/* LOGIN BOX */}
      <div
        style={{
          width: "350px",
          padding: "30px",
          background: "rgba(0,0,0,0.65)",
          borderRadius: "15px",
          textAlign: "center",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <h1 style={{ marginBottom: 25, color: "#FFD700" }}>Go To Admin Page</h1>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "12px",
            width: "100%",
            background: "#111",
            border: "1px solid #444",
            borderRadius: "10px",
            color: "white",
            outline: "none",
            fontSize: "16px",
            marginBottom: "20px",
          }}
        />

        <button
          onClick={checkLogin}
          style={{
            width: "100%",
            padding: "12px",
            background: "linear-gradient(90deg, #FFD700, #FF8C00)",
            border: "none",
            borderRadius: "10px",
            color: "black",
            fontWeight: "700",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
