import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef, Suspense } from "react";

const GlowingBackground = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      {/* Ambient lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />

      {/* Suspense to ensure async resources are loaded before rendering */}
      <Suspense fallback={null}>
        <MovingGlowingSphere position={[0, 0, -1]} />
      </Suspense>

      {/* Postprocessing Effects - Ensuring Depth Buffer is Enabled */}
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.7} intensity={1.5} />
        <DepthOfField focusDistance={0.01} focalLength={0.2} bokehScale={2} />
      </EffectComposer>
    </Canvas>
  );
};

// 🔵 Glowing Sphere Component (Animates for a cool effect)
const MovingGlowingSphere = ({ position = [0, 0, -1] }) => {
  const meshRef = useRef(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <Sphere args={[1, 64, 64]}>
        <MeshDistortMaterial
          attach="material"
          color={"#00ffff"}
          distort={0.3}
          speed={2}
          emissive={"#00ffff"}
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </Sphere>
    </group>
  );
};

export default GlowingBackground;
