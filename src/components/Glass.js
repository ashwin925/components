import { useRef, useState, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

import crack1 from "/textures/crack1.png";
import crack2 from "/textures/crack2.png";
import crack3 from "/textures/crack3.png";

export default function Glass({ onShatter }) {
  const ref = useRef();
  const [crackStage, setCrackStage] = useState(0);
  const textures = [crack1, crack2, crack3];

  useEffect(() => {
    if (crackStage < 3) {
      const interval = setInterval(() => {
        setCrackStage((prev) => prev + 1);
      }, 1500);
      return () => clearInterval(interval);
    } else {
      onShatter(); // Trigger shattering after third crack
    }
  }, [crackStage]);

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <planeGeometry args={[2, 2]} />
      <meshStandardMaterial map={useLoader(TextureLoader, textures[crackStage])} transparent />
    </mesh>
  );
}
