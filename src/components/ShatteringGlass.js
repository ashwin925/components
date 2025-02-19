import React, { useEffect, useState } from "react";
import { Physics, RigidBody } from "@react-three/rapier";

export default function ShatteringGlass({ onComplete }) {
  const [shards, setShards] = useState([]);

  useEffect(() => {
    // Create 120 shards with randomized properties.
    const newShards = Array.from({ length: 120 }).map(() => {
      // Position: spread over a 2x2 area (centered at origin).
      const pos = [
        (Math.random() - 0.5) * 2, 
        (Math.random() - 0.5) * 2, 
        0
      ];
      // Rotation: random for natural tumbling.
      const rot = [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ];
      // Dimensions: random width and height (small, medium, large shards).
      const width = 0.1 + Math.random() * 0.4;  // between 0.1 and 0.5
      const height = 0.1 + Math.random() * 0.4; // between 0.1 and 0.5

      // Velocity: Force most shards to fall downward.
      // 90% of shards: strong downward impulse; 10%: slight upward variation.
      const xVel = (Math.random() - 0.5) * 3; // slight x variation
      const zVel = (Math.random() - 0.5) * 3; // slight z variation
      const yVel =
        Math.random() < 0.1
          ? Math.random() * 2  // about 10% go slightly upward
          : - (5 + Math.random() * 3); // majority fall downward between -5 and -8

      const velocity = [xVel, yVel, zVel];

      // Angular velocity for natural rotation.
      const angularVelocity = [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
      ];

      // Material properties:
      // 30% chance for a highly reflective shard.
      const isReflective = Math.random() < 0.3;

      const materialProps = isReflective
        ? {
            color: "#00BFFF",  // bright blue
            metalness: 1.0,    // super reflective
            roughness: 0.0,    // very smooth
            opacity: 0.95,
            transparent: true,
          }
        : {
            color: "#00BFFF",  // bright blue
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
            {/* Use a box geometry with a thin depth (0.02) to simulate real glass thickness */}
            <boxGeometry args={[shard.width, shard.height, 0.02]} />
            <meshStandardMaterial {...shard.materialProps} />
          </mesh>
        </RigidBody>
      ))}
    </Physics>
  );
}
