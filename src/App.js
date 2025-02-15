"use client";
import React from "react";
import GlassEffect from './components/GlassEffect.tsx';
import CardReveal from "./components/CharacterReveal.jsx";

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#1e1e1e" }}>
      <GlassEffect />
      {/* <CardReveal /> */}
    </div>
  );
}

export default App;
