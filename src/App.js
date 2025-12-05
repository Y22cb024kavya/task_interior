import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./HomeScreen";
import CategoryScreen from "./CategoryScreen";
import AdminLogin from "./AdminLogin";
import AdminScreen from "./AdminScreen";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Start directly at Home */}
        <Route path="/" element={<HomeScreen />} />
        {/* Category page (eg: /category/Chairs) */}
        <Route path="/category/:categoryName" element={<CategoryScreen />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminScreen />} />
      </Routes>
    </Router>
  );
}
