"use client";
import React from "react";
import GlassEffect from './components/GlassEffect.js';
import CardReveal from "./components/characterReveal/CharacterReveal.js";
import GlassPanel from './components/divComponent/glassDiv.js';
import Scene from "./components/Scene.js";
import HeaderWrapper from "./components/header/SurroundingHeader3D.js";

function App() {
  return (
    <div>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#1e1e1e" }}>
      {/* <GlassEffect /> */}
      {/* <CardReveal /> */}
    </div>
          <div>
            <HeaderWrapper />
          </div>
          {/* <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
            <Scene /> 
          </div> */}
          {/* <div className="flex justify-center items-center h-screen bg-black">
            <SurroundingHeader3D />
          </div> */}
    </div>
  );
}

export default App;
