import React, { useEffect, useState } from "react";
import { Physics, RigidBody } from "@react-three/rapier";

export default function ShatteringGlass({ onComplete }) {
  const [shards, setShards] = useState([]);

  useEffect(() => {
    const newShards = Array.from({ length: 120 }).map(() => {
      // Start within a 2x2 area (glass panel)
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
      
      // Velocity: Minimal lateral drift; all shards come straight forward
      const xVel = (Math.random() - 0.5) * 0.5;
      const yVel = (Math.random() - 0.5) * 0.5;
      const zVel = 3 + Math.random() * 2; // slower forward burst
      const velocity = [xVel, yVel, zVel];

      const angularVelocity = [
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
      ];

      // Uniform material: All shards are the same bright blue
      // We'll retain slight differences in reflectiveness based on a random flag,
      // but ensure the base and emissive colors match.
      const isReflective = Math.random() < 0.3;
      const materialProps = isReflective
        ? {
            color: "#00BFFF",
            metalness: 1.0,
            roughness: 0.0,
            opacity: 0.98,
            transparent: true,
            emissive: "#00FFF",  // same as base color
          }
        : {
            color: "#00BFFF",
            metalness: 0.95,
            roughness: 0.05,
            opacity: 0.98,
            transparent: true,
            emissive: "#00FFF",  // same as base color
          };

      return { pos, rot, width, height, velocity, angularVelocity, materialProps };
    });

    setShards(newShards);

    // Delay the onComplete callback to allow the full effect to play out.
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
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
            <boxGeometry args={[shard.width, shard.height, 0.02]} />
            <meshStandardMaterial {...shard.materialProps} />
          </mesh>
        </RigidBody>
      ))}
    </Physics>
  );
}
