import React from "react";
import { Canvas } from "@react-three/fiber";
import { Torus, OrbitControls, SpotLight, EffectComposer, Bloom } from "@react-three/drei";

export default function GlassHeader3D() {
  return (
    <div className="w-full h-[500px] relative flex items-center justify-center">
      {/* Main Content - The Div to be Surrounded */}
      <div className="absolute top-40 w-[400px] h-[80px] flex items-center justify-center text-white text-lg font-bold bg-gray-900 bg-opacity-30 rounded-md z-10">
        Wrapped Content
      </div>

      <Canvas shadows camera={{ position: [0, 0, 10], fov: 70 }}>
        {/* Lighting */}
        <ambientLight intensity={1.5} />
        <SpotLight position={[5, 5, 10]} intensity={3} />

        {/* Wraparound Glass Header */}
        <CurvedGlass position={[0, 1, 0]} scale={[6, 2, 1]} />

        {/* Bloom Effect for Glow */}
        <EffectComposer>
          <Bloom intensity={1.5} luminanceThreshold={0.3} luminanceSmoothing={0.1} />
        </EffectComposer>

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

// 3D Curved Glass Component (Torus for Wraparound)
function CurvedGlass({ position, scale }) {
  return (
    <Torus args={[3.2, 0.3, 64, 100]} position={position} scale={scale} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial
        transparent
        opacity={0.4}  // More transparency
        roughness={0.05}  // Smooth, glassy
        metalness={1}  // Reflective glass effect
        color="#4fa8ff"  // Bright blue
        emissive="#4fa8ff" // Adds glowing effect
        emissiveIntensity={2} // Boosted blue glow
      />
    </Torus>
  );
}
