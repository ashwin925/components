import React, { useEffect, useState } from "react";
import { Physics, RigidBody } from "@react-three/rapier";

export default function ShatteringGlass({ onComplete }) {
  const [shards, setShards] = useState([]);

  useEffect(() => {
    // Create 120 shards with randomized properties
    const newShards = Array.from({ length: 120 }).map(() => {
      // Random starting position within the 2x2 glass area
      const pos = [
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        0,
      ];
      // Random initial rotation
      const rot = [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ];
      // Random shard dimensions (varied sizes)
      const width = 0.1 + Math.random() * 0.4;  // between 0.1 and 0.5
      const height = 0.1 + Math.random() * 0.4; // between 0.1 and 0.5

      // **Velocity Adjustments:**
      // Lateral (X, Y) velocities are increased for a wider spread,
      // while the forward (Z) velocity is reduced for a slower approach.
      const xVel = (Math.random() - 0.5) * 6;       // wider spread horizontally
      const yVel = (Math.random() - 0.5) * 4;       // moderate vertical spread
      const zVel = 4 + Math.random() * 2;           // slower forward burst
      const velocity = [xVel, yVel, zVel];

      // Random angular velocity for natural tumbling
      const angularVelocity = [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
      ];

      // 30% chance for a super-reflective shard
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

    // Increase the delay slightly (e.g., 2000ms) so the full effect can be appreciated.
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

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
            {/* Use box geometry with a small depth (0.02) to simulate realistic glass thickness */}
            <boxGeometry args={[shard.width, shard.height, 0.02]} />
            <meshStandardMaterial {...shard.materialProps} />
          </mesh>
        </RigidBody>
      ))}
    </Physics>
  );
}
