import React from "react";
import { Canvas } from "@react-three/fiber";
import Particles from './Particles';
import BarrelGlass from "./headerWrap";
import "./glassDiv.css";

const GlassPanel = () => {
  return (
    <div className="container-wrapper">
      {/* 3D Bubbles (Behind the Glass Panel) */}
      <Canvas className="canvas-container">
        <ambientLight intensity={0.5} />
        <Particles count={150} /> {/* Call the Particles component */}
      </Canvas>

      {/* Glass Panel (Front Layer) */}
      <div className="glass-panel">
        <BarrelGlass />

        {/* About Me Section */}
        {/* <div className="about-me-container">
          <h2 className="about-title">About Me</h2>
          <p className="about-text">
            Passionate developer transforming ideas into reality. I create <br />
            immersive web experiences, blending design and functionality to <br />
            push boundaries in the digital world.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default GlassPanel;
