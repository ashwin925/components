import React from "react";
import { Canvas } from "@react-three/fiber";
import { Plane, Environment, OrbitControls } from "@react-three/drei";

export default function SurroundingHeader3D() {
  return (
    <div className="w-full h-[500px] relative">
      <Canvas shadows camera={{ position: [0, 0, 12], fov: 50 }}>
        {/* Soft ambient light for a smooth glow */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} castShadow />

        {/* Large Glass Panel */}
        <GlassPanel position={[0, 0, 0]} scale={[12, 2.5, 1]} />


        {/* Environment for subtle reflections */}
        <Environment preset="city" background={false} /> {/* No unwanted BG lines */}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

// Main Glass Panel (Now 4x Wider)
function GlassPanel({ position, scale }) {
  return (
    <Plane args={[4, 2]} position={position} scale={scale} receiveShadow>
      <meshStandardMaterial
        transparent
        opacity={0.15}  // Keeps it semi-transparent but visible
        roughness={0.05} // Smooth, no crystal patterns
        metalness={0.9}  // Reflective, real glass feel
        color="#4fa8ff"  // Strong bright blue
        emissive="#4fa8ff" // Adds brightness glow
        emissiveIntensity={0.8} // Glow strength
      />
    </Plane>
  );
}

// Surrounding Glass Frame for 3D Effect
function GlassFrame({ position, rotation, scale }) {
  return (
    <Plane args={[1, 0.2]} position={position} rotation={rotation} scale={scale} castShadow>
      <meshStandardMaterial
        transparent
        opacity={0.2}  // Slightly more visible frame
        roughness={0.02} // Smooth, no distortions
        metalness={1}  // Full reflective effect
        color="#4fa8ff" // Bright blue
        emissive="#4fa8ff" // Adds glowing effect
        emissiveIntensity={0.9} // Stronger blue glow
      />
    </Plane>
  );
}
