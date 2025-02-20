import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

export default function GlassHeader3D() {
  return (
    <div className="w-full h-[500px] relative flex items-center justify-center">
      {/* Main Content - The Div to be Surrounded */}
      <div className="absolute top-40 w-[400px] h-[80px] flex items-center justify-center text-white text-lg font-bold bg-gray-900 bg-opacity-30 rounded-md z-10">
        Wrapped Content
      </div>

      <Canvas camera={{ position: [0, 0, 10], fov: 70 }}>
        {/* Lighting */}
        <ambientLight intensity={1.5} />
        <pointLight position={[5, 5, 10]} intensity={3} />

        {/* Curved Glass Header */}
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

// 3D Curved Glass Component
function CurvedGlass({ position, scale }) {
  // Creating a custom geometry to achieve curvature
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-3, 0, -1),
    new THREE.Vector3(-1.5, 1, 0),
    new THREE.Vector3(0, 1.5, 0.5),
    new THREE.Vector3(1.5, 1, 0),
    new THREE.Vector3(3, 0, -1)
  ]);

  const geometry = new THREE.TubeGeometry(curve, 64, 0.3, 8, false);

  return (
    <mesh geometry={geometry} position={position} scale={scale}>
      <meshStandardMaterial
        transparent
        opacity={0.5}
        roughness={0.05}
        metalness={1}
        color="#4fa8ff"
        emissive="#4fa8ff"
        emissiveIntensity={1.5}
      />
    </mesh>
  );
}
