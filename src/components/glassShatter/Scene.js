import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import Glass from "./glassShatter/Glass"; // Your intact glass component that triggers onShatter
import ShatteringGlass from "./ShatteringGlass";
import Content from "./glassShatter/Content"; // Revealed content component

export default function Scene() {
  const [shattered, setShattered] = useState(false);
  const [showContent, setShowContent] = useState(false);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        {/* Underlying content (e.g., a background plane) */}
        <mesh position={[0, 0, -1]}>
          <planeGeometry args={[2, 2]} />
          <meshStandardMaterial color={"#ffcc00"} opacity={showContent ? 1 : 0} transparent />
        </mesh>
        {/* Show intact glass until shattered; then render the shattering effect */}
        {!shattered ? (
          <Glass onShatter={() => setShattered(true)} />
        ) : (
          <ShatteringGlass onComplete={() => setShowContent(true)} />
        )}
      </Canvas>
      {showContent && <Content />}
    </div>
  );
}
