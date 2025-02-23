import React from "react";
// import { Canvas } from "@react-three/fiber";
// import Particles from './Particles';
import BarrelGlass from "./headerWrap";
import "./glassDiv.css";

const GlassPanel = () => {
  return (
    // <div className="container-wrapper">
    //   {/* 3D Bubbles (Behind the Glass Panel) */}
    //   <Canvas className="canvas-container">
    //     <ambientLight intensity={0.5} />
    //     <Particles count={150} /> 
    //   </Canvas>
      <div>
      {/* Glass Panel (Front Layer) */}
      <div className="glass-panel">
        <BarrelGlass />

        {/* About Me Section */}
        <div className="about-me-container">
          <h2 className="about-title">About Me</h2>
          <p className="about-text">
            I dream, I build, I shape, turning concepts into skies! <br />
            Logic sharp, pixels-tight, crafting worlds in neon light! <br />
            No limits, no lines, no fear, no doubt, break the barrier! <br />
            I don’t follow- I lead, I shape, I set the trend, my friend.
          </p>
        </div>
      </div>
      {/* <div className="glass-panel">
        <h1>jii</h1>
      </div> */}
    </div>
  );
};

export default GlassPanel;
