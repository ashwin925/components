import React, { useEffect, useRef, useState } from "react";
import { Physics, RigidBody } from "@react-three/rapier";
import { gsap } from "gsap";

// Single Shard Component with enhanced flash animation
function Shard({ pos, rot, width, height, velocity, angularVelocity, materialProps, flash }) {
  const meshRef = useRef();

  useEffect(() => {
    if (flash && meshRef.current) {
      // Create a GSAP timeline to animate multiple flashes
      const tl = gsap.timeline({ repeat: 1, yoyo: true });
      // Random delay for each shard so flashes occur at different times
      const delay = Math.random() * 0.5;
      tl.delay(delay)
        .to(meshRef.current.material, {
          emissiveIntensity: 3.5, // First flash boost
          clearcoat: 1.0,
          duration: 0.15,
          ease: "power2.inOut",
        })
        .to(meshRef.current.material, {
          emissiveIntensity: 4.5, // Second flash (even higher)
          clearcoat: 1.0,
          duration: 0.1,
          ease: "power2.inOut",
        })
        .to(meshRef.current.material, {
          emissiveIntensity: materialProps.emissiveIntensity, // Return to base value
          clearcoat: materialProps.clearcoat,
          duration: 0.15,
          ease: "power2.inOut",
        });
    }
  }, [flash, materialProps.emissiveIntensity, materialProps.clearcoat]);

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
        {/* Use a box geometry to simulate a shard with slight thickness */}
        <boxGeometry args={[width, height, 0.02]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
    </RigidBody>
  );
}

// Main ShatteringGlass Component
export default function ShatteringGlass({ onComplete }) {
  const [shards, setShards] = useState([]);

  useEffect(() => {
    // Create an array of 120 shards with randomized properties
    const newShards = Array.from({ length: 120 }).map(() => {
      // Random starting position within a 2x2 glass area (centered at origin)
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
      // Random dimensions for varied shard sizes (between 0.1 and 0.5)
      const width = 0.1 + Math.random() * 0.4;
      const height = 0.1 + Math.random() * 0.4;
      
      // Minimal lateral drift; shards come straight toward the viewer.
      const xVel = (Math.random() - 0.5) * 0.5;
      const yVel = (Math.random() - 0.5) * 0.5;
      const zVel = 3 + Math.random() * 2; // Controlled forward burst
      const velocity = [xVel, yVel, zVel];
      
      // Angular velocity for natural tumbling
      const angularVelocity = [
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
      ];

      // All shards have a dark base color.
      const baseColor = "#001F3F"; // Dark blue/blackish
      const baseEmissiveIntensity = 0.2;
      const baseClearcoat = 0.8;
      
      // Randomly flag ~30% of shards for an enhanced flash effect.
      const isFlash = Math.random() < 0.3;
      
      // Material properties for all shards (uniform dark base)
      const materialProps = {
        color: baseColor,
        metalness: 0.95,
        roughness: 0.05,
        clearcoat: baseClearcoat,
        clearcoatRoughness: 0.05,
        emissive: baseColor,
        emissiveIntensity: baseEmissiveIntensity,
        opacity: 0.98,
        transparent: true,
      };

      return { pos, rot, width, height, velocity, angularVelocity, materialProps, flash: isFlash };
    });

    setShards(newShards);

    // Delay onComplete (2000ms) to allow the full effect to play out
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    // Set gravity to zero so shards travel straight toward the viewer
    <Physics gravity={[0, 0, 0]}>
      {shards.map((shard, index) => (
        <Shard key={index} {...shard} />
      ))}
    </Physics>
  );
}
