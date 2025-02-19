import React, { useEffect, useRef, useState } from "react";
import { Physics, RigidBody } from "@react-three/rapier";
import { gsap } from "gsap";

// Inner component representing a single shard.
function Shard({ pos, rot, width, height, velocity, angularVelocity, materialProps, flash }) {
  const meshRef = useRef();

  // If flash is enabled for this shard, schedule a flash animation.
  useEffect(() => {
    if (flash && meshRef.current) {
      // Random delay between 0 and 2 seconds for the flash.
      const delay = Math.random() * 2;
      // Animate emissiveIntensity from base (set in materialProps) to a higher value briefly.
      gsap.to(meshRef.current.material, {
        emissiveIntensity: 1.5,
        duration: 0.2,
        delay,
        onComplete: () => {
          gsap.to(meshRef.current.material, { emissiveIntensity: materialProps.emissiveIntensity, duration: 0.2 });
        },
      });
    }
  }, [flash, materialProps.emissiveIntensity]);

  return (
    <RigidBody
      colliders="hull"
      position={pos}
      rotation={rot}
      linearVelocity={velocity}
      angularVelocity={angularVelocity}
      angularDamping={0.5}
      linearDamping={0.2}
    >
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[width, height, 0.02]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
    </RigidBody>
  );
}

export default function ShatteringGlass({ onComplete }) {
  const [shards, setShards] = useState([]);

  useEffect(() => {
    const newShards = Array.from({ length: 120 }).map(() => {
      // Position shards within a 2x2 area (the glass panel)
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

      // Velocity: Minimal lateral drift; all shards come straight forward.
      const xVel = (Math.random() - 0.5) * 0.5;
      const yVel = (Math.random() - 0.5) * 0.5;
      const zVel = 3 + Math.random() * 2; // slower forward burst
      const velocity = [xVel, yVel, zVel];

      // Angular velocity for natural tumbling.
      const angularVelocity = [
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
      ];

      // All shards have a dark base.
      // We'll use a dark blue/blackish base color.
      // Base emissiveIntensity is set low.
      const baseColor = "#001F3F"; // dark blue
      const baseEmissiveIntensity = 0.2;

      // Enhanced material properties:
      // All shards use the same dark color.
      // Randomly, some shards (30% chance) are flagged for a flash.
      const isFlash = Math.random() < 0.3;
      const materialProps = {
        color: baseColor,
        metalness: 0.95,
        roughness: 0.05,
        clearcoat: 0.8,
        clearcoatRoughness: 0.05,
        emissive: baseColor, // same as base
        emissiveIntensity: baseEmissiveIntensity,
        opacity: 0.98,
        transparent: true,
      };

      return { pos, rot, width, height, velocity, angularVelocity, materialProps, flash: isFlash };
    });

    setShards(newShards);

    // Delay the onComplete callback to allow the effect to fully play (2000ms).
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    // Set gravity to zero so all shards travel straight toward the viewer.
    <Physics gravity={[0, 0, 0]}>
      {shards.map((shard, index) => (
        <Shard key={index} {...shard} />
      ))}
    </Physics>
  );
}
