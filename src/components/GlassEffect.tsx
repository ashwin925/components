import React, { useEffect, useState } from "react";
import "./GlassEffect.css";
import rect1 from "../images/rect1.webp";
import rect2 from "../images/rect2.webp";
import rect3 from "../images/rect3.webp";

const images = [rect1, rect2, rect3];

const GlassEffect = () => {
  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [shockwave, setShockwave] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Trigger the banging effect
      setScale(1.15); 
      setShockwave(true); // Activate shockwave

      setTimeout(() => {
        setScale(1);
        setShockwave(false); // Hide shockwave after effect
        setIndex((prevIndex) => (prevIndex + 1) % images.length); 
      }, 150); 

    }, 1500); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-container">
      {/* Shockwave Effect */}
      <div className={`shockwave ${shockwave ? "active" : ""}`} />
      
      {/* Glass Image */}
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
