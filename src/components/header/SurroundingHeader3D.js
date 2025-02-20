import React from "react";
import { Canvas } from "@react-three/fiber";
import { Plane, Environment, OrbitControls } from "@react-three/drei";

export default function SurroundingHeader3D() {
  return (
    <div className="w-full h-[500px] relative">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 50 }}>
        {/* Soft ambient light for glow effect */}
        <ambientLight intensity={1} />
        <directionalLight position={[2, 2, 5]} intensity={1} castShadow />

        {/* Center Glass Panel */}
        <GlassPanel position={[0, 0, 0]} scale={[3, 2, 1]} />

        {/* 3D Surrounding Header Panels */}
        <GlassFrame position={[0, 2.2, 0]} scale={[5, 0.3, 1]} /> {/* Top */}
        <GlassFrame position={[0, -2.2, 0]} scale={[5, 0.3, 1]} /> {/* Bottom */}
        <GlassFrame position={[2.5, 0, 0]} scale={[3.5, 0.3, 1]} rotation={[0, 0, Math.PI / 2]} /> {/* Right */}
        <GlassFrame position={[-2.5, 0, 0]} scale={[3.5, 0.3, 1]} rotation={[0, 0, Math.PI / 2]} /> {/* Left */}

        {/* Environment for subtle reflections */}
        <Environment preset="city" />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

// Main Glass Panel in the center
function GlassPanel({ position, scale }) {
  return (
    <Plane args={[3, 2]} position={position} scale={scale} receiveShadow>
      <meshStandardMaterial
        transparent
        opacity={0.08} // Ultra-transparent
        roughness={0.02} // Smoother surface
        metalness={0.9}  // Reflective, glassy
        color="#4fa8ff"  // Soft blue tint
      />
    </Plane>
  );
}

// Surrounding Glass Frame for the header effect
function GlassFrame({ position, rotation, scale }) {
  return (
    <Plane args={[1, 0.2]} position={position} rotation={rotation} scale={scale} castShadow>
      <meshStandardMaterial
        transparent
        opacity={0.12} // More transparent for the frame
        roughness={0.05} // Smooth
        metalness={1}  // High reflectivity
        color="#4fa8ff" // Bright blue color
      />
    </Plane>
  );
}
