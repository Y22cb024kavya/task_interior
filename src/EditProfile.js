import React from "react";
import "./EditProfile.css";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">Select Profile</h1>

      <div className="profile-row">

        <div className="profile" onClick={() => navigate("/admin-login")}>
          <div className="profile-icon admin-gradient">
            <span style={{ fontSize: "50px", fontWeight: "800", color: "black" }}>A</span>
          </div>
          <p className="label">Admin</p>
        </div>

        <div className="profile" onClick={() => navigate("/viewer")}>
          <div className="profile-icon viewer-gradient">
            <span style={{ fontSize: "50px", fontWeight: "800", color: "black" }}>V</span>
          </div>
          <p className="label">Viewer</p>
        </div>

      </div>
    </div>
  );
}
