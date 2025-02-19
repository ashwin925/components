import React, { useEffect, useState } from "react";
import { Physics, RigidBody } from "@react-three/rapier";

export default function ShatteringGlass({ onComplete }) {
  const [shards, setShards] = useState([]);

  useEffect(() => {
    // Create 100 shards with random positions, rotations, and velocities.
    const newShards = Array.from({ length: 100 }).map(() => ({
      // Position shards within the glass area (spread across the 2x2 plane)
      position: [
        (Math.random() - 0.5) * 2, 
        (Math.random() - 0.5) * 2, 
        0
      ],
      // Random rotation for each shard
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ],
      // High velocity in all directions (simulate an explosive shatter)
      velocity: [
        (Math.random() - 0.5) * 8, 
        (Math.random() - 0.5) * 8, 
        (Math.random() - 0.5) * 8,
      ],
    }));
    setShards(newShards);

    // Call onComplete after a short delay to reveal the content underneath.
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
          position={shard.position}
          rotation={shard.rotation}
          linearVelocity={shard.velocity}
          angularDamping={0.5}
          linearDamping={0.2}
        >
          <mesh>
            <planeGeometry args={[0.3, 0.3]} />
            <meshStandardMaterial
              color="#00BFFF" // bright blue color (DeepSkyBlue)
              transparent
              opacity={0.9}
            />
          </mesh>
        </RigidBody>
      ))}
    </Physics>
  );
}
