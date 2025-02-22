"use client";
import React from "react";
import { Canvas } from '@react-three/fiber';
import GlassEffect from './components/GlassEffect.js';
import CardReveal from "./components/characterReveal/CharacterReveal.js";
import GlassPanel from './components/divComponent/glassDiv.js';
import Scene from "./components/Scene.js";
import HeaderWrapper from "./components/divComponent/headerWrap.js";
import BarrelHeader from "./components/divComponent/headerWrap.js";

function App() {
  return (
    <div>
    {/* <div style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#1e1e1e" }}> */}
      {/* <GlassEffect /> */}
      {/* <CardReveal /> */}
    {/* </div> */}

    {/* <div>
      <BarrelHeader />
    </div> */}

    <GlassPanel />

    {/* <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Scene /> 
    </div> */}
    </div>
  );
}

export default App;
