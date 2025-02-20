"use client";
import React from "react";
import GlassEffect from './components/GlassEffect.js';
import CardReveal from "./components/characterReveal/CharacterReveal.js";
import GlassPanel from './components/divComponent/glassDiv.js';
import Scene from "./components/Scene.js";
import SurroundingHeader3D from "./components/header/SurroundingHeader3D.js";

function App() {
  return (
    <div>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#1e1e1e" }}>
      {/* <GlassEffect /> */}
      {/* <CardReveal /> */}
    </div>
          {/* <div>
            <GlassPanel />
          </div> */}
          {/* <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
            <Scene /> 
          </div> */}
          <div className="flex justify-center items-center h-screen bg-black">
            <SurroundingHeader3D headerText="3D Header" />
        </div>
    </div>
  );
}

export default App;
