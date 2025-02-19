// IntactGlass.js
import React, { useRef, useState, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

// Adjust these paths as needed
import crack1 from "../images/rect1.webp";
import crack2 from "../images/rect4.webp";
import crack3 from "../images/rect2.webp";

export default function IntactGlass({ onShatter }) {
  const ref = useRef();
  const [crackStage, setCrackStage] = useState(0);
  const textures = [crack1, crack2, crack3];
  const texture = useLoader(TextureLoader, textures[crackStage]);

  useEffect(() => {
    if (crackStage < 2) {
      const timer = setTimeout(() => setCrackStage(crackStage + 1), 1500);
      return () => clearTimeout(timer);
    } else {
      // After the last crack stage, wait a moment then trigger shattering
      const timer = setTimeout(onShatter, 1500);
      return () => clearTimeout(timer);
    }
  }, [crackStage, onShatter]);

  return (
    <mesh ref={ref} position={[0, 0, 0.01]}>
      <planeGeometry args={[2, 2]} />
      <meshStandardMaterial
        map={texture}
        transparent
        opacity={0.9}
        side={2}
      />
    </mesh>
  );
}
