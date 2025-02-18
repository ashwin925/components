"use client";
import React from "react";
import GlassEffect from './components/GlassEffect.tsx';
import CardReveal from "./components/CharacterReveal.jsx";
import GlassPanel from './components/glassDiv.jsx';

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#1e1e1e" }}>
      {/* <GlassEffect /> */}
      {/* <CardReveal /> */}
      <GlassPanel />
    </div>
  );
}

export default App;
