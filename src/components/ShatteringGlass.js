import { useRef, useEffect } from "react";
import { useRapier } from "@react-three/rapier";
import * as THREE from "three";

export default function ShatteringGlass({ onComplete }) {
  const { world } = useRapier();
  const fragmentsRef = useRef([]);

  useEffect(() => {
    // Create shattered glass effect
    for (let i = 0; i < 20; i++) {
      const piece = new THREE.Mesh(
        new THREE.PlaneGeometry(Math.random() * 0.5, Math.random() * 0.5),
        new THREE.MeshStandardMaterial({ color: "white", transparent: true, opacity: 0.8 })
      );

      piece.position.set((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, 0);
      piece.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      world.add(piece);
      fragmentsRef.current.push(piece);
    }

    // Animate pieces falling
    setTimeout(() => {
      fragmentsRef.current.forEach((piece) => {
        piece.position.y -= Math.random() * 2;
      });

      setTimeout(() => {
        onComplete(); // Reveal content after animation
      }, 1000);
    }, 500);
  }, []);

  return null; // No visible component, only physics objects
}
