import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import Glass from "./Glass";
import ShatteringGlass from "./ShatteringGlass";

export default function Scene() {
  const [crackStage, setCrackStage] = useState(1);
  const [shattered, setShattered] = useState(false);

  const handleCrackProgress = () => {
    if (crackStage < 3) {
      setCrackStage((prev) => prev + 1);
    } else {
      setShattered(true);
    }
  };

  return (
    <>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        {!shattered ? (
          <Glass crackStage={crackStage} />
        ) : (
          <ShatteringGlass triggerBreak />
        )}
      </Canvas>
      <button
        onClick={handleCrackProgress}
        style={{ position: "absolute", top: 20, left: 20 }}
      >
        Crack More
      </button>
    </>
  );
}
