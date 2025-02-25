"use client";
import React from "react";
// import { Canvas } from '@react-three/fiber';
// import GlassEffect from './components/glassShatter/GlassEffect.js';
// import CardReveal from "./components/characterReveal/CharacterReveal.js";
import GlassPanel from './components/divComponent/glassDiv.js';
// import Scene from "./components/Scene.js";
// import HeaderWrapper from "./components/divComponent/headerWrap.js";
// import BarrelHeader from "./components/divComponent/headerWrap.js";
import ToogleButton from "./components/divComponent/toogle.js";
// import GlowingBackground from "./components/divComponent/threeDbg.js";

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
    <div>
    {/* <div style={{ width: "100vw", height: "100vh", position: "absolute" }}>
      <GlowingBackground />
    </div> */}
        <ToogleButton />  
        <GlassPanel />
    </div>
    {/* <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Scene /> 
    </div> */}
    </div>
  );
}

export default App;
