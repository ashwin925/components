import React, { useEffect, useState } from "react";
import { Physics, RigidBody } from "@react-three/rapier";

export default function ShatteringGlass({ onComplete }) {
  const [shards, setShards] = useState([]);

  useEffect(() => {
    // Create 120 shards with randomized properties.
    const newShards = Array.from({ length: 120 }).map(() => {
      // Position shards within a 2×2 glass area (centered at origin)
      const pos = [
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        0
      ];
      // Random rotation for natural tumbling
      const rot = [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ];
      // Random dimensions for varied shard sizes
      const width = 0.1 + Math.random() * 0.4;  // between 0.1 and 0.5
      const height = 0.1 + Math.random() * 0.4; // between 0.1 and 0.5

      // **Burst-Shatter Impulse:**
      // All shards receive a strong forward (positive Z) burst—simulating an impact from behind.
      // A slight random impulse on X and Y is added.
      const xVel = (Math.random() - 0.5) * 3;
      const yVel = (Math.random() - 0.5) * 2;
      const zVel = 8 + Math.random() * 4; // Strong forward burst

      const velocity = [xVel, yVel, zVel];

      // Random angular velocity for natural tumbling.
      const angularVelocity = [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
      ];

      // Material properties: 30% chance for a super-reflective shard.
      const isReflective = Math.random() < 0.3;
      const materialProps = isReflective
        ? {
            color: "#00BFFF", // bright blue
            metalness: 1.0,   // maximum reflectivity
            roughness: 0.0,   // very smooth
            opacity: 0.95,
            transparent: true,
          }
        : {
            color: "#00BFFF", // bright blue
            metalness: 0.9,
            roughness: 0.05,
            opacity: 0.95,
            transparent: true,
          };

      return { pos, rot, width, height, velocity, angularVelocity, materialProps };
    });

    setShards(newShards);

    // After 1.5 seconds, call onComplete to reveal the underlying content.
    const timer = setTimeout(() => {
      onComplete();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <Physics gravity={[0, -9.81, 0]}>
      {shards.map((shard, index) => (
        <RigidBody
          key={index}
          colliders="hull"
          position={shard.pos}
          rotation={shard.rot}
          linearVelocity={shard.velocity}
          angularVelocity={shard.angularVelocity}
          angularDamping={0.5}
          linearDamping={0.2}
        >
          <mesh castShadow receiveShadow>
            {/* Use a box geometry with a small depth (0.02) to simulate real glass thickness */}
            <boxGeometry args={[shard.width, shard.height, 0.02]} />
            <meshStandardMaterial {...shard.materialProps} />
          </mesh>
        </RigidBody>
      ))}
    </Physics>
  );
}
