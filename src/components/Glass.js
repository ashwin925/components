import { useRef, useState, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

// Ensure correct paths (use process.env.PUBLIC_URL if necessary)
import crack1 from "../images/rect1.webp";
import crack2 from "../images/rect4.webp";
import crack3 from "../images/rect2.webp";

export default function Glass({ onShatter }) {
  const ref = useRef();
  const [crackStage, setCrackStage] = useState(0);
  const textures = useLoader(TextureLoader, [crack1, crack2, crack3]);

  useEffect(() => {
    if (crackStage < 2) {
      const interval = setInterval(() => {
        setCrackStage((prev) => prev + 1);
      }, 1500);
      return () => clearInterval(interval);
    } else {
      setTimeout(onShatter, 1500); // Trigger shatter after last crack
    }
  }, [crackStage]);

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <planeGeometry args={[2, 2]} />
      <meshStandardMaterial
        map={textures[crackStage]}
        transparent
        side={2} // Ensure both sides are visible
      />
    </mesh>
  );
}

