import React from "react";
import { Canvas } from "@react-three/fiber";
import { Plane, Environment, OrbitControls } from "@react-three/drei";

export default function TransparentGlassPanel() {
  return (
    <div className="w-full h-[500px] relative">
      <Canvas shadows camera={{ position: [0, 0, 12], fov: 50 }}>
        {/* Soft ambient light for smooth glow */}
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} intensity={3} castShadow />

        {/* Glass Panel */}
        <GlassPanel position={[0, 0, 0]} scale={[12, 3, 1]} />

        {/* Environment for reflections */}
        <Environment preset="city" background={false} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

// Glass Panel Component with Rounded Edges
function GlassPanel({ position, scale }) {
  return (
    <Plane args={[4, 2, 32, 32]} position={position} scale={scale} receiveShadow>
      <meshStandardMaterial
        transparent
        opacity={0.25}  // More visible yet transparent
        roughness={0.01} // Ultra-smooth surface
        metalness={1}  // Reflective glass effect
        color="#4fa8ff"  // Strong bright blue
        emissive="#4fa8ff" // Adds brightness glow
        emissiveIntensity={1.2} // Stronger blue glow
        side={2} // Ensures both sides render properly
      />
    </Plane>
  );
}
