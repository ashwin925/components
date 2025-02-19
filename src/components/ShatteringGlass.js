// ShatteringGlass.js
import { useEffect, useState } from "react";
import { Physics, RigidBody } from "@react-three/rapier";

export default function ShatteringGlass({ triggerBreak }) {
  const [shards, setShards] = useState([]);

  useEffect(() => {
    if (triggerBreak) {
      // Create 20 shards with random positions and rotations
      const newShards = Array.from({ length: 20 }).map((_, i) => ({
        position: [Math.random() * 2 - 1, Math.random() * 2 - 1, 0],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      }));
      setShards(newShards);
    }
  }, [triggerBreak]);

  return (
    <Physics>
      {shards.map((shard, index) => (
        <RigidBody key={index} colliders="hull" position={shard.position} rotation={shard.rotation}>
          <mesh>
            <planeGeometry args={[0.3, 0.3]} />
            <meshStandardMaterial color="white" transparent opacity={0.9} />
          </mesh>
        </RigidBody>
      ))}
    </Physics>
  );
}
