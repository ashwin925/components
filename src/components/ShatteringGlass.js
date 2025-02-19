import { useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { useEffect } from "react";
import * as THREE from "three";

export default function ShatteringGlass({ triggerBreak }) {
  const [shards, setShards] = useState([]);
  const { scene } = useThree();

  useEffect(() => {
    if (triggerBreak) {
      // Create shards using simple planes
      const newShards = Array.from({ length: 10 }).map((_, i) => ({
        position: [Math.random() * 2 - 1, Math.random() * 2 - 1, 0],
        rotation: [Math.random(), Math.random(), Math.random()],
      }));
      setShards(newShards);
    }
  }, [triggerBreak]);

  return (
    <Physics>
      {shards.map((shard, index) => (
        <RigidBody key={index} position={shard.position}>
          <mesh>
            <planeGeometry args={[0.5, 0.5]} />
            <meshStandardMaterial color="white" transparent opacity={0.8} />
          </mesh>
        </RigidBody>
      ))}
    </Physics>
  );
}
