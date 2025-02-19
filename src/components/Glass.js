// Glass.js
import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

// Import textures (adjust path as needed)
import crack1 from "../assets/textures/crack1.png";
import crack2 from "../assets/textures/crack2.png";
import crack3 from "../assets/textures/crack3.png";

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
