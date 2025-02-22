import React from "react";
import BarrelGlass from "./headerWrap";
import "./glassDiv.css";

const GlassPanel = () => {
  return (
    <div className="container-wrapper">
      <div className="glass-panel">
        <BarrelGlass />

        {/* About Me Section */}
        <div className="about-me-container">
          <h2 className="about-title">About Me</h2>
          <p className="about-text">
            Passionate developer transforming ideas into reality. I create immersive web experiences, blending design and 
            functionality to push boundaries in the digital world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlassPanel;
