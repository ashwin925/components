import React, { useEffect, useState } from "react";
import "./GlassEffect.css";
import rect1 from "../images/rect1.webp";
import rect2 from "../images/rect2.webp";

const images = [rect1, rect2];

const GlassEffect = () => {
  const [index, setIndex] = useState(0);
  const [isBanging, setIsBanging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBanging(true); // Start the effect

      setTimeout(() => {
        setIsBanging(false); // End the effect
        setIndex((prevIndex) => (prevIndex + 1) % images.length); // Change image
      }, 150); // Bang effect happens quickly

    }, 1500); // Repeat every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`glass-container ${isBanging ? "bang" : ""}`}>
      {/* Shockwave Effect */}
      <div className={`shockwave ${isBanging ? "active" : ""}`} />

      {/* Glass Image */}
      <img src={images[index]} alt="Glass Effect" className="glass-image" />
    </div>
  );
};

export default GlassEffect;
