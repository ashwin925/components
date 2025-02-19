// Scene.js
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import Glass from "./Glass";
import ShatteringGlass from "./ShatteringGlass";
import { OrbitControls } from "@react-three/drei";

export default function Scene() {
  const [crackStage, setCrackStage] = useState(1);
  const [shattered, setShattered] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Change the glass texture every 1.5 seconds
    if (crackStage < 3) {
      const timer = setTimeout(() => {
        setCrackStage((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      // After 3 stages, trigger shattering and reveal content after a delay
      const timer = setTimeout(() => {
        setShattered(true);
        // Delay content reveal slightly to let shatter animation play
        setTimeout(() => {
          setShowContent(true);
        }, 1000);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [crackStage]);

  return (
    <>
      <Canvas style={{ position: "absolute", width: "100%", height: "100%" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <OrbitControls />
        {/* Content behind the glass */}
        {showContent && (
          <mesh position={[0, 0, -0.1]}>
            <planeGeometry args={[2, 2]} />
            <meshStandardMaterial color="skyblue" />
          </mesh>
        )}
        {/* Glass overlay: if shattered, show shattering effect */}
        {!shattered ? (
          <Glass crackStage={crackStage} />
        ) : (
          <ShatteringGlass triggerBreak={shattered} />
        )}
      </Canvas>
      {/* Optional overlay container for content with CSS fade-in effect */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          fontSize: "2rem",
          opacity: showContent ? 1 : 0,
          transition: "opacity 1s ease-in-out",
          pointerEvents: "none",
        }}
      >
        Your Revealed Content
      </div>
    </>
  );
}
