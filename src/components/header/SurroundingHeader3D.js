import React, { useMemo, useEffect } from "react";
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
  // Create geometry with curvature applied
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(6, 2, 32, 32); // High segments for smooth bending

    // Apply vertex displacement for curvature
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const zCurve = Math.sin((x / 3) * Math.PI) * 1.2; // Smooth curvature effect
      pos.setZ(i, zCurve);
    }
    pos.needsUpdate = true;
    
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} position={position} scale={scale}>
      <meshStandardMaterial
        transparent
        opacity={0.5}
        roughness={0.1}
        metalness={0.9}
        color="#4fa8ff"
        emissive="#4fa8ff"
        emissiveIntensity={0.8}
      />
    </mesh>
  );
}
