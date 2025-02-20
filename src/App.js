import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TubeGeometry, CatmullRomCurve3, Vector3 } from "three";

export default function CurvedGlassHeader() {
  return (
    <div className="w-full h-[500px] relative flex items-center justify-center">
      {/* The Wrapped Content */}
      <div className="absolute top-40 w-[400px] h-[80px] flex items-center justify-center text-white text-lg font-bold bg-gray-900 bg-opacity-30 rounded-md z-10">
        Wrapped Content
      </div>

      <Canvas camera={{ position: [0, 0, 10], fov: 70 }}>
        {/* Lighting */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={3} />

        {/* Curved Glass Structure */}
        <CurvedGlass />

        {/* Controls for testing */}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

// 3D Curved Glass Component
function CurvedGlass() {
  // Define the curve path for bending effect
  const curve = new CatmullRomCurve3([
    new Vector3(-3, 1, -2), // Left side
    new Vector3(-1, 2, 0), // Left middle
    new Vector3(0, 2.5, 0), // Center (higher for curvature)
    new Vector3(1, 2, 0), // Right middle
    new Vector3(3, 1, -2), // Right side
  ]);

  return (
    <mesh>
      <tubeGeometry args={[curve, 64, 0.3, 16, false]} />
      <meshStandardMaterial
        transparent
        opacity={0.5}
        roughness={0.1}
        metalness={0.9}
        color="#4fa8ff"
        emissive="#4fa8ff"
        emissiveIntensity={1.5}
      />
    </mesh>
  );
}
