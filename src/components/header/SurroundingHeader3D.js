import React, { useMemo } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { BezierSurfaceGeometry } from "three/examples/jsm/geometries/BezierSurfaceGeometry.js";

extend({ BezierSurfaceGeometry });

export default function GlassHeader3D() {
  return (
    <div className="w-full h-[500px] relative flex items-center justify-center">
      {/* Wrapped Content - The Div Below the Header */}
      <div className="absolute top-40 w-[400px] h-[80px] flex items-center justify-center text-white text-lg font-bold bg-gray-900 bg-opacity-30 rounded-md z-10">
        Wrapped Content
      </div>

      {/* Canvas for 3D Header */}
      <Canvas camera={{ position: [0, 2, 8], fov: 70 }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[5, 5, 10]} intensity={3} />

        {/* Curved Glass Header */}
        <CurvedGlass position={[0, 3, -1]} scale={[4, 1.2, 1]} />

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

// 3D Curved Glass Component
function CurvedGlass({ position, scale }) {
  const geometry = useMemo(() => {
    const degree = 3; // Bézier degree
    const controlPoints = [
      [
        [-3, -0.5, -2], [-1, 1, -2], [1, 1, -2], [3, -0.5, -2]
      ],
      [
        [-3, -0.5, 0], [-1, 1, 0], [1, 1, 0], [3, -0.5, 0]
      ],
      [
        [-3, -0.5, 2], [-1, 1, 2], [1, 1, 2], [3, -0.5, 2]
      ]
    ];
    return new BezierSurfaceGeometry(controlPoints, degree, degree);
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
