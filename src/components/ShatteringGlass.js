// FracturedGlass.js
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";

export default function FracturedGlass({ onComplete }) {
  // Load your fractured glass model
  const { scene } = useGLTF("/models/fracturedGlass.glb");
  const shardsRef = useRef([]);

  useEffect(() => {
    // Assume your model contains multiple children (shards)
    // For each shard, add physics and an initial impulse.
    scene.traverse((child) => {
      if (child.isMesh) {
        // Wrap each shard into a physics RigidBody
        // We'll keep a reference for applying impulses
        shardsRef.current.push(child);
      }
    });

    // Wait one frame to ensure physics is initialized
    setTimeout(() => {
      shardsRef.current.forEach((shard) => {
        // Apply an explosion-like impulse
        // You can adjust these multipliers for a stronger effect.
        const impulse = {
          x: (Math.random() - 0.5) * 12,
          y: (Math.random() - 0.5) * 12,
          z: (Math.random() - 0.5) * 12,
        };
        // If you wrap your shards in <RigidBody>, you could call applyImpulse.
        // Here, we simulate it with a GSAP animation if physics isn’t directly available:
        gsap.to(shard.position, { x: shard.position.x + impulse.x, y: shard.position.y + impulse.y, z: shard.position.z + impulse.z, duration: 1, ease: "power2.out" });
      });
      // After the shattering animation, call onComplete to reveal content.
      setTimeout(onComplete, 1500);
    }, 100);
  }, [scene, onComplete]);

  return (
    <group dispose={null}>
      <primitive object={scene} />
    </group>
  );
}
