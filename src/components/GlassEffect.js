import React, { useEffect, useState, useRef } from "react";
import "./GlassEffect.css";
import rect1 from "../images/rect1.webp";
import rect2 from "../images/rect2.webp";
import rect3 from "../images/rect3.webp";
import rect4 from "../images/rect4.webp";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { gsap } from "gsap";

const images = [rect1, rect3, rect4, rect2];

// ---------- Glass Shatter Effect Component ----------

function GlassShatterEffect({ onComplete }) {
  const [shards, setShards] = useState([]);

  useEffect(() => {
    // Create an array of 120 shards with randomized properties
    const newShards = Array.from({ length: 120 }).map(() => {
      // Position shards within a 2x2 area (simulating the glass panel)
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
      // Random dimensions for varied shard sizes
      const width = 0.1 + Math.random() * 0.4;  // between 0.1 and 0.5
      const height = 0.1 + Math.random() * 0.4; // between 0.1 and 0.5
      
      // Minimal lateral drift; shards come straight toward the viewer.
      const xVel = (Math.random() - 0.5) * 0.5;
      const yVel = (Math.random() - 0.5) * 0.5;
      const zVel = 3 + Math.random() * 2; // controlled forward burst
      const velocity = [xVel, yVel, zVel];
      
      // Angular velocity for natural tumbling
      const angularVelocity = [
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
      ];

      // Base material: dark color for all shards
      const baseColor = "#001F3F"; // dark blue/blackish
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

    // Delay onComplete (2000ms) to allow the full shatter effect to play out
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Inner Shard component with enhanced flash animation
  function Shard({ pos, rot, width, height, velocity, angularVelocity, materialProps, flash }) {
    const meshRef = useRef();

    useEffect(() => {
      if (flash && meshRef.current) {
        // Create a GSAP timeline for an intense, multiple-flash sequence
        const tl = gsap.timeline({ repeat: 1, yoyo: true });
        const delay = Math.random() * 0.5; // random delay for natural effect
        tl.delay(delay)
          .to(meshRef.current.material, {
            emissiveIntensity: 3.0, // first flash
            clearcoat: 1.0,
            duration: 0.15,
            ease: "power2.inOut",
          })
          .to(meshRef.current.material, {
            emissiveIntensity: 3.5, // peak flash
            clearcoat: 1.0,
            duration: 0.1,
            ease: "power2.inOut",
          })
          .to(meshRef.current.material, {
            emissiveIntensity: materialProps.emissiveIntensity, // revert to base
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
          <boxGeometry args={[width, height, 0.02]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
      </RigidBody>
    );
  }

  return (
    // Render the shatter effect within a Canvas sized to match the glass container.
    <Canvas style={{ width: "220px", height: "420px" }}>
      <Physics gravity={[0, 0, 0]}>
        {shards.map((shard, index) => (
          <Shard key={index} {...shard} />
        ))}
      </Physics>
    </Canvas>
  );
}

// ---------- End Glass Shatter Effect Component ----------

// ---------- Main GlassEffect Component (unchanged, with added "Shatter!" trigger) ----------

const GlassEffect = () => {
  const [index, setIndex] = useState(0);
  const [isBanging, setIsBanging] = useState(false);
  const [width, setWidth] = useState(220);
  const [height, setHeight] = useState(420);
  const [isRunning, setIsRunning] = useState(true); // Control animation
  const [isShattered, setIsShattered] = useState(false); // New state to trigger shattering

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setIsBanging(true);

      setTimeout(() => {
        setIsBanging(false);
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 150);
    }, 1500);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className={`page-container ${isBanging ? "jitter" : ""}`}>
      {isShattered ? (
        // Render the glass shatter effect if triggered
        <GlassShatterEffect onComplete={() => setIsShattered(false)} />
      ) : (
        <div
          className={`glass-container ${isBanging ? "bang" : ""}`}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            transition: "width 0.3s ease-out, height 0.3s ease-out",
          }}
        >
          <div className={`shockwave ${isBanging ? "active" : ""}`} />
          <img src={images[index]} alt="Glass Effect" className="glass-image" />
        </div>
      )}

      {/* Sliders & Control Buttons */}
      <div className="slider-container">
        <div className="slider">
          <label>Width</label>
          <input
            type="range"
            min="100"
            max="600"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
          <span>{width}px</span>
        </div>
        <div className="slider">
          <label>Height</label>
          <input
            type="range"
            min="200"
            max="800"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
          <span>{height}px</span>
        </div>
        <button className="toggle-btn" onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Stop" : "Start"}
        </button>
        {/* New button to trigger shattering */}
        <button className="toggle-btn" onClick={() => setIsShattered(true)}>
          Shatter!
        </button>
      </div>
    </div>
  );
};

export default GlassEffect;
