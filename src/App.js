"use client";
import React from "react";
import GlassEffect from './components/GlassEffect.tsx';
import CardReveal from "./components/CharacterReveal.jsx";
import GlassPanel from './components/glassDiv.jsx';

function App() {
  return (
    <div>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#1e1e1e" }}>
      {/* <GlassEffect /> */}
      <CardReveal />
    </div>
          <div>
            {/* <GlassPanel /> */}
          </div>
    </div>
  );
}

export default App;
