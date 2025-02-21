import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function GlassHeader3D() {
  return (
    <div className="w-full h-[500px] relative flex items-center justify-center">
      {/* Main Content - The Div to be Surrounded */}
      <div className="absolute top-40 w-[400px] h-[80px] flex items-center justify-center text-white text-lg font-bold bg-gray-900 bg-opacity-30 rounded-md z-10">
        Wrapped Content
      </div>

      <Canvas camera={{ position: [0, 0, 6], fov: 70 }}>
        {/* Lighting */}
        <ambientLight intensity={1.5} />
        <pointLight position={[5, 5, 10]} intensity={3} />

        {/* Curved Glass Header using CylinderGeometry */}
        <CurvedGlass position={[0, 2, -1]} scale={[4, 1.2, 0.5]} />

        {/* Bloom Effect for Glow */}
        <EffectComposer>
          <Bloom intensity={1.5} luminanceThreshold={0.3} luminanceSmoothing={0.1} />
        </EffectComposer>

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

// 3D Curved Glass Component
function CurvedGlass({ position, scale }) {
  return (
    <mesh position={position} scale={scale}>
      {/* CylinderGeometry: Creates a naturally curved shape */}
      <cylinderGeometry args={[4, 4, 1.5, 32, 1, true, Math.PI * 0.25, Math.PI * 1.5]} />
      
      {/* Glass-like Material */}
      <meshStandardMaterial
        transparent
        opacity={0.5}
        roughness={0.1}
        metalness={0.9}
        color="#4fa8ff"
        emissive="#4fa8ff"
        emissiveIntensity={0.8}
        side={2} // Double-sided material
      />
    </mesh>
  );
}
