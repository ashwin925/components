import React, { useEffect, useState } from "react";
import "./GlassEffect.css";
import rect1 from "../images/rect1.webp";
import rect2 from "../images/rect2.webp";

const images = [rect1, rect2];

const GlassEffect = () => {
  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      // Quick bang effect
      setScale(1.15); // Sudden expansion like a forceful hit

      setTimeout(() => {
        setScale(1); // Instantly snaps back to normal
        setIndex((prevIndex) => (prevIndex + 1) % images.length); // Change the image after the hit
      }, 150); // Quick deformation duration

    }, 1500); // Repeat every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-container">
      <img
        src={images[index]}
        alt="Glass Effect"
        className="glass-image"
        style={{ transform: `scale(${scale})` }}
      />
    </div>
  );
};

export default GlassEffect;
