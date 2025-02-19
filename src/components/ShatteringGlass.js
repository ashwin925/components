import React, { useEffect, useState } from "react";
import { Physics, RigidBody } from "@react-three/rapier";

export default function ShatteringGlass({ onComplete }) {
  const [shards, setShards] = useState([]);

  useEffect(() => {
    const newShards = Array.from({ length: 120 }).map(() => {
      // Start within a 2x2 area (simulating the glass panel)
      const pos = [
        (Math.random() - 0.5) * 2, 
        (Math.random() - 0.5) * 2, 
        0
      ];
      const rot = [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ];
      // Randomized dimensions for varied shard sizes
      const width = 0.1 + Math.random() * 0.4;  // between 0.1 and 0.5
      const height = 0.1 + Math.random() * 0.4; // between 0.1 and 0.5
      
      // **Velocity:**
      // - Very little lateral movement (x and y near 0)
      // - A forward (z) velocity that is slower than before but still brings shards toward the viewer
      const xVel = (Math.random() - 0.5) * 0.5;  // minimal sideways drift
      const yVel = (Math.random() - 0.5) * 0.5;  // minimal vertical drift
      const zVel = 3 + Math.random() * 2;        // slower, but still moving forward
      const velocity = [xVel, yVel, zVel];

      // Angular velocity for natural tumbling during the forward motion
      const angularVelocity = [
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
      ];

      // **Material Properties:**
      // 30% chance for a shard to have a super-reflective, gleaming finish.
      const isReflective = Math.random() < 0.3;
      const materialProps = isReflective
        ? {
            color: "#00BFFF",      // bright blue
            metalness: 1.0,        // maximum reflectivity
            roughness: 0.0,        // very smooth surface
            opacity: 0.98,
            transparent: true,
            emissive: "#00FFFF",   // slight emissive tint for extra gleam
          }
        : {
            color: "#00BFFF",      // bright blue
            metalness: 0.95,
            roughness: 0.05,
            opacity: 0.98,
            transparent: true,
          };

      return { pos, rot, width, height, velocity, angularVelocity, materialProps };
    });

    setShards(newShards);

    // Delay the onComplete callback (now 2000ms) so the effect can be fully appreciated.
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    // No gravity so shards come straight to the viewer
    <Physics gravity={[0, 0, 0]}>
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
            {/* A box geometry with a thin depth simulates real glass thickness */}
            <boxGeometry args={[shard.width, shard.height, 0.02]} />
            <meshStandardMaterial {...shard.materialProps} />
          </mesh>
        </RigidBody>
      ))}
    </Physics>
  );
}
