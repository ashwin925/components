import React from "react";
import { Canvas } from "@react-three/fiber";
import { Plane, Html, Environment, OrbitControls } from "@react-three/drei";

export default function SurroundingHeader3D({ headerText = "Header Title" }) {
  return (
    <div className="w-full h-[500px] relative">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        {/* Lighting for 3D effect */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} intensity={1} castShadow />

        {/* 3D Glass Panel */}
        <Plane args={[3, 2]} position={[0, 0, 0]} receiveShadow>
          <meshStandardMaterial
            transparent
            opacity={0.3}
            roughness={0.1}
            metalness={0.5}
            color="white"
          />
        </Plane>

        {/* 3D Surrounding Headers */}
        <HeaderFrame position={[0, 1.2, 0]} rotation={[0, 0, 0]} text={headerText} />
        <HeaderFrame position={[0, -1.2, 0]} rotation={[0, 0, 0]} text={headerText} />
        <HeaderFrame position={[1.7, 0, 0]} rotation={[0, 0, Math.PI / 2]} text={headerText} />
        <HeaderFrame position={[-1.7, 0, 0]} rotation={[0, 0, Math.PI / 2]} text={headerText} />

        {/* Environment & Controls */}
        <Environment preset="city" />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

// 3D Header Frame Component
function HeaderFrame({ position, rotation, text }) {
  return (
    <Plane args={[1.5, 0.3]} position={position} rotation={rotation} castShadow>
      <meshStandardMaterial color="white" metalness={0.8} roughness={0.3} />
      {/* Floating Text */}
      <Html position={[0, 0, 0.1]} center>
        <div className="text-white font-bold text-sm">{text}</div>
      </Html>
    </Plane>
  );
}
