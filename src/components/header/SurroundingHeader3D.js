import React from "react";
import { Canvas } from "@react-three/fiber";
import { Plane, Html, Environment, OrbitControls } from "@react-three/drei";

export default function SurroundingHeader3D({ headerText = "Header Title" }) {
  return (
    <div className="w-full h-[500px] relative">
      <Canvas shadows camera={{ position: [0, 0, 6], fov: 50 }}>
        {/* Lighting for brightness & reflections */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 5]} intensity={1} castShadow />

        {/* 3D Glass Panel (Main Centerpiece) */}
        <Plane args={[3, 2]} position={[0, 0, 0]} receiveShadow>
          <meshStandardMaterial
            transparent
            opacity={0.15}  // More transparent
            roughness={0.05} // Smoother surface
            metalness={0.6}  // Reflective surface
            color="#a0cfff"  // Light blue-white tint
          />
        </Plane>

        {/* 3D Surrounding Headers (Thinner, Longer, Seamless) */}
        <HeaderFrame position={[0, 1.3, 0]} rotation={[0, 0, 0]} text={headerText} scale={[3.5, 0.2, 1]} />
        <HeaderFrame position={[0, -1.3, 0]} rotation={[0, 0, 0]} text={headerText} scale={[3.5, 0.2, 1]} />
        <HeaderFrame position={[1.85, 0, 0]} rotation={[0, 0, Math.PI / 2]} text={headerText} scale={[2.5, 0.2, 1]} />
        <HeaderFrame position={[-1.85, 0, 0]} rotation={[0, 0, Math.PI / 2]} text={headerText} scale={[2.5, 0.2, 1]} />

        {/* Environment & Controls */}
        <Environment preset="city" />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

// 3D Header Frame Component (Thin, Long, Bright Blue-White Glass)
function HeaderFrame({ position, rotation, text, scale }) {
  return (
    <Plane args={[1, 0.1]} position={position} rotation={rotation} scale={scale} castShadow>
      <meshStandardMaterial
        transparent
        opacity={0.2} // More see-through
        roughness={0.1} // Smooth finish
        metalness={0.8} // Reflective, slightly metallic
        color="#a0cfff" // Bright blue-white tint
      />
      {/* Floating Text */}
      <Html position={[0, 0, 0.1]} center>
        <div className="text-white font-bold text-xs">{text}</div>
      </Html>
    </Plane>
  );
}
