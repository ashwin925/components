import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function ShatteringGlass({ onComplete }) {
  const { scene } = useThree();
  
  useEffect(() => {
    // Create multiple broken glass shards
    const pieces = [];
    for (let i = 0; i < 20; i++) {
      const piece = new THREE.Mesh(
        new THREE.PlaneGeometry(Math.random() * 0.5, Math.random() * 0.5),
        new THREE.MeshStandardMaterial({ 
          color: "white", // Set a default color
          transparent: true, 
          opacity: 0.7 
        })
      );

      piece.position.set((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, 0);
      piece.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      scene.add(piece);
      pieces.push(piece);
    }

    // Animate pieces falling
    setTimeout(() => {
      pieces.forEach((piece) => {
        piece.position.y -= Math.random() * 2; // Simulate falling effect
      });

      setTimeout(() => {
        onComplete(); // Reveal content after animation
      }, 1000);
    }, 500);
  }, []);

  return null; // No visible component, only physics objects
}
