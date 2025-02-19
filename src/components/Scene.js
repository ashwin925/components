import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import Glass from "./Glass";
import ShatteringGlass from "./ShatteringGlass";

export default function Scene() {
  const [shattered, setShattered] = useState(false);
  const [reveal, setReveal] = useState(false);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />

        {/* Background Content */}
        <mesh position={[0, 0, -1]}>
          <planeGeometry args={[2, 2]} />
          <meshStandardMaterial color={"#ffcc00"} opacity={reveal ? 1 : 0} transparent />
        </mesh>

        {/* Glass Effect */}
        {!shattered ? <Glass onShatter={() => setShattered(true)} /> : <ShatteringGlass onComplete={() => setReveal(true)} />}
      </Canvas>
    </div>
  );
}
