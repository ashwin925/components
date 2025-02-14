import React, { useEffect, useState } from "react";
import "./GlassEffect.css";
import rect1 from "../images/rect1.webp";
import rect2 from "../images/rect2.webp";

const images = [rect1, rect2];

const GlassEffect = () => {
  const [index, setIndex] = useState(0);
  const [isBanging, setIsBanging] = useState(false);
  const [width, setWidth] = useState(220);
  const [height, setHeight] = useState(420);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBanging(true);

      setTimeout(() => {
        setIsBanging(false);
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 100);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-container">
      <div className="wrapper">
        {/* Width & Height Controls */}
        <div className="controls">
          <label>
            Width:
            <input
              type="range"
              min="100"
              max="400"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </label>
          <label>
            Height:
            <input
              type="range"
              min="200"
              max="600"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </label>
        </div>

        <div
          className={`glass-container ${isBanging ? "bang" : ""}`}
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          {/* Shockwave Effect */}
          <div className={`shockwave ${isBanging ? "active" : ""}`} />

          {/* Glass Image */}
          <img src={images[index]} alt="Glass Effect" className="glass-image" />
        </div>
      </div>
    </div>
  );
};

export default GlassEffect;
