// Glass.js
import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

// Import textures (adjust path as needed)
import crack1 from "../images/rect1.webp";
import crack2 from "../images/rect4.webp";
import crack3 from "../images/rect2.webp";

const textureMap = {
  1: crack1,
  2: crack2,
  3: crack3,
};

export default function Glass({ crackStage }) {
  const ref = useRef();
  const texture = useLoader(TextureLoader, textureMap[crackStage]);

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <planeGeometry args={[2, 2]} />
      <meshStandardMaterial map={texture} transparent opacity={0.9} />
    </mesh>
  );
}
