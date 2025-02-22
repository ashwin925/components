import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Particles({ count = 100 }) {
    const mesh = useRef();
    const particles = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
        particles[i] = (Math.random() - 0.5) * 6; // Spread in a 3D space
    }

    useFrame(() => {
        mesh.current.rotation.y += 0.002; // Subtle rotation
    });

    return (
        <points ref={mesh}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach="attributes-position"
                    array={particles}
                    count={particles.length / 3}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial 
                attach="material" 
                size={0.1} 
                color="#4fa8ff" 
                transparent 
                opacity={0.7} 
                depthWrite={false} 
            />
        </points>
    );
}
