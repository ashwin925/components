"use client";
import React from "react";
import GlassEffect from './components/GlassEffect.tsx';
import CardReveal from "./components/CharacterReveal.js";
import GlassPanel from './components/glassDiv.js';
import Scene from "./components/Scene.js";

function App() {
  return (
    <div>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#1e1e1e" }}>
      {/* <GlassEffect /> */}
      {/* <CardReveal /> */}
    </div>
          <div>
            {/* <GlassPanel /> */}
          </div>
          <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
           <Scene />
          </div>
    </div>
  );
}

export default App;
