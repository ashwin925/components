import React, { useEffect, useState } from "react";
import { Physics, RigidBody } from "@react-three/rapier";

export default function ShatteringGlass({ onComplete }) {
  const [shards, setShards] = useState([]);

  useEffect(() => {
    const newShards = Array.from({ length: 120 }).map(() => {
      // Starting position within a 2x2 area (the glass panel)
      const pos = [
        (Math.random() - 0.5) * 2, 
        (Math.random() - 0.5) * 2, 
        0,
      ];
      // Random rotation for natural tumbling
      const rot = [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ];
      // Randomized dimensions for varied shard sizes
      const width = 0.1 + Math.random() * 0.4;  // between 0.1 and 0.5
      const height = 0.1 + Math.random() * 0.4; // between 0.1 and 0.5
      
      // Velocity: minimal lateral drift so shards come straight toward the user.
      const xVel = (Math.random() - 0.5) * 0.5;
      const yVel = (Math.random() - 0.5) * 0.5;
      const zVel = 3 + Math.random() * 2; // slower forward burst
      const velocity = [xVel, yVel, zVel];

      // Angular velocity for natural tumbling
      const angularVelocity = [
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
      ];

      // Enhanced material properties for extra gleam.
      // 30% chance for a "super-reflective" shard.
      const isReflective = Math.random() < 0.3;
      const materialProps = isReflective
        ? {
            color: "#00BFFF",         // bright blue base
            metalness: 1.0,           // maximum metalness
            roughness: 0.0,           // perfectly smooth surface
            clearcoat: 1.0,           // full clear coat for extra reflections
            clearcoatRoughness: 0.0,
            emissive: "#00BFFF",       // same color emissive for a glowing effect
            emissiveIntensity: 1.5,    // stronger emissive intensity
            opacity: 0.98,
            transparent: true,
          }
        : {
            color: "#00BFFF",         // bright blue base
            metalness: 0.95,
            roughness: 0.05,
            clearcoat: 0.8,
            clearcoatRoughness: 0.05,
            emissive: "#00BFFF",
            emissiveIntensity: 1.0,
            opacity: 0.98,
            transparent: true,
          };

      return { pos, rot, width, height, velocity, angularVelocity, materialProps };
    });

    setShards(newShards);

    // Extend the effect duration slightly (2000ms) so the motion is fully appreciated.
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    // No gravity so all shards travel straight toward the viewer.
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
            {/* Use box geometry with a thin depth to simulate realistic glass thickness */}
            <boxGeometry args={[shard.width, shard.height, 0.02]} />
            <meshStandardMaterial {...shard.materialProps} />
          </mesh>
        </RigidBody>
      ))}
    </Physics>
  );
}
