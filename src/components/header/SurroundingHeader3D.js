import React from "react";
import { Canvas } from "@react-three/fiber";
import { Plane, OrbitControls } from "@react-three/drei";

export default function TransparentGlassPanel() {
  return (
    <div className="w-full h-[500px] relative">
      <Canvas shadows camera={{ position: [0, 0, 12], fov: 50 }}>
        {/* Soft ambient light for even brightness */}
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} intensity={3} castShadow />

        {/* Glass Panel */}
        <GlassPanel position={[0, 0, 0]} scale={[12, 3, 1]} />

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

// Glass Panel Component
function GlassPanel({ position, scale }) {
  return (
    <Plane args={[4, 2, 64, 64]} position={position} scale={scale} receiveShadow>
      <meshStandardMaterial
        transparent
        opacity={0.7}  // More transparent but still visible
        roughness={0}   // Ultra-smooth surface
        metalness={0.7} // Keeps a slight metallic sheen without over-reflection
        color="#3399ff"  // A brighter blue
        emissive="#3399ff" // Adds a stronger blue glow
        emissiveIntensity={2} // Boosted glow
        side={2} // Ensures both sides render properly
      />
    </Plane>
  );
}
