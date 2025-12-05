import React, { useState, useEffect } from "react";

const images = [
  "/images/slide1.jpg",
  "/images/slide4.jpg",
  "/images/slide2.jpg",
  "/images/slide3.jpg",
];

export default function Slider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "500px",
        marginLeft: "calc(50% - 50vw)", // Removes side padding
        marginTop: "40px",
        overflow: "hidden",
      }}
    >
      <img
        src={images[index]}
        alt="slide"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}
