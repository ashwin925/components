import React, { useEffect, useState } from "react";
import "./GlassEffect.css";
import rect1 from "../images/rect1.webp";
import rect2 from "../images/rect2.webp";
import rect3 from "../images/rect3.webp";
import rect4 from "../images/rect4.webp";


const images = [rect1, rect3, rect4,rect2];

const GlassEffect = () => {
  const [index, setIndex] = useState(0);
  const [isBanging, setIsBanging] = useState(false);
  const [width, setWidth] = useState(220);
  const [height, setHeight] = useState(420);
  const [isRunning, setIsRunning] = useState(true); // Control animation

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setIsBanging(true);

      setTimeout(() => {
        setIsBanging(false);
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 150);
    }, 1500);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className={`page-container ${isBanging ? "jitter" : ""}`}>
      <div
        className={`glass-container ${isBanging ? "bang" : ""}`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transition: "width 0.3s ease-out, height 0.3s ease-out", // Smooth resizing
        }}
      >
        <div className={`shockwave ${isBanging ? "active" : ""}`} />
        <img src={images[index]} alt="Glass Effect" className="glass-image" />
      </div>

      {/* Sliders & Stop/Start Button */}
      <div className="slider-container">
        <div className="slider">
          <label>Width</label>
          <input
            type="range"
            min="100"
            max="600"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
          <span>{width}px</span>
        </div>
        <div className="slider">
          <label>Height</label>
          <input
            type="range"
            min="200"
            max="800"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
          <span>{height}px</span>
        </div>
        <button className="toggle-btn" onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default GlassEffect;
