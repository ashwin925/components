// Scene.js
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import IntactGlass from "./IntactGlass";
import FracturedGlass from "./FracturedGlass";
import Content from "./Content";

export default function Scene() {
  const [shattered, setShattered] = useState(false);
  const [showContent, setShowContent] = useState(false);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <OrbitControls />
        {/* Underlying background content (e.g., a colored plane) */}
        <mesh position={[0, 0, -1]}>
          <planeGeometry args={[2, 2]} />
          <meshStandardMaterial color="#ffcc00" opacity={showContent ? 1 : 0} transparent />
        </mesh>
        {/* Render either the intact glass or fractured glass */}
        {!shattered ? (
          <IntactGlass onShatter={() => setShattered(true)} />
        ) : (
          <FracturedGlass onComplete={() => setShowContent(true)} />
        )}
      </Canvas>
      {/* Overlay revealed content */}
      {showContent && <Content />}
    </div>
  );
}
